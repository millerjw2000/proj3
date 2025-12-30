import React, {useEffect, useState} from "react"
import axios from "axios"
import { Link, useLocation } from "react-router-dom"
import { Logout } from './logout'
import { LightDarkButton } from "./lightdarkbutton"

import { GrCheckbox, GrCheckboxSelected, GrClose } from 'react-icons/gr'

export function User() {

    const location = useLocation()
    const token = localStorage.getItem('token')
    const [message,setMessage] = useState('')

    const [tasks,setTasks] = useState([])

    const [loggedIn, setLoggedIn] = useState(false)

    const [enter_desc,setEnterDesc] = useState('')
    const [enter_due_time,setEnterDueTime] = useState('')

    const handleDescChange = (e) => {
        setEnterDesc(e.target.value)
    }

    const handleDueTimeChange = (e) => {
        setEnterDueTime(e.target.value)
    }

    const dateToUnix = (date) => {
        return Math.floor(new Date(date).getTime() / 1000)
    }

    const deleteTask = async (id,e) => {
        
        const headers = {
            'Authorization' : `Bearer ${token}`
        }

        const res = axios.post('http://localhost:8080/tasks/delete',
            {
                taskId: id,
            }, { headers }
        ).then(res => {

            if (res.status == 200) {

                setTasks(res.data)
                

            }

        }).catch(err => {
            // add something here idk
        })
    }

    const changeStatus = async (id,e) => {
        
        const headers = {
            'Authorization' : `Bearer ${token}`
        }

        const res = axios.post('http://localhost:8080/tasks/changeStatus',
            {
                taskId: id,
            }, { headers }
        ).then(res => {

            if (res.status == 200) {

                setTasks(res.data)
                

            }

        }).catch(err => {
            // add something here idk
        })
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        if (enter_desc.length > 500) {
            return null // 500 char limit on task description
        }

        const headers = {
            'Authorization' : `Bearer ${token}`
        }

        const res = axios.post('http://localhost:8080/tasks/enter',
            {
                description: enter_desc,
                dueTime: dateToUnix(enter_due_time),
                status: 0,
            }, { headers }
        ).then(res => {

            if (res.status == 200) {

                setTasks(res.data)
                setEnterDesc('')
                setEnterDueTime('')

            }

        }).catch(err => {
            // add something here idk
        })

    }

    const unixToDate = (timestamp) => {
        
        const date = new Date(timestamp * 1000)
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate() + 1).padStart(2, '0')
        const year = date.getFullYear()

        return `${month}/${day}/${year}`

    }

    useEffect(() => {

        const headers = {
            'Authorization' : `Bearer ${token}`
        }

        const res = axios.get('http://localhost:8080/tasks/getAll', { headers })
            .then(res => {

                if (res.status == 200) {
                    setMessage('received info')
                    setLoggedIn(true)
                    setTasks(res.data)
                }

            }).catch(err => {

                if (err.response) {
                    setMessage("No info or not logged in")
                }

            })

    },[token])

    // TODO: add form to add a task
    // display exisiting tasks with buttons to delete and change status

    return (
        <>
            {(loggedIn) ? (
                <>
                    <div className='topbar'>
                        <LightDarkButton/>
                        <Logout/>
                    </div>
                    <div className='task_enter_form'>
                        <h2>Create Task</h2>
                        <form onSubmit={handleSubmit}>
                            <div className='enter_due_time'>
                                Date
                                <input type='date' value={enter_due_time} required onChange={handleDueTimeChange}></input>
                            </div>
                            <div className='enter_desc'>
                                Description
                                <input type='text' value={enter_desc} required onChange={handleDescChange}></input>
                            </div>
                            <div className='submit_task'>
                                <input type='submit'></input>
                            </div>
                        </form>
                    </div>


                    <div className='tasks'>
                        <div className='task_header'>
                            <h2>Your Tasks</h2>
                        </div>
                        <div className='task_section'>
                            <h1>Upcoming Tasks</h1>
                            {tasks.upcoming.map((task,idx) => (

                                <div className='task'>
                                    <div className='desc'>{task.description}</div>
                                    <div className='due'>{unixToDate(task.dueTime)}</div>
                                    <div className='buttons'>
                                        <button className='icon-button' onClick={(e)=>changeStatus(task.id,e)}>
                                            <GrCheckbox className='icon-default'/>
                                            <GrCheckboxSelected className='icon-hover'/>
                                        </button>
                                        <GrClose className='icon delete' onClick={(e)=>deleteTask(task.id,e)}/>
                                    </div>
                                </div>

                            ))}
                        </div>
                        <div className='task_section'>
                            <h1>Overdue Tasks</h1>
                            {tasks.overdue.map((task,idx) => (

                                <div className='task'>
                                    <div className='desc'>{task.description}</div>
                                    <div className='due'>{unixToDate(task.dueTime)}</div>
                                    <div className='buttons'>
                                        <button className='icon-button' onClick={(e)=>changeStatus(task.id,e)}>
                                            <GrCheckbox className='icon-default'/>
                                            <GrCheckboxSelected className='icon-hover'/>
                                        </button>
                                        <GrClose className='icon delete' onClick={(e)=>deleteTask(task.id,e)}/>
                                    </div>
                                </div>

                            ))}
                        </div>
                        <div className='task_section'>
                            <h1>Completed Tasks</h1>
                            {tasks.completed.map((task,idx) => (

                                <div className='task'>
                                    <div className='desc'>{task.description}</div>
                                    <div className='due'>{unixToDate(task.dueTime)}</div>
                                    <div className='buttons'>
                                        <button className='icon-button' onClick={(e)=>changeStatus(task.id,e)}>
                                            <GrCheckboxSelected className='icon-default'/>
                                            <GrCheckbox className='icon-hover'/>
                                        </button>
                                        <GrClose className='icon delete' onClick={(e)=>deleteTask(task.id,e)}/>
                                    </div>
                                </div>

                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className='topbar'>
                        <LightDarkButton/>
                    </div>
                    <div>
                        <p>You are not logged in yet!</p>
                        <p><Link to={'/'}>Login page</Link></p>
                    </div>
                    
                </>
            )}
        </>
    )
}