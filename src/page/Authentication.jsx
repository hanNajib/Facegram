import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { ax } from '../api/AxiosInstance'

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const nav = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const res = await ax.post("auth/login", formData)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('facegram-username', res.data.user.username)
            setSuccess(res.data.message)
            setError('')
            nav('/')
        } catch (error) {
            setError(error.response.data.message)
            setSuccess('')
        }
    }

    return (
        <>
            <Navbar />

            <main className="mt-5">
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-md-5">
                            {success && <div className="alert alert-success">{success}</div>}
                            {error && <div className="alert alert-danger">{error}</div>}
                            <div className="card">
                                <div className="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
                                    <h5 className="mb-0">Login</h5>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleLogin}>
                                        <div className="mb-2">
                                            <label htmlFor="username">Username</label>
                                            <input type="text" className="form-control" id="username" name="username" onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))} />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" className="form-control" id="password" name="password" onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))} />
                                        </div>

                                        <button type="submit" className="btn btn-primary w-100">
                                            Login
                                        </button>
                                    </form>
                                </div>
                            </div>

                            <div className="text-center mt-4">
                                Don't have account? <Link to="/register">Register</Link>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

const Register = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        username: '',
        bio: '',
        password: '',
        is_private: false
    });
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const nav = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await ax.post("auth/register", formData);
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('facegram-username', res.data.user.username)
            setSuccess(res.data.message)
            setError('')
            nav('/')
        } catch (error) {
            setError(error.response.data.message)
            setSuccess('')
        }
    }

    return (
        <>
            <Navbar />


            <main className="mt-5">
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-md-5">
                            {success && <div className='alert alert-success'>{success}</div>}
                            {error && <div className='alert alert-danger'>{error}</div>}
                            <div className="card">
                                <div className="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
                                    <h5 className="mb-0">Register</h5>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleRegister}>
                                        <div className="mb-2">
                                            <label htmlFor="full_name">Full Name</label>
                                            <input type="text" className="form-control" id="full_name" name="full_name" onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))} />
                                        </div>

                                        <div className="mb-2">
                                            <label htmlFor="username">Username</label>
                                            <input type="text" className="form-control" id="username" name="username" onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))} />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" className="form-control" id="password" name="password" onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))} />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="bio">Bio</label>
                                            <textarea name="bio" id="bio" cols="30" rows="3" className="form-control" onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}></textarea>
                                        </div>

                                        <div className="mb-3 d-flex align-items-center gap-2">
                                            <input type="checkbox" id="is_private" name="is_private" onChange={(e) => setFormData(prev => ({ ...prev, is_private: e.target.checked }))} />
                                            <label htmlFor="is_private">Private Account</label>
                                        </div>

                                        <button type="submit" className="btn btn-primary w-100">
                                            Register
                                        </button>
                                    </form>
                                </div>
                            </div>

                            <div className="text-center mt-4">
                                Already have an account? <Link to="/login">Login</Link>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export { Login, Register }