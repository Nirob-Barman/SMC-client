import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useClass = () => {

    const { user } = useAuth();

    console.log("Client Email: ", user?.email);

    const { refetch, data: classes = [] } = useQuery({
        queryKey: ['getClasses', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/classes/instructor?email=${user?.email}`)
            return res.json();
        },
    })

    console.log(classes);

    return [classes, refetch]
};

export default useClass;