import styles from "./ButtonsContainer.module.css";

const ButtonsContainer = ({ onButtonClick }) => {
  const buttons = [
    { label: "C", type: "clear" },
    { label: "(", type: "operator" },
    { label: ")", type: "operator" },
    { label: "^", type: "operator" },

    { label: "sin(", type: "function" },
    { label: "cos(", type: "function" },
    { label: "tan(", type: "function" },
    { label: "log(", type: "function" },

    { label: "sqrt(", type: "function" },
    { label: "7" },
    { label: "8" },
    { label: "9" },

    { label: "/", type: "operator" },
    { label: "4" },
    { label: "5" },
    { label: "6" },

    { label: "*", type: "operator" },
    { label: "1" },
    { label: "2" },
    { label: "3" },

    { label: "-", type: "operator" },
    { label: "0" },
    { label: "." },

    { label: "=", type: "equal" },
    { label: "+", type: "operator" },
  ];

  return (
    <div className={styles.buttonsContainer}>
      {buttons.map((btn, index) => (
        <button
          key={index}
          className={`${styles.button} 
            ${btn.type === "operator" ? styles.operator : ""}
            ${btn.type === "equal" ? styles.equal : ""}
            ${btn.type === "clear" ? styles.clear : ""}
            ${btn.type === "function" ? styles.function : ""}
          `}
          onClick={() => onButtonClick(btn.label)}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
};

export default ButtonsContainer;