import firebase from "firebase/app";
import { useCollectionData } from "react-firebase-hooks/firestore";

export default (limit = 20) => {
  const [tables, loading, error] = useCollectionData(
    firebase
      .firestore()
      .collection("tables")
      .where("private", "==", 0)
      .orderBy("fun")
      .orderBy("bigBlind")
      .limit(limit),
    { idField: "id" }
  );

  return [tables, loading, error];
};
