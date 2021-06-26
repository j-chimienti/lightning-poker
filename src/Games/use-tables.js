import firebase from "firebase/app";
import { useCollectionData } from "react-firebase-hooks/firestore";

const useTables = (limit = 20) => {
  const [tables, loading, error] = useCollectionData(
    firebase
      .firestore()
      .collection("tables")
      .where("private", "==", 0)
      .orderBy("fun", "desc")
      .orderBy("bigBlind")
      .limit(limit),
    { idField: "id" }
  );

  return [tables, loading, error];
};

export default useTables;
