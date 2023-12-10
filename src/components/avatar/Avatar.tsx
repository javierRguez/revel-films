import Image from "next/image";
import styles from "./avatar.module.css";

interface AvatarProps {
  src: string;
  alt: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt }) => {
  return (
    <div className={styles.avatar}>
      <Image
        className={styles["avatar-image"]}
        src={src}
        alt={alt}
        fill
        sizes="(max-width:100%)"
      />
    </div>
  );
};

export default Avatar;
