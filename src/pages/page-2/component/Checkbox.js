import React, { useRef, useEffect } from "react";

const Checkbox = ({ value, onChange, CHECKBOX_STATES}) => {
  const checkboxRef = useRef();

  React.useEffect(() => {
    if (value === CHECKBOX_STATES.Checked) {
      checkboxRef.current.checked = true;
      checkboxRef.current.indeterminate = false;
    } else if (value === CHECKBOX_STATES.Empty) {
      checkboxRef.current.checked = false;
      checkboxRef.current.indeterminate = false;
    } else if (value === CHECKBOX_STATES.Indeterminate) {
      checkboxRef.current.checked = false;
      checkboxRef.current.indeterminate = true;
    }
  }, [value]);

  return (
    <label>
      <input
        ref={checkboxRef}
        type="checkbox"
        onChange={onChange}
        className="w-4 h-4 cursor-pointer outline-dark outline-1 outline outline-offset-0 rounded-none accent-dark"
      />
    </label>
  );
};

export default Checkbox;
