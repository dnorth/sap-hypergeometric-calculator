import SimpleView from "../components/SimpleView/SimpleView";

import styles from "./index.module.css";

export default function Home() {
  return (
    <div className={styles.appContainer}>
      <h1>SAP Probability Calculator</h1>
      <SimpleView />
    </div>
  );
}
