import React, { useEffect } from 'react'
import Range from './Range'
import '../css/Payment.css'
import { useNavigate, useParams } from 'react-router-dom'
import Title from './Title'
import Axios from 'axios'
import { useState } from 'react'
import Loading from './Loading'

const Payment = () => {

    // A valid payment url for testing purposes
    // http://localhost:3000/payment/61d87bd9e29b1f5337891baa/61d9328755dd129c99b55073/61d932a655dd129c99b55079
    const { vleId, appId, uploadId } = useParams()
    console.log(vleId, appId, uploadId);

    // This state helps us to fill the data on this after server response
    const [res, setRes] = useState(null)

    const navigate = useNavigate()



    // Check the validation of the link
    useEffect(function () {
        Axios.post('http://localhost:4000/validatePaymentUrl', { vleId, appId, uploadId })
            .then((res) => {
                console.log(res.data.data);
                setRes(res.data.data.getDoc)
            }).catch(function (error) {
                console.log('Something went wrong', error);
            })
    }, [])

    // Function to handle after clicking pay now button 
    function handlePaymentPage(e) {
        e.preventDefault();
        navigate(`/paynow/${vleId}/${appId}/${uploadId}`)

    }



    return (
        <>
            <Title docTitle='Payment' />

            <Range title="Payment Stage" />
            <br /><br />
            <div className="pad mx-5 text-center">
                <div className="pay__div">
                    <img src="/assets/images/mahalogo.png" alt="" />
                    <h3>Application details so far</h3>
                    <hr className="mx-5 " />
                    <div className="mx-5">
                        {res === null ? <div><Loading /> <br /></div> : <> <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Sltn</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Income Yr</th>
                                    <th scope="col">Occupation</th>
                                    <th scope="col">Mobile</th>
                                    <th scope="col">Place</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{res.applicationDetails.firstSalutation}</td>
                                    <td>{res.applicationDetails.applicantName}</td>
                                    <td>{res.incomeDetails.incomeYear}</td>
                                    <td>{res.incomeDetails.twoIncomeDetails.Occupation}</td>
                                    <td>{res.applicationDetails.mobile}</td>
                                    <td>{res.applicationDetails.residenceDetails.Village}</td>
                                </tr>


                            </tbody>
                        </table>


                            <br />

                            <h3> Applicant Income </h3>


                            {res.incomeDetails.income.income1 ? <li> {res.incomeDetails.income.income1} </li> : null}
                            {res.incomeDetails.income.income2 ? <li> {res.incomeDetails.income.income2} </li> : null}
                            {res.incomeDetails.income.income3 ? <li> {res.incomeDetails.income.income3} </li> : null}

                            <br />
                            <h3> Fees to pay </h3>
                            <p>Rs. 34.89/- </p>
                        </>
                        }

                        <button onClick={handlePaymentPage} className="btn btn-dark mt-3 col-md-4">Pay Now</button>
                    </div>
                </div>
                <br /><br />
            </div>
        </>
    )
}

export default Payment
