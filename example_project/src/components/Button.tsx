import styles from "src/styles/button.module.css";

function Button() {
  return (
    <button
      type="button"
      className={styles["button"]}
      onClick={() => console.log("Button clicked!")}
    >
      <h4 className="secondary-p">I am a Button!</h4>
    </button>
  );
}

export default Button;
