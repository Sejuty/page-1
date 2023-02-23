import React from "react";
import { BsDownload } from "react-icons/bs";
import { MdContentCopy } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";

const TableRows = ({ rowsData, deleteTableRows }) => {
  return rowsData.map((data, index) => {
    return (
      <tr key={index} className="border-grey border">
        <td className="px-4 py-4">
          <input type="checkbox" className=" accent-dark w-4 h-4 cursor-pointer border-dark rounded-none"/>
        </td>
        <td className="px-6 py-4 text-center">
          <div>01</div>
        </td>
        <td className="px-6 py-4 flex items-center justify-center ">
          <input type="text" placeholder="optional" className=" border border-grey px-4 py-2 rounded" />
        </td>
        <td className="px-6 py-4 text-dark ">
          <div className=" flex items-center justify-center flex-row space-x-4 cursor-pointer">
            <div>Preview</div>
            <div>
              <BsDownload></BsDownload>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 flex items-center justify-center flex-row space-x-4 cursor-pointer">
          <div>www.kilkit.io/visual-menu/whatever</div>
          <MdContentCopy></MdContentCopy>
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
