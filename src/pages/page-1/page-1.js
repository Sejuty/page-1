import React from "react";
import { useState } from "react";
import TableRows from "./TableRows";
import "../../index.css";

const Page1 = () => {
  const [rowsData, setRowsData] = useState([]);
  const [add, setAdd] = useState("");

  const addTableRows = () => {
    const addRows = parseInt(add);
    const newData = [];
    for (let i = 0; i < addRows; i++) {
      newData.push({});
    }
    setRowsData([...rowsData, ...newData]);
    setAdd("");
  };
  const addOneRow = () => {
    const row = {};
    setRowsData([...rowsData,row])
  };
  const _handleKeyDown = (e) => {
    setAdd(e.target.value);
  };

  const deleteTableRows = (index) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
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
              Table QR Management
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
              S/N
            </th>
            <th scope="col" className="px-6 py-4 text-center">
              Table Name
            </th>
            <th scope="col" className="px-6 py-4 text-center">
              QR Code
            </th>
            <th scope="col" className="px-6 py-4 text-center">
              URL
            </th>
            <th scope="col" className="px-6 py-4 text-center">
              Option
            </th>
          </tr>
        </thead>
        <tbody>
          {/* {DisplayData} */}
          <TableRows
            rowsData={rowsData}
            deleteTableRows={deleteTableRows}
            add={add}
          />
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
                    <div>Add</div>
                    <input
                      type="number"
                      min="1"
                      onChange={_handleKeyDown}
                      onKeyDown={addTableRows}
                      value={add}
                      placeholder="N"
                      className="w-12 h-9 bg-light text-center rounded"
                    ></input>
                    <div>tables</div>
                    <button
                      onClick={addOneRow}
                      className="px-5 text-2xl bg-dark rounded text-normal text-light text-center pb-1"
                    >
                      +
                    </button>
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

export default Page1;
