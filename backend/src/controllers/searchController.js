const devModel = require( '../models/dev' )
const stringToArray = require( '../utils/stringToArray' )

module.exports = {
    async index(req, res) {
        const { latitude, longitude, skills } = req.query

        const skillsArray = stringToArray(skills)

        const devs = await devModel.find({
            skills: {
                $in: skillsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [ longitude, latitude ],
                    },
                    $maxDistance: 10000,
                }
            }
        })

        return res.json({ devs })
    }
}