// import useAuth from './useAuth';
// import { useQuery } from '@tanstack/react-query';

// const useClassPage = () => {
//     const { user, loading } = useAuth();

//     console.log("Client Email: ", user?.email);

//     const { refetch, data: classPage = [] } = useQuery({
//         queryKey: ['classPage', user?.email],
//         enabled: !loading,
//         queryFn: async () => {
//             const res = await fetch(`http://localhost:5000/selectClasses/${user.email}`)
//             return res.json();
//         },
//     })

//     console.log(classPage);

//     return [classPage, refetch]
// };

// export default useClassPage;


import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';

const useClassPage = () => {
    const { user, loading } = useAuth();
    const [selectedClasses, setSelectedClasses] = useState([]);

    const { refetch, data: classPage = [] } = useQuery({
        queryKey: ['classPage', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/selectClasses/${user.email}`);
            return res.json();
        },
    });

    useEffect(() => {
        // Retrieve the previously saved selected classes from local storage on page load
        const savedSelectedClasses = localStorage.getItem('selectedClasses');
        if (savedSelectedClasses) {
            setSelectedClasses(JSON.parse(savedSelectedClasses));
        }
    }, []);

    const fetchSelectedClasses = async () => {
        // try {
        //     // Fetch selected classes for the current user
        //     const response = await axios.get(`http://localhost:5000/selectClasses/${user.email}`);
        //     setSelectedClasses(response.data.map((selectedClass) => selectedClass.classId));
        // } catch (error) {
        //     console.error(error);
        // }
        setSelectedClasses(classPage);

        // Save the selected classes to local storage
        localStorage.setItem('selectedClasses', JSON.stringify(classPage));
    };

    return [classPage, refetch, fetchSelectedClasses];
};

export default useClassPage;
