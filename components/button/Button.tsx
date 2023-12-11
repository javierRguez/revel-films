"use client";
import styles from "./button.module.css";

interface ButtonProps {
  label: string;
  color: "primary" | "secondary";
  disabled?: boolean;
  isActive?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  disabled = false,
  isActive,
  color,
  onClick,
}) => {
  const classes = [styles.button];

  classes.push(styles[`button--${color}`]);

  isActive ? classes.push(styles["button--active"]) : "";

  const buttonClasses = classes.join(" ");

  return (
    <button onClick={onClick} disabled={disabled} className={buttonClasses}>
      {label}
    </button>
  );
};

export default Button;
