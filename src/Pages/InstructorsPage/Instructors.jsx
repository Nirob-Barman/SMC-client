import React from 'react';
import useInstructor from '../../hooks/useInstructor';
import { Link } from 'react-router-dom';

const Instructors = () => {
    const [instructors] = useInstructor();

    return (
        <div>
            <div className='text-center'>
                <h2 className="text-2xl font-semibold mb-4">Instructors are here</h2>
            </div>
            {instructors.map((instructor) => (
                <div key={instructor._id} className="flex items-center my-4">
                    <img
                        src={instructor.photoURL}
                        alt={instructor.name}
                        className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                        <p className="font-semibold">{instructor.name}</p>
                        <p className="text-gray-600">{instructor.email}</p>
                        {/* Optional: Display the number of classes and their names */}
                        {instructor.classesTaken && (
                            <>
                                <p>Number of Classes Taken: {instructor.classesTaken.length}</p>
                                <p>Classes Taken:</p>
                                <ul>
                                    {instructor.classesTaken.map((className) => (
                                        <li key={className}>{className}</li>
                                    ))}
                                </ul>
                            </>
                        )}
                        {/* Optional: "See Classes" button to show classes by this instructor */}
                        {/* Replace `YOUR_LINK_HERE` with the actual link for showing classes */}
                        <Link className="text-blue-500 underline mt-2">
                            See Classes
                        </Link>                        
                        
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Instructors;
