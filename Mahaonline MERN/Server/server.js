// Mongodb Password : Sajed, Username : Sajed

const express = require('express');
const app = express();
const cors = require('cors');
const { json } = require('express');
const jwt = require('jsonwebtoken');
app.use(json())
const mongoose = require('mongoose');
app.use(cors());
const bodyParser = require('body-parser');
const multer = require('multer')
const path = require('path')
const VLE = require('./models/VLE')
const Application = require('./models/Application')
const Document = require('./models/Documents')
const Admin = require('./models/Admin')
let fs = require('fs');

// Database Configuration

const URL = 'mongodb+srv://Sajed:Sajed@todolist.vihrg.mongodb.net/Mahaonline?retryWrites=true&w=majority'

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Database connection successful');
}).catch(err => console.log('Database connection failed'));



// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());



// TODO: Routing starts here


// For uploading urls to mongodb 
app.post('/upload', async function (req, res) {

    const arrayDoc = req.body
    console.log(arrayDoc);

    const aadhar = arrayDoc.find(element => element.filename === 'aadhar');
    const voter = arrayDoc.find(element => element.filename === 'voter');
    const selfDeclaration = arrayDoc.find(element => element.filename === 'selfDeclaration');
    const itr = arrayDoc.find(element => element.filename === 'itr');
    const disability = arrayDoc.find(element => element.filename === 'disability');
    const ration = arrayDoc.find(element => element.filename === 'ration');
    const ref = arrayDoc.find(element => element.filename === 'vleDetails');

    Application.findOne({ _id: ref.refApplication })
        .then(async (application) => {
            if (application.uploadId === 'null') {
                const document = new Document({
                    selfDeclaration: selfDeclaration.fileUrl,
                    aadhar: aadhar.fileUrl,
                    voter: voter.fileUrl,
                    itr: itr.fileUrl,
                    disability: disability.fileUrl,
                    ration: ration.fileUrl,
                    refApplication: ref.refApplication, refVle: ref.refVle
                })

                document.save()

                // true the isUploaded field in corresponding Application 
                const application = await Application.findOneAndUpdate({ _id: ref.refApplication }, { isUploaded: true, uploadId: document._id })
                console.log(application);
                res.send({ message: 'saved', documents: document });
            } else {
                const document = await Document.findOneAndUpdate({ _id: application.uploadId }, {
                    selfDeclaration: selfDeclaration.fileUrl,
                    aadhar: aadhar.fileUrl,
                    voter: voter.fileUrl,
                    itr: itr.fileUrl,
                    disability: disability.fileUrl,
                    ration: ration.fileUrl,
                    refApplication: ref.refApplication, refVle: ref.refVle
                })
                res.send({ message: 'saved', documents: document });

            }
        })


})

// Login handler
app.post('/login', async (req, res) => {
    VLE.findOne({ email: req.body.email }).then((vle) => {
        if (vle) {
            if (req.body.email === vle.email && req.body.password === vle.password) {
                const token = jwt.sign({ email: vle.email, password: vle.password, id: vle._id, name: vle.name, place: vle.place }, 'SAJED')
                res.send({ status: 'ok', token: token });
            }
            else {
                res.send({ status: 'notok', message: 'Please Enter correct username or password' });

            }
        } else {
            res.send({ status: 'notok', message: 'Please Enter correct username or password' });
        }

    }).catch(function (err) {
        res.send({ status: 'notok', message: 'Enternal Server Error' });

    })

})

// Login handler
app.post('/adminLogin', async (req, res) => {
    Admin.findOne({ email: req.body.email }).then((vle) => {
        if (vle) {
            if (req.body.email === vle.email && req.body.password === vle.password) {
                const token = jwt.sign({ email: vle.email, password: vle.password, id: vle._id, name: vle.name, place: vle.place }, 'SAJED')
                res.send({ status: 'ok', token: token });
            }
            else {
                res.send({ status: 'notok', message: 'Please Enter correct username or password' });

            }
        } else {
            res.send({ status: 'notok', message: 'Please Enter correct username or password' });
        }

    }).catch(function (err) {
        res.send({ status: 'notok', message: 'Enternal Server Error' });

    })

})




// Api for checking authentication
app.post('/auth', function (req, res) {
    VLE.findOne({ email: req.body.email }).then(function (user) {
        if (user) {
            res.send('authenticated')
        }
        else {
            res.send('unauthenticated')
        }
    })

})
app.post('/adminauth', function (req, res) {
    Admin.findOne({ email: req.body.email }).then(function (user) {
        if (user) {
            res.send('authenticated')
        }
        else {
            res.send('unauthenticated')
        }
    })

})


// For saving Apply page form data to database
app.post('/saveFormData', function (req, res) {

    try {
        const application = new Application({
            applicationDetails: req.body.applicationDetails,
            beneficiaryDetails: req.body.beneficiaryDetails,
            incomeDetails: req.body.incomeDetails,
            vleDetails: req.body.vleId
        })
        application.save();
        res.send({ message: 'success', vleId: req.body.vleId, appId: application._id });

    } catch (error) {
        res.send({ message: 'error' })
    }

})


// checking is application valid or not
const { ObjectId } = require('mongodb');
app.post('/checkAuth', function (req, res) {
    try {
        Application.findOne({ _id: ObjectId(req.body.appId) }).then(function (application) {
            if (!application) {
                res.send({ message: 'invalid', error: 'Sorry! We were unable to find application...' })
            }
            else if (application.payment === true) {
                res.send({ message: 'invalid', error: 'Oops! The payment has already been made against the application' })
            }
            // else if (application.isUploaded === true) {
            //     res.send({ message: 'invalid', error: 'Oops! You have already uploaded the documents' })
            // }
            else {

                res.send({ message: 'valid' })
            }


        })
    }
    catch {
        res.send({ message: 'invalid' })
    }

})

// Check if the payment url is valid or not
app.post('/validatePaymentUrl', function (req, res) {
    const { vleId, appId, uploadId } = req.body
    VLE.findOne({ _id: vleId })
        .then(function (vle) {
            if (vle) {
                Application.findOne({ _id: appId })
                    .then(function (app) {
                        if (app) {
                            Document.findOne({ _id: uploadId })
                                .then(function (document) {
                                    if (document) {
                                        res.send({
                                            message: 'valid', data: {
                                                getVle: vle, getApp: app,
                                                getDoc: app,
                                                getUrls: document,
                                                error: false
                                            }
                                        })
                                    }
                                    else {
                                        res.send({ message: 'document not found', error: true })
                                    }
                                }).catch((err) => {
                                    res.send({ message: 'Invalid at document fetching' + err.message, error: true })
                                })
                        }
                        else {

                            res.send({ message: 'application not found', error: true })
                        }
                    }).catch((err) => {
                        res.send({ message: 'Invalid at application' + err.message, error: true })
                    })
            }
            else {
                res.send({ message: 'vle not found', error: true })
            }
        }).catch((err) => {
            res.send({ message: 'Invalid at vle' + err.message, error: true })
        })
})

// For handeling payment requests
app.post('/paymentHandler', async function (req, res) {
    const { vleId, appId, uploadId, status } = req.body
    if (status.status === 'success') {
        try {
            const application = await Application.findOneAndUpdate({ _id: appId }, { payment: true })
            console.log(application);
            res.send({ message: 'success', updatedApplication: application })
        } catch (error) {
            res.send({ message: 'error' })
        }
    }
    else if (status.status === 'fail') {
        res.send({ message: 'fail' })
    }

})

// Api for checking authentication and fetching all the related applications to the vle in the req.body
app.post('/auth/applications', function (req, res) {
    VLE.findOne({ email: req.body.email }).then(async function (user) {
        if (user) {
            const applications = await Application.find({ vleDetails: user.id })
            if (applications.length > 0) {

                res.send({ message: 'authenticated', applications })
            }
            else {
                res.send({ message: 'unauthenticated' })
            }
        }
        else {
            res.send({ message: 'unauthenticated' })
        }
    }).catch(function (err) {
        res.send({ message: 'unauthenticated' })
    })

})

// Admin all application get req 
app.get('/mahaonlineApplications', function (req, res) {
    Application.find({ payment: true, isUploaded: true, pendingAt: 'Pending At Tehsil Clerk', rejection: false })
        .then(app => {
            console.log(app);
            if (app.length > 0) {
                res.send({ message: 'success', app: app })
            }
            else if (app.length === 0) {
                res.send({ message: 'null', err })

            }
            else if (err) {
                res.send({ message: 'error', err })
            }
        }).catch(function (err) {
            res.send({ message: 'error', err })
        })

})

// Single mahaonline application for corresponding appID and fetch related documents too...
app.post('/singleMahaonlineApplication', function (req, res) {
    const { appId } = req.body

    // Fetch application using appId
    Application.findOne({ _id: appId })
        .then(function (application) {
            if (application) {

                // Since you have got application you can get document by getting upload id field in application section
                Document.findOne({ _id: application.uploadId })
                    .then(document => {

                        res.send({ message: 'success', application, document });
                    }).catch(function (error) {
                        res.send({ message: 'error' })

                    })
            }
            else {
                res.send({ message: 'error' })
            }
        }).catch(function (err) {
            res.send({ message: 'error' })
        })
})

// Handeling rejection of application
app.post('/handleApplicationRejection', async function (req, res) {
    const { appId, rejectionReason } = req.body
    console.log(appId, rejectionReason);
    const application = await Application.findOneAndUpdate({ _id: appId }, { rejection: true, rejectionReason: rejectionReason })
    if (application) {
        res.send({ message: 'success' })
        console.log(application);
    }
    else {
        res.send({ message: 'error' })
    }
})

// Handeling approval of application
app.post('/approvalHandler', async function (req, res) {
    const { appId } = req.body
    const application = await Application.findOneAndUpdate({ _id: appId }, { pendingAt: 'Approved' })
    if (application) {
        res.send({ message: 'success' })
        console.log(application);
    }
    else {
        res.send({ message: 'error' })
    }
})

// Certificate downloadCertificate
app.post('/downloadCertificate', (req, res) => {
    const { appId } = req.body
    console.log('this is app id', appId);

    Application.findOne({ _id: appId })
        .then((app) => {
            console.log(app);
            if (app) {
                if (app.pendingAt === 'Approved') {
                    console.log('if error');
                    res.send({ message: 'success', application: app })
                } else {
                    console.log('else error');
                    res.send({ message: 'null', })
                }
            }
        })

})


// Starting Server
app.listen(4000, function () {
    console.log('Server started successfully at 4000.');
})