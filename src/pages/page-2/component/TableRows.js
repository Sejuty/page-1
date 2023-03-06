import React from "react";
import { BiAddToQueue } from "react-icons/bi";
import { MdContentCopy } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import Copied from "../Utils/CopyToClipboard";

const TableRows = ({
  slice,
  deleteTableRows,
  isCopied,
  setIsCopied,
  singleCheck,
  toggleCheck,
  handleChange,
  createUser,
}) => {
  return slice.map(({ id, avatar, first_name, last_name, email }, index) => {
    return (
      <tr key={id} className="border-grey border">
        <td className="px-4 py-4">
          <input
            type="checkbox"
            className="accent-dark w-4 h-4 cursor-pointer border-dark rounded-none"
            onChange={(e) => toggleCheck(index)}
            checked={singleCheck[index]}
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
};

export default TableRows;
