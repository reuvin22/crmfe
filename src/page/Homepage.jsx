import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function Homepage() {
    const [closeForm, setCloseForm] = useState(false)
    const [addForm, setAddForm] = useState(false)
    const [updateForm, setUpdateForm] = useState(false)
    const [formData, setFormData] = useState({
        fName: '',
        lName: '',
        email: '',
        contactNumber: ''
    })
    const [userData, setUserData] = useState([])
    const [trigger, setTrigger] = useState(false)
    const formOpen = () => {
        setFormData({
            fName: '',
            lName: '',
            email: '',
            contactNumber: ''
        })
        setAddForm(!addForm);
    }
    const formClose = () => {
        setCloseForm(!closeForm)
    }
    const formIdClose = () => {
        setFormData({
            fName: '',
            lName: '',
            email: '',
            contactNumber: ''
        })
        setUpdateForm(!updateForm)
    }
    useEffect(() => {
        const fetchedData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/user');
                setUserData(response.data);
            } catch(e) {
                console.log("Error:" + e);
            }
        }
        fetchedData();
    }, [trigger]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/user', formData, {
                headers: {
                    'Content-type': 'application/json'
                }
            }).then(response => {
                if (response.data.status === 200) {
                    setFormData({
                        fName: '',
                        lName: '',
                        email: '',
                        contactNumber: ''
                    });
                    toast.success(response.data.message);
                    setTrigger(!trigger);
                    setAddForm(!addForm);
                } else {
                    toast.error(response.data.message);
                }
            });
        } catch (e) {
            console.log("Error:", e);
            toast.error("An error occurred. Please try again.");
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/api/user/${formData.id}`, formData, {
                headers: {
                    'Content-type': 'application/json'
                }
            }).then(response => {
                if (response.data.status === 200) {
                    setFormData({
                        fName: '',
                        lName: '',
                        email: '',
                        contactNumber: ''
                    });
                    toast.success(response.data.message);
                    setTrigger(!trigger);
                    setUpdate(!updateForm);
                } else {
                    toast.error(response.data.message);
                }
            });
        } catch (e) {
            console.log("Error:", e);
            toast.error("An error occurred. Please try again.");
        }
    };
    const handleGetById = async (id) => {
            const response = await axios.get(`http://localhost:8000/api/user/${id}`);
                setFormData({
                    id: response.data.data.id,
                    fName: response.data.data.fName,
                    lName: response.data.data.lName,
                    email: response.data.data.email,
                    contactNumber: response.data.data.contactNumber
                });
                setUpdateForm(!updateForm)
    }

    const handleDelete = async(id) => {
        try {
            await axios.delete(`http://localhost:8000/api/user/${id}`).then(response => {
                if (response.data.status === 200) {
                    toast.success(response.data.message);
                    setTrigger(!trigger);
                } else {
                    toast.error(response.data.message);
                }
            });
        } catch(e) {
            console.log("Error:" + e);
        }
    }

    const handleInput = (e) => {
        const { name, value } = e.target
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    
    const handleView = async(id) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/user/${id}`);
                setFormData({
                    id: response.data.data.id,
                    fName: response.data.data.fName,
                    lName: response.data.data.lName,
                    email: response.data.data.email,
                    contactNumber: response.data.data.contactNumber
                });
                setCloseForm(!closeForm)
        }catch(e) {
            console.log("Error:" + e);
        }
    }
    return (
        <>
            <div className='relative w-screen h-screen grid place-items-center'>
                <button className='absolute top-28 right-0 mr-52 border-green-500 border-2 py-3 px-8 rounded-xl bg-green-500 font-bold text-white hover:bg-green-300' onClick={formOpen}>Add</button>
                <div className='relative w-[70%] h-[500px] border rounded-xl border-red-800 grid place-items-center'>
                    <div className={addForm ? 'border-2 border-green-500 w-96 h-96 absolute bg-white rounded-lg grid place-items-center' : 'hidden'}>
                        <h1 className='font-bold text-xl'>Add User</h1>
                        <form className='h-full w-full grid place-items-center' onSubmit={handleSubmit}>
                        <label htmlFor="fName">First Name</label>
                            <input type="text" id='fName' name='fName' value={formData.fName} onChange={handleInput} className='border-2 px-3 py-2' />
                            <label htmlFor="lName">Last Name</label>
                            <input type="text" id='lName' name='lName' value={formData.lName} onChange={handleInput} className='border-2 px-3 py-2' />
                            <label htmlFor="email">Email</label>
                            <input type="email" id='email' name='email' value={formData.email} onChange={handleInput} className='border-2 px-3 py-2' />
                            <label htmlFor="contactNumber">Contact Number</label>
                            <input type="number" id='contactNumber' name='contactNumber' value={formData.contactNumber} onChange={handleInput} className='border-2 px-3 py-2' />
                            <div className='flex mt-2 gap-5 mb-3'>
                                <button type="submit" className='border-2 py-2 px-7 bg-green-500 text-white font-bold hover:bg-green-400 rounded-lg'>Add</button>
                                <button type="button" className='border-2 py-2 px-7 bg-blue-500 text-white font-bold hover:bg-blue-400 rounded-lg' onClick={formOpen}>Back</button>
                            </div>  
                        </form>
                    </div>
                    <div className={updateForm ? 'border-2 border-green-500 w-96 h-96 absolute bg-white rounded-lg grid place-items-center' : 'hidden'}>
                        <h1 className='font-bold text-xl'>Update User</h1>
                        <form className='h-full w-full grid place-items-center' onSubmit={handleUpdate}>
                        <label htmlFor="fName">First Name</label>
                            <input type="text" id='fName' name='fName' value={formData.fName} onChange={handleInput} className='border-2 px-3 py-2' />
                            <label htmlFor="lName">Last Name</label>
                            <input type="text" id='lName' name='lName' value={formData.lName} onChange={handleInput} className='border-2 px-3 py-2' />
                            <label htmlFor="email">Email</label>
                            <input type="email" id='email' name='email' value={formData.email} onChange={handleInput} className='border-2 px-3 py-2' />
                            <label htmlFor="contactNumber">Contact Number</label>
                            <input type="number" id='contactNumber' name='contactNumber' value={formData.contactNumber} onChange={handleInput} className='border-2 px-3 py-2' />
                            <div className='flex mt-2 gap-5 mb-3'>
                                <button type="submit" className='border-2 py-2 px-7 bg-green-500 text-white font-bold hover:bg-green-400 rounded-lg'>Update</button>
                                <button type="button" className='border-2 py-2 px-7 bg-blue-500 text-white font-bold hover:bg-blue-400 rounded-lg' onClick={formIdClose}>Back</button>
                            </div>  
                        </form>
                    </div>
                    <div className={closeForm ? 'border-2 border-green-500 w-96 h-96 absolute bg-white rounded-lg grid place-items-center' : 'hidden'}>
                        <h1 className='font-bold text-xl'>User Information</h1>
                        <div className='grid gap-7'>
                            <h1 className='text-xl font-bold'>First Name : {formData.fName}</h1>
                            <h1 className='text-xl font-bold'>Last Name : {formData.lName}</h1>
                            <h1 className='text-xl font-bold'>Email : {formData.email}</h1>
                            <h1 className='text-xl font-bold'>Contact Number : {formData.contactNumber}</h1>
                        </div>
                        <div className='flex mt-2 gap-5 mb-3'>
                            <button type="button" className='border-2 py-2 px-7 bg-blue-500 text-white font-bold hover:bg-blue-400 rounded-lg' onClick={formClose}>Back</button>
                        </div>
                    </div>
                    <div className='w-full max-h-full overflow-y-scroll py-10 px-8'>
                        <table className='w-full'>
                            <thead>
                                <tr>
                                    <th className='px-4 py-2'>First Name</th>
                                    <th className='px-4 py-2'>Last Name</th>
                                    <th className='px-4 py-2'>Email Address</th>
                                    <th className='px-4 py-2'>Contact Number</th>
                                    <th className='px-4 py-2'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userData.map((item, index) => (
                                    <tr key={index} className='cursor-pointer hover:bg-gray-200'>
                                        <td className='px-4 py-2'>{item.fName}</td>
                                        <td className='px-4 py-2'>{item.lName}</td>
                                        <td className='px-4 py-2'>{item.email}</td>
                                        <td className='px-4 py-2'>{item.contactNumber}</td>
                                        <td className='flex gap-2 justify-center items-center z-10'><button type="button" className='bg-green-500 py-2 px-3 rounded-lg text-white font-bold hover:bg-green-400' onClick={() => handleGetById(item.id)}>Update</button>
                                        <button className='bg-red-500 py-2 px-3 rounded-lg text-white font-bold hover:bg-red-400' onClick={() => handleDelete(item.id)}>Delete</button>
                                        <button className='bg-blue-500 py-2 px-3 rounded-lg text-white font-bold hover:bg-blue-400' onClick={() => handleView(item.id)}>View</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Homepage;
