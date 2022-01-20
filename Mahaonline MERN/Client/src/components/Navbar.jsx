import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../css/Navbar.css'
import jwt from 'jsonwebtoken'


const Navbar = () => {



    const [vleId, setVleId] = useState(null)
    const [vleName, setVleName] = useState(null)
    const [adminName, setAdminName] = useState(null)

    useEffect(() => {

        const token = localStorage.getItem('token')
        const adminToken = localStorage.getItem('adminToken')
        if (token) {
            const decoded = jwt.decode(token, 'SAJED')
            setVleId(decoded.id)
            setVleName(decoded.name)
            document.getElementById('vleName').innerHTML = `Welcome, <b> ${vleName} </b>`
        }

        if (adminToken) {
            document.getElementById('vleName').innerHTML = `Tehsil Office, Parbhani - <b> Admin </b>`

        }


    })

    // Initializing navigation
    const navigate = useNavigate()


    // State for proper navigation bar behavior. see below code to understand
    const [isAuth, setIsAuth] = useState(null)
    const [isAdminAuth, setIsAdminAuth] = useState(null)

    function handleLogout(e) {
        localStorage.removeItem('token')
        localStorage.removeItem('adminToken')
        setIsAuth(false)
        setVleName(null)
        document.getElementById('vleName').innerText = ''
        navigate('/')
    }


    // Verifying token
    useEffect(function () {
        const token = localStorage.getItem('token')
        const adminToken = localStorage.getItem('adminToken')

        if (adminToken) {

            setIsAdminAuth(true)


        } else {
            setIsAdminAuth(false)

        }


        if (token) {

            setIsAuth(true)


        } else {
            setIsAuth(false)

        }

    });

    return (
        <>
            <div className="main__div pad mt-3">
                <div className="container navbar1">
                    <Link className="Link" id="home" to='/home'>Home</Link>
                    {isAuth ? <Link className="Link" id="apply" to='/apply'>Apply</Link> : null}
                    {isAdminAuth ? null : <Link className="Link" id="services" to='/services'>Services</Link>}
                    {isAuth || isAdminAuth ? <Link className="Link" id="contact" to="/" onClick={handleLogout}>Logout</Link> : <Link className="Link" id="contact" to='/'>Login</Link>}
                    {isAuth ? <Link className="Link" id="trackApplication" to={`/applications/${vleId}`}
                    >e-District Applications</Link> : null}
                    {isAdminAuth ? <Link className="Link" id="SeeApplications" to="/mahaonlineApplications" >Mahaonline Applications</Link> : null}
                </div>
                <div className="container navbar2">
                    <form className="d-flex me-2">
                        <input className="form-control border border-primary me-2 text-primary" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-primary" type="submit">Search</button>

                    </form>


                </div>
            </div>



        </>
    )
}

export default Navbar
