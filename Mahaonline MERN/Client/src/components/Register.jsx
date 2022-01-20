import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Title from './Title'
import '../css/Payment.css'
import Axios from 'axios'
import jwt from 'jsonwebtoken'

const Register = () => {

    // Initializing states
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState('')


    // Navigations 
    const navigate = useNavigate()


    // Admin login handler
    function adminLoginHandler(e) {
        e.preventDefault()

        const data = { email, password }
        Axios.post('http://localhost:4000/adminLogin', data)
            .then(function (response) {

                // Handle login here
                if (response.data.status === 'ok' && response.data.token) {
                    localStorage.setItem('adminToken', response.data.token)
                    localStorage.removeItem('token')
                    navigate('/home')
                }
                else if (response.data.status === 'notok') {
                    console.log('Please enter correct username/email or password');
                    setLoginError(response.data.message);
                }

            }).catch(function (error) {
                console.log('Something went wrong or Server must be unavailable');
                setLoginError('Something went wrong or Server must be unavailable');

            })

    }

    // To check the authentication of the token in localStorage
    useEffect(function () {
        const token = localStorage.getItem('adminToken')

        if (token) {

            const decoded = jwt.verify(token, 'SAJED')
            console.log(decoded);

            Axios.post('http://localhost:4000/adminauth', decoded).then(function (response) {
                console.log(response.data);
                if (response.data === 'authenticated') {
                    navigate('/home')

                }
                else if (response.data === 'unauthenticated') {

                    navigate('/adminLogin')

                }

            })

        } else {
            console.log('You are not authenticated');
            navigate('/adminLogin')

        }

    }, []);

    useEffect(function () {
        setTimeout(function () {
            setLoginError('')
        }, 3500)
    })



    return (
        <>
            <Title docTitle='Login as Admin' />

            <br /><br />
            <div className="pad mx-5 text-center">
                <div className="pay__div">
                    <img src="/assets/images/mahalogo.png" alt="" />
                    <h3>Login as Admin to Mahaonline</h3>
                    <hr className="mx-5 " />
                    <div className="mx-5  text-center form-signin d-flex">
                        <div className="col-md-6 mt-5"><p className="display-4">Are you a VLE?<br /><b><Link to="/" className="text-decoration-none">Log-in as a VLE</Link></b></p></div>

                        <form className='col-md-4 mt-5'>

                            <p className="text-center text-danger">{loginError}</p>
                            <div className="form-floating">
                                <input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" id="floatingInput" placeholder="name@example.com" required />
                                <label htmlFor="floatingInput">Email address</label>
                            </div>
                            <div className="form-floating">
                                <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" id="floatingPassword" placeholder="Password" required />
                                <label htmlFor="floatingPassword">Password</label>
                            </div>

                            <div className="checkbox mb-2 ">
                                <label>
                                    <input type="checkbox" value="remember-me" /> Remember me
                                </label>
                            </div>
                            <button className="w-100 btn btn-lg btn-primary" onClick={adminLoginHandler} type="submit">Admin Login</button>
                        </form>
                    </div>
                </div>
                <br /><br />
            </div>
        </>
    )
}

export default Register
