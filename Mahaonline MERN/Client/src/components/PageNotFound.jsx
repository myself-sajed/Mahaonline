import React from 'react'
import Title from './Title'

const PageNotFound = () => {
    return (
        <div className="pad mx-5 my-5">
            <Title docTitle="Mahaonline : Page Not Found" />
            <h1>Sorry</h1>
            <h4>The page you're looking for is not available <br /> or may be internal server error. </h4>
        </div>
    )
}

export default PageNotFound
