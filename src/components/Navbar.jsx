import React from 'react'
import { ax } from '../api/AxiosInstance'
import { Link } from 'react-router-dom';

const Navbar = () => {
    const username = localStorage.getItem('facegram-username');
    if(!username) {
        localStorage.removeItem('token')
    }
    const isLoggedIn = localStorage.getItem('token');
    const handleLogout = async () => {
        try {
            const res = await ax.post("auth/logout");
            console.log(res)
            localStorage.removeItem('token')
            localStorage.removeItem('facegram-username')
            window.location.href = "/login"
        } catch (error) {
            
        }
    }
    return isLoggedIn ? (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
                <div className="container">
                    <a className="navbar-brand" href="homepage.html">Facegram</a>
                    <div className="navbar-nav">
                        <Link className='nav-link' to={"profile/" + username}>@{username}</Link>
                        <a className="nav-link" style={{ cursor: 'pointer'}} onClick={handleLogout}>Logout</a>
                    </div>
                </div>
            </nav>
        </>
    ) : (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
                <div className="container">
                    <Link className="navbar-brand m-auto" to="/">Facegram</Link>
                </div>
            </nav>
        </>
    )
}

export default Navbar