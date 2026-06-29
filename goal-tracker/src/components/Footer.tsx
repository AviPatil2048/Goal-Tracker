import Link from "next/link";
import styles from "@/styles/footer.module.css";

export default function Footer() {
  return (
      <footer className={styles.footer}>
        <span>© 2026 GoalTracker · Melbourne, VIC</span>
        <div>
          <Link href="/" className={styles.footerLink}>
            About
          </Link>
          <Link href="/" className={styles.footerLink}>
            Contact
          </Link>
          <Link href="/" className={styles.footerLink}>
            Privacy
          </Link>
        </div>
      </footer>
  );
}
