import React, { useState, useEffect } from 'react'

function DevForm({ onSubmit }) {
    const [github_username, setGithubUsername] = useState('')
    const [skills, setSkills] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords
    
            setLatitude(latitude)
            setLongitude(longitude)
          },
          (err) => {
            console.log(err)
          },
          {
            timeout: 30000,
          }
        )
    }, [])

    async function handleSubmit(e) {
        e.preventDefault()

        await onSubmit({
            github_username,
            skills,
            latitude,
            longitude,
        })

        setGithubUsername('')
        setSkills('')
    }

    return (
        <form onSubmit={handleSubmit}>
          <div className="input-block">
          <label htmlFor="">Github Username</label>
          <input 
            name="github_username" 
            id="github_username" 
            required
            value={github_username}
            onChange={e => setGithubUsername(e.target.value)}>
          </input>
          </div>

          <div className="input-block">
            <label htmlFor="">Skills</label>
            <input 
            name="skills" 
            id="skills" 
            required
            value={skills}
            onChange={e => setSkills(e.target.value)}>
            </input>
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="">Latitude</label>
              <input 
                type="number" 
                name="latitude" 
                id="latitude" 
                required 
                value={latitude}
                onChange={e => setLatitude(e.target.value)}>
              </input>
            </div>

            <div className="input-block">
              <label htmlFor="">Longitude</label>
              <input type="number" 
                name="longitude" 
                id="longitude" 
                required 
                value={longitude}
                onChange={e => setLongitude(e.target.value)}>
              </input>
            </div>
          </div>

          <button type="submit">Save</button>
        </form>
    )
}

export default DevForm