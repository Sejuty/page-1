import React, { useEffect, useState } from "react";
import "../../index.css";
import TableFooter from "./component/pagination-footer/TableFooter";
import useTable from "./component/hook/useTable";
import TableRows from "./TableRows";

const Page2 = () => {
  const [rowsData, setRowsData] = useState([]);
  const [add, setAdd] = useState("");
  const [page, setPage] = useState(1);
  const [noOfRows, setNoOfrows] = useState(5);
  const { slice, range } = useTable(rowsData, page, noOfRows);

  const users = async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    ).then((response) => response.json());

    setRowsData([...response]);
  };

  useEffect(() => {
    users();
  }, []);


  const deleteTableRows = (index) => {
    console.log(index)
    const rows = [...slice];
    rows.splice(index, 1);
    setRowsData(rows);
  };
  // const changePage = (e) => {
  //   if (e.key === "Enter") {
  //     console.log("Yes");
  //   }
  // };
  const _handleKeyDown = (e) => {
    setNoOfrows(e.target.value);
  };
  

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-4">
      <table className="w-full text-lg text-left dark:text-black">
        <thead className="text-lg text-black uppercase">
          <tr>
            <th
              colSpan="6"
              className="bg-light text-dark px-6 py-4 font-normal"
            >
              Personnel Information
            </th>
          </tr>
          <tr>
            <th scope="col" className="px-4 py-4">
              <input
                type="checkbox"
                className="w-4 h-4 cursor-pointer outline-dark outline-1 outline outline-offset-0 rounded-none accent-dark"
              ></input>
            </th>
            <th scope="col" className="px-6 py-4 text-center">
              id
            </th>
            <th scope="col" className="px-6 py-4 text-center">
              username
            </th>
            <th scope="col" className="px-6 py-4 text-center">
              email
            </th>
            <th scope="col" className="px-6 py-4 text-center">
              website
            </th>
            <th scope="col" className="px-6 py-4 text-center">
              Option
            </th>
          </tr>
        </thead>
        <tbody>
          {/* {DisplayData} */}
          <TableRows slice={slice} deleteTableRows={deleteTableRows} noOfRows={noOfRows}/>
          <tr>
            <td colSpan="6">
              <div className="float-root">
                <div className="float-left space-x-4 py-3 px-4">
                  <button className="px-4 py-2 bg-dark rounded text-light text-center">
                    Download Selected
                  </button>
                  <button className="px-4 py-2 border rounded text-dark text-center">
                    Download All
                  </button>
                </div>
                <div className="float-right">
                  <div className="flex flex-row py-3 px-3 space-x-3">
                    {/* <input
                      type="number"
                      min="1"
                      onChange={_handleKeyDown}
                      onKeyDown={changePage}
                      placeholder="N"
                      className="w-12 h-9 bg-light text-center rounded"
                    ></input> */}

                    <TableFooter
                      range={range}
                      slice={slice}
                      setPage={setPage}
                      page={page}
                    />
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Page2;
