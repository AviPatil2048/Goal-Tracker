//FILLER PAGE

import styles from "@/styles/global.module.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <>
      <div className={styles.fullscreen}>
        <Navbar/>        
        <h1 className={`pl-5 ${styles.subheading}`}>Contributors</h1>
        <p className={styles.bullet}>
            Bhargavi Patil                  
        </p>
        <p className={styles.bullet}>
            Shravani Bhosale         
        </p>     
        <p className={styles.bullet}>
            Annabell Jong        
        </p>       
        <p className={styles.bullet}>
            Ananaya Venkatesh Babu
        </p>        
        <p className={styles.bullet}>
            Hannah Pham
        </p>                       
      </div>
      <Footer/>
    </>
  );
}
