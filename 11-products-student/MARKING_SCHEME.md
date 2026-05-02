# Products App — Marking Scheme & Google Form Questions

## Scoring Rubric (applies to every question)

| Score | Meaning                                                                    |
| ----- | -------------------------------------------------------------------------- |
| **0** | Not attempted — no code written                                            |
| **1** | Attempted but has syntax or runtime errors                                 |
| **2** | Code runs without crashing but output is not visible (logic/wiring issue)  |
| **3** | Output is visible but not fully correct (minor issues, edge cases missing) |
| **4** | Works exactly as expected — matches full requirements                      |

---

## Google Form Structure

> **Form title:** Products App — Student Evaluation  
> **Form description:** Rate each task item using the scale: 0 = Not done, 1 = Completed with error, 2 = Completed but no display, 3 = Completed but display shows (minor issues), 4 = As expected output.

---

## Section 1 — Task 1: Product List Screen

**(Max: 24 marks)**

---

### Q1 — State Variables (products & pagination)

**Question:**  
Has the student declared the `products` (array) and `pagination` (object) state variables using `useState` inside `ProductListScreen`?

**Scoring guide:**

| Score | Criteria                                                                                    |
| ----- | ------------------------------------------------------------------------------------------- |
| 0     | No state variables added                                                                    |
| 1     | State added but incorrect initial values or syntax errors                                   |
| 2     | Both states declared correctly but not used anywhere in the component                       |
| 3     | States declared and used but one is missing or initialized incorrectly                      |
| 4     | Both `products = []` and `pagination = null` declared correctly and referenced in JSX/logic |

> **Google Form field:** Linear scale 0–4

---

### Q2 — API Fetch Call (`fetchProducts`)

**Question:**  
Has the student correctly called the API inside the `try` block of `fetchProducts()` and stored the response in state?

**Expected implementation:**

- `apiClient.get("products", { params: { page: 1, limit: 20 } })`
- Destructure `products` and `pagination` from `response.data.data`
- Call `setProducts(list)` and `setPagination(pag)`

**Scoring guide:**

| Score | Criteria                                                                                                       |
| ----- | -------------------------------------------------------------------------------------------------------------- |
| 0     | No API call attempted                                                                                          |
| 1     | API call attempted but wrong endpoint, wrong method, or syntax error                                           |
| 2     | API call correct but response not destructured or state not set                                                |
| 3     | API call and state set but response shape misread (e.g. using `response.data` instead of `response.data.data`) |
| 4     | Fully correct — endpoint, params, destructuring, and both `setProducts` / `setPagination` called correctly     |

> **Google Form field:** Linear scale 0–4

---

### Q3 — Error Handling (catch block)

**Question:**  
Has the student implemented error handling in the `catch` block with an appropriate `Alert`?

**Expected implementation:**

- Extract message: `error.response?.data?.message || error.message || "Failed to load products."`
- `Alert.alert("Error", message)`

**Scoring guide:**

| Score | Criteria                                                                   |
| ----- | -------------------------------------------------------------------------- |
| 0     | No catch block or completely empty                                         |
| 1     | Alert added but syntax error or crashes                                    |
| 2     | Alert added but always shows a blank message (error message not extracted) |
| 3     | Alert shows a message but fallback chain is incomplete                     |
| 4     | Full fallback chain implemented and alert displays correctly               |

> **Google Form field:** Linear scale 0–4

---

### Q4 — Pagination Display

**Question:**  
Has the student replaced the hardcoded `"Page 1 of 10"` with real data from the `pagination` state?

**Expected implementation:**

- Guard against `null` (e.g. `pagination && (...)`)
- Display `pagination.totalCount` with label text

**Scoring guide:**

| Score | Criteria                                                                      |
| ----- | ----------------------------------------------------------------------------- |
| 0     | Still shows hardcoded `"Page 1 of 10"`                                        |
| 1     | Attempts to use `pagination` but causes a crash (no null guard)               |
| 2     | Null guard added but always renders nothing (wrong field name or logic issue) |
| 3     | Displays total count but formatting is off or guard is missing in some cases  |
| 4     | Correctly guarded and displays real count from API (e.g. `"5 products"`)      |

> **Google Form field:** Linear scale 0–4

---

### Q5 — FlatList Rendering

**Question:**  
Has the student replaced the hardcoded `<ProductCard item={{ category: "sports" }} />` with a `<FlatList>` rendering all products?

**Expected implementation:**

- `data={products}`
- `keyExtractor={(item) => item.id}`
- `renderItem={({ item }) => <ProductCard item={item} navigation={navigation} />}`
- `ListEmptyComponent` renders a "No products found." message

**Scoring guide:**

| Score | Criteria                                                                                    |
| ----- | ------------------------------------------------------------------------------------------- |
| 0     | Still shows hardcoded single card                                                           |
| 1     | `FlatList` added but syntax error or missing required props (app crashes)                   |
| 2     | `FlatList` renders without crash but shows blank rows or `undefined` items                  |
| 3     | Products render correctly but `ListEmptyComponent` or `keyExtractor` is missing             |
| 4     | Full `FlatList` with correct `data`, `keyExtractor`, `renderItem`, and `ListEmptyComponent` |

> **Google Form field:** Linear scale 0–4

---

### Q6 — ProductCard Field Wiring

**Question:**  
Has the student replaced all hardcoded strings in `ProductCard` with real fields from the `item` prop?

**Fields to check:** `item.name`, `item.status`, `item.category`, `item.description`, `item.price` (formatted), `item.stock`, conditional `item.image_url`

**Scoring guide:**

| Score | Criteria                                                                                            |
| ----- | --------------------------------------------------------------------------------------------------- |
| 0     | All fields still hardcoded (shows "Name", "Status", "Category", etc.)                               |
| 1     | Some fields wired but causes a crash (e.g. incorrect property access)                               |
| 2     | Fields wired but price/image not handled correctly (raw number or broken image)                     |
| 3     | Most fields correct but 1–2 missing (e.g. image conditional missing or status badge not wired)      |
| 4     | All fields correctly wired including formatted price, status badge condition, and conditional image |

> **Google Form field:** Linear scale 0–4

---

## Section 2 — Task 2: Create Product Screen

**(Max: 12 marks)**

---

### Q7 — Form State Variables & TextInput Wiring

**Question:**  
Has the student added `name`, `description`, `price`, `imageUrl`, `stock` state variables and wired each `TextInput` with `value` and `onChangeText`?

**Scoring guide:**

| Score | Criteria                                                                                  |
| ----- | ----------------------------------------------------------------------------------------- |
| 0     | No state variables added; inputs are uncontrolled                                         |
| 1     | Some state variables added but syntax errors or app crashes on input                      |
| 2     | All states declared but `value` or `onChangeText` not wired to the inputs                 |
| 3     | States and wiring mostly correct but 1–2 inputs missing `value` or `onChangeText`         |
| 4     | All 5 fields fully controlled — `value` and `onChangeText` correctly wired on every input |

> **Google Form field:** Linear scale 0–4

---

### Q8 — Validation Logic (Create)

**Question:**  
Has the student implemented the three validation checks in `handleSubmit()` before calling the API?

**Checks required:**

1. `name` is not empty
2. `price` is a valid number ≥ 0.01
3. `category` is selected

**Scoring guide:**

| Score | Criteria                                                              |
| ----- | --------------------------------------------------------------------- |
| 0     | No validation — submits even with empty fields                        |
| 1     | Validation added but syntax error or incorrect condition causes crash |
| 2     | Validation runs but alert never shows (condition logic wrong)         |
| 3     | 1–2 of the 3 checks correct; one missing or always passes             |
| 4     | All 3 checks correct with appropriate alert messages and early return |

> **Google Form field:** Linear scale 0–4

---

### Q9 — POST API Call (Create)

**Question:**  
Has the student implemented the `POST /products` call with correct payload, success alert, and error handling?

**Expected implementation:**

- `apiClient.post("products", payload)` with all required fields
- Success: `Alert.alert("Success", ...)` then `navigation.goBack()`
- Error: `Alert.alert("Error", message)`
- `finally`: `setSubmitting(false)`

**Scoring guide:**

| Score | Criteria                                                                                                                    |
| ----- | --------------------------------------------------------------------------------------------------------------------------- |
| 0     | No API call in `handleSubmit`                                                                                               |
| 1     | API call attempted but wrong endpoint/method or syntax error causes crash                                                   |
| 2     | API call succeeds but no success alert or `navigation.goBack()` not called                                                  |
| 3     | API call, alert, and goBack work but error handling or `finally` missing                                                    |
| 4     | Full implementation — POST with correct payload, success alert + goBack, error alert, and `setSubmitting(false)` in finally |

> **Google Form field:** Linear scale 0–4

---

## Section 3 — Task 3: Edit Product Screen

**(Max: 12 marks)**

---

### Q10 — Form State Variables (Pre-filled) & TextInput Wiring

**Question:**  
Has the student added the same 5 state variables initialized from `route.params.product` and wired each `TextInput`?

**Expected initialization:**

- `name` → `product.name ?? ""`
- `description` → `product.description ?? ""`
- `price` → `product.price ? String(product.price) : ""`
- `imageUrl` → `product.image_url ?? ""`
- `stock` → `product.stock != null ? String(product.stock) : ""`

**Scoring guide:**

| Score | Criteria                                                                                                       |
| ----- | -------------------------------------------------------------------------------------------------------------- |
| 0     | No state variables; form always opens empty                                                                    |
| 1     | State variables added but crash on open (null not handled or wrong field name)                                 |
| 2     | States added but inputs not wired (`value`/`onChangeText` missing) so form is blank                            |
| 3     | Form pre-fills correctly but 1–2 fields use wrong initial value or conversion (e.g. `image_url` vs `imageUrl`) |
| 4     | All 5 fields pre-filled correctly with proper `?? ""` guards and `String()` conversion; fully wired            |

> **Google Form field:** Linear scale 0–4

---

### Q11 — Validation Logic (Edit)

**Question:**  
Has the student implemented the same three validation checks in `handleUpdate()` as in `handleSubmit()`?

**Scoring guide:**

| Score | Criteria                                                  |
| ----- | --------------------------------------------------------- |
| 0     | No validation — updates even with empty fields            |
| 1     | Validation code present but causes crash                  |
| 2     | Validation runs but alerts never trigger                  |
| 3     | 1–2 of the 3 checks correct                               |
| 4     | All 3 checks correct with alert messages and early return |

> **Google Form field:** Linear scale 0–4

---

### Q12 — PUT API Call (Edit)

**Question:**  
Has the student implemented the `PUT /products/:id` call with correct payload, success alert, and error handling?

**Expected implementation:**

- `apiClient.put(\`products/${product.id}\`, payload)`
- Success: `Alert.alert("Success", ...)` then `navigation.goBack()`
- Error: `Alert.alert("Error", message)`
- `finally`: `setSubmitting(false)`

**Scoring guide:**

| Score | Criteria                                                                                                                  |
| ----- | ------------------------------------------------------------------------------------------------------------------------- |
| 0     | No API call in `handleUpdate`                                                                                             |
| 1     | API call attempted but uses POST instead of PUT, or syntax error                                                          |
| 2     | PUT call made but `product.id` not included in the URL, or no success/error handling                                      |
| 3     | PUT call correct but success alert missing goBack, or error handling incomplete                                           |
| 4     | Full implementation — PUT with `product.id`, correct payload, success alert + goBack, error alert, `setSubmitting(false)` |

> **Google Form field:** Linear scale 0–4

---

## Mark Summary Sheet

| #   | Question                      | Section                 | Max Marks |
| --- | ----------------------------- | ----------------------- | --------- |
| Q1  | State Variables               | Task 1 — Product List   | 4         |
| Q2  | API Fetch Call                | Task 1 — Product List   | 4         |
| Q3  | Error Handling                | Task 1 — Product List   | 4         |
| Q4  | Pagination Display            | Task 1 — Product List   | 4         |
| Q5  | FlatList Rendering            | Task 1 — Product List   | 4         |
| Q6  | ProductCard Field Wiring      | Task 1 — Product List   | 4         |
| Q7  | Form State & TextInput Wiring | Task 2 — Create Product | 4         |
| Q8  | Validation Logic              | Task 2 — Create Product | 4         |
| Q9  | POST API Call                 | Task 2 — Create Product | 4         |
| Q10 | Pre-filled State & Wiring     | Task 3 — Edit Product   | 4         |
| Q11 | Validation Logic              | Task 3 — Edit Product   | 4         |
| Q12 | PUT API Call                  | Task 3 — Edit Product   | 4         |
|     | **Total**                     |                         | **48**    |

---

