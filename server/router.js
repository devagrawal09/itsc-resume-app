const Router = require('express').Router
const controllers = require('./controllers')

const router = Router()

// api routes

router.route('/applicant').post(async (req, res)=> {
    const data = req.body.applicant
    try {
        const applicant = await controllers.newApplicant(data)
        console.log(`New applicant created: ${applicant.get('firstName')} ${applicant.get('lastName')}`)
        res.status(200).send()
    } catch(err) {
        console.error(`Error creating new applicant: ${err}`)
        res.status(500).send()
    }
})

module.exports = router
