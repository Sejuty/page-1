import React from "react";
import { forwardRef, useRef, useImperativeHandle } from "react";

// const Child = forwardRef((props, ref) => {
//     useImperativeHandle(ref, (e) => ({

//         getAlert() {
//           alert(props.s);
//         }

//       }));
//   return <div>Child</div>;
// });
const Child = ({ chooseMessage }) => {
  let msg = "Goodbye";
  return (
    <div>
      <button onClick={() => chooseMessage(msg)}>Change Message</button>
    </div>
  );
};

export default Child;
