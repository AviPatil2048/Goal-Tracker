import styles from "@/styles/global.module.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import landingImg from "@/images/karacis-studio-pquE90oyRjU-unsplash.svg";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const handleJoin = () => {
    router.push("/SignIn");
  };

  return (
    <>
      <div className={styles.fullscreen}>
        <div className={styles.centerAlign}>
          <h1 className={styles.titleText}>dashboard</h1>
        </div>
      </div>
    </>
  );
}
