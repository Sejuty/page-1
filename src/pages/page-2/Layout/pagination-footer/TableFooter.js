import React, { useEffect } from "react";

import styles from "./TableFooter.module.css";

const TableFooter = ({ range, setPage, page, slice }) => {

  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);



  return (
    <div className="bg-white w-full font-medium text-left text-base text-white flex items-center justify-center px-0 py-0">
      {range.map((el, index) => (
        <button
          key={index}
          className={`${styles.button} ${
            page === el ? styles.activeButton : styles.inactiveButton
          }`}
          onClick={() => setPage(el)}
        >
          {el}
        </button>
      ))}
    </div>
  );
};

export default TableFooter;