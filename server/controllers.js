const Applicant = require('./applicant')
const Manager = require('./manager')

const newApplicant = (applicant)=> {
    return new Applicant(applicant).save()
}

exports.newApplicant = newApplicant
