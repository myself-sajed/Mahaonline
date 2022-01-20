import React from 'react'
import Title from './Title'
import '../css/TrackApplication.css'
import { useParams } from 'react-router-dom'

const TrackApplication = ({ at }) => {

    // Numbers = 1. 10
    //           2. 40
    //           3. 70
    //           5. 100

    // Test URL 
    //http://localhost:3000/trackApplication/61d87bd9e29b1f5337891baa

    const { vleId, appId } = useParams()


    return (
        <div className="pad mx-5">
            <Title docTitle='Home' />

            <h1 className="pad mx-5 text-center my-5">Your Application here</h1>
            <p className="text-center text-muted">Application ID : {appId}</p>

            <br />
            <div className="card border border-primary px-5 py-3">

                <h5 className="card-title text-center">Your Income Certificate is <b>Pending at Tehsildar</b></h5>
                <br />
                <div class="progress">
                    <div class="progress-bar" role="progressbar" style={{ width: `10%` }} aria-valuenow={at} aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <div className="state">
                    <span>Pending at Tehsil Clerk</span>
                    <span>Pending at Aval Karkoon</span>
                    <span>Pending at Tehsildar</span>
                    <span>Approved</span>
                </div>
            </div>
            <br /><br />
        </div>

    )
}

export default TrackApplication
