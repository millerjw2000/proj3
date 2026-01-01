import React, {useEffect, useState} from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { LightDarkButton } from "./lightdarkbutton"
import { API_BASE_URL } from "../config"

export function Register() {

    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")

    const [output, setOutput] = useState("")
    const navigate = useNavigate()

    const handleSubmit =  async (e) => {
        e.preventDefault()

        for (let i=0; i < name.length; i++) {
            if (name[i] === ' ') {
                setOutput('Username cannot contain spaces')
                return null
            }
        }

        for (let i=0; i < password.length; i++) {
            if (password[i] === ' ') {
                setOutput('Password cannot contain spaces')
                return null
            }
        }

        if (password !== confirmPassword) {
            setOutput('Passwords must match!')
            return null
        }

        if (name.length > 25) {
            setOutput('Username must not exceed 25 chars')
            return null
        }
        
        const res = await axios.post(`http://${API_BASE_URL}/auth/register`,
            {

                username: name,
                password: password,

            }
        ).then( res => {

                if (res.status == 200) {
                    setOutput("Registration success!")
                    navigate('/')
                }

            }
        ).catch(err => {

                if (err.response) {
                    setOutput("Username is taken")
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

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
    }

    return (
        <>
            <div className='topbar'>
                <LightDarkButton/>
            </div>
            <div className="form">
                Register
                <form className="login" onSubmit={handleSubmit}>
                    <div className="input">
                        <input type="text" value={name} placeholder="username"  required onChange={handleUsernameChange}/>
                    </div>
                    <div className="input">
                        <input type="text" value={password} placeholder="password" required onChange={handlePassChange}/>
                    </div>    
                    <div className="input">
                        <input type="text" value={confirmPassword} placeholder="confirm password" required onChange={handleConfirmPasswordChange}/>
                    </div>  
                    <div className="submit">
                        <input type="submit" value='Register'/>
                    </div>
                    <Link to={'/'}>Login page</Link>
                </form>
                <span className='error'>{output}</span>
            </div>
            
        </>
    )
}