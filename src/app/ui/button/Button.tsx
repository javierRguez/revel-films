"use client";
import styles from "./button.module.css";

interface ButtonProps {
  label: string;
  disabled?: boolean;

  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  disabled = false,

  onClick,
}) => {
  return (
    <button onClick={onClick} disabled={disabled} className={styles.button}>
      {label}
    </button>
  );
};

export default Button;
