import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import Range from './Range';
import '../css/UploadedDocuments.css'
import Loading from './Loading';
import Title from './Title';


const UploadedDocuments = () => {

    // test url
    // http://localhost:3000/uploadedDocuments/61d87bade29b1f5337891ba9/61dc28e879a4b0418466226d/61dc2be6ca06b9d1d7e302c2

    // UseNavigate
    const navigate = useNavigate()
    const { vleId, appId, uploadId } = useParams()

    //Response handle state
    const [res, setRes] = useState(null)

    useEffect(function () {
        Axios.post('http://localhost:4000/validatePaymentUrl', { vleId, appId, uploadId })
            .then((res) => {
                console.log(res.data.data);
                setRes(res.data.data.getUrls)
                console.log('This is response', res);
            }).catch(function (error) {
                console.log('Something went wrong', error);
                setRes(false)
            })
    }, [])

    useEffect(() => {
        if (res === false) {
            navigate('/home')
        }
    }, [res])


    // For going to payment page
    function goToPayment(e) {
        e.preventDefault();
        navigate(`/payment/${vleId}/${appId}/${uploadId}`)
    }

    // for going to reupload the documents
    function goBack(e) {
        e.preventDefault();
        navigate(`/uploadDocuments/${vleId}/${appId}`)
    }

    return (
        <div className="pad mx-4">
            <Range title="Upload Stage" />
            <Title docTitle='Check uploaded documents' />

            <br /><br />
            <div className="container bootstrap snippets bootdey " >

                {res === null ? <Loading /> : <div className="row">
                    <h2 className="text-center">Your uploaded documents are listed below</h2>
                    <br />
                    <hr />
                    <br />
                    <br /><br />
                    {res.aadhar === 'null' ? null : <div className="media">
                        <div className="row">
                            <div className="media-img col-sm-4 col-md-3  col-lg-3">
                                <div className="img-overlay">
                                    <a href={res.aadhar} rel="noreferrer" target="_blank" className="btn btn-primary me-3">Open</a>
                                </div>
                                {res.aadhar.includes('.pdf') ? <iframe title={res.aadhar} src={res.aadhar} className="port-image"
                                    frameborder="0"></iframe> : <img className="port-image" src={res.aadhar} alt="img" />}



                            </div>
                            <div className="col-sm-8 col-md-9 col-lg-9">
                                <h3>
                                    <h3 className="mt-4">
                                        Aadhar
                                    </h3>
                                </h3>

                                <p>
                                    Upload time : <span className="text-bold">{res.createdAt}</span>
                                </p>
                            </div>
                        </div>
                    </div>}
                    {res.voter === 'null' ? null : <div className="media">
                        <div className="row">
                            <div className="media-img col-sm-4 col-md-3  col-lg-3">
                                <div className="img-overlay">
                                    <a href={res.voter} rel="noreferrer" target="_blank" className="btn btn-primary">Open</a>
                                </div>

                                {res.voter.includes('.pdf') ? <iframe title={res.aadhar} src={res.voter} className="port-image"
                                    frameborder="0"></iframe> : <img className="port-image" src={res.voter} alt="img" />}

                            </div>
                            <div className="col-sm-8 col-md-9 col-lg-9">
                                <h3>
                                    <h3 className="mt-4">
                                        Voter
                                    </h3>
                                </h3>

                                <p>
                                    Upload time : <span className="text-bold">{res.createdAt}</span>
                                </p>
                            </div>
                        </div>
                    </div>}
                    {res.selfDeclaration === 'null' ? null : <div className="media">
                        <div className="row">
                            <div className="media-img col-sm-4 col-md-3  col-lg-3">
                                <div className="img-overlay">
                                    <a href={res.selfDeclaration} rel="noreferrer" target="_blank" className="btn btn-primary">Open</a>
                                </div>

                                {res.selfDeclaration.includes('.pdf') ? <iframe title={res.selfDeclaration} src={res.selfDeclaration} className="port-image"
                                    frameborder="0"></iframe> : <img className="port-image" src={res.selfDeclaration} alt="img" />}
                            </div>
                            <div className="col-sm-8 col-md-9 col-lg-9">
                                <h3>
                                    <h3 className="mt-4">
                                        Self Declaration
                                    </h3>
                                </h3>

                                <p>
                                    Upload time : <span className="text-bold">{res.createdAt}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    }
                    {res.itr === 'null' ? '' : <div className="media">
                        <div className="row">
                            <div className="media-img col-sm-4 col-md-3  col-lg-3">
                                <div className="img-overlay">
                                    <a href={res.itr} rel="noreferrer" target="_blank" className="btn btn-primary ">Open</a>
                                </div>

                                {res.itr.includes('.pdf') ? <iframe title={res.itr} src={res.itr} className="port-image"
                                    frameborder="0"></iframe> : <img className="port-image" src={res.itr} alt="img" />}
                            </div>
                            <div className="col-sm-8 col-md-9 col-lg-9">
                                <h3>
                                    <h3 className="mt-4">
                                        ITR
                                    </h3>
                                </h3>

                                <p>
                                    Upload time : <span className="text-bold">{res.createdAt}</span>
                                </p>
                            </div>
                        </div>
                    </div>}
                    {res.disability === 'null' ? '' : <div className="media">
                        <div className="row">
                            <div className="media-img col-sm-4 col-md-3  col-lg-3">
                                <div className="img-overlay">
                                    <a href={res.disability} rel="noreferrer" target="_blank" className="btn btn-primary">Open</a>
                                </div>
                                {res.disability.includes('.pdf') ? <iframe title={res.disability} src={res.disability} className="port-image"
                                    frameborder="0"></iframe> : <img className="port-image" src={res.disability} alt="img" />}
                            </div>
                            <div className="col-sm-8 col-md-9 col-lg-9">
                                <h3>
                                    <h3 className="mt-4">
                                        Disability Certificate
                                    </h3>
                                </h3>

                                <p>
                                    Upload time : <span className="text-bold">{res.createdAt}</span>
                                </p>
                            </div>
                        </div>
                    </div>}
                    {res.ration === 'null' ? '' : <div className="media">
                        <div className="row">
                            <div className="media-img col-sm-4 col-md-3  col-lg-3">
                                <div className="img-overlay">
                                    <a href={res.ration} rel="noreferrer" target="_blank" className="btn btn-primary">Open</a>
                                </div>
                                {res.ration.includes('.pdf') ? <iframe title={res.ration} src={res.ration} className="port-image"
                                    frameborder="0"></iframe> : <img className="port-image" src={res.ration} alt="img" />}
                            </div>
                            <div className="col-sm-8 col-md-9 col-lg-9">
                                <h3>
                                    <h3 className="mt-4">
                                        Ration
                                    </h3>
                                </h3>

                                <p>
                                    Upload time : <span className="text-bold">{res.createdAt}</span>
                                </p>
                            </div>
                        </div>
                    </div>}
                </div>}
            </div>
            <br /><hr /><br />
            <div className="text-center">
                <button className="btn btn-primary mb-5 mx-3" onClick={goBack}>Reupload</button>
                <button className="btn btn-primary mb-5" onClick={goToPayment}>Proceed to Payment</button>
            </div>

        </div>
    )
}

export default UploadedDocuments
