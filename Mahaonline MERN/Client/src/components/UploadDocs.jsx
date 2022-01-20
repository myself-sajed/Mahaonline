import React, { useEffect, useRef } from 'react'
import Range from './Range'
import Required from './Required'
import Title from './Title'
import '../css/UploadDocs.css'
import { useState } from 'react'
import Axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import jwt from 'jsonwebtoken'

// Firebase related imports
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../firebase/config";


const UploadDocs = () => {

    // Navigate
    const navigate = useNavigate()

    const { vleId, appId } = useParams()
    console.log(vleId, appId);
    const [invalidPage, setInvalidPage] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    // Progress tracking
    const [send, setSend] = useState(false)

    // response states
    const [res, setRes] = useState(null)


    // Redirection effect
    useEffect(() => {
        if (res !== null) {
            navigate(`/uploadedDocuments/${vleId}/${appId}/${res.documents._id}`)
        }
    }, res)

    // useEffect(() => {
    //     if (errorMessage != null || invalidPage === true) {
    //         setTimeout(() => {
    //             navigate(`/home`)
    //         }, 3500)
    //     }
    // }, [errorMessage, invalidPage])

    // this hook checks the url and set the validity or authentication of page
    useEffect(function () {
        async function checkAuth() {
            await Axios.post('http://localhost:4000/checkAuth', { appId: appId }).then(function (res) {
                console.log(res.data.message);
                if (res.data.message === 'valid') {
                    console.log('This page is valid');
                } else {
                    console.log('This page is invalid');
                    setTimeout(function () {
                        setInvalidPage(true);
                        setErrorMessage(res.data.error);
                        console.log(invalidPage);
                    }, 1500)
                }
            })
        }
        checkAuth();
    }, [])



    // First authenticate user
    useEffect(async function () {
        const token = localStorage.getItem('token')

        if (!token) {

            navigate('/')

        }
    }, []);

    // Initializing states

    const [selfDeclaration, setSelfDeclaration] = useState('')
    const [aadhar, setAadhar] = useState('')
    const [voter, setVoter] = useState('')
    const [itr, setItr] = useState('')
    const [disability, setDisability] = useState('')
    const [ration, setRation] = useState('')


    // Function for uploading documents on upload document button click that includes :
    // 1. Upload documents to Firebase storage
    // 2. Upload document urls to MongoDB storage

    function uploadDocuments(e) {
        e.preventDefault();

        // A valid link
        // http://localhost:3000/uploadDocuments/61d87bd9e29b1f5337891baa/61daa7b7733b89f3b2220209

        // Initializing array of documents which will be uploaded to the server
        const documentArray = [{ file: selfDeclaration, name: 'selfDeclaration', i: 1 }, { file: aadhar, name: 'aadhar', i: 2 }, { file: voter, name: 'voter', i: 3 }, { file: itr, name: 'itr', i: 4 }, { file: disability, name: 'disability', i: 5 }, { file: ration, name: 'ration', i: 6 }]

        // This array will be sent to the server
        const uploadArray = [];

        setSend(true);
        documentArray.forEach(async function (document) {
            if (document.file) {

                // Sending documents to firebase store
                const fileName = document.name + new Date().getTime() + document.file.name;
                const storageRef = ref(
                    storage,
                    `/application/${appId}/${fileName}`
                );
                const uploadTask = uploadBytesResumable(storageRef, document.file);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const uploaded = Math.floor(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                    },
                    (error) => {
                        console.log(error);
                    },
                    async () => {
                        await getDownloadURL(uploadTask.snapshot.ref).then((url) => {

                            uploadArray.push({ filename: document.name, fileUrl: url, file: document.file });

                            if (uploadArray.length === 6) {

                                uploadArray.push({ refApplication: appId, refVle: vleId, filename: 'vleDetails' });

                                // Sending uploadArray to server

                                console.log('Sending');

                                Axios.post('http://localhost:4000/upload/', uploadArray)
                                    .then(function (response) {
                                        setSend(false);
                                        setRes(response.data)
                                    })
                                    .catch(function (err) {
                                    });
                            }
                        });

                    }
                );
            } else {
                uploadArray.push({ filename: document.name, fileUrl: 'null', file: document.file });

                console.log('individual', uploadArray);
                if (uploadArray.length === 6) {
                    uploadArray.push({ refApplication: appId, refVle: vleId, fileName: 'vleDetails' });

                    // Sending uploadArray to server
                    console.log('Sending');

                    Axios.post('http://localhost:4000/upload/', uploadArray)
                        .then(function (response) {
                            setSend(false);
                            setRes(response.data)
                        })
                        .catch(function (err) {
                        });
                }
            }

        })



    }
    return (

        <>
            <Title docTitle='Upload Documents Stage' />
            <Range title="Upload Stage" />

            <div className="pad mx-5">

                <br /><br /><br />

                {!invalidPage ? <h2 className="text-center">Please upload following documents</h2> : <div className="text-center">

                    <h2 className="text-center text-danger">{errorMessage ? errorMessage : 'Sorry this page is invalid or does not exist'}</h2>
                    <Link to="/home" className="text-decoration-none">Go to <b>Home Page</b></Link>
                </div>}
                <hr /><br /><br />

                {/* {send ? <> <br /><br /> <Loading /> <br /><br /> </> : */}
                <>
                    {/* Upload Documents section starts  */}
                    <form onSubmit={uploadDocuments} id='form' encType="multipart/form-data">
                        <div className="flexme">
                            <div className="input-group mb-2 mx-5">
                                <h5>Self Declaration  <Required /></h5>
                                <div className="input-group">
                                    <input type="file" name="selfDeclaration" encType="multipart/form-data" className="form-control" id="inputGroupFile02" onChange={(e) => { setSelfDeclaration(e.target.files[0]); }} disabled={invalidPage} required />
                                </div>
                            </div>


                            <div className="input-group mb-2 mx-5 d-flex justify-content-between align-items-center">
                                <h5>Aadhar Card  <Required /></h5>
                                <div className="input-group">
                                    <input type="file" name="aadhar" className="form-control" id="inputGroupFile02" onChange={(e) => { setAadhar(e.target.files[0]); }} disabled={invalidPage} required />
                                </div>
                            </div>
                        </div>

                        <br /><br />

                        <div className="flexme">
                            <div className="input-group mb-2 mx-5 ">
                                <h5>Voter Card  <Required /></h5>
                                <div className="input-group">
                                    <input type="file" name="voter" className="form-control" id="inputGroupFile02" encType="multipart/form-data" onChange={(e) => { setVoter(e.target.files[0]); }} disabled={invalidPage} required />
                                </div>
                            </div>
                            <br /><br />
                            <div className="input-group mb-2 mx-5 ">
                                <h5>ITR  (if applicable)</h5>
                                <div className="input-group">
                                    <input type="file" name="itr" className="form-control" id="inputGroupFile02" encType="multipart/form-data" onChange={(e) => { setItr(e.target.files[0]); }} disabled={invalidPage} />
                                </div>
                            </div>
                        </div>
                        <br /><br />
                        <div className="flexme">
                            <div className="input-group mb-2 mx-5">
                                <h5>Disability Certificate  (if applicable)</h5>
                                <div className="input-group">
                                    <input type="file" name="disability" className="form-control" id="inputGroupFile02" encType="multipart/form-data" onChange={(e) => { setDisability(e.target.files[0]); }} disabled={invalidPage} />
                                </div>
                            </div>
                            <br /><br />
                            <div className="input-group mb-2 mx-5">
                                <h5>Ration Card  (if applicable)</h5>
                                <div className="input-group">
                                    <input type="file" className="form-control" id="inputGroupFile02" encType="multipart/form-data" onChange={(e) => { setRation(e.target.files[0]); }} disabled={invalidPage} />
                                </div>
                            </div>
                        </div>

                        <br /><br />
                        {/* Upload Documents section ends  */}

                        <hr />

                        {/* Submit Button */}

                        {invalidPage ? null : <div className="col-md-8 text-center">
                            {send ?
                                <>
                                    <button class="btn btn-primary" type="button" disabled>
                                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        Uploading Documents
                                    </button>
                                </>
                                :
                                <>
                                    <button className="btn btn-primary" type="submit">Upload Documents</button></>}

                        </div>}

                    </form >
                </>

                {/* } */}




                <br /><br /><br /><br />

            </div >
        </>
    )
}

export default UploadDocs
