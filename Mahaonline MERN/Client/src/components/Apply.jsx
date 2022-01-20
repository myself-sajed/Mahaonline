import Axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Range from './Range'
import Required from './Required'
import Title from './Title'
import jwt from 'jsonwebtoken';

const Apply = () => {

    // Navigate
    const navigate = useNavigate()
    const [decodedToken, setDecodedToken] = useState(null)

    // First authenticate user
    useEffect(function () {
        const token = localStorage.getItem('token')

        if (token) {

            const decoded = jwt.verify(token, 'SAJED')
            setDecodedToken(decoded)

            Axios.post('http://localhost:4000/auth', decoded).then(function (response) {
                if (response.data === 'authenticated') {
                    navigate('/apply')
                }
                else if (response.data === 'authenticated') {

                    navigate('/')
                }

            })

        } else {
            navigate('/')

        }




    }, []);

    // all the states required are defined here 

    // 1. First Salutation 
    const [firstSalutation, setFirstSalutation] = useState('Choose')

    // 2. Applicant Name
    const [applicantName, setApplicantName] = useState('')

    // 3. Mobile Phone 
    const [mobile, setMobile] = useState('')

    // 4. Residence Address
    const [residenceDetails, setResidence] = useState({})



    // 6. Income year declaration
    const [incomeYear, setIncomeYear] = useState('1 Yr')

    // 7. Income 
    const [income, setIncome] = useState({})


    // 9. Beneficiary Relation
    const [benRelation, setBenRelation] = useState('Choose')

    // 10. Beneficiary salution
    const [benSalutation, setBenSalutation] = useState('Self')


    // 11. Beneficiary Name
    const [benName, setBenName] = useState('Self')

    // 12. Reason
    const [reason, setReason] = useState('')

    // 13. Income Details
    const [twoIncomeDetails, settwoIncomeDetails] = useState({})


    // For handeling change in year of income form 3 to 1 and 1 to 3
    useEffect(() => {
        if (incomeYear === '1 Yr') {
            let dic = {
                income1: document.getElementById('income1').value,
                income2: '',
                income3: ''
            }

            setIncome(dic)
        }
    }, [incomeYear])



    // Function get Income On Change
    function getIncomeOnChange() {
        let dic = {
            income1: document.getElementById('income1').value,
            income2: document.getElementById('income2').value,
            income3: document.getElementById('income3').value
        }

        setIncome(dic)

    }

    // Function get Income Details On Change
    function gettwoIncomeDetailsOnChange() {
        let dic = {
            Occupation: document.getElementById('Occupation').value,
            DeclarationType: document.getElementById('DeclarationType').value
        }
        settwoIncomeDetails(dic)
    }

    // Function get Residence Details On Change
    function getResidenceDetailsOnChange() {
        let dic = {
            Village: document.getElementById('Village').value,
            Taluka: document.getElementById('Taluka').value,
            District: document.getElementById('District').value
        }
        setResidence(dic)
    }

    // function to show all formData
    async function submitFormData(e) {
        e.preventDefault()

        const formData = {
            applicationDetails: {
                firstSalutation: firstSalutation,
                applicantName: applicantName,
                mobile: mobile,
                residenceDetails: residenceDetails,
            },

            incomeDetails: {
                twoIncomeDetails: twoIncomeDetails,
                incomeYear: incomeYear,
                income: income

            },
            beneficiaryDetails: {
                benSalutation: benSalutation,
                benRelation: benRelation,
                benName: benName,
                reason: reason
            },
            vleId: decodedToken.id
        }


        // Send form data to server
        await Axios.post('http://localhost:4000/saveFormData', formData).then(function (response) {
            if (response.data.message === 'success') {
                navigate(`/uploadDocuments/${response.data.vleId}/${response.data.appId}`)
            } else {
                navigate('/home')
            }
        })


    }



    return (
        <>
            <Title docTitle='Apply' />
            <Range title="Application Stage" />
            <div className="pad mx-5 ">

                {/* Applicant Details Section */}
                <h3 className="mt-5">1. Applicant Details</h3>
                <hr />
                <br /><br />

                {/* Form starts here  */}

                <form className="row g-3 needs-validation" onSubmit={submitFormData} novalidate>
                    <div className="col-md-4">
                        <label htmlFor="validationDefault05" className="form-label">Salutation</label> <Required />
                        <select className="form-select" id="validationDefault05" onChange={(e) => { setFirstSalutation(e.target.value) }} required>
                            <option selected disabled value="">Choose</option>
                            <option value="Shri">Shri</option>
                            <option value="Kumar">Kumar</option>
                            <option value="Shrimati">Shrimati</option>
                            <option value="Kumari">Kumari</option>
                            <option value="Mr.">Mr.</option>
                            <option value="Mrs.">Mrs.</option>
                            <option value="Adv.">Adv.</option>

                        </select>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="validationCustom01" className="form-label">Full Name <Required /></label>
                        <input type="text" className="form-control" onChange={(e) => { setApplicantName(e.target.value) }} id="validationCustom01" placeholder="Enter name" required />

                    </div>
                    <div className="col-md-4">
                        <label htmlFor="validationCustom02" className="form-label">Mobile <Required /></label>
                        <input type="number" className="form-control" id="validationCustom02" onChange={(e) => { setMobile(e.target.value) }} placeholder="Enter mobile number" required />

                    </div>

                    <div className="col-md-3">
                        <label htmlFor="village" className="form-label">Village/City <Required /></label>
                        <input type="text" className="form-control" id="Village" onChange={getResidenceDetailsOnChange} placeholder="Enter" required />

                    </div>
                    <div className="col-md-3">
                        <label htmlFor="validationCustom04" className="form-label">Taluka <Required /></label>
                        <select className="form-select" id="Taluka" onChange={getResidenceDetailsOnChange} required>
                            <option selected disabled value="" >Choose...</option>
                            <option value="Parbhani">Parbhani</option>
                            <option value="Purna">Purna</option>
                            <option value="Manwat">Manwat</option>
                            <option value="Jintur">Jintur</option>
                            <option value="Palam">Palam</option>
                            <option value="Sonpeth">Sonpeth</option>
                        </select>

                    </div>
                    <div className="col-md-3">
                        <label htmlFor="validationCustom04" className="form-label">District <Required /></label>
                        <select className="form-select" id="District" onChange={getResidenceDetailsOnChange} required>
                            <option selected disabled value="">Choose...</option>
                            <option value="Parbhani">Parbhani</option>
                            <option value="Aurangabad">Aurangabad</option>
                            <option value="Hingoli">Hingoli</option>
                            <option value="Other">Other</option>

                        </select>

                    </div>
                    <div className="col-md-3">
                        <label htmlFor="validationCustom05" className="form-label">Pin <Required /></label>
                        <input type="text" className="form-control" placeholder="Enter your pin number" id="validationCustom05" required />

                    </div>
                    {/* <button id="res" onClick={getResidenceDetailsOnChange}>Res</button> */}


                    {/* Applicant Details Section ends*/}

                    {/* Income Details Section */}
                    <h3 className="mt-5">2. Income Details</h3>
                    <hr />
                    <br /><br />




                    <div className="col-md-4">
                        <label htmlFor="Occupation" className="form-label">Occupation</label> <Required />
                        <select className="form-select" id="Occupation" onChange={gettwoIncomeDetailsOnChange} required>
                            <option selected disabled value="" >Choose...</option>
                            <option value="Wages">Wages</option>
                            <option value="Worker">Worker</option>
                            <option value="Engineer">Engineer</option>
                            <option value="Doctor">Doctor</option>
                            <option value="Government Employee">Government Employee</option>
                        </select>
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="incomeYear" className="form-label">Income Certificate for</label> <Required />
                        <select className="form-select" id="incomeYear" value={incomeYear} onChange={(e) => { setIncomeYear(e.target.value) }} required>
                            <option selected value="1 Yr">1 Year</option>
                            <option value="3 Yr">3 Year</option>

                        </select>
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="DeclarationType" className="form-label">Declaration Type</label> <Required />
                        <select className="form-select" id="DeclarationType" onChange={gettwoIncomeDetailsOnChange} required>
                            <option selected disabled value="">Choose...</option>
                            <option value="Self Declaration">Self Declaration</option>
                            <option value="ITR">ITR</option>
                            <option value="Muncipal Councilor Certificate">Muncipal Councilor Certificate</option>
                            <option value="Talathi Report">Talathi Report</option>
                        </select>
                    </div>
                    {incomeYear === '1 Yr' ? <><div className="col-md-4">
                        <label htmlFor="income1" className="form-label">1. Income in Rs.</label> <Required />
                        <div className="input-group">
                            <span className="input-group-text" id="inputGroupPrepend2">&#8377;</span>
                            <input type="number" className="form-control" id="income1" aria-describedby="inputGroupPrepend2" onChange={getIncomeOnChange} required />
                        </div>
                    </div>
                        <div className="col-md-4">
                            <label htmlFor="income2" className="form-label">2. Income in Rs.</label>
                            <div className="input-group">
                                <span className="input-group-text" id="inputGroupPrepend2">&#8377;</span>
                                <input type="number" className="form-control" id="income2" aria-describedby="inputGroupPrepend2" disabled required />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="income3" className="form-label">3. Income in Rs.</label>
                            <div className="input-group">
                                <span className="input-group-text" id="inputGroupPrepend2">&#8377;</span>
                                <input type="number" className="form-control" id="income3" aria-describedby="inputGroupPrepend2" disabled required />
                            </div>
                        </div></>
                        :
                        <><div className="col-md-4">
                            <label htmlFor="income1" className="form-label">1. Income in Rs.</label> <Required />
                            <div className="input-group">
                                <span className="input-group-text" id="inputGroupPrepend2">&#8377;</span>
                                <input type="number" className="form-control" id="income1" aria-describedby="inputGroupPrepend2" onChange={getIncomeOnChange} required />
                            </div>
                        </div>
                            <div className="col-md-4">
                                <label htmlFor="income2" className="form-label">2. Income in Rs.</label> <Required />
                                <div className="input-group">
                                    <span className="input-group-text" id="inputGroupPrepend2">&#8377;</span>
                                    <input type="number" className="form-control" id="income2" aria-describedby="inputGroupPrepend2" onChange={getIncomeOnChange} required />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="income3" className="form-label">3. Income in Rs.</label> <Required />
                                <div className="input-group">
                                    <span className="input-group-text" id="inputGroupPrepend2">&#8377;</span>
                                    <input type="number" className="form-control" id="income3" aria-describedby="inputGroupPrepend2" onChange={getIncomeOnChange} required />
                                </div>
                            </div></>}



                    {/* Income Details Section ends*/}

                    {/* Beneficiary Details Section */}
                    <h3 className="mt-5">3. Beneficiary Details</h3>
                    <hr />
                    <br /><br />

                    <div className="col-md-4">
                        <label htmlFor="validationDefault02" className="form-label">Relation of applicant </label> <Required />
                        <select className="form-select" id="validationDefault02" onChange={(e) => { setBenRelation(e.target.value) }} required>
                            <option selected disabled value="">Choose</option>
                            <option value="Self">Self</option>
                            <option value="Son">Son</option>
                            <option value="Daughter">Daughter</option>
                            <option value="Guardian">Guardian</option>


                        </select>
                    </div>

                    {benRelation !== 'Self' ?
                        <>
                            <div className="col-md-2">
                                <label htmlFor="validationCustom01" className="form-label ">Salutation <Required /></label>
                                <select className="form-select form-control" id="validationCustom01" onChange={(e) => { setBenSalutation(e.target.value) }} required>
                                    <option disabled selected value="">Choose</option>
                                    <option value="Shri">Shri</option>
                                    <option value="Kumar">Kumar</option>
                                    <option value="Shrimati">Shrimati</option>
                                    <option value="Kumari">Kumari</option>
                                    <option value="Mr.">Mr.</option>
                                    <option value="Mrs.">Mrs.</option>
                                    <option value="Adv.">Adv.</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="validationCustom01" className="form-label">Full Name <Required /></label>
                                <input type="text" className="form-control" id="validationCustom01" placeholder="Enter name" onChange={(e) => { setBenName(e.target.value) }} required />

                            </div></> : <><div className="col-md-2">
                                <label htmlFor="validationCustom01" className="form-label ">Salutation <Required /></label>
                                <select className="form-select form-control" id="validationCustom01" disabled required>
                                    <option disabled selected value={firstSalutation}>{firstSalutation}</option>

                                </select>
                            </div> <div className="col-md-6">
                                <label htmlFor="validationCustom01" className="form-label">Full Name <Required /></label>
                                <input type="text" value={applicantName} className="form-control" id="validationCustom01" placeholder="Enter name" disabled required />

                            </div></>

                    }
                    <div className="col-md-6">
                        <label htmlFor="validationCustom01" className="form-label">Reason for application <Required /></label>
                        <input type="text-area" className="form-control" onChange={(e) => { setReason(e.target.value) }} placeholder="Enter reason for application" required />

                    </div>

                    {/* Income Details Section ends*/}

                    <br /><br /><br /><br /><br />
                    <hr />

                    {/* Declaration Section */}



                    <div className="col-12">
                        <p>I solemly affirm that the above mentioned information submitted by me is true and correct to my knowledge and belief.I hereby agree to be liable for legal consequences for any information found incorrect or untrue at a later date.</p>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                            <label className="form-check-label" htmlFor="invalidCheck">
                                <b> Agreement Acceptance</b> <Required />
                            </label>
                            <div className="invalid-feedback">
                                You must agree before submitting.
                            </div>
                        </div>
                    </div>
                    <hr /><br />
                    {/* Declaration Section ends */}

                    {/* Submit Button */}
                    <br />
                    <div className="col-md-8">
                        <button className="btn btn-primary" type="submit" >Submit and go to Upload Stage</button>
                    </div>

                </form>

                {/* Form ends here  */}

                <br /><br /><br /><br />
            </div>
        </>
    )
}

export default Apply
