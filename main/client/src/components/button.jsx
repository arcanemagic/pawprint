import React, { useState } from "react";

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

export default Button;