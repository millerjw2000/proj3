import React, {useEffect, useState} from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { LightDarkButton } from "./lightdarkbutton"
import { API_BASE_URL } from "../config"

export function Home() {

    const [name,setName] = useState("")
    const [password,setPassword] = useState("")

    const [output, setOutput] = useState("")

    const navigate = useNavigate()

    const handleSubmit =  async (e) => {
        
        e.preventDefault()

        for (let i=0; i < password.length; i++) {
            if (password[i] === ' ') {
                setOutput('Password cannot contain spaces')
                return null
            }
        }

        for (let i=0; i < name.length; i++) {
            if (name[i] === ' ') {
                setOutput('Username cannot contain spaces')
                return null
            }
        }
        
        
        const res = await axios.post(`http://${API_BASE_URL}/auth/login`,
            {

                username: name,
                password: password,

            }
        ).then( res => {

                if (res.status == 200) {
                    setOutput("Login Success!")
                    localStorage.setItem('token',res.data.token)
                    navigate("/user")
                }

            }
        ).catch(err => {

                if (err.response) {
                    setOutput("Invalid login credentials")
                }
            }
        )
    }

    const handlePassChange = (e) => {
        setPassword(e.target.value)
    }

    const handleUsernameChange = (e) => {
        setName(e.target.value)
    }

    return (
        <>
            <div className='topbar'>
                <LightDarkButton/>
            </div>
            <div className="form">
                Login
                <form className="login" onSubmit={handleSubmit}>
                    <div className="input">
                        <input type="text" value={name} placeholder="username"  required onChange={handleUsernameChange}/>
                    </div>
                    <div className="input">
                        <input type="password" value={password} placeholder="password" required onChange={handlePassChange}/>
                    </div>     
                    <div className="submit">
                        <input type="submit" value='Login'/>

                    </div>
                    <Link to={'/register'}>Register here</Link>
                </form>
                <span className='error'>{output}</span>
            </div>
            
        </>
    )
}