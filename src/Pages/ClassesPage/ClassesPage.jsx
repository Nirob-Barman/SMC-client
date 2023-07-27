import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useClassPage from '../../hooks/useClassPage';

const ClassesPage = () => {
    const [classes, setClasses] = useState([]);
    const { user, userRole } = useAuth();
    const [selectedClasses, setSelectedClasses] = useState([]);

    useEffect(() => {
        // Fetch classes from the server when the component mounts
        fetchClasses();
    }, []);

    useEffect(() => {
        // Fetch selected classes for the current user (if logged in)
        if (user && userRole === 'student') {
            fetchSelectedClasses();
        }
    }, [user, userRole]);

    const fetchClasses = async () => {
        try {
            const response = await axios.get('http://localhost:5000/classes');
            setClasses(response.data.filter((cls) => cls.status === 'approved'));
        } catch (error) {
            console.error(error);
        }
    };

    const fetchSelectedClasses = async () => {
        try {
            // Fetch selected classes for the current user
            const response = await axios.get(`http://localhost:5000/selectClasses/${user.email}`);
            setSelectedClasses(response.data.map((selectedClass) => selectedClass.classId));
        } catch (error) {
            console.error(error);
        }
    };



    const handleSelectClass = async (classId, classItem) => {
        try {
            // Check if the class is already selected by the current user
            if (selectedClasses.includes(classId)) {
                Swal.fire({
                    icon: 'info',
                    title: 'Class Already Selected',
                    text: 'You have already selected this class.',
                });
                return; // Exit the function if already selected
            }


            // Send the class data to the server
            // await axios.post('http://localhost:5000/selectClasses/', classItem);

            const { _id, className, classImage, availableSeats, displayName, email, price, status, feedback } = classItem;
            // await axios.post('http://localhost:5000/selectClasses/', {
            //     classItem,
            //     enrolledEmail: user?.email,
            // });

            await axios.post('http://localhost:5000/selectClasses/', {
                classId: _id,
                className,
                classImage,
                availableSeats,
                instructorName: displayName,
                instructorEmail: email,
                price,
                status,
                feedback,
                enrolledEmail: user?.email,
            });


            // Show success message using SweetAlert2
            Swal.fire({
                icon: 'success',
                title: 'Class Selected!',
                text: 'You have successfully selected the class.',
            });


            // console.log('Class selected:', classId);
            console.log('Class:', classItem);

            // Update the selected classes state for the current user
            setSelectedClasses((prevSelectedClasses) => [...prevSelectedClasses, classId]);

            // Optionally, you can perform any additional actions after the data is successfully sent
        } catch (error) {
            console.error('Error selecting class:', error);
            // Handle error, if any
        }
    };

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-3xl font-semibold mb-4">Classes Page</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {classes.map((cls) => (
                    <div
                        key={cls._id}
                        className={`bg-white p-4 rounded-lg ${cls.availableSeats === '0' ? 'bg-red-200' : ''
                            }`}
                    >
                        <img
                            src={cls.classImage}
                            alt={cls.className}
                            className="w-full h-40 object-cover rounded-lg mb-4"
                        />
                        <p className="text-lg font-semibold">{cls.className}</p>
                        <p className="text-sm text-gray-600 mb-2">Instructor: {cls.displayName}</p>
                        <p className="text-sm text-gray-600 mb-2">Available Seats: {cls.availableSeats}</p>
                        <p className="text-sm text-gray-600 mb-4">Price: {cls.price}</p>



                        {user ? (
                            userRole === 'student' && cls.availableSeats !== '0' ? (
                                <button
                                    onClick={() => handleSelectClass(cls._id, cls)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full disabled:opacity-50"
                                >
                                    Select
                                </button>
                            ) : (
                                <p className="text-red-500">
                                    {cls.availableSeats === '0' ? 'No available seats' : ''}
                                </p>
                            )
                        ) : (
                            <p className="text-red-500">
                                {/* Please log in to select a course */}
                                <Link to="/login" className="btn btn-error">
                                    <button>Log in to enroll</button>
                                </Link>
                            </p>
                        )}


                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClassesPage;




// {
//     user ? (
//         userRole === 'student' && cls.availableSeats !== '0' ? (
//             <button
//                 onClick={() => handleSelectClass(cls._id, cls)}
//                 className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full disabled:opacity-50"
//             >
//                 Select
//             </button>
//         ) : (
//             <p className="text-red-500">
//                 {cls.availableSeats === '0' ?
//                     'No available seats'
//                     :
//                     'Logged in as admin/instructor'
//                 }
//             </p>
//         )
//     ) : (
//         <p className="text-red-500">
//             {/* Please log in to select a course */}
//             <Link to="/login" className="btn btn-error">
//                 <button >Log in to enroll</button>
//             </Link>
//         </p>
//     )
// }






