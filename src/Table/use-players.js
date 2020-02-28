import firebase from "firebase/app";
import { useCollection } from "react-firebase-hooks/firestore";

// TODO: change database rules, add only if tableId provided, do not allow dump all players
export default tableId => {
  const [value, loading, error] = useCollection(
    tableId &&
      firebase
        .firestore()
        .collection("players")
        .where("tableId", "==", tableId)
  );

  let players = {};
  if (value) {
    value.docs.forEach(doc => {
      players[doc.get("position") || 0] = Object.assign({}, doc.data(), {
        id: doc.ref.id
      });
    });
  }

  // TODO: use playes only to get add/remove player updates,
  // let Player component sibscribe to player document
  console.log(players);

  return [players, loading, error];
};
