import Image from "next/image";
import styles from "./login.module.css";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div className={styles.container}>
      <Image
        className={styles["bg-image"]}
        src="/login-background.jpg"
        alt="login background"
        fill
        quality={100}
      />
      <div className={styles["form-wrap"]}>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
