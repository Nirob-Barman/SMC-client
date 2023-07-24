import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../../../hooks/useAuth';
import useEnrolledClasses from '../../../../hooks/useEnrolledClasses';

const MySelectedClasses = () => {
    const [selectedClasses, setSelectedClasses] = useState([]);
    const { user } = useAuth();

    const [enrolledClasses, refetch] = useEnrolledClasses();

    // useEffect(() => {
    //     // Fetch selected classes for the current user when the component mounts
    //     fetchSelectedClasses();
    // }, []);

    // const fetchSelectedClasses = async () => {
    //     try {
    //         // Fetch selected classes for the current user
    //         const response = await axios.get(`http://localhost:5000/selectClasses?email=${user.email}`);
    //         setSelectedClasses(response.data);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };


    setSelectedClasses(enrolledClasses);


    const handleDeleteClass = async (classId) => {
        try {
            // Send the class data to the server to delete it
            await axios.delete(`http://localhost:5000/selectClasses/${classId}`);

            // Show success message using SweetAlert2
            Swal.fire({
                icon: 'success',
                title: 'Class Deleted!',
                text: 'You have successfully deleted the class.',
            });

            // Remove the deleted class from the state
            setSelectedClasses((prevSelectedClasses) => prevSelectedClasses.filter((cls) => cls.classId !== classId));
        } catch (error) {
            console.error('Error deleting class:', error);
            // Handle error, if any
        }
    };

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-3xl font-semibold mb-4">My Selected Classes</h2>
            {selectedClasses.length === 0 ? (
                <p className="text-red-500">You have not selected any classes yet.</p>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {selectedClasses.map((selectedClass) => (
                        <div
                            key={selectedClass._id}
                            className="bg-white p-4 rounded-lg"
                        >
                            <img
                                src={selectedClass.classImage}
                                alt={selectedClass.className}
                                className="w-full h-40 object-cover rounded-lg mb-4"
                            />
                            <p className="text-lg font-semibold">{selectedClass.className}</p>
                            <p className="text-sm text-gray-600 mb-2">Instructor: {selectedClass.displayName}</p>
                            <p className="text-sm text-gray-600 mb-2">Available Seats: {selectedClass.availableSeats}</p>
                            <p className="text-sm text-gray-600 mb-4">Price: {selectedClass.price}</p>

                            <div className="flex space-x-4">
                                <button
                                    onClick={() => handleDeleteClass(selectedClass.classId)}
                                    className="btn btn-danger"
                                >
                                    Delete
                                </button>
                                <Link to={`/pay/${selectedClass.classId}`} className="btn btn-primary">
                                    Pay
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MySelectedClasses;
