import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Apply from './components/Apply'
import MahaNav from './components/MahaNav'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import UploadDocs from './components/UploadDocs'
import Payment from './components/Payment'
import PayNow from './components/PayNow'
import TrackApplication from './components/TrackApplication'
import SignIn from './components/SignIn'
import Register from './components/Register'
import PageNotFound from './components/PageNotFound'
import AllApplications from './components/AllApplications'
import UploadedDocuments from './components/UploadedDocuments'
import MahaonlineApplications from './components/MahaonlineApplications'
import SingleMahaonline from './components/SingleMahaonline'
import DownloadCertificate from './components/DownloadCertificate'



function App() {


  return (
    <>
      <MahaNav />
      <Navbar />

      {/* Defining routes */}

      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/adminLogin" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/uploadDocuments/:vleId/:appId" element={<UploadDocs />} />
        <Route path="/payment/:vleId/:appId/:uploadId" element={<Payment />} />
        <Route path="/paynow/:vleId/:appId/:uploadId" element={<PayNow />} />
        <Route path="/applications/:vleId" element={<AllApplications />} />
        <Route path="/mahaonline/:appId" element={<SingleMahaonline />} />
        <Route path="/uploadedDocuments/:vleId/:appId/:uploadId" element={<UploadedDocuments />} />
        <Route path="/mahaonlineApplications/" element={<MahaonlineApplications />} />
        <Route path="/downloadCertificate/:appId" element={<DownloadCertificate />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      {/* Defining routes */}
      <Footer />
    </>
  )
}

export default App
