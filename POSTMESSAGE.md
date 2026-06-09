# iConfigure → parent window postMessage protocol

Reference for integration scripts (`hs2.js`, `swissbedden.js`, `jansa.js`, etc.) that
live in the parent shop page and embed the iConfigure iframe. The configurator
posts a structured `event.data` object to the parent via
`window.parent.postMessage(...)`. Listen with the standard
`window.addEventListener("message", handler)`.

There are currently **two events** the configurator can emit, distinguished by
`event.data.name`:

| `name` | When | Sent by which buttons |
|---|---|---|
| `quotation` | User submitted a full quotation (PDF and/or email generated, quotation row stored in DB) | Action buttons configured with `pdf: true` and/or `email: true` |
| `cart.action` | User completed the configuration and wants the parent shop to add the products to its native cart — no quotation, no DB row, no email | Action buttons configured with `postmessage: true` AND neither `pdf` nor `email` |

> Action buttons are configured per "output" (submission config) in the manager
> app: pdf / email / webhook / postmessage flags can be combined freely. The
> rule `requiresContact = pdf || email` decides whether the contact form is
> shown before the postMessage fires. webhook/postmessage-only buttons skip the
> contact form entirely.

---

## `quotation` event

Fired after a successful quotation submit (Path A on the backend). The parent
typically uses this to redirect the user to a thank-you page.

### Payload

```jsonc
{
  "name": "quotation",
  "state": "finished",
  "productId": "<product objectId>",
  "total": <total price as number>,
  "quotation_id": "<quotations row objectId>",
  "pdf_url": "https://.../storage/v1/.../quotation.pdf"
}
```

### Example handler (from `hs2.js`)

```js
if (event.data.name === "quotation") {
    if (event.data.productId === "d3849c93-...") {
        window.location.href =
            "https://www.firmahoutenstaal.nl/service/bedankt-voor-uw-offerte-aanvraag-deuren?client-val=" +
            event.data.total;
    }
    return;
}
```

---

## `cart.action` event

Fired after a postmessage-only / webhook+postmessage action — the configurator
wants the parent shop to take action with the configuration (e.g. add items to
its native cart). **No** quotation row is created, **no** PDF, **no** email,
**no** contact form was shown.

### Payload

```jsonc
{
  "name": "cart.action",
  "state": "finished",
  "button_id": "<id of the clicked action button>",
  "productId": "<primary product objectId>",
  "product_id": "<same as productId>",
  "dealer_id": "<dealer company objectId | null>",
  "dealer_product_id": "<dealer override product row | null>",
  "language": "nl",
  "extra_fields": { /* custom_fields configured on the output, if any */ },
  "items": [
    {
      "product_id": "<product objectId>",
      "product_name": "<display name>",
      "image": "<screenshot URL>",
      "items": [                            // <-- steps
        {
          "ID": "<step ID>",
          "repetitionAmount": 1,
          "repetitions": [                  // <-- array of repetitions
            [                               // <-- each repetition is an array of features
              {
                "ID": "vorm",
                "type": "single_selection",
                "value": "deens",           // selected subfeature ID
                "feature_name": "Vorm",
                "selected": {               // resolved subfeature (added by backend)
                  "ID": "deens",
                  "name": "Deens",
                  "custom_properties": { /* ... */ }
                }
              },
              {
                "ID": "lengte",
                "type": "number_input",
                "value": 240,
                "feature_name": "Lengte"
              }
            ]
          ]
        }
      ]
    }
  ]
}
```

### Feature value shape by type

The shape of `feature.value` depends on `feature.type`. The backend keeps the
raw configurator value (no `subID` field — that was a legacy field).

| `type` | `value` | `selected` (added by backend) |
|---|---|---|
| `single_selection` | subfeature ID as string, e.g. `"deens"` | `{ ID, name, custom_properties }` |
| `multiple_selection` | `{ [subfeatureID]: boolean }` | `[{ ID, name, custom_properties }, ...]` for truthy entries |
| `number_input`, `text_input`, `date`, etc. | the raw number/string value | (not set) |

### Translating to a flat keyed map

Most integration scripts want a flat `{ [feature.ID]: feature }` map keyed by
human-readable feature ID (e.g. `vorm`, `lengte`, `breedte`). Flatten the
nested per-product/per-step/per-repetition structure:

```js
function translateCartActionToLegacy(products) {
    var flat = {};
    if (!Array.isArray(products)) return flat;
    for (let product of products) {
        for (let step of (product && product.items) || []) {
            for (let repetition of step.repetitions || []) {
                if (!Array.isArray(repetition)) continue;
                for (let feature of repetition) {
                    if (!feature || !feature.ID) continue;
                    flat[feature.ID] = feature;
                }
            }
        }
    }
    return flat;
}
```

### Helper: read the selected option

For `single_selection` and `multiple_selection`, derive the selected ID(s) from
`feature.value` (same helper works for both):

```js
function selectedOption(item) {
    if (item.value && typeof item.value === "object") {
        // multiple_selection: first truthy key
        return Object.keys(item.value).find((k) => item.value[k]) || "";
    }
    if (typeof item.value === "string") {
        // single_selection
        return item.value;
    }
    // number/text input -> not a selectable subfeature
    return "";
}
```

### Full handler example (from `hs2.js`)

```js
var hasTriggered = false;

window.addEventListener("message", (event) => {
    if (!event || !event.data || typeof event.data !== "object") return;
    if (event.data.name !== "cart.action") return;
    if (hasTriggered) return;

    const items = translateCartActionToLegacy(event.data.items);

    // Build the cart-add URLs for the parent shop
    const urls = [];
    for (const key of Object.keys(items)) {
        const subId = selectedOption(items[key]);
        if (subId && values[subId]) {
            urls.push(`https://shop.example.com/cart/add/${values[subId]}/?quantity=1`);
        }
    }
    // ... read items.lengte.value, items.breedte.value etc. for size-keyed lookups ...

    triggerPostRequests(urls);
    hasTriggered = true;
});
```

---

## Legacy formats (deprecated, kept as fallback)

For backwards compat the configurator iframe used to post:

- **`JSON.stringify(formatData())`** — a stringified array of steps with
  repetitions. Posted by an older `handleBackendQuote()` function that is
  currently dead code in the configurator. `hs2.js` keeps the parser path as a
  fallback in case an older configurator build is loaded.
- **`{ URLparameters: ..., items: { ... } }`** — a flat keyed map with
  derived `subID` fields. Not emitted by the current configurator at all.

New integration scripts should only handle `quotation` and `cart.action`.

---

## Backend reference

The postMessage payloads are built in
[`iconfigure-apps/api/v1/public/add-quote.js`](https://github.com/Joppe44/iconfigure-apps/blob/main/api/v1/public/add-quote.js):

- **Path A** (`pdf || email`): standard quotation flow → `responseData.postmessage`
  has `name: 'quotation'`.
- **Path B** (`!pdf && !email`, requires `output_id` on the request): lightweight
  flow via `handleNoContactSubmit(...)` → `responseData.postmessage` has
  `name: 'cart.action'`. No `customers` / `quotations` row created.

The frontend (`apps/form/src/Info.vue`, `apps/form/src/StandaloneContactForm.vue`,
`packages/stores/cart.js`) dispatches the payload via
`window.parent.postMessage(res.postmessage, '*')`.
