import firebase from "firebase/app";
import { useDocumentData } from "react-firebase-hooks/firestore";

export default tableId => {
  // value is a DocumentSnapshot
  const [table = {}, loading, error] = useDocumentData(
    tableId &&
      firebase
        .firestore()
        .collection("tables")
        .doc(tableId)
  );
  console.log(table);
  if (error) {
    console.log(error);
  }
  return [table, loading, error];
};
