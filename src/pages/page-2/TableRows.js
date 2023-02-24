import React, { useState } from "react";
import { BsDownload } from "react-icons/bs";
import { MdContentCopy } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import Copied from "./copyToClipboard";

const TableRows = ({ slice, deleteTableRows}) => {
  const [isCopied, setIsCopied] = useState(false);
  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };
  return slice.map((data, index) => {
    const { id, username, email, website } = data;
    return (
      <tr key={index} className="border-grey border">
        <td className="px-4 py-4">
          <input
            type="checkbox"
            className=" accent-dark w-4 h-4 cursor-pointer border-dark rounded-none"
          />
        </td>
        <td className="px-6 py-4 text-center">
          <div>{id}</div>
        </td>
        <td className="px-6 py-4 flex items-center justify-center ">
          {/* <input
            type="text"
            placeholder="optional"
            className=" border border-grey px-4 py-2 rounded"
          /> */}
          <div>{username}</div>
        </td>
        <td className="px-6 py-4 text-dark ">
          <div className=" flex items-center justify-center flex-row space-x-4 cursor-pointer">
            <div>{email}</div>
            {/* <div>
              <BsDownload></BsDownload>
            </div> */}
          </div>
        </td>
        <td className="px-6 py-4 flex items-center justify-center flex-row space-x-4 cursor-pointer">
          <div>{website}</div>
          <MdContentCopy
            onClick={() => {
              navigator.clipboard.writeText(website);
              setIsCopied(true);
              setTimeout(() => {
                setIsCopied(false);
              },1000);
            }}
            className="hover:text-dark hover:scale-110"
          >
          </MdContentCopy>
          {isCopied && <Copied/>}
        </td>
        <td onClick={() => deleteTableRows(index)} className="px-6 py-4">
          <div className=" flex items-center justify-center cursor-pointer">
            <RiDeleteBinLine className="text-red"></RiDeleteBinLine>
          </div>
        </td>
      </tr>
    );
  });
};

export default TableRows;
