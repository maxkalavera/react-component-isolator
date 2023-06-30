# React Component Isolator &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/maxkalavera/react-component-isolator/blob/main/LICENSE.md) [![npm version](https://img.shields.io/badge/npm-^16.8.0-blue.svg)](https://www.npmjs.com/package/)

As the name indicates, this is a tool that allows you to visualized React components in an isolated environment.

<p align="center">
  <img src="https://github.com/maxkalavera/react-component-isolator/blob/main/README/screenshot.png" alt="Library running screenshot"/>
</p>

## Quick start

using npm:

```bash
npm install -D react-component-isolator
```

using yarn:

```bash
yarn add --dev react-component-isolator
```

Once the package is installed, you can import the library using `import` or `require` approach:

```js
import { ReactIsolator, IsolatedItem } from "react-isolator";
```

## Example

```js
import { ReactIsolator, IsolatedItem } from "react-isolator";

function Button({ label = "" }) {
  return (
    <button type="button" onClick={() => console.log("Button clicked!")}>
      <p>{label}</p>
    </button>
  );
}

export function IsolatedButton() {
  return <Button label="I am a Button!" />;
}

export default Button;

<ReactIsolator>
  <IsolatedItem name="Button" element={<Button />} />
</ReactIsolator>;
```

Alternatively, the isolated code can be located in its own file:

```bash
button.isolated.jsx
```

```js
import Button from ../components/Button;

function IsolatedButton() {
  return <Button label='I am a Button!' />
}

export default IsolatedButton;
```

## Components

<br />

### ReactIsolator

Main component of the tool, can be conceptualized as a list to visualize every child component.

<br />

### IsolatedItem

Component that holds the isolated element to visualize.

#### Props

- `name`: Label to identify the component in visualizer.
- `jsxElement`: The component to render.

## License

React component library is supported under [MIT licensed](https://github.com/maxkalavera/react-component-isolator/blob/main/LICENSE.md).
