import { useState, FormEvent, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "@/styles/SignUp.module.css";
import { useAuth } from "@/context/AuthContext";

// New password requirements
const STRONG_PW = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/;

export default function SignUpPage() {
  const { registerUser, user } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  function clearErr(field: string) {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  function validate(): boolean {
    const next: Record<string, string> = {};

    if (!name.trim()) next.name = "Name is required.";

    if (!email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Enter a valid email address.";

    if (!password) next.password = "Password is required.";
    else if (!STRONG_PW.test(password))
      next.password =
        "Password must be at least 6 characters and include uppercase, lowercase, and a special character (!@#$%^&*).";

    if (!confirmPassword)
      next.confirmPassword = "Please confirm your password.";
    else if (password !== confirmPassword)
      next.confirmPassword = "Passwords do not match.";

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    /*
    const result = await signUp(email, password, name, username);
    setLoading(false);

    if (!result.success) {
      setErrors({ email: result.message });
      return;
    }
    */
    router.push("/SignIn");
  }

  return (
    <div className={styles.page}>
      <div className={styles.cardWrap}>
        <div className={styles.card}>
          <form onSubmit={handleSubmit} noValidate>
            <div className={styles.fieldGroup}>
              <label htmlFor="name" className={styles.label}>
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  clearErr("name");
                }}
                className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
                autoComplete="name"
              />
              {errors.name && <p className={styles.fieldErr}>{errors.name}</p>}
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your Email here"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearErr("email");
                }}
                className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                autoComplete="email"
              />
              {errors.email && (
                <p className={styles.fieldErr}>{errors.email}</p>
              )}
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="username" className={styles.label}>
                Username
              </label>
              <input
                id="username"
                type="username"
                placeholder="Enter your Username here"
                value={username}
                /*Should be more checks to see if user name is available*/
                onChange={(e) => {
                  setUsername(e.target.value);
                  clearErr("username");
                }}
                className={`${styles.input} ${errors.username ? styles.inputError : ""}`}
                autoComplete="username"
              />
              {errors.username && (
                <p className={styles.fieldErr}>{errors.username}</p>
              )}
            </div>            

            <div className={styles.fieldGroup}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Min 6 chars, uppercase, lowercase, symbol"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearErr("password");
                }}
                className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
                autoComplete="new-password"
              />
              {errors.password && (
                <p className={styles.fieldErr}>{errors.password}</p>
              )}
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Enter your Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  clearErr("confirmPassword");
                }}
                className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ""}`}
                autoComplete="new-password"
              />
              {errors.confirmPassword && (
                <p className={styles.fieldErr}>{errors.confirmPassword}</p>
              )}
            </div>

            <div className={styles.btnWrap}>
              <button
                type="submit"
                className={`${styles.btn} ${loading ? styles.btnDisabled : ""}`}
                disabled={loading}
              >
                {loading ? "Creating account…" : "Sign Up"}
              </button>
            </div>

            <p className={styles.footerText}>
              Already have an account?{" "}
              <Link href="/SignIn" className={styles.link}>
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
