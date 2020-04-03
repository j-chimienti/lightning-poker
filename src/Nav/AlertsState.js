import React, { useContext } from "react";
import { AppContext } from "../App";
import { addHandler } from "../App/reducer";
import { PLAY_NOTIFY_SOUND } from "../Games/index";

const TOGGLE_ALERT_STATE = "TOGGLE_ALERT_STATE";

addHandler(PLAY_NOTIFY_SOUND, (action, { alerts }) => {
  if (alerts) {
    const audioElement = document.getElementById("notify");
    audioElement.play();
  }
});

addHandler(TOGGLE_ALERT_STATE, (action, state) => {
  let alerts = !state.alerts;
  return { ...state, alerts };
});

function AlertsState() {
  const {
    state: { alerts },
    dispatch
  } = useContext(AppContext);

  return (
    <div
      className="alerts-state"
      onClick={() => {
        dispatch({
          type: TOGGLE_ALERT_STATE
        });
      }}
    >
      <svg viewBox="0 0 22 22" fill='fill="#FFF"'>
        {alerts ? (
          <path d="M20 17V18H2.00002V17L4.00002 15V9C4.00002 5.9 6.03002 3.17 9.00002 2.29V2C9.00002 1.46957 9.21073 0.960859 9.58581 0.585786C9.96088 0.210714 10.4696 0 11 0C11.5305 0 12.0392 0.210714 12.4142 0.585786C12.7893 0.960859 13 1.46957 13 2V2.29C15.97 3.17 18 5.9 18 9V15L20 17ZM13 19C13 19.5304 12.7893 20.0391 12.4142 20.4142C12.0392 20.7893 11.5305 21 11 21C10.4696 21 9.96088 20.7893 9.58581 20.4142C9.21073 20.0391 9.00002 19.5304 9.00002 19H13ZM18.75 1.19L17.33 2.61C18.1758 3.44542 18.8473 4.44042 19.3056 5.53732C19.764 6.63422 20 7.8112 20 9H22C22 6.07 20.84 3.25 18.75 1.19V1.19ZM1.89962e-05 9H2.00002C2.00002 6.6 2.96002 4.3 4.67002 2.61L3.25002 1.19C2.2179 2.21157 1.39909 3.42807 0.841161 4.76881C0.283234 6.10955 -0.00268464 7.54781 1.89962e-05 9V9Z" />
        ) : (
          <path d="M19.73 21L17 18.27H1.89V17.27L3.89 15.27V9.27C3.89 8.13 4.18 7 4.72 5.99L0 1.27L1.28 0L21 19.73L19.73 21ZM17.89 14.07V9.27C17.89 6.17 15.86 3.44 12.89 2.56V2.27C12.89 1.73957 12.6793 1.23086 12.3042 0.855786C11.9291 0.480714 11.4204 0.27 10.89 0.27C10.3596 0.27 9.85086 0.480714 9.47579 0.855786C9.10071 1.23086 8.89 1.73957 8.89 2.27V2.56C8.28 2.74 7.69 3.01 7.15 3.36L17.89 14.07ZM10.89 21.27C11.4204 21.27 11.9291 21.0593 12.3042 20.6842C12.6793 20.3091 12.89 19.8004 12.89 19.27H8.89C8.89 19.8004 9.10071 20.3091 9.47579 20.6842C9.85086 21.0593 10.3596 21.27 10.89 21.27Z" />
        )}
      </svg>
    </div>
  );
}

export default AlertsState;
