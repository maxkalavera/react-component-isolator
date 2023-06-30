import { ReactIsolator, IsolatedItem } from "react-isolator";

import { IsolatedButton } from "src/components/Button";
import "src/styles/globals.css";

function App() {
  return (
    <ReactIsolator>
      <IsolatedItem name="Button" element={<IsolatedButton />} />
      <IsolatedItem name="Hello world" element={<h4>Hello world!</h4>} />
      <IsolatedItem name="Button 001" element={<IsolatedButton />} />
      <IsolatedItem name="Button 002" element={<IsolatedButton />} />
      <IsolatedItem name="Button 003" element={<IsolatedButton />} />
      <IsolatedItem name="Button 004" element={<IsolatedButton />} />
      <IsolatedItem name="Button 005" element={<IsolatedButton />} />
      <IsolatedItem name="Button 006" element={<IsolatedButton />} />
      <IsolatedItem name="Button 007" element={<IsolatedButton />} />
      <IsolatedItem name="Button 008" element={<IsolatedButton />} />
      <IsolatedItem name="Button 009" element={<IsolatedButton />} />
      <IsolatedItem name="Button 010" element={<IsolatedButton />} />
      <IsolatedItem name="Button 011" element={<IsolatedButton />} />
      <IsolatedItem name="Button 012" element={<IsolatedButton />} />
      <IsolatedItem name="Button 013" element={<IsolatedButton />} />
      <IsolatedItem name="Button 014" element={<IsolatedButton />} />
      <IsolatedItem name="Button 015" element={<IsolatedButton />} />
      <IsolatedItem name="Button 016" element={<IsolatedButton />} />
      <IsolatedItem name="Button 017" element={<IsolatedButton />} />
      <IsolatedItem name="Button 018" element={<IsolatedButton />} />
      <IsolatedItem name="Button 019" element={<IsolatedButton />} />
      <IsolatedItem name="Button 020" element={<IsolatedButton />} />
    </ReactIsolator>
  );
}

export default App;
