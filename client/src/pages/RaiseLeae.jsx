import React, { useContext, useState } from 'react';
import ESideNav from '../components/ESideNav';
import Nav from '../components/Nav';
import Loading from '../components/Loading';
import { MyContext } from '../context/MyContext';
import { useNavigate } from 'react-router-dom';

const RaiseLeave = () => {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [reason, setReason] = useState('');
    const navigate = useNavigate();
    const { isLoading, setIsLoading, employee } = useContext(MyContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const leaveData = {
            employeeId: employee.employeeId,
            name: employee.name,
            fromDate: fromDate,  
            toDate: toDate,      
            reason,
        };
        setIsLoading(true);
        console.log(leaveData);
        
        try {
            const response = await fetch('http://localhost:5000/api/leaves/raise-leave', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(leaveData),
            });

            if (response.ok) {
                alert('Leave request submitted successfully');
                setFromDate('');
                setToDate('');
                setReason('');
                navigate('/ELeave')
            } else {
                alert('Error submitting leave request');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error submitting leave request');
        }finally{
            setIsLoading(false)
        }
    };

    return (
        <div className='Grid-box'>
            {isLoading && <Loading />}
            <ESideNav />
            <Nav title="Employee Leave" />
            <main>
                <div className="add-Department">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="employeeId">Employee ID</label>
                        <input type="text" id="employeeId" readOnly value={employee.employeeId} className='dep-text' />
                        
                        <label htmlFor="employeeName">Employee Name</label>
                        <input type="text" id="employeeName" readOnly value={employee.name} className='dep-text' />
                        
                        <label htmlFor="fromDate">From Date</label>
                        <input 
                            type="date" 
                            id="fromDate" 
                            value={fromDate} 
                            onChange={(e) => setFromDate(e.target.value)} 
                            required 
                            className='dep-text' 
                        />
                        
                        <label htmlFor="toDate">To Date</label>
                        <input 
                            type="date" 
                            id="toDate" 
                            value={toDate} 
                            onChange={(e) => setToDate(e.target.value)} 
                            required 
                            className='dep-text' 
                        />

                        <label htmlFor="reason">Reason</label>
                        <select 
                            id="reason" 
                            value={reason} 
                            onChange={(e) => setReason(e.target.value)} 
                            required 
                            className='dep-text'
                        >
                            <option value="Sick Leave">Sick Leave</option>
                            <option value="Casual Leave">Casual Leave</option>
                            <option value="Others">Others</option>
                        </select>

                        <button type='submit' className="button">Send Request</button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default RaiseLeave;
