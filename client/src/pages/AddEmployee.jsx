import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import SideNav from '../components/SideNav';
import { MyContext } from '../context/MyContext';

const AddEmployee = () => {

    const {departments} = useContext(MyContext);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [department, setDepartment] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState(''); 
  const [contact, setContact] = useState(''); 
  const [gender, setGender] = useState(''); 

  const navigate = useNavigate();

  const handleAddEmployee = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('employeeId', id);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('position', position);
    formData.append('profilePictureUrl', profilePicture);
    formData.append('department', department);
    formData.append('dob', dob);
    formData.append('address', address);
    formData.append('contact', contact);
    formData.append('gender', gender);

    try {
      const response = await fetch('http://localhost:5000/api/Employee', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message)
        navigate('/Employee');
      } else {
        console.log('Error adding employee');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div className='Grid-box'>
    <SideNav />
      <Nav title="Add Employee" />
    <main>
      <div className="add-Department">
      <form onSubmit={handleAddEmployee}>
        <h2>Add Employee</h2>
        
        <label htmlFor="employeeId">Employee ID</label>
        <input
          type="text"
          id="employeeId"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder='Employee ID...'
          className='dep-text'
          required
        />
        
        <label htmlFor="name">Employee Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Employee Name...'
          className='dep-text'
          required
        />

        <label htmlFor="email">Employee Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Employee Email...'
          className='dep-text'
          required
        />

        <label htmlFor="position">Position</label>
        <input
          type="text"
          id="position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          placeholder='Position...'
          className='dep-text'
          required
        />

        <label htmlFor="profilePicture">Profile Picture</label>
        
        <div className="profile-file">
        <input type="text"
        id="profilePicture"
        readOnly
        value={profilePicture ? profilePicture.name : ""}
        onChange={(e) => setProfilePicture(e.target.files[0])}
        className='dep-text' 
        required/>

        <input
          type="file"
          id="profilePicture"
          onChange={(e) => setProfilePicture(e.target.files[0])}
          className='dep-text'
          required
        />
        </div>

        <label htmlFor="gender">Gender</label>
        <select
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className='dep-text'
          required
        >
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Others">Others</option>
        </select>
        <label htmlFor="department">Department</label>
        <select
          id="department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className='dep-text'
          required
        >
            <option value="">Select Department</option>
            {departments.map((dep) => (
                <option value={dep.department} key={dep.department}>{dep.department}</option>
            ))}
        </select>

        <label htmlFor="dob">Date of Birth</label>
        <input
          type="date"
          id="dob"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className='dep-text'
          required
        />

        <label htmlFor="address">Address</label>
        <textarea
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder='Address...'
          className='dep-text'
          required
        ></textarea>

        <label htmlFor="contact">Contact Number</label>
        <input
          type="tel"
          id="contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder='Contact Number...'
          className='dep-text'
          required
        />

        <button type='submit' className='button' onClick={(e)=>handleAddEmployee(e)}>Create Employee</button>
      </form>
    </div>
    </main>
    </div>
  );
};

export default AddEmployee;
