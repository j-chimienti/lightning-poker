import { useEffect, useState } from "react";
import parser from "ua-parser-js";
import { addHandler } from "./reducer";


export const PROFILE_CREATED = "PROFILE_CREATED";
export const PROFILE_LOADED = "PROFILE_LOADED";
export const CREATE_PROFILE_ERROR = "CREATE_PROFILE_ERROR";

export const AUTH_WITH_TWITTER = "AUTH_WITH_TWITTER";

function useProfile(dispatch) {
  const [user, loading, error] = useState(null) //useAuthState(firebase.auth());
  const [profile] =  useState(null)

  //     useDocumentData(
  //   user &&
  //     user.uid &&
  //     firebase.firestore().collection("profiles").doc(user.uid),
  //   { idField: "id" }
  // );

  const [creating, setCreating] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (error) {
      dispatch({
        type: CREATE_PROFILE_ERROR,
        error: error.message,
      });
      return;
    }
    if (user) {
      if (!ready) {
        if (creating) {
          const browser = parser(navigator.userAgent);
          delete browser.ua;

          dispatch({
            type: PROFILE_CREATED,
            referrer: document.referrer,
            profile: user.uid,
            ref: window.location.pathname.replace("/", ""),
            search: window.location.search,
            ...browser,
          });
        } else {
          // addHandler(AUTH_WITH_TWITTER, () => {
          //   const twitterProvider = new firebase.auth.TwitterAuthProvider();
          //
          //   firebase
          //     .auth()
          //     .signInWithRedirect(twitterProvider)
          //     .then(function (result) {
          //       console.log("1", result);
          //     })
          //     .catch(function (error) {
          //       console.log(error);
          //     });
          // });
          dispatch({
            type: PROFILE_LOADED,
            referrer: document.referrer,
            profile: user.uid,
            ref: window.location.pathname.replace("/", ""),
            search: window.location.search,
          });
        }

        setReady(true);
      }
    } else {
      if (!creating) {
        // todo: signin
        // firebase.auth().signInAnonymously();
        setCreating(true);
      }
    }
  }, [dispatch, ready, creating, user, loading, error]);

  if (profile && user) {
    return {
      profileId: profile.id,
      profileHash: profile.hash,
      balance: profile.balance,
      userInfo: user.providerData[0] || {},
    };
  }
}

export default useProfile;
