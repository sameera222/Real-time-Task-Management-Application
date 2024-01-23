import React from "react";

const InputControl= (props) => {
  return (
    // <div className={styles.container}>
    //   {props.label && <label>{props.label}</label>}
    //   <input type="text" {...props} />
    // </div>

    <div className="flex gap-2 p-2">
      <input type="text" {...props} />
    </div>
  );
}

export default InputControl;
