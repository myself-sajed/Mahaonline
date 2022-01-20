import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div >
            <nav className="navbar navbar-light bg-light">
                <div className="container">
                    <Link className="navbar-brand" to="#">
                        <img src="/assets/images/mahalogo.png" alt="" />
                    </Link>
                    <p>Mahaonline &copy; 2020-2022. All rights reserved</p>
                </div>
            </nav>
        </div>
    )
}

export default Footer
