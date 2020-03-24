import React, { useContext } from "react";
import dispatch from "../dispatch";
import { TableContext } from "./index";

function LeaveTable({ position }) {
  const {
    me: { id: playerId },
    tableId
  } = useContext(TableContext);
  // const [disabled, setDisabled] = useState(false);

  return (
    <div
      className="leave-table"
      onClick={async () => {
        try {
          // setDisabled(true);
          await dispatch(
            {
              tableId,
              playerId
            },
            "leave"
          );
        } catch (e) {
          console.log(e);
        }
      }}
    >
      <svg className="leave-table-icon" viewBox="0 0 18 18" fill="none">
        <path
          d="M16 0H2C0.89 0 0 0.89 0 2V6H2V2H16V16H2V12H0V16C0 16.5304 0.210714
        17.0391 0.585786 17.4142C0.960859 17.7893 1.46957 18 2 18H16C16.5304
        18 17.0391 17.7893 17.4142 17.4142C17.7893 17.0391 18 16.5304
        18 16V2C18 1.46957 17.7893 0.960859 17.4142 0.585786C17.0391 0.210714
        16.5304 0 16 0ZM7.08 12.58L8.5 14L13.5 9L8.5 4L7.08 5.41L9.67 8H0V10H9.67L7.08 12.58Z"
        />
      </svg>
    </div>
  );
}

export default LeaveTable;
