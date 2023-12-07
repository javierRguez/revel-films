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
  return (
    <button onClick={onClick} disabled={disabled} className={styles.button}>
      {label}
    </button>
  );
};

export default FilterButton;
