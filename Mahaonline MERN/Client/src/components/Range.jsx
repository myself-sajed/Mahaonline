import React from 'react'

const Range = ({ title }) => {
    return (
        <div className="pad mx-5">
            <h1 htmlFor="customRange3" className="form-label text-center mt-5 my-2"><b>{title}</b></h1>
            <p className="text-center text-muted">for Income Certificate</p>
            {/* <input type="range" className="form-range" min="0" max="3" step="1" id="customRange3" ></input> */}
        </div>
    )
}

export default Range
