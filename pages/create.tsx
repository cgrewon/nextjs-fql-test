import type { NextPage } from "next";
import AddEventForm from "../components/AddEventForm";
import TabSection from "../components/TabSection";
import styles from  "../styles/Home.module.scss";

const Create: NextPage = () => {
  return <div className={styles.rootContainer}>
    <h1 className={styles.title}>Create Event</h1>
    <AddEventForm/>    
  </div>;
};

export default Create;
