import useClass from '../../../../hooks/useClass';

const MyClasses = () => {
    const [classes] = useClass();

    const handleUpdateClass = (classId) => {
        // Placeholder function, add your logic to handle the update action for the specific class
        console.log(`Update class with ID: ${classId}`);
    };

    return (
        <div className="flex flex-col items-center m-4">
            <div className="text-center text-xl font-bold mb-4">My Classes are here</div>
            <table className="w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border px-4 py-2">Class Name</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Total Enrolled Students</th>
                        <th className="border px-4 py-2">Feedback</th>
                        <th className="border px-4 py-2">Update</th>
                    </tr>
                </thead>

                <tbody>
                    {classes.map((classData) => (
                        <tr key={classData._id} className={classData?.status === 'denied' ? 'bg-red-200' : 'bg-white'}>
                            <td className="border px-4 py-2">{classData?.className}</td>
                            <td className="border px-4 py-2">{classData?.status}</td>
                            <td className="border px-4 py-2">{classData?.availableSeats}</td>
                            <td className="border px-4 py-2">{classData?.feedback ? classData.feedback : "N/A"}</td>
                            <td className="border px-4 py-2">
                                {/* {classData.status !== 'pending' && (
                                    <button
                                        className="bg-green-500 text-white px-4 py-2 rounded"
                                        onClick={() => handleUpdateClass(classData._id)}
                                    >
                                        Update
                                    </button>
                                )} */}
                                {
                                    <button
                                        className="bg-green-500 text-white px-4 py-2 rounded"
                                        onClick={() => handleUpdateClass(classData._id)}
                                    >
                                        Update
                                    </button>
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyClasses;
