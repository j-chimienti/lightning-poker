import firebase from "firebase/app";

function dispatchf(args) {
  return firebase.firestore().collection("actions").add(args);
}

export { dispatchf };

const Dispatch = async (args = {}) =>
  window
    .fetch(`${process.env.REACT_APP_FUNCTIONS_URL}/action`, {
      method: "POST",
      body: JSON.stringify(args),
      headers: { "Content-Type": "application/json" },
    })
    .then((raw) => raw.json());

export default Dispatch;
