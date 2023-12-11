"use client";
import { signIn } from "next-auth/react";
import Button from "@/components/button/Button";
import styles from "./login.module.css";
import Input from "@/components/input/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.ok) {
          router.push("/");
        } else {
          console.log("error");
        }
      })
      .catch((err) => {
        console.log("error", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className={styles["form-container"]}>
      <div className={styles["form-content"]}>
        <h1 className={styles.title}>Revel Films</h1>
        <Input
          id="email"
          label="Email"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="password"
          label="Password"
          disabled={isLoading}
          type="password"
          register={register}
          errors={errors}
          required
        />
        <Button
          color="primary"
          label={isLoading ? "Loading..." : "Sign In"}
          onClick={handleSubmit(onSubmit)}
        />
        <p className={styles["register-text"]}>
          Do not have an account?{" "}
          <Link className="underline" href="#">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
