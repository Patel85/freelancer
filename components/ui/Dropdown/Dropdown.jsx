import { useState, useEffect } from "react";

function Dropdown({ fetchData, subusers, setCurrentSubuser, currentSubuser }) {
  // const [selected, setSelected] = useState(currentSubuser);

  const dropdownSelect = (e) => {
    const sub_user_serial_no = e.target.value;
    setCurrentSubuser(sub_user_serial_no);
    sessionStorage.setItem("sub_user_serial_no", sub_user_serial_no);
    fetchData(sub_user_serial_no);
  };

  return (
    <>
      <select
        onChange={dropdownSelect}
        defaultValue={currentSubuser}
        style={{
          margin: "0 10px",
          padding: "0",
          background: "none",
          outline: "none",
          border: "none",
        }}
      >
        {subusers.map((subuser) => (
          <option
            value={subuser.serial_no}
            selected={currentSubuser === subuser.serial_no ? true : false}
            style={{ color: "black" }}
          >
            {subuser.sub_user_name}
          </option>
        ))}
      </select>
    </>
  );
}

export default Dropdown;
