import { Outlet } from "react-router-dom";
import styles from "./MainLayout.module.scss";
import Header from "@/components/Header/Header";

const MainLayout = () => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>© 2025 Movies App</footer>
    </div>
  );
};

export default MainLayout;