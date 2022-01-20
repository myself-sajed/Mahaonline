import React, { useEffect, useState } from 'react'
import '../css/AllApplications.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import jwt from 'jsonwebtoken'
import Axios from 'axios';
import Loading from './Loading';
import Title from './Title';


const MahaonlineApplications = () => {




    // Response storing array of applications
    const [resArray, setResArray] = useState([])
    const [temp, setTemp] = useState(null)
    const [resError, setResError] = useState(null)

    // filter states
    const [appId, setAppId] = useState(null)
    // Navigate 
    const navigate = useNavigate()



    // UseEffect for checking the user authentication
    useEffect(() => {
        async function fetcher() {
            const token = localStorage.getItem('adminToken')
            if (token) {

                await Axios.get('http://localhost:4000/mahaonlineApplications')
                    .then(res => {
                        console.log(res.data.message);
                        console.log(res.data);
                        try {
                            if (res.data.app.length > 0) {
                                const newArray = res.data.app.reverse()
                                setResArray(newArray)
                            }
                            else if (res.data.app.length === 0) {
                                setResError('Data not found')
                            }
                            else {
                                setResError('Internal Server Error')
                            }
                        } catch (error) {
                            setResError('Data not found')
                        }
                    })
            }


            else {
                navigate('/adminLogin')
            }
        }
        fetcher()



    }, [])

    // Functions for filtering the items 

    function filterApplications() {
        if (appId) {
            const filteredArray = resArray.filter(function (item) {
                return item._id.toLowerCase().includes(appId.toLowerCase());
            })
            setTemp(resArray)
            setResArray(filteredArray)
        }
        else (
            setResArray(temp)
        )

    }

    function seeAllApplications() {
        if (temp === null) {
            setResArray(resArray)
        }
        setResArray(temp)
    }





    return (
        <div className=" my-5 ">
            <Title docTitle="Tehsil : Mahaonline Applications" />
            <br />
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 mx-auto mb-4">
                        <div className="section-title text-center ">
                            <img src={'/assets/images/mahalogo.png'} alt="" />
                            <h3 className="text-success"><b>Mahaonline Applications</b></h3>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-10 mx-auto">
                        <div className="career-search mb-60">
                            {resArray.length > 0 ? <form action="#" className="career-form mb-60" onSubmit={(e) => { e.preventDefault() }}>
                                <div className="row">
                                    <div className="col-md-6 col-lg-3 my-3">
                                        <div className="input-group position-relative">
                                            <input type="text" className="form-control" onChange={(e) => setAppId(e.target.value)} placeholder="Enter Application ID" id="keywords" />
                                        </div>
                                    </div>

                                    <div className="col-md-6 col-lg-3 my-3">
                                        <button type="button" className="btn btn-lg btn-block btn-light btn-custom" id="contact-submit" onClick={filterApplications}>
                                            Search
                                        </button>
                                        <button type="button" className="btn mx-2 btn-lg btn-block btn-light btn-custom" id="contact-submit" onClick={seeAllApplications}>
                                            See All
                                        </button>
                                    </div>
                                </div>
                            </form> : null}

                            {/* Application Card starts here.  */}

                            {resArray.length > 0 ? resArray.map(function (item) {
                                return <div className="filter-result" key={item._id}>
                                    <br />
                                    <div className="job-box d-md-flex align-items-center justify-content-between mb-30">
                                        <div className="job-left my-4 d-md-flex align-items-center flex-wrap">
                                            <div className="img-holder mr-md-4 mb-md-0 mb-4 mx-auto mx-md-0 d-md-none d-lg-flex">
                                                {item.incomeDetails.incomeYear}
                                            </div>
                                            <div className="job-content">
                                                <h2 className="text-center my-3"><Link to={`/mahaonline/${item._id}`} className="text-center text-md-left ms-5">{item._id}</Link></h2>
                                                <h5 className="text-center text-md-left ms-5">{item.applicationDetails.applicantName}</h5>
                                                <ul className="d-md-flex flex-wrap text-capitalize ff-open-sans">
                                                    <li className="mr-md-4 mx-3">
                                                        {item.applicationDetails.residenceDetails.Village}
                                                    </li>
                                                    <li className="mr-md-4 mx-3">
                                                        {new Date(item.createdAt).toLocaleString()}
                                                    </li>
                                                    <li className="mr-md-4 mx-3">
                                                        {item.pendingAt}
                                                    </li>

                                                </ul>
                                            </div>
                                        </div>
                                        <div className="job-right my-4 flex-shrink-0">

                                            <button className="btn btn-primary"><Link className="text-decoration-none text-white" to={`/mahaonline/${item._id}`}>See More</Link></button>




                                        </div>
                                    </div>
                                </div>
                            })
                                :
                                resArray.length === 0 ? <h3 className="my-3 text-center">Applications not found. Go to <Link to="/home">Home</Link></h3> :


                                    <>
                                        <br /><br />
                                        <Loading />
                                    </>
                            }
                            {/* Application Card ends here.  */}

                        </div>


                    </div>
                </div>

            </div>
        </div>
    )
}

export default MahaonlineApplications
