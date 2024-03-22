import styles from "./Header.module.css";
import { FaBookReader, FaConnectdevelop } from "react-icons/fa";

const Header = () => {


  return (
    <header className={styles.header}>
      <div className={styles.headerItem}>
        <h1 className={styles.heading}><FaBookReader /> PG</h1>
        <div className={styles.headerBtnDiv}>
          
        </div>
      </div>
     
    </header>
  );
};

export default Header;
