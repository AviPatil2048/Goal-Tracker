//FILLER PAGE

import styles from "@/styles/global.module.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <>
      <div className={styles.fullscreen}>
        <Navbar/>          
      </div>
    <Footer/>                                              
    </>
  );
}
