import React, { useContext, useState } from "react";
import { MyContext } from "../context/MyContext";

const CheckInOutToggle = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const { employee } = useContext(MyContext);

  const handleToggle = async () => {
    setIsCheckedIn((prev) => !prev);

    try {
      if (!isCheckedIn) {
        // Check-in API call
        const checkinResponse = await fetch("http://localhost:5000/api/Attendance/check-in", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            employeeId: employee.employeeId,
          }),
        });
        const checkinData = await checkinResponse.json();
        console.log("Check-in successful:", checkinData);
      } else {
        // Check-out API call
        const checkoutResponse = await fetch("http://localhost:5000/api/Attendance/check-out", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            employeeId: employee.employeeId,
          }),
        });
        const checkoutData = await checkoutResponse.json();
        console.log("Check-out successful:", checkoutData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <button onClick={handleToggle} className="button">
        {isCheckedIn ? "Check-out" : "Check-in"}
      </button>
    </div>
  );
};

export default CheckInOutToggle;
