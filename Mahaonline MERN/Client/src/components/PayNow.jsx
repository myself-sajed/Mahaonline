import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../css/PayNow.css'
import Title from './Title'
import Axios from 'axios'
import PageNotFound from './PageNotFound'

const PayNow = () => {

    const [validUrl, setValidUrl] = useState(false)

    // Navigation
    const navigate = useNavigate()

    // First validate the url 
    useEffect(async function () {
        await Axios.post('http://localhost:4000/validatePaymentUrl', { vleId, appId, uploadId })
            .then((res) => {
                console.log(res.data);
                setValidUrl(res.data.error)

            }).catch(function (error) {
                console.log('Something went wrong', error);
            })
    }, [])


    const { vleId, appId, uploadId } = useParams()

    // On click of success button
    function paymentSuccessHandler(e) {
        e.preventDefault()
        Axios.post('http://localhost:4000/paymentHandler', { vleId, appId, uploadId, status: { status: 'success' } })
            .then(res => {
                console.log('Payment Success', res.data);
                console.log(res.data.message);
                navigate(`/applications/${vleId}`);
            }).catch(err => {
                console.log('Sorry! Something went wrong...');
            })

    }

    // On click of failure button
    function paymentFailureHandler(e) {
        e.preventDefault();
        Axios.post('http://localhost:4000/paymentHandler', { vleId, appId, uploadId, status: { status: 'fail' } })
            .then(res => {
                console.log('Payment failed', res.data);
                console.log(res.data.message);
                navigate('/home')
            }).catch(err => {
                console.log('Sorry! Something went wrong...');
                navigate('/home')
            })
    }


    return (
        <div className="pad mx-5 my-5">
            <Title docTitle='Payment Status' />
            {!validUrl ?
                <>
                    <h1 className="text-center">Choose Payment Status</h1>

                    <hr />
                    <div className="flex my-5">
                        <button type="button" className="btn  buttons btn-outline-success" onClick={paymentSuccessHandler}>Success</button>
                        <button type="button" className="btn buttons btn-outline-danger" onClick={paymentFailureHandler}>Fail</button>
                    </div></> : <div className="text-center"><h1 className="text-center text-danger">This url is invalid</h1>
                    <PageNotFound />
                </div>}
            <br /><br />
        </div>
    )
}

export default PayNow
