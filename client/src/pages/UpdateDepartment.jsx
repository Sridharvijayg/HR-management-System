import React, { useEffect, useState, useContext } from "react";
import SideNav from "../components/SideNav";
import Nav from "../components/Nav";
import { useNavigate, useParams } from "react-router-dom";
import {MyContext} from '../context/MyContext'
import Loading from "../components/Loading";

const UpdateDepartment = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [department, setDepartment] = useState('');
  const [uid, setUid] = useState('');
  const {isLoading,setIsLoading} = useContext(MyContext);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(
          `http://localhost:5000/api/Department/${id}`
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch: ${response.status} ${response.statusText}`
          );
        }
        const data = await response.json();
        setDepartment(data.department);
        setUid(data._id)
        setIsLoading(false)
      } catch (err) {
        alert(`Error: ${err.message}`);
      }finally{
        setIsLoading(false)
      }
    };
    fetchData();
  },[id]);

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
      setIsLoading(true);
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
      setIsLoading(false);
      alert(data.message);
      navigate("/Department"); 
    } catch (err) {
      alert(`Error: ${err.message}`);
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <div className='Grid-box'>  
    {isLoading && <Loading/>} 
    <SideNav />
      <Nav title="Update Department" />
    <main>
      <div className="add-Department">
        <form>
          <h2>Update Department</h2>
          <input
            type="text"
            value={department}
            autoFocus
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
      </main>
      </div>  );
};

export default UpdateDepartment;
