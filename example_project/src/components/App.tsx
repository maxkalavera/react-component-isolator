import { ReactIsolator, IsolatedItem } from "react-isolator";

import Button from "src/components/Button";
import "src/styles/globals.css";

function App() {
  return (
    <ReactIsolator>
      <IsolatedItem name="Button" element={<Button />} />
      <IsolatedItem name="Hello world" element={<h4>Hello world!</h4>} />
      <IsolatedItem name="Button 001" element={<Button />} />
      <IsolatedItem name="Button 002" element={<Button />} />
      <IsolatedItem name="Button 003" element={<Button />} />
      <IsolatedItem name="Button 004" element={<Button />} />
      <IsolatedItem name="Button 005" element={<Button />} />
      <IsolatedItem name="Button 006" element={<Button />} />
      <IsolatedItem name="Button 007" element={<Button />} />
      <IsolatedItem name="Button 008" element={<Button />} />
      <IsolatedItem name="Button 009" element={<Button />} />
      <IsolatedItem name="Button 010" element={<Button />} />
      <IsolatedItem name="Button 011" element={<Button />} />
      <IsolatedItem name="Button 012" element={<Button />} />
      <IsolatedItem name="Button 013" element={<Button />} />
      <IsolatedItem name="Button 014" element={<Button />} />
      <IsolatedItem name="Button 015" element={<Button />} />
      <IsolatedItem name="Button 016" element={<Button />} />
      <IsolatedItem name="Button 017" element={<Button />} />
      <IsolatedItem name="Button 018" element={<Button />} />
      <IsolatedItem name="Button 019" element={<Button />} />
      <IsolatedItem name="Button 020" element={<Button />} />
    </ReactIsolator>
  );
}

export default App;
