import styles from "./filterButton.module.css";

interface FilterButtonProps {
  isActive: boolean;
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled: boolean;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  isActive,
  label,
  onClick,
  disabled = false,
}) => {
  const buttonClasses = `${styles.button} ${
    isActive ? styles["button--active"] : ""
  }`;
  return (
    <button onClick={onClick} disabled={disabled} className={buttonClasses}>
      {label}
    </button>
  );
};

export default FilterButton;
