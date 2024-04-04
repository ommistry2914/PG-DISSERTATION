import React, { useState, useEffect } from 'react';
import { FaEdit, FaMinusCircle, FaPlus } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';


const getPriorityColor = (priority) => {
    switch (priority) {
        case 'High':
            return 'red';
        case 'Medium':
            return 'orange';
        case 'Low':
            return 'yellow';
    }
}

const SubmitFor = () => {
    const [tasks, setTasks] = useState([]);
    const { studentid } = useParams();

    //Fetch tasks details
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(`http://localhost:8080/${studentid}/progress`);
                if (!response.ok) {
                    throw new Error('Failed to fetch tasks');
                }
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, [studentid]);



    return (
        <div className='common-pg-contents'>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Student</a></li>
                    <li className="breadcrumb-item"><a href="#">Dissertation</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Add Submission</li>
                </ol>
            </nav>

            <div className="common-pg-progress-section row container-fluid">
                <div className="common-pg-progress-table-div col-sm-12">
                    <table className='common-pg-progress-table'>
                        <thead>
                            <tr>
                                <th>Task</th>
                                <th>Due Date</th>
                                <th>Add</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks && tasks.map((task) => (
                                <tr key={task.id}>
                                    <td>{task.taskName}</td>
                                    <td>{new Date(task.endDate).toLocaleDateString('en-US', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric'
                                    })}</td>
                                    <td>
                                        {task.submissionId ? (
                                            task.approvalStage === null ? (
                                                <span>Last submission not checked</span>
                                            ) : (
                                                task.approvalStage !== 'Approved' ? (
                                                    <span><Link to={`${task.id}/add-work`}><FaPlus /></Link></span>
                                                ) : (
                                                    <span>Approved</span>
                                                )
                                            )
                                        ) : (
                                            <Link to={`${task.id}/add-work`}><FaPlus /></Link>
                                        )}
                                    </td>


                                    <td>{task.submissionId ? 'Submitted' : 'Pending'}</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div></div>
    );
};

export default SubmitFor;
