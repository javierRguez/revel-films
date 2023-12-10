"use client";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Avatar from "@/components/avatar/Avatar";
import styles from "./headerBar.module.css";
import { useState } from "react";
import Button from "../button/Button";

const HeaderBar = () => {
  const [showLogOut, setShowLogOut] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  if (pathname?.includes("/login") && !session) return "";

  return (
    <div className={styles["header-container"]}>
      <div
        onMouseEnter={() => setShowLogOut(true)}
        onMouseLeave={() => setShowLogOut(false)}
        className={styles["avatar-container"]}
      >
        <div className={styles["avatar-wrap"]}>
          <Avatar src="/avatar.png" alt="user avatar" />
        </div>

        {showLogOut && (
          <div className={styles["button-container"]}>
            <Button
              label="Sign out"
              onClick={() => {
                signOut();
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderBar;
