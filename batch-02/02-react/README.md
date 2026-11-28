# 02 - React Basics: Props, State and useEffect

A small Expo app that shows three core React ideas:

- **Props**: passing data into a component
- **State**: data that changes and updates the screen
- **useEffect**: running code after the screen updates

The app has a name input that greets you, a like counter, and two buttons (**Like** and **Reset**).

## Run the app

```bash
npm install
npm start
```

Then press `a` for Android, `i` for iOS, or `w` for web.

---

## 1. Props

Props are the **inputs** of a component. The parent passes them in, and the child reads them. A child should never change its own props.

In this example, `PrimaryButton` is a reusable button that receives two props:

```jsx
function PrimaryButton({ onPress, title }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}
```

| Prop      | Type     | What it does                          |
| --------- | -------- | ------------------------------------- |
| `title`   | string   | The text shown on the button          |
| `onPress` | function | The function to run when it is tapped |

The parent (`App`) uses the same component twice with different props:

```jsx
<PrimaryButton onPress={handleLike} title="Like" />
<PrimaryButton onPress={handleReset} title="Reset" />
```

The button is written once and reused. Only the props change.

---

## 2. State (`useState`)

State is data that a component **remembers** and can **change**. When state changes, React re-renders the component so the screen shows the new value.

```jsx
const [like, setLike] = useState(0);   // starts at 0
const [name, setName] = useState("");  // starts as an empty string
```

`useState` returns two things:

1. the **current value** (`like`, `name`)
2. a **setter function** to change it (`setLike`, `setName`)

### Updating state

```jsx
const handleLike = () => {
  setLike(like + 1);   // add 1
};

const handleReset = () => {
  setLike(0);          // back to 0
};

const handleNameChange = (text) => {
  setName(text);       // save what the user typed
};
```

### Showing state on screen

```jsx
<Text>Hello, {name}</Text>
<Text>Likes: {like}</Text>
```

Type in the input and `Hello, ...` changes as you type. Tap **Like** and the number goes up.

> **Rule:** always change state with the setter (`setLike(...)`).
> Writing `like = like + 1` will **not** update the screen.

> **Tip:** when the new value depends on the old value, the safer form is
> `setLike(prev => prev + 1)`. It always uses the latest value, even if you
> update several times in a row.

---

## 3. Side effects (`useEffect`)

`useEffect` runs code **after** the component renders. Use it for work that is not drawing UI, such as logging, fetching data, timers, or saving to storage.

```jsx
useEffect(() => {
  console.log(`Likes: ${like}`);
}, [like]);
```

The array at the end, `[like]`, is the **dependency array**. It tells React when to run the effect:

| Dependency array | When the effect runs                       |
| ---------------- | ------------------------------------------ |
| `[like]`         | On first render, then each time `like` changes |
| `[]`             | Only once, on first render                 |
| _(none)_         | After every render                         |

In this app:

- Tapping **Like** or **Reset** changes `like`, so the message is logged.
- Typing a name changes `name`, not `like`, so nothing is logged.

Open the Metro terminal (or the browser console on web) to see the logs.

---

## How it all fits together

```
User taps "Like"
      │
      ▼
PrimaryButton calls its onPress prop   ← props
      │
      ▼
handleLike() → setLike(like + 1)       ← state
      │
      ▼
React re-renders: "Likes: 1"
      │
      ▼
useEffect sees `like` changed → logs   ← effect
```

## Try it yourself

1. Add a **Dislike** button that subtracts 1. Reuse `PrimaryButton`.
2. Add a `color` prop to `PrimaryButton` so each button can have its own background color.
3. Add a second `useEffect` that logs the name each time it changes.
4. Stop the counter from going below 0.
