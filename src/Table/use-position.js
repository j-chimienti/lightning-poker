import { useContext, useState, useEffect } from "react";
import { TableContext } from "../Table";

function usePosition(ref, position) {
  const { coordinates } = useContext(TableContext);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [left = 0, top = 0] = coordinates[position] || [];

  useEffect(() => {
    if (ref.current) {
      let { width, height } = ref.current.getBoundingClientRect();
      setWidth(Math.round(width));
      setHeight(Math.round(height));
    }
  }, [ref, width, height]);

  return [top - height / 2, left - width / 2];
}

export default usePosition;
