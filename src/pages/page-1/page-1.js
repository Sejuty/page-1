import React from "react";
import { useState, useEffect } from "react";
import TableRows from "./TableRows";
import "../../index.css";
import Axios from "axios";

const Page1 = () => {
  const [rowsData, setRowsData] = useState([]);
  const [add, setAdd] = useState("");
  const [users, setUsers] = useState([])


  async function getUsers() {
    try {
      const response = await Axios.get(
        "https://reqres.in/api/users?page=1"
      );
      const data = response.data.data
      // setUsers(data)
      // console.log(users)

      setRowsData([...data])
      console.log(rowsData)
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getUsers();
  }, []);

  const addTableRows = (e) => {
    let addRows;
    if (e.key === "Enter") {
      addRows = parseInt(add);

      const newData = [];
      for (let i = 0; i < addRows; i++) {
        newData.push({});
      }
      setRowsData([...rowsData, ...newData]);
      setAdd("");
    }
  };
  const addOneRow = () => {
    const row = {};
    setRowsData([...rowsData, row]);
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
              id
            </th>
            <th scope="col" className="px-6 py-4 text-center">
             Avatar
            </th>
            <th scope="col" className="px-6 py-4 text-center">
              First Name
            </th>
            <th scope="col" className="px-6 py-4 text-center">
              Last Name
            </th>
            <th scope="col" className="px-6 py-4 text-center">
              Email
            </th>
          </tr>
        </thead>
        <tbody>
          {/* {DisplayData} */}
          <TableRows
            rowsData={rowsData}
            deleteTableRows={deleteTableRows}
            add={add}
            users = {users}
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
                      onClick={addTableRows}
                      className="add px-5 text-2xl bg-dark rounded text-normal text-light text-center pb-1"
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
