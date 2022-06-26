import { useState } from 'react'

export const Form = () => {
    const [username, setUsername] = useState('')
    const handleSubmit = (event) => {
        event.preventDefault()
        alert(`user name is ${username}`)
    }
    return <form onSubmit={handleSubmit}>
        <div>
            <label>Username</label>
            <input type='text' value={username} onChange={(event) => setUsername(event.target.value)}></input>
        </div>

        <button type='Submit'>Submit</button>
    </form>
}