import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const ClassesPage = () => {
    const [classes, setClasses] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        // Fetch classes from the server when the component mounts
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        try {
            const response = await axios.get('http://localhost:5000/classes');
            setClasses(response.data.filter((cls) => cls.status === 'approved'));
        } catch (error) {
            console.error(error);
        }
    };

    const handleSelectClass = (classId) => {
        // Placeholder function, add your logic to handle class selection here
        console.log('Class selected:', classId);
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
                            user.role === 'student' && cls.availableSeats !== '0' ? (
                                <button
                                    onClick={() => handleSelectClass(cls._id)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full disabled:opacity-50"
                                >
                                    Select
                                </button>
                            ) : (
                                <p className="text-red-500">
                                    {cls.availableSeats === '0'
                                        ? 'No available seats'
                                        : 'Logged in as admin/instructor'}
                                </p>
                            )
                        ) : (
                            <p className="text-red-500">Please log in to select a course</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClassesPage;
