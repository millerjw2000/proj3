import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export function Logout() {

    const navigate = useNavigate()

    const logout = () => {

        localStorage.removeItem('token')

        delete axios.defaults.headers.common['Authorization']

        navigate('/')

    }

    return (

        <button className='logout' onClick={logout}>Logout</button>

    )

}