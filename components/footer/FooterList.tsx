import styles from "./footer.module.css";

interface FooterListProps {
  children: React.ReactNode;
}

const FooterList: React.FC<FooterListProps> = ({ children }) => {
  return <div className={styles["list-content"]}>{children}</div>;
};

export default FooterList;
