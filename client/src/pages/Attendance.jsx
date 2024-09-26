import React, { useContext, useEffect, useState } from 'react';
import SideNav from '../components/SideNav';
import Nav from '../components/Nav';
import { MyContext } from '../context/MyContext';
import Loading from '../components/Loading';
import * as XLSX from 'xlsx'; // Import the xlsx library

const Attendance = () => {
  const { isLoading, setIsLoading } = useContext(MyContext);
  const [report, setReport] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/api/Attendance/attendance-report');
        const data = await response.json();
        setReport(data.attendanceRecords);        
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatTimeTo12Hour = (isoString) => {
    // Create a new Date object from the ISO string
    const date = new Date(isoString);
    
    // Extract the hours and minutes
    let hours = date.getHours();
    const minutes = date.getMinutes();
  
    // Determine if it's AM or PM
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    // Convert to 12-hour format
    hours = hours % 12; // Convert hour to 12-hour format
    hours = hours ? hours : 12; // the hour '0' should be '12'
    
    // Format minutes to always be two digits
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  
    // Return the formatted time
    return `${hours}:${minutesStr} ${ampm}`;
  };

  // Function to download the table as an Excel file
  const downloadExcel = () => {
    const table = document.getElementById('attendance-table');
    const workbook = XLSX.utils.table_to_book(table);
    XLSX.writeFile(workbook, 'Attendance_Report.xlsx');
  };

  return (
    <div className='Grid-box'>
      <SideNav />
      <Nav title='Attendance' />
      {isLoading && <Loading />}
      <main>
        <div className="add-employee">
          <button className='button' onClick={downloadExcel}>Download Report</button>
        </div>
        <div className="table-responsive">
          <table className="table table-dark table-striped table-bordered" id="attendance-table">
            <thead className="thead-dark">
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>CheckIn Time</th>
                <th>Status</th>
                <th>Working Hours</th>
              </tr>
            </thead>
            <tbody>
              {report && report.length > 0 ? (
                report.map(rep => (
                  <tr key={rep._id}>
                    <td>{rep.employeeId}</td>
                    <td>{rep.name}</td>
                    <td>{rep.checkInTimes.length > 0 ? formatTimeTo12Hour(rep.checkInTimes[0]) : 'N/A'}</td> 
                      <td>{rep.status}</td>
                    <td>{rep.totalWorkHours}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>No Checkin Today</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Attendance;
