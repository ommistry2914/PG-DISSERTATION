import React, { useState, useEffect } from 'react';
import { FaEdit, FaMinusCircle } from 'react-icons/fa';
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

const AllotedTasks = () => {
    const [tasks, setTasks] = useState([]);
    const { studentId } = useParams();
    const studentid = studentId;
    const [showDeleteSuccessAlert, setShowDeleteSuccessAlert] = useState(false);
    const [showDeleteErrorAlert, setShowDeleteErrorAlert] = useState(false);

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

    //Delete a Task
    const onDelete = async (taskid) => {
        try {
            const response = await fetch(`http://localhost:8080/allottask/${studentid}/delete/${taskid}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                console.log('Task deleted successfully!');
                setShowDeleteSuccessAlert(true);
                setShowDeleteErrorAlert(false);
                setTasks(tasks.filter(task => task.id !== taskid));
            } else {
                console.error('Failed to delete task');
                setShowDeleteSuccessAlert(false);
                setShowDeleteErrorAlert(true);
            }
        } catch (error) {
            console.error('Error deleting task:', error);
            setShowDeleteSuccessAlert(false);
            setShowDeleteErrorAlert(true);
        }
    };

    return (
        <div className="common-pg-contents">
            {showDeleteSuccessAlert && (
                <div className="alert alert-success" role="alert">
                    Task deleted successfully!
                </div>
            )}
            {showDeleteErrorAlert && (
                <div className="alert alert-danger" role="alert">
                    Failed to delete task. Please try again.
                </div>
            )}

            <div className="common-pg-progress-section row container-fluid">
                <Link to={`/mentorprofile/ongoing/allottask/${studentid}`}><button id='common-pg-allot-task-btn'>Add Task</button></Link>
                <div className="common-pg-progress-table-div col-sm-12">
                    <table className='common-pg-progress-table'>
                        <thead>
                            <tr>
                                <th>Task</th>
                                <th>Description</th>
                                <th>Period</th>
                                <th>Priority</th>
                                <th>Max Credits</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks && tasks.map((task) => (
                                <tr key={task.id}>
                                    <td>{task.taskName}</td>
                                    <td>{task.taskDescription}</td>
                                    <td>{new Date(task.startDate).toLocaleDateString('en-US', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric'
                                    })} <br /> to <br /> {new Date(task.endDate).toLocaleDateString('en-US', {
    
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric'
                                    })}</td>
                                    <td><div className='priority' style={{ backgroundColor: getPriorityColor(task.priority) }}>{task.priority}</div></td>
                                    <td>{task.maxCredits}</td>
                                    <td><Link to={`/mentorprofile/ongoing/allottask/${studentid}/update/${task.id}`}><FaEdit /></Link></td>
                                    <td><FaMinusCircle onClick={() => onDelete(task.id)} className='common-pg-del-task-btn'/></td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div></div>
    );
};

export default AllotedTasks;
