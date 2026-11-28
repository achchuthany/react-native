# React Native UI Practical Exam

## Course Catalog Screen

**Module:** Mobile Application Development  
**Question Type:** Practical UI Design  
**Duration:** 1 hour 30 minutes  
**Instructions:** Recreate the given screen using the screenshot provided by the lecturer.

## Question

Design and develop a single-screen React Native application based on the screenshot provided.

You must recreate the **Course Catalog** screen using only the following React Native components:

- `View`
- `Text`
- `TextInput`
- `ScrollView`
- `Image`
- `StyleSheet`
- `TouchableOpacity`

## Task Requirements

1. Create a main screen container with suitable padding, spacing, and background color.
2. Design a top header section that includes:
   - `Academic Programs`
   - `DCS-UoJ Catalog`
   - A short description about browsing available courses
3. Add a search section containing:
   - A `TextInput` to search courses by name
   - A `TouchableOpacity` button to clear the search text
4. Create a summary section using flex layout to display:
   - Total number of available courses
   - Total number of active enrollments
5. Add a `ScrollView` to display multiple course cards.
6. Each course card must contain:
   - Course image
   - Course name
   - Course code
   - Number of credits
   - Course fee
   - Number of enrolled students
   - An `Enroll Now` button
7. If the search text does not match any course, display a suitable message such as `No matching courses`.
8. Use `StyleSheet` for all styles.
9. Use simple flexbox layout to arrange the UI neatly and professionally.
10. Do not use inline styles.

## Constraints

1. Use only the listed React Native components.
2. Use simple flex properties such as `flex`, `flexDirection`, `justifyContent`, `alignItems`, and spacing.
3. Do not use any external UI libraries.
4. Do not add backend functionality, navigation, animations, or database connectivity.
5. Focus only on UI design and layout.

## Expected UI Sections

1. Header section
2. Search section
3. Summary cards section
4. Scrollable course list
5. Course card action button
6. Empty-state message

## Learning Outcomes

1. Use core React Native UI components correctly.
2. Build mobile layouts using flexbox.
3. Organize styling using `StyleSheet`.
4. Recreate a mobile UI from a screenshot.
5. Write clean and structured component code.

## Marking Rubric

| Criterion | Description | Marks |
|---|---|---:|
| Component Usage | Correct use of `View`, `Text`, `TextInput`, `ScrollView`, `Image`, `StyleSheet`, and `TouchableOpacity` | 20 |
| Layout with Flexbox | Proper use of flex layout, spacing, alignment, and section arrangement | 20 |
| Header and Search UI | Header section, search bar, and clear button implemented correctly | 15 |
| Course Card Design | Each course card includes all required UI elements | 20 |
| Styling Quality | Appropriate colors, spacing, padding, borders, and overall presentation | 10 |
| Screenshot Similarity | Final UI reasonably matches the provided screenshot | 10 |
| Code Structure | Code is readable, organized, and free from inline styling | 5 |
| **Total** |  | **100** |

## Submission Notes

1. Submit the source code of the React Native screen.
2. The final UI should visually match the screenshot as closely as possible.
3. Marks will be awarded for correct structure, layout, styling, and completeness.