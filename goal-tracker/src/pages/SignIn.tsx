import { useState, FormEvent, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import styles from "@/styles/SignIn.module.css";

export default function SignInPage() {
  const { login, userProfile } = useAuth();
  const router = useRouter();

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [welcome,  setWelcome]  = useState("");
  const [loading,  setLoading]  = useState(false);
  
  /*
  useEffect(() => {
    if (!user) return;
    router.push(user.role === "vendor" ? "/VendorDashboard" : "/HirerDashboard");
  }, [user, router]);
  */

  function validateEmail(value: string): string {
    if (!value.trim()) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      return "Enter a valid email address.";
    return "";
  }

  function validatePassword(value: string): string {
    if (!value) return "Password is required.";
    return "";
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setWelcome("");

    const emailErr = validateEmail(email);
    if (emailErr) { setError(emailErr); return; }

    const pwErr = validatePassword(password);
    if (pwErr) { setError(pwErr); return; }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (!result.success) {
      setError(result.message);
      return;
    }

    setWelcome(result.message);
    setTimeout(() => {
      const stored = localStorage.getItem("currentUser");
      if (stored) {
        const u = JSON.parse(stored);
        router.push(u.role === "vendor" ? "/VendorDashboard" : "/HirerDashboard");
      }
    }, 1000);
  }

  return (
    <div className={styles.page}>
      <div className={styles.cardWrap}>
        <div className={styles.card}>
          <form onSubmit={handleSubmit} noValidate>

            {welcome && (
              <div className={styles.successBanner} role="status">
                {welcome}
              </div>
            )}

            {error && (
              <div className={styles.errorBanner} role="alert">
                {error}
              </div>
            )}

            <div className={styles.fieldGroup}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your Email here"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                className={styles.input}
                autoComplete="email"
                required
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                className={styles.input}
                autoComplete="current-password"
                required
              />
            </div>

            <div className={styles.btnWrap}>
              <button
                type="submit"
                className={styles.btn}
                disabled={loading}
              >
                {loading ? "Signing in…" : "Sign In"}
              </button>
            </div>

            <p className={styles.footerText}>
              Don&apos;t have an account?{" "}
              <Link href="/SignUp" className={styles.link}>Sign Up</Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}
