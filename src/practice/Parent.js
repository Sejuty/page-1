import React, {useRef} from "react";
import Child from "./Child"


// const Parent = () => {
//   const childRef = useRef();
//   const s = "Nishat"

//   const handleChange=(e)=>{
//     console.log("Hello")
//     childRef.current.getAlert(e)
//   }

//   return (
//     <div>
//       <Child ref={childRef} s={s} />
//       <button onClick={(e)=>handleChange(e)}>Click</button>
//     </div>
//   );
// };
const Parent = () => {
  const [message, setMessage] = React.useState("Hello World");
  const chooseMessage = (message) => {
    setMessage(message);
  };
  return (
    <div>
      <h1>{message}</h1>
      <Child chooseMessage={chooseMessage} />
    </div>
  );
};

export default Parent;
