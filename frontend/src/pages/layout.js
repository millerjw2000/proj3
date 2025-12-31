import { Outlet } from 'react-router-dom'

export function Layout() {

    return (
        <>
            <div className='page'>
                <header className='header'>
                    Task Tracker
                </header>
                <main className='content'>
                    <Outlet/>
                </main>
                <footer className='footer'>
                    <p>(c) 2025 Jack Miller</p>
                    <p><a href='https://github.com/millerjw2000' target="_blank">GitHub Account</a></p>
                    <p><a href='https://github.com/millerjw2000/proj3' target="_blank">Project repository</a></p>
                </footer>
            </div>
        </>
    )
}