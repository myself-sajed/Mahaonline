import React, { useEffect, useState } from 'react'
import '../css/AllApplications.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import jwt from 'jsonwebtoken'
import Axios from 'axios';
import Loading from './Loading';
import Title from './Title';


const AllApplications = () => {

    // states for managing filters
    const [fName, setFName] = useState('')


    // Response storing array of applications
    const [resArray, setResArray] = useState([])
    const [temp, setTemp] = useState(resArray)

    // Navigate 
    const navigate = useNavigate()

    // Parameter getter from useParams
    const { vleId } = useParams()

    // UseEffect for checking the user authentication
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {

            const decoded = jwt.verify(token, 'SAJED')
            console.log('decoded, id', decoded, vleId);
            if (decoded.id === vleId) {
                console.log('matched');
                Axios.post('http://localhost:4000/auth/applications', decoded).then(function (response) {
                    if (response.data.message === 'authenticated') {

                        // response.data.applications is an array of all the applications related to the corresponding vle id
                        const newArray = response.data.applications.filter(function (item) { return item.payment === true })
                        const reversedArray = newArray.reverse()
                        setResArray(reversedArray);

                    }
                    else if (response.data.message === 'unauthenticated') {
                        console.log(response.data.message);
                        navigate('/home')
                    }

                })
            }
            else {
                console.log('not matched');
                navigate('/home')
            }


        } else {
            navigate('/')

        }



    }, [])

    // Functions for filtering the items 
    function filterApplications() {

        if (fName) {
            const filteredArray = resArray.filter(function (item) {
                return item.applicationDetails.applicantName.toLowerCase().includes(fName.toLowerCase());
            })
            setTemp(resArray)
            setResArray(filteredArray)
        }
        else (
            setResArray(temp)
        )
    }

    return (
        <div className=" my-5 ">
            <Title docTitle="All Applications" />
            <br />
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 mx-auto mb-4">
                        <div className="section-title text-center ">
                            <h2 className="top-c-sep">All Applications</h2>
                            <p className="text-muted">VLE ID : <b>{vleId}</b></p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-10 mx-auto">
                        <div className="career-search mb-60">

                            <form action="#" className="career-form mb-60">
                                <div className="row">
                                    <div className="col-md-6 col-lg-3 my-3">
                                        <div className="input-group position-relative">
                                            <input type="text" className="form-control" value={fName} onChange={(e) => setFName(e.target.value)} placeholder="Enter Name" id="keywords" />
                                        </div>
                                    </div>

                                    <div className="col-md-6 col-lg-3 my-3">
                                        <button type="button" className="btn btn-lg btn-block btn-light btn-custom" id="contact-submit" onClick={filterApplications}>
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </form>

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
                                                <h5 className=" ms-5 ">{item.applicationDetails.applicantName}</h5>
                                                <p className="text-muted ms-5 ">Application ID : {item._id}</p>
                                                <ul className="d-md-flex flex-wrap text-capitalize ff-open-sans">
                                                    <li className="mr-md-4 mx-3">
                                                        {item.applicationDetails.residenceDetails.Village}
                                                    </li>
                                                    <li className="mr-md-4 mx-3">
                                                        {new Date(item.createdAt).toLocaleString()}
                                                    </li>
                                                    <li className="mr-md-4 mx-3">
                                                        {item.rejection === true ? <p className="text-danger">Rejected</p> : item.pendingAt === 'Approved' ? <span className="text-success">Approved</span> : item.pendingAt}
                                                    </li>

                                                </ul>
                                                {item.rejection === true ? <p className="ms-5" style={{ width: '700px', wordWrap: 'break-word' }}><span className="">Reason of rejection</span> : <b>{item.rejectionReason}</b></p> : null}
                                            </div>
                                        </div>
                                        <div className="job-right my-4 flex-shrink-0">

                                            {item.pendingAt === 'Approved' ? <button className="btn btn-primary"><Link className="text-decoration-none  text-white" to={`/downloadCertificate/${item._id}`}>Download</Link></button> : <button className="btn btn-primary"><Link className="text-decoration-none text-white" to={`/trackApplication/${vleId}/${item._id}`}>See More</Link></button>}


                                        </div>
                                    </div>
                                </div>
                            })
                                :
                                resArray.length === 0 ? <Loading className="my-5" /> :


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

export default AllApplications
