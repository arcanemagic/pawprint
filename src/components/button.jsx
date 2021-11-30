import React, { useState } from "react";

// class Button extends Component {
//   state = {
//     count: 1,
//   };
//   render() {
//     return <div>update</div>;
//   }
// }
const Button = () => {
  const [count, setCount] = useState(1);
  const handleClick = () => {
    setCount(count + 1);
    console.log("hello!");
  };
  return (
    <>
      <button onClick={handleClick}>Click Me</button>
      {count}
    </>
  );
};

export default Button; // Don’t forget to use export default!