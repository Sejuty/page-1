import React from "react";

const Copied = () => {
  return (
    <div className="fixed top-10 right-6">
      <div
        className="max-w-xs bg-dark  rounded-md shadow-lg"
        role="alert"
      >
        <div className="px-8 py-4">
          <h3 className="text-md text-white font-normal">
            Copied!!!
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Copied;
