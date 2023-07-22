import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../../providers/AuthProvider';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';

const AddClassForm = () => {

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/dashboard/dashboardPage";

    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        // Perform your database submission logic here
        // Set the status field to "pending" when creating a class
        data.status = "pending";
        // console.log('Data: ', data);
        const addedClass = {
            className: data.className,
            classImage: data.classImage,
            availableSeats: data.availableSeats,
            displayName: user?.displayName,
            email: user?.email,
            price: data.price,
            status: data.status,
        }
        // console.log('Adding Class', addedClass);

        axios
            .post('http://localhost:5000/classes', addedClass)
            .then(response => {
                // Handle the response as needed
                console.log('Class added successfully');
                const data = response.data;
                console.log('Axios post submit data', data);

                if (data.insertedId) {
                    reset();

                    // Confirmation message or alert
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Class added successfully.',
                        showConfirmButton: false,
                        timer: 1500,
                    });

                    // Navigation to desired page
                    navigate(from, { replace: true });
                }

            })
            .catch(error => {
                // Handle the error
                console.error('Failed to add class:', error);
            });

    };
    return (
        <div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-6 border rounded-lg shadow-sm">
                    <div className="mb-6">
                        <label htmlFor="className" className="block font-medium mb-1">Class name</label>
                        <input type="text" id="className" {...register("className")} className="form-input" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="classImage" className="block font-medium mb-1">Class Image</label>
                        <input type="text" id="classImage" {...register("classImage")} className="form-input" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="instructorName" className="block font-medium mb-1">Instructor name</label>
                        <input type="text" id="instructorName" defaultValue={user?.displayName} readOnly className="form-input" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="instructorEmail" className="block font-medium mb-1">Instructor email</label>
                        <input type="text" id="instructorEmail" defaultValue={user?.email} readOnly className="form-input" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="availableSeats" className="block font-medium mb-1">Available seats</label>
                        <input type="number" id="availableSeats" {...register("availableSeats")} className="form-input" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="price" className="block font-medium mb-1">Price</label>
                        <input type="number" id="price" {...register("price")} className="form-input" />
                    </div>
                    <button type="submit" className="btn btn-primary">Add</button>
                </form>
            </div>
        </div>
    );
};

export default AddClassForm;