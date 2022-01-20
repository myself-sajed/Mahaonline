import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../css/SingleMahaonline.css'
import Loading from './Loading'
import Axios from 'axios';
import Title from './Title'

const SingleMahaonline = () => {

    // state to handle rejection of application
    const [rejectionReason, setRejectionReason] = useState(null)

    //Navigation 
    const navigate = useNavigate()
    // response handeling state
    const [resApp, setResApp] = useState(null)
    const [resDoc, setResDoc] = useState(null)
    const [resError, setResError] = useState(null)
    const [isRejectionSend, setIsRejectionSend] = useState(null)
    const [isApproved, setIsApproved] = useState(null)
    const [isApprovedNot, setIsApprovedNot] = useState(null)


    // for getting app Id
    const { appId } = useParams()


    // Application rejectiion handler 
    function handleApplicationRejection(e) {
        e.preventDefault();
        console.log(rejectionReason);
        Axios.post('http://localhost:4000/handleApplicationRejection', { appId, rejectionReason })
            .then((res) => {
                if (res.data.message === 'success') {
                    setIsRejectionSend(true)

                    setTimeout(() => {
                        navigate('/mahaonlineApplications')
                    }, 3000);
                }
                else {
                    setIsRejectionSend(false)
                }
            })

    }


    // Application approval handler 

    function handleApplicationApproval(e) {
        e.preventDefault();
        const approval = async () => {
            await Axios.post('http://localhost:4000/approvalHandler', { appId })
                .then(function (res) {

                    if (res.data.message === 'success') {
                        setIsApproved(true)
                    } else {
                        setTimeout(() => {
                            setIsApprovedNot(true)
                        }, 2500);
                    }
                    setTimeout(() => {
                        navigate('/mahaonlineApplications')
                    }, 3000);
                }).catch(setIsApproved(false));
        }
        approval()
    }

    function showTextarea() {
        console.log('showTextarea');
        const myform = document.getElementById('myform')
        myform.className = ''
    }

    useEffect(() => {
        Axios.post('http://localhost:4000/singleMahaonlineApplication', { appId })
            .then((res) => {
                if (res.data.message === 'success') {
                    console.log(resApp);
                    setResApp(res.data.application)
                    setResDoc(res.data.document)
                    console.log(resDoc);

                }
                else {
                    setResError(res.data.message)
                }
            })
    }, [])



    return (
        <div className="pad mx-4">
            <Title docTitle="Tehsil : Verification" />
            <div class="main__container__maha mt-5">

                {/* <!-- Application content --> */}

                <div class="container__half">
                    <h1 className="text-primary ms-1 mb-2">Application</h1>
                    <div className="col-md-11 mt-5">
                        <div className="mb-3">
                            {resApp === null || resError ? <h1>{resError}</h1>
                                :
                                resApp ? <div className="internal">

                                    {/* APPLICANT DETAILS */}
                                    <h4 className="my-2 text-muted">1. Applicant Details</h4>
                                    <hr />
                                    <div >
                                        <div className="row ">

                                            <div className="col-sm-6">
                                                <h6 className="mb-0">Application ID</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {resApp._id}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row ">

                                            <div className="col-sm-6">
                                                <h6 className="mb-0">Full Name</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {resApp.applicationDetails.firstSalutation}. {resApp.applicationDetails.applicantName}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">

                                            <div className="col-sm-6">
                                                <h6 className="mb-0">Mobile</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {resApp.applicationDetails.mobile}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <h6 className="mb-0">Residence</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {resApp.applicationDetails.residenceDetails.Village}, {resApp.applicationDetails.residenceDetails.Taluka},
                                                {resApp.applicationDetails.residenceDetails.District}
                                            </div>
                                        </div>

                                    </div>

                                    {/* APPLICANT DETAIL ENDS */}

                                    {/* BENEFICIARY_DETAILS */}
                                    <h4 className="my-2 text-muted mt-5">2. Beneficiary Details</h4>
                                    <hr />
                                    <div >
                                        <div className="row ">

                                            <div className="col-sm-6">
                                                <h6 className="mb-0">Relation of Applicant </h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {resApp.beneficiaryDetails.benRelation}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row ">

                                            <div className="col-sm-6">
                                                <h6 className="mb-0">Full Name</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {resApp.beneficiaryDetails.benRelation === 'Self' ?
                                                    `${resApp.applicationDetails.firstSalutation}. ${resApp.applicationDetails.applicantName}` : `${resApp.beneficiaryDetails.benSalutation}. ${resApp.beneficiaryDetails.benName} `

                                                }
                                            </div>
                                        </div>
                                        <hr />

                                        <div className="row">
                                            <div className="col-sm-6">
                                                <h6 className="mb-0">Reason for Application</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {resApp.beneficiaryDetails.reason}
                                            </div>
                                        </div>

                                    </div>

                                    {/* BENEFICIARY_DETAILS ENDS */}

                                    <h4 className="my-2 text-muted mt-5">3. Income Details</h4>
                                    <hr />
                                    <div >
                                        <div className="row ">

                                            <div className="col-sm-6">
                                                <h6 className="mb-0">Applicant Occupation</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {resApp.incomeDetails.twoIncomeDetails.Occupation}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row ">

                                            <div className="col-sm-6">
                                                <h6 className="mb-0">Declaration Type</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {resApp.incomeDetails.twoIncomeDetails.DeclarationType}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">

                                            <div className="col-sm-6">
                                                <h6 className="mb-0">Income Year</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {resApp.incomeDetails.incomeYear}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <h6 className="mb-0">Income</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {resApp.incomeDetails.income.income1}  {resApp.incomeDetails.income.income2}  {resApp.incomeDetails.income.income3}
                                            </div>
                                        </div>

                                    </div>



                                    <br /><br />
                                    {isApproved === true ? <p className="text-success">Application Approved Successfully</p> : isApprovedNot === true ? <p className="text-danger">Error occured while approving application  </p> : null}
                                    <div className="d-flex flex-start mb-2">

                                        <button className="btn btn-success me-3" onClick={handleApplicationApproval}>Approve</button>
                                        <button className="btn btn-outline-danger" onClick={showTextarea}>Reject</button>

                                    </div>
                                    <div className="rejection__reason" id="rejection__reason">
                                        <form onSubmit={handleApplicationRejection} className="display__none" id="myform">
                                            <div class="form-floating">
                                                <textarea class="form-control" onChange={(e) => setRejectionReason(e.target.value)} placeholder="Leave a comment here" id="floatingTextarea" required></textarea>
                                                <label for="floatingTextarea">Reason of rejection</label>
                                            </div>
                                            <button type="submit" class="btn btn-outline-danger mt-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send-fill" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89.471-1.178-1.178.471L5.93 9.363l.338.215a.5.5 0 0 1 .154.154l.215.338 7.494-7.494Z"></path>
                                                </svg>
                                                Send to VLE
                                            </button>
                                            {isRejectionSend === true ? <p className="text-success my-2">Application sent back to VLE Successfully</p> : isRejectionSend === true ? <p className="text-danger">Error occured while sending to VLE</p> : null}

                                        </form>
                                    </div>


                                </div> : <Loading />
                            }
                        </div>





                    </div>
                </div>

                {/* <!-- Right content --> */}
                <div class="container__half ms-3 ">
                    <h1 className="text-primary mb-2 ms-3">Documents</h1>
                    {resDoc === null ? <Loading></Loading>
                        :
                        <div className="scroll">

                            {resDoc.selfDeclaration !== 'null' ?
                                <div>

                                    <p className="ms-5">Self Declaration</p>
                                    <hr />
                                    {resDoc.aadhar.includes('.pdf') ? <iframe src={resDoc.selfDeclaration} className="port-image"
                                        frameborder="0"></iframe> : <img className="img" src={resDoc.selfDeclaration} alt="img" />}


                                </div>
                                : null
                            }
                            {resDoc.aadhar !== 'null' ?
                                <div>

                                    <p className="ms-5">Aadhar</p>
                                    <hr />
                                    {resDoc.aadhar.includes('.pdf') ? <iframe src={resDoc.aadhar} className="port-image"
                                        frameborder="0"></iframe> : <img className="img" src={resDoc.aadhar} alt="img" />}


                                    {/* <img className="img" src={resDoc.aadhar} alt="" /> */}
                                </div>
                                : null
                            }
                            {resDoc.voter !== 'null' ?
                                <div>

                                    <p className="ms-5">Voter</p>
                                    <hr />
                                    {resDoc.voter.includes('.pdf') ? <iframe src={resDoc.voter} className="port-image"
                                        frameborder="0"></iframe> : <img className="img" src={resDoc.voter} alt="img" />}


                                    {/* <img className="img" src={resDoc.aadhar} alt="" /> */}
                                </div>
                                : null
                            }
                            {resDoc.itr !== 'null' ?
                                <div>

                                    <p className="ms-5">ITR</p>
                                    <hr />
                                    {resDoc.itr.includes('.pdf') ? <iframe src={resDoc.itr} className="port-image"
                                        frameborder="0"></iframe> : <img className="img" src={resDoc.itr} alt="img" />}


                                    {/* <img className="img" src={resDoc.aadhar} alt="" /> */}
                                </div>
                                : null
                            }
                            {resDoc.disability !== 'null' ?
                                <div>

                                    <p className="ms-5">Disability</p>
                                    <hr />
                                    {resDoc.disability.includes('.pdf') ? <iframe src={resDoc.disability} className="port-image"
                                        frameborder="0"></iframe> : <img className="img" src={resDoc.disability} alt="img" />}


                                    {/* <img className="img" src={resDoc.aadhar} alt="" /> */}
                                </div>
                                : null
                            }
                            {resDoc.ration !== 'null' ?
                                <div>

                                    <p className="ms-5">Ration</p>
                                    <hr />
                                    {resDoc.ration.includes('.pdf') ? <iframe src={resDoc.ration} className="port-image"
                                        frameborder="0"></iframe> : <img className="img" src={resDoc.ration} alt="img" />}


                                    {/* <img className="img" src={resDoc.aadhar} alt="" /> */}
                                </div>
                                : null
                            }

                        </div>
                    }
                </div>
            </div>
            <br /><br />
        </div>

    )
}

export default SingleMahaonline
