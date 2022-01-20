import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Title from './Title'
import Axios from 'axios'
import Loading from './Loading'
import PageNotFound from './PageNotFound'

const DownloadCertificate = () => {

    // state for getting application data
    const [res, setRes] = useState(null)
    const [error, setError] = useState(null)

    // Params getter function
    const { appId } = useParams()

    useEffect(() => {

        Axios.post('http://localhost:4000/downloadCertificate', { appId })
            .then((resp) => {
                if (resp.data.message === 'success') {
                    setRes(resp.data.application)
                    console.log(res);
                }
                else if (resp.data.message === 'null') {
                    setError(true)
                    console.log('error');
                }

            })
    }

        , [])

    return (
        <>

            {!res ?
                <h1 className="text-center mx-5"><Loading /></h1>
                : error ?
                    <PageNotFound />
                    :
                    <div className="mx-5 pad" style={{ marginTop: '3.5rem', marginBottom: '3.5rem' }}>
                        <Title docTitle='Download Certificate : Mahaonline' />

                        <div className="certificate text-center">
                            <div className="card text-center">

                                {/* Image of Emblem */}

                                <img src={'/assets/images/emblem.png'} style={{ width: '128px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} alt="emblem of india" />

                                {/* Heading of Office */}
                                <h4 className="display-5">Office of Tehsildar</h4>

                                {/* Certificate Name */}

                                <h2>Certificate of Income</h2>
                                <h5>(Issued by Authorities in the State of Maharashtra)</h5>


                                <p >Certificate Number : <b>61d87bade29b1f5337891ba9</b></p>
                                <p className="my-5" style={{ margin: '0 5.5rem' }}>On submission of the proofs noted below, it is hereby certified that, <b>{res.applicationDetails.firstSalutation}. {res.applicationDetails.applicantName}</b> R/O <b>{res.applicationDetails.residenceDetails.Village}</b>,  Tehsil <b>{res.applicationDetails.residenceDetails.Taluka}</b>, District <b>{res.applicationDetails.residenceDetails.District}</b> in the State of 'MAHARASHTRA' within the territory of INDIA and she is a CITIZEN OF INDIA
                                    and has domiciled in the State of Maharashtra. The authority of Tehsil is giving Income certificate with details mentioned below :</p>

                                <br /><br />
                                Beneficiary Details :
                                {res.beneficiaryDetails.benRelation === 'Self' ? <b>Applicant for, {res.beneficiaryDetails.reason} </b> : `${res.beneficiaryDetails.salution}. ${res.beneficiaryDetails.benName} for ${res.beneficiaryDetails.reason} purpose.`}

                                <div className="text-start" style={{ marginLeft: '6rem' }}>
                                    Documents Submitted :
                                    <ol >
                                        <li>Self Declaration</li>
                                        <li>Aadhar</li>
                                        <li>Voter</li>
                                        <li>ITR</li>
                                        <li>Disability Certificate</li>
                                        <li>Ration</li>
                                    </ol>

                                </div>
                                <div className="d-flex" style={{ marginLeft: '6rem', marginTop: '5rem', marginBottom: '5rem' }}><span>Date of Issue : <b>17/01/2022</b></span><span className="mx-5">Place : <b>Parbhani</b></span></div>
                                <p>Check document validity at <b>http://localhost:3000/verify-certificate</b> </p>
                            </div>

                        </div>
                    </div>


            }

        </>
    )
}

export default DownloadCertificate
