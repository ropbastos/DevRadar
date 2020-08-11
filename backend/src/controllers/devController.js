const axios = require( 'axios' )
const devModel = require( '../models/dev' )
const stringToArray = require( '../utils/stringToArray' )

module.exports = {

    async index(req, res) {
        const devs = await devModel.find()

        return res.json(devs)
    },

    async store(req, res) {
        const { github_username, skills, latitude, longitude } = req.body 

        let dev = await devModel.findOne({ github_username })
        
        if(!dev){
            skillsArray = stringToArray(skills)
            
            console.log("Entrou async store no DEvController")

            const githubRes = await axios.get(`https://api.github.com/users/${github_username}`)
        
            const { name = login, avatar_url, bio } = githubRes.data

            console.log(githubRes.data)
        
            const location = {
                type: 'Point',
                coordinates: [ longitude, latitude ],
            }
        
            dev = await devModel.create({
                github_username,
                name,
                avatar_url,
                bio,
                skills: skillsArray,
                location,
            })
        }
        
        console.log(dev)
        return res.json(dev)
    }
}