
import type { NextPage } from "next";
import AddEventForm from "../components/AddEventForm";
import TabSection from "../components/TabSection";
import styles from  "../styles/Home.module.scss";

const Home: NextPage = () => {
  return <div className={styles.rootContainer}>
    <h1 className={styles.title} >Event Manager</h1>    
    <TabSection/>
  </div>;
};

export default Home;
