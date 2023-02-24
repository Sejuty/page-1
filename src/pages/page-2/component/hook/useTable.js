import { useEffect, useState } from "react";
import calculateRange from "../function/calculateRange";
import sliceData from "../function/sliceData";

const useTable = (data, page, rowsPerPage) => {
  const [tableRange, setTableRange] = useState([]);
  const [slice, setSlice] = useState([]);

  useEffect(() => {
    const range = calculateRange(data, rowsPerPage);
    setTableRange([...range]);
    console.log(range)
    const slice = sliceData(data, page, rowsPerPage);
    setSlice([...slice]);
    console.log(slice)
  }, [data, setTableRange, page, setSlice, rowsPerPage]);

  return { slice, range: tableRange };
};

export default useTable;
