# Products App — Student Exam

You are given a partially-built React Native Products app. Three screens contain `// TODO` markers. Complete all tasks below using the already-configured `apiClient` from `utils/api.js` (auth token is auto-attached — do not modify that file).

---

## Task 1 — `ProductListScreen.js`

### Step 1.1 — Add state variables
At the top of `ProductListScreen`, add two `useState` hooks:
- `products` — array, initial value `[]`
- `pagination` — object, initial value `null`

### Step 1.2 — Fetch products from the API
Inside the `try` block of `fetchProducts()`, make an API call:

- Use `apiClient.get("products", { params: { page: 1, limit: 20 } })`
- The response shape is:
  - `response.data.data.products` → array of products
  - `response.data.data.pagination` → `{ totalCount, page, totalPages, ... }`
- Store both in their respective state variables using `setProducts` and `setPagination`.

### Step 1.3 — Handle fetch errors
Inside the `catch` block:
- Extract the message: try `error.response?.data?.message`, fall back to `error.message`, then a default string.
- Display it with `Alert.alert("Error", message)`.

### Step 1.4 — Display pagination info
Replace the hardcoded `"Page 1 of 10"` text with a real value from `pagination` state.
- Guard against `pagination` being `null` (e.g. use `pagination &&`)
- Show something like: `{pagination.totalCount} product(s)`

### Step 1.5 — Render the product list with FlatList
Replace the hardcoded single `<ProductCard item={{ category: "sports" }} />` with a `<FlatList>`:
- `data` → `products` state
- `keyExtractor` → `(item) => item.id`
- `renderItem` → render `<ProductCard item={item} navigation={navigation} />`
- `ListEmptyComponent` → a `<Text>` saying `"No products found."`

### Step 1.6 — Wire `ProductCard` fields
`ProductCard` currently renders hardcoded strings. Replace each with the real field from `item`:

| Hardcoded | Replace with |
|-----------|--------------|
| `"Name"` | `item.name` |
| `"Status"` | `item.status` (also used in the badge style condition) |
| `"Category"` | `item.category` |
| `"Description"` | `item.description` |
| `"Price"` | `parseFloat(item.price).toFixed(2)` |
| `"Stock"` | `item.stock` |
| Image placeholder | Conditionally render `<Image source={{ uri: item.image_url }} />` if `item.image_url` exists, otherwise keep the placeholder `<View>` |

---

## Task 2 — `CreateProductScreen.js`

### Step 2.1 — Add form state variables
Add five `useState` hooks at the top of the component (alongside the existing `category`, `status`, `submitting` ones):

| Variable | Initial value |
|----------|---------------|
| `name` | `""` |
| `description` | `""` |
| `price` | `""` |
| `imageUrl` | `""` |
| `stock` | `""` |

Then wire each `TextInput` with:
- `value={stateName}`
- `onChangeText={setStateName}`

### Step 2.2 — Implement validation in `handleSubmit()`
Before `setSubmitting(true)`, add these checks **in order** and return early on failure:

1. `name.trim()` is empty → `Alert.alert("Validation Error", "Product name is required.")`
2. `price.trim()` is empty, `isNaN(parseFloat(price))`, or `parseFloat(price) < 0.01` → `Alert.alert("Validation Error", "Enter a valid price (min 0.01).")`
3. `category` is empty → `Alert.alert("Validation Error", "Please select a category.")`

### Step 2.3 — Implement the API call in `handleSubmit()`
Build a payload and POST to the API:
- **Endpoint:** `POST /products` via `apiClient.post("products", payload)`
- **Payload fields:** `name` (trimmed), `description` (trimmed, optional), `price` (as float via `parseFloat`), `category`, `imageUrl` (trimmed, optional), `stock` (as int via `parseInt`, optional), `status`
- **On success:** `Alert.alert("Success", "Product created successfully.", [{ text: "OK", onPress: () => navigation.goBack() }])`
- **On error:** Extract message (same as Task 1 Step 1.3), then `Alert.alert("Error", message)`
- **In `finally`:** Always call `setSubmitting(false)`

---

## Task 3 — `EditProductScreen.js`

### Step 3.1 — Add form state variables (pre-filled)
Add the same five state variables as Task 2, but initialize them from `product` (received via `route.params.product`):

| Variable | Initial value |
|----------|---------------|
| `name` | `product.name ?? ""` |
| `description` | `product.description ?? ""` |
| `price` | `product.price ? String(product.price) : ""` |
| `imageUrl` | `product.image_url ?? ""` |
| `stock` | `product.stock != null ? String(product.stock) : ""` |

Wire each `TextInput` with `value` and `onChangeText` as in Task 2.

### Step 3.2 — Implement validation in `handleUpdate()`
Identical validation logic to Step 2.2.

### Step 3.3 — Implement the API call in `handleUpdate()`
Same structure as Step 2.3, but use `PUT`:
- **Endpoint:** `PUT /products/{product.id}` → `apiClient.put(\`products/${product.id}\`, payload)`
- **On success:** `Alert.alert("Success", "Product updated successfully.", [{ text: "OK", onPress: () => navigation.goBack() }])`
- **On error:** Same error handling as Task 1 Step 1.3
- **In `finally`:** `setSubmitting(false)`

---

## Verification Checklist

- [ ] Sign in and open the Products tab — real products load from the API
- [ ] Each product card shows real name, status, category, description, price, and stock
- [ ] Open the Create Product screen — submit an empty form and verify each validation alert fires
- [ ] Create a valid product — success alert appears and the list screen updates
- [ ] Tap Edit on a product — form pre-fills with existing data
- [ ] Update a product — success alert appears and changes reflect on the list
- [ ] Disconnect from the network — an error alert appears instead of crashing

---

## Files to Modify

| File | Tasks |
|------|-------|
| `screens/ProductListScreen.js` | Task 1 |
| `screens/CreateProductScreen.js` | Task 2 |
| `screens/EditProductScreen.js` | Task 3 |

## Do NOT Modify

- `utils/api.js`
- `utils/tokenHelper.js`
- `App.js`
- `screens/ProfileScreen.js`
- `screens/SignInScreen.js`
- `screens/ProductDetailsScreen.js`
- `screens/ProductCategoriesScreen.js`