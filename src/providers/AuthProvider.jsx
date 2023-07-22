import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState(null);


    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const response = await fetch(`http://localhost:5000/users/role?email=${user?.email}`);
                const role = await response.json();
                // Handle the received role in the client-side code
                console.log('Role:', role);
                setUserRole(role);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserRole();
    }, [user?.email]);



    const googleProvider = new GoogleAuthProvider();






    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, loggedUser => {
            // console.log('logged in user inside auth state observer', loggedUser)
            setUser(loggedUser);
            setLoading(false);
        })

        return () => {
            unsubscribe();
        }
    }, [])

    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, currentUser => {
    //         setUser(currentUser);
    //         // console.log('current user', currentUser);

    //         // get and set token
    //         if (currentUser) {
    //             axios.post('http://localhost:5000/jwt', { email: currentUser.email })
    //                 .then(data => {
    //                     // console.log(data);
    //                     // console.log(data.data);
    //                     // console.log(data.data.token);
    //                     localStorage.setItem('access-token', data.data.token)
    //                     setLoading(false);
    //                 })
    //         }
    //         else {
    //             localStorage.removeItem('access-token')
    //         }
    //         // setLoading(false);
    //     });
    //     return () => {
    //         return unsubscribe();
    //     }
    // }, [])

    const authInfo = {
        user,
        userRole,
        loading,
        createUser,
        signIn,
        googleSignIn,
        logOut,
        updateUserProfile
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;