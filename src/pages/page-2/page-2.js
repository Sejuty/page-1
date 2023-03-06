import Axios from "axios";
import React, { useEffect, useState } from "react";
import "../../index.css";
import Checkbox from "./component/Checkbox";
import TableRows from "./component/TableRows";
import TableFooter from "./Layout/pagination-footer/TableFooter";
import useTable from "./Utils/UseTable";

const Page2 = () => {
  const CHECKBOX_STATES = {
    Checked: true,
    Indeterminate: "Indeterminate",
    Empty: false,
  };
  const [rowsData, setRowsData] = useState([]);
  const [page, setPage] = useState(1);
  const [noOfRows, setNoOfrows] = useState(5);
  const { slice, range } = useTable(rowsData, page, noOfRows);
  const [add, setAdd] = useState("");
  const [checkedAll, setCheckedAll] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const checkArrayLength = slice.length;
  const checked = [...new Array(checkArrayLength)].map(
    (_, idx) => idx === false
  );
  const [singleCheck, setSingleCheck] = useState(checked);

  useEffect(() => {
    setSingleCheck([...checked]);
  }, [checkArrayLength, page]);

  let last = 1;

  async function getUsers() {
    try {
      const response = await Axios.get("https://reqres.in/api/users");
      const data = response.data.data;
      setRowsData([...data]);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getUsers();
  }, []);

  const getLastId = () => {
    last = rowsData.length;
  };

  const addTableRows = (e) => {
    let addRows;
    getLastId();

    if (e.key === "Enter") {
      addRows = parseInt(add);
      const newData = [];
      for (let i = 0; i < addRows; i++) {
        newData.push({ id: ++last });
      }
      setRowsData([...rowsData, ...newData]);
      setAdd("");
    }
  };
  const _handleKeyDown = (e) => {
    setAdd(e.target.value);
  };
  const addOneRow = () => {
    getLastId();
    const row = { id: ++last };
    setRowsData([...rowsData, row]);
  };

  // ==============================Create User===================

  const createUser = async (id, first_name, last_name, email) => {
    try {
      const response = await Axios.post("https://reqres.in/api/users", {
        id,
        first_name,
        last_name,
        email,
      });
      const status = response.status;

      switch (status) {
        case 201:
          alert("User created");
          break;
        default:
          alert("Something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
  };
  // ============================================================

  //============================ DELETE FROM DB =====================
  const deleteTableRows = (index) => {
    // try {
    index = index + (page - 1) * noOfRows;
    //   const response = Axios.delete(
    //     "https://reqres.in/api/users/1"
    //   );
    //   const status = await response;
    //   console.log(status)
    //   console.log(rowsData)
    // } catch (err) {
    //   console.log(err);
    // }

    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
  };

  const handleChange = (event, id) => {
    const newData = rowsData.map((item) => {
      if (id === null) {
        return { [event.target.name]: "" };
      } else if (item.id === id) {
        return { ...item, [event.target.name]: event.target.value };
      }
      return item;
    });
    setRowsData(newData);
  };

  // ==================CheckBox================================
  const selectAll = (value) => {
    setCheckedAll(value);
    setSingleCheck(() => {
      const newState = { ...singleCheck };
      for (let i = 0; i < checkArrayLength; i++) {
        newState[i] = value;
      }
      return newState;
    });
  };

  const toggleCheck = (id) => {
    setSingleCheck(() => {
      const newState = { ...singleCheck };
      newState[id] = !singleCheck[id];
      return newState;
    });
  };

  useEffect(() => {
    const filteredSingleCheck = Object.values(singleCheck);
    console.log(filteredSingleCheck);

    const isAllChecked = filteredSingleCheck.every((val) => val === true);

    const isAllUnchecked = filteredSingleCheck.every((val) => val === false);

    let updatedChecked;

    if (!isAllChecked && !isAllUnchecked) {
      updatedChecked = CHECKBOX_STATES.Indeterminate;
    } else if (!isAllChecked && isAllUnchecked) {
      updatedChecked = CHECKBOX_STATES.Empty;
    } else if (isAllChecked && !isAllUnchecked) {
      updatedChecked = CHECKBOX_STATES.Checked;
    }

    setCheckedAll(updatedChecked);
  }, [singleCheck]);

  //===============================================================================

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-4">
      <table className="w-full text-lg text-left dark:text-black">
        <thead className="text-lg text-black uppercase">
          <tr>
            <th
              colSpan="7"
              className="bg-light text-dark px-6 py-4 font-normal"
            >
              Personnel Information
            </th>
          </tr>
          <tr>
            <th scope="col" className="px-4 py-4">
              <Checkbox
                label="Value"
                value={checkedAll}
                onChange={(event) => selectAll(event.target.checked)}
                CHECKBOX_STATES={CHECKBOX_STATES}
              />
            </th>
            <th scope="col" className="px-6 py-4 text-center">
              id
            </th>
            <th scope="col" className="px-6 py-4 text-center">
              avatar
            </th>
            <th scope="col" className="px-6 py-4 text-center">
              first_name
            </th>
            <th scope="col" className="px-6 py-4 text-center">
              last_name
            </th>
            <th scope="col" className="px-6 py-4 text-center">
              email
            </th>
            <th scope="col" className="px-6 py-4 text-center">
              option
            </th>
          </tr>
        </thead>
        <tbody>
          {/* {DisplayData} */}
          <TableRows
            //lifting state up
            rowsData={rowsData}
            slice={slice}
            deleteTableRows={deleteTableRows}
            noOfRows={noOfRows}
            lastId={last}
            setRowsData={setRowsData}
            checkedAll={checkedAll}
            setCheckedAll={setCheckedAll}
            isCopied={isCopied}
            setIsCopied={setIsCopied}
            singleCheck={singleCheck}
            setSingleCheck={setSingleCheck}
            toggleCheck={toggleCheck}
            handleChange={handleChange}
            createUser={createUser}
          />
          <tr>
            <td colSpan="7">
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
                      className="add px-5 text-2xl bg-dark rounded text-normal text-light text-center pb-1"
                    >
                      +
                    </button>
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
