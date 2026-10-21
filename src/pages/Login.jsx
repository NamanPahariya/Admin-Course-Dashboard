import React, { useState } from 'react'
import LoginImage from '../assets/image/LoginImage.jpeg'
import { login } from '../Api';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
function Login() {

    const [formData, setFormData] = useState({
        userName: '',
        password: ''
    })

    const navigate = useNavigate()

    function handleValue(event) {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const payload = {
            username: formData.userName,
            password: formData.password
        }
        const result = await login(payload);
        console.log(result);
        if (result.status === 200) {
            const token = result?.data?.token
            localStorage.setItem('token', token)
            navigate('/dashboard', { replace: true })
            toast.success('Login Successfully')
        } else if (result.status === 401) {
            toast.error(result?.message || 'bad credntials')
        } else {
            toast.error('something went wrong...')
        }
    }
    return (
        <div className="min-h-screen flex flex-col md:flex-row" >
            {/* Left Image */}
            <div className="w-full md:w-1/2 h-[40vh] md:h-screen">
                <img
                    src={LoginImage}
                    alt="login"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Right Form */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 md:px-20 mt-6 md:mt-0">
                <h2 className="text-3xl font-semibold mb-2 text-center text-black">
                    Welcome!
                </h2>
                <p className="text-gray-500 mb-6 text-center text-sm">
                    Today is a new day. It's your day. You shape it.
                    <br />
                    Sign in to start managing your courses.
                </p>

                <form className="w-full max-w-sm space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="userName"
                            className="block text-sm font-medium text-gray-700"
                        >
                            User Name
                        </label>
                        <input
                            id="userName"
                            type="text"
                            placeholder="userName"
                            className="mt-1 block w-full rounded-md border text-gray-700 border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name='userName'
                            required
                            onChange={handleValue}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="password"
                            name="password"
                            className="mt-1 block w-full rounded-md text-gray-700 border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            onChange={handleValue}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-md flex justify-center"
                    >
                        Sign in
                    </button>
                </form>

                <footer className="mt-10 text-xs text-gray-400 text-center">
                    © 2025 ALL RIGHTS RESERVED
                </footer>
            </div>
        </div>
    )
}

export default Login
