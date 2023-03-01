import React, { useState, useEffect } from "react";
import { MdContentCopy } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiAddToQueue } from "react-icons/bi";
import Copied from "./copyToClipboard";
import { forwardRef, useRef, useImperativeHandle } from "react";
import Axios from "axios";

const TableRows = forwardRef(
  ({ rowsData, slice, deleteTableRows, setRowsData, checkedAll }, ref) => {
    const [isCopied, setIsCopied] = useState(false);
    const [singleCheck, setSingleCheck] = useState();

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

    let checked = [...Array(rowsData.length + 1)].map(() => {
      return { isChecked: false };
    });

    // =====================CHECKBOX=============================

    useImperativeHandle(ref, () => ({
      selectAll() {
        for (let i = 0; i < checked.length; i++) {
          if (!checkedAll) {
            checked[i].isChecked = true;
          } else if (checkedAll) {
            checked[i].isChecked = false;
          }
        }
        console.log("inside", checked);
      },
    }));

    console.log("outside", checked);

    const toggleCheck = (e, id) => {
      console.log(id);
      checked[id].isChecked = e.target.checked;
    };

    //===================CHECKBOX=======================================

    return slice.map(({ id, avatar, first_name, last_name, email }, index) => {
      return (
        <tr key={id} className="border-grey border">
          <td className="px-4 py-4">
            <input
              type="checkbox"
              className="accent-dark w-4 h-4 cursor-pointer border-dark rounded-none"
              onChange={(e) => toggleCheck(e, id)}
              value={checked[index]}
            />
          </td>
          <td className="px-6 py-4 text-center">
            <div>{id}</div>
          </td>
          <td className="px-6 py-4 flex items-center justify-center rounded">
            <img src={avatar} alt="Profile" />
          </td>
          <td className="px-0 py-4">
            <div className=" flex items-center justify-center flex-row space-x-4 cursor-pointer">
              <div>
                <input
                  name="first_name"
                  type="text"
                  value={first_name}
                  placeholder="first_name"
                  onChange={(e) => handleChange(e, id)}
                  className="text-center bg-white border-light w-full"
                />
              </div>
            </div>
          </td>
          <td>
            <div className=" flex items-center justify-center flex-row space-x-4 cursor-pointer">
              <div>
                <input
                  name="last_name"
                  type="text"
                  value={last_name}
                  placeholder="last_name"
                  onChange={(e) => handleChange(e, id)}
                  className="text-center bg-white border-light w-full"
                />
              </div>
            </div>
          </td>
          <td className="px-6 py-4 flex items-center justify-center flex-row space-x-4 cursor-pointer">
            <input
              name="email"
              type="text"
              value={email}
              placeholder="email"
              onChange={(e) => handleChange(e, id)}
              className="text-center focus:border-light"
            />

            <MdContentCopy
              onClick={() => {
                navigator.clipboard.writeText(email);
                setIsCopied(true);
                setTimeout(() => {
                  setIsCopied(false);
                }, 1000);
              }}
              className="w-fit"
            ></MdContentCopy>
            {isCopied && <Copied />}
          </td>
          <td className="px-6 py-4">
            <div className=" flex items-center justify-center cursor-pointer">
              <BiAddToQueue
                onClick={() => createUser(id, first_name, last_name, email)}
                className="text-green mr-2"
              ></BiAddToQueue>
              <RiDeleteBinLine
                onClick={() => deleteTableRows(index)}
                className="text-red"
              ></RiDeleteBinLine>
            </div>
          </td>
          <td></td>
        </tr>
      );
    });
  }
);

export default TableRows;
