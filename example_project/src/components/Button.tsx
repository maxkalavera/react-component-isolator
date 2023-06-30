
function Button({label=''}) {
  return (
    <button
      type="button"
      onClick={() => console.log("Button clicked!")}
    >
      <p>{label}</p>
    </button>
  );
}

export function IsolatedButton() {
  return <Button label='I am a Button!' />
}

export default Button;
