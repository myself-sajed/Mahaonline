import React, { useEffect } from 'react'

const Title = ({ docTitle }) => {

    useEffect(() => {
        document.title = docTitle

    })

    return (
        <>
            {/* This Component is only to render title of pages  */}
        </>
    )
}

export default Title
