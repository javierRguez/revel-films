import styles from "./responsiveMarginContainer.module.css";

interface ResponsiveMarginContainerProps {
  children: React.ReactNode;
}

const ResponsiveMarginContainer: React.FC<ResponsiveMarginContainerProps> = ({
  children,
}) => {
  return <div className={styles.container}>{children}</div>;
};

export default ResponsiveMarginContainer;
