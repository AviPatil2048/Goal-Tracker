//BASIC NAVBAR without sign up/sign in functionality meant to serve as a stand in

import Link from "next/link";
import styles from "@/styles/navbar.module.css";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const dashboardLink = "";
  return (
    <header className={styles.header}>
        <span className={styles.brand}>
            {/* The icon redirects to the respective dashboard */}
            <Link
            href={dashboardLink}
            className={`${styles.brand} ${styles.active}`}>
            GoalTracker
            </Link>
        </span>        
      <nav className={styles.nav}>
            <Link href="/" className={styles.navLink}>
                Home
            </Link>        
            <Link href="/about" className={styles.navLink}>
                About
            </Link>          
            <Link href="/SignIn" className={styles.navLink}>
                Sign In
            </Link>
            <Link href="/SignUp" className={styles.navLink}>
                Sign Up
            </Link>
        </nav>
    </header>
  );
}
