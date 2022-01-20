import React from 'react'
import { Link } from 'react-router-dom'

const MahaNav = () => {

    return (
        <div className="text-center" style={{ backgroundColor: '#0a0a5e', height: '9.5rem' }}>
            <Link to="#"><img src="/assets/images/Mahaonlinelogo.png" className="my-2" alt="mahaonline logo" /></Link>
            <p className="text-white" id="vleName"></p>

        </div>
    )
}

export default MahaNav
