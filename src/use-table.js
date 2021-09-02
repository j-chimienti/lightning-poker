import firebase from "firebase/compat/app";
import { useDocumentData } from "react-firebase-hooks/firestore";

const useTable = (tableId) => {
  // value is a DocumentSnapshot
  const [table, loading, error] = useDocumentData(
    tableId && firebase.firestore().collection("tables").doc(tableId)
  );
  if (error) {
    console.log(error);
  }
  return [table, loading, error];
};

export default useTable;
