import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Title from './Title'
import '../css/Payment.css'
import Axios from 'axios'
import jwt from 'jsonwebtoken'
const SignIn = () => {

    // Initializing states
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState('')


    // Navigations 
    const navigate = useNavigate()


    // For handeling submit of login form
    function handleSubmit(e) {
        e.preventDefault()

        const data = { email, password }
        Axios.post('http://localhost:4000/login', data)
            .then(function (response) {

                // Handle login here
                if (response.data.status === 'ok' && response.data.token) {
                    localStorage.setItem('token', response.data.token)
                    localStorage.removeItem('adminToken')
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
        const token = localStorage.getItem('token')

        if (token) {

            const decoded = jwt.verify(token, 'SAJED')
            console.log(decoded);

            Axios.post('http://localhost:4000/auth', decoded).then(function (response) {
                console.log(response.data);
                if (response.data === 'authenticated') {
                    navigate('/home')

                }
                else if (response.data === 'unauthenticated') {

                    navigate('/')
                }

            })

        } else {
            console.log('You are not authenticated');
            navigate('/')

        }

    }, []);

    useEffect(function () {
        setTimeout(function () {
            setLoginError('')
        }, 3500)
    })



    return (
        <>
            <Title docTitle='Log in as VLE' />

            <br /><br />
            <div className="pad mx-5 text-center">
                <div className="pay__div">
                    <img src="/assets/images/mahalogo.png" alt="" />
                    <h3>Log in to Mahaonline</h3>
                    <hr className="mx-5 " />
                    <div className="mx-5  text-center form-signin d-flex">
                        <div className="col-md-6 mt-5"><p className="display-4">Admin ? <br /> <b><Link to="/adminLogin" className="text-decoration-none">Login as Admin</Link></b></p></div>

                        <form className='col-md-4 mt-5' onSubmit={handleSubmit}>
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
                            <button className="w-100 btn btn-lg btn-primary " type="submit">Sign in</button>
                        </form>
                    </div>
                </div>
                <br /><br />
            </div>
        </>
    )
}

export default SignIn
