import React, { useEffect, useState } from "react";

import SideNav from "../components/SideNav";
import Nav from "../components/Nav";
import { useNavigate, useParams } from "react-router-dom";

const UpdateDepartment = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [department, setDepartment] = useState('');
  const [uid, setUid] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/Department/${id}`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            `Failed to fetch: ${response.status} ${response.statusText}`
          );
        }

        setDepartment(data.department);
        setUid(data._id)
      } catch (err) {
        alert(`Error: ${err.message}`);
      }
    };

    fetchData();
  }, [id]);

  const handleUpdateDepartment = async (e,uid) => {
    e.preventDefault();
    try {
      const PostOption = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          department: department,
        }),
      };

      const response = await fetch(
        `http://localhost:5000/api/Department/${uid}`,
        PostOption
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          `Failed to update: ${response.status} ${response.statusText}`
        );
      }

      alert(data.message); // Assuming the response contains a message field
      navigate("/Department"); // Redirecting after successful update
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="content">
      <SideNav />
      <Nav title="Update Department" />
      <div className="add-Department">
        <form>
          <h2>Update Department</h2>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="Department..."
            className="dep-text"
          />
          <button
            className="button"
            onClick={(e) => handleUpdateDepartment(e,uid)}
          >
            Update{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateDepartment;
