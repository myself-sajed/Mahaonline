import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../css/Home.css'
import Title from './Title'
import jwt from 'jsonwebtoken';

const Home = () => {

    const [vle, setVle] = useState(null)
    const [admin, setAdmin] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem('token')
        const adminToken = localStorage.getItem('adminToken')

        if (token) {
            const decoded = jwt.verify(token, 'SAJED')
            setVle(decoded)

        }
        if (adminToken) {
            const decoded = jwt.verify(adminToken, 'SAJED')
            setAdmin(decoded)
        }
    }, [])

    return (
        <>
            <Title docTitle='Home' />

            <div className="pad text-center my-5 ">

                {/* Heading */}
                <h1 className="heading">Welcome to Mahaonline</h1>
                <p className="subheading text-muted">Get your Income Certificate done in less than 2 days. Effortlessly!</p>
                {/* Heading */}


            </div>
            <hr />

            {/* Profile */}
            {vle || admin ? <div className="container">
                <h1 className="text-center text-primary">Profile</h1>
                <div className="main-body">



                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex flex-column align-items-center text-center">

                                        {vle ? <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="vle"
                                            className="rounded-circle" width="150" /> : <img src={'/assets/images/aslogo.jpg'} alt="Admin"
                                                className="rounded-circle" width="150" />}
                                        <div className="mt-3">
                                            <h4>{vle ? vle.name : admin.name} </h4>
                                            <p className="text-secondary mb-1">{vle ? vle.id : admin.id}</p>
                                            <p className="text-muted font-size-sm">{vle ? <p>Village Level Enterprenuer</p> : <p>Tehsil Office - Admin</p>}</p>

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-md-8">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Full Name</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {vle ? vle.name : admin.name}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Email</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {vle ? vle.email : admin.email}
                                        </div>
                                    </div>

                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">{vle ? `VLE Id ` : `Admin Id`}</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {vle ? vle.id : admin.id}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Place</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            Parbhani
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="d-flex flex-start mb-2">
                                        <button className="btn btn-primary me-3">Update password</button>
                                        <button className="btn btn-outline-primary">Analytics</button>
                                    </div>


                                </div>
                            </div>





                        </div>
                    </div>

                </div>
                <br /><hr />
            </div> : null}


            {/* Roadmap */}

            <div className="pad mx-5">
                <h1 className="text-center my-5"><b>Steps to get your Income Certificate</b></h1>
                <div className="container1">
                    <div className="container__line"></div>

                    <ul className="container__items">
                        <li className="container__item">
                            <div className="container__top">
                                <div className="container__circle"></div>

                                <div className="container__title">
                                    <h2>Application Form</h2>
                                </div>
                            </div>

                            <div className="container__desc">
                                Go to  <Link to="/apply" className="text-decoration-none">Apply for Income Certificate</Link> and start filling the form with correct details because it will be verified and displayed on the certificate.
                            </div>
                        </li>
                        <li className="container__item my-5">
                            <div className="container__top">
                                <div className="container__circle "></div>

                                <div className="container__title">
                                    <h2>Upload Documents</h2>
                                </div>
                            </div>

                            <div className="container__desc">
                                Upload the necessary, clear and valid documents for verification
                                <ol>
                                    <li>Self Declaration</li>
                                    <li>Aadhaar Card</li>
                                    <li>Voter Card</li>
                                    <li>Ration Card</li>
                                    <li>Salary Certificate (if applicable)</li>
                                    <li>Death Certificate (if applicable)</li>
                                    <li>Disability Certificate (if applicable)</li>

                                </ol>
                            </div>
                        </li>
                        <li className="container__item my-5">
                            <div className="container__top">
                                <div className="container__circle "></div>

                                <div className="container__title ">
                                    <h2>Payment</h2>
                                </div>
                            </div>

                            <div className="container__desc">
                                Pay the fees and relax!
                            </div>
                        </li>


                    </ul>
                </div>
            </div>

            {/* Roadmap */}

        </>
    )
}

export default Home
