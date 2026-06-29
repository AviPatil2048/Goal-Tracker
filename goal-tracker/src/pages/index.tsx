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
        <Navbar/>        
        <h1 className={`justify-center flex ${styles.titleText}`}>achieve your goals together</h1>
        <div className={styles.row}>
          <img src={landingImg.src}
          className={styles.imageHero}>
          </img>
          <div>
            <h1 className={`justify-center flex ${styles.subheading}`}>
              what are we?
            </h1>
            <p>goaltracker (working title) is centered towards motivating in groups in order to achieve a common goal.
              for example saving for a joint trip, or betting on whoever gets their license first! 
              maybe the top contributor gets a special prize or bragging points, but let this process be fun and collaborative!
            </p>
            <div className="justify-center flex">
              <button type="button" onClick={handleJoin}
              
              className={styles.btn}>
                join now
              </button>              
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
