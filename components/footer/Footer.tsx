"use client";
import Link from "next/link";
import ResponsiveMarginContainer from "../responsiveMarginContainer/ResponsiveMarginContainer";
import FooterList from "./FooterList";
import styles from "./footer.module.css";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const Footer = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  if (pathname?.includes("/login") && !session) return "";

  return (
    <div className={styles.container}>
      <ResponsiveMarginContainer>
        <div className={styles["list-container"]}>
          <FooterList>
            <Link className={styles.link} href="#">
              Link 1
            </Link>
            <Link className={styles.link} href="#">
              Link 2
            </Link>
            <Link className={styles.link} href="#">
              Link 3
            </Link>
            <Link className={styles.link} href="#">
              Link 4
            </Link>
          </FooterList>
          <FooterList>
            <Link className={styles.link} href="#">
              Link 5
            </Link>
            <Link className={styles.link} href="#">
              Link 6
            </Link>
          </FooterList>
          <FooterList>
            <Link className={styles.link} href="#">
              Link 7
            </Link>
          </FooterList>
          <FooterList>
            <Link className={styles.link} href="#">
              Link 8
            </Link>
          </FooterList>
        </div>
      </ResponsiveMarginContainer>
    </div>
  );
};

export default Footer;
