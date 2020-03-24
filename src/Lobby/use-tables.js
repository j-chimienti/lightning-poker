import firebase from "firebase/app";
import { useCollection } from "react-firebase-hooks/firestore";

export default () => {
  const [value, loading, error] = useCollection(
    firebase
      .firestore()
      .collection("tables")
      .limit(20)
  );

  let tables = [];

  if (!loading) {
    if (value) {
      // sort bey fun and bigBlind
      tables = [...value.docs];
    }
  }

  return [tables, loading, error];
};
