# Shop Product Listing App

This project is a simple React Native product listing app built with Expo. The goal was to practice how to break a screen into small reusable components, display product data, and style a mobile layout using `StyleSheet`.

## What the app does

The app shows a list of products such as laptops, headphones, shoes, and home items. A student can:

- view all products in a card layout
- search for a product by name
- filter products by category
- add items to the cart
- see the cart item count in the header

This makes the project a good example of working with lists, props, state, and styles in React Native.

## How the app was completed

We built the app by starting with the main screen and then splitting the UI into smaller components.

### 1. Main app setup

The main file is `App.js`.

In this file we:

- created the product data in an array called `productsList`
- stored screen data using `useState`
- used `useEffect` to update the visible products when the category or search text changes
- passed data and functions down to child components using props

The main states are:

- `products`: the list currently shown on the screen
- `category`: the selected category button
- `searchQuery`: the text typed in the search input
- `cartItems`: the items added to the cart

### 2. Category components

The category filter is split into two components:

- `CategoryList`: shows all category buttons in a horizontal scroll view
- `CategoryItem`: represents one category button

Why this is useful:

- the code is easier to read
- each component has one clear responsibility
- the same button design can be reused for every category

`CategoryList` decides which category is active, and `CategoryItem` handles how each button looks.

### 3. Product components

The product section is also split into two components:

- `ProductList`: loops through the product array and displays each product card
- `Product`: displays a single product with image, title, price, button, stock message, and category

Why this is useful:

- `ProductList` handles the list logic
- `Product` handles the card design
- the product card can be reused for every item in the array

Inside `ProductList`, we use `.map()` to turn the data array into multiple `Product` components.

### 4. Search and filter logic

The app includes two important features for showing products:

- category filtering
- searching by product title

When the selected category changes, the app filters the original product list and updates the products shown on the screen.

When the user types in the search box, the app checks each product title and only shows products that match the typed text.

This teaches students how state changes can update the user interface automatically.

### 5. Cart feature

Each `Product` card has an `Add to Cart` button.

When the button is pressed:

- the selected product is added to the `cartItems` array
- the header count updates automatically
- the card shows a small `Added to Cart` message

This is a simple example of shared state being controlled in the parent component and used inside child components.

## How components were used

This project follows a common React idea: break the UI into smaller parts.

Instead of writing everything inside one file, we created separate components for:

- the category list
- the category button
- the product list
- the product card

Benefits of using components:

- cleaner code
- easier testing and updates
- better reuse
- easier for students to understand one part at a time

## How styling was done

Styling in this app was done with `StyleSheet.create()` from React Native.

Each file has its own `styles` object. This keeps styles close to the component they belong to.

Examples of style properties used in the project:

- `flex` and `flexDirection` for layout
- `padding` and `margin` for spacing
- `backgroundColor` for card and button colors
- `borderRadius` for rounded corners
- `fontSize` and `fontWeight` for text design
- `shadowColor`, `shadowOpacity`, and `elevation` for card shadows

### Styling examples in this project

The header uses:

- a dark background color
- centered text
- shadow for depth

The search box uses:

- `flexDirection: "row"` so the icon and input stay on one line
- padding and border radius to look like a modern search bar

The product cards use:

- width of `48%` so two cards fit in one row
- rounded corners and shadows for a card layout
- a separate image section and content section

The category buttons use:

- different background colors for active and inactive states
- rounded pill shapes using a large border radius

## Why this project is useful for students

This app helps students practice:

- creating and using components
- passing props from parent to child
- managing state with `useState`
- reacting to changes with `useEffect`
- rendering lists with `.map()`
- building layouts with React Native styles

It is a small project, but it uses the same ideas needed for larger mobile apps.

## Project structure

```text
shop/
  App.js
  components/
    CategoryItem.js
    CategoryList.js
    Product.js
    ProductList.js
  assets/
```

## Run the project

```bash
npm install
npm start
```

Then open the Expo app or emulator to view the product listing screen.

## Summary

This product listing app was completed by combining simple React Native ideas:

- store data in state
- split the UI into reusable components
- render lists from arrays
- style each part with `StyleSheet`

That combination is the main reason the app is easy to build, easy to read, and easy to improve later.