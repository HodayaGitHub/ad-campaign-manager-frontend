
import React from 'react'
import { NavLink } from 'react-router-dom'

export function AppHeader() {
    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>Ad Campaign Manager</h1>
                <nav className="app-nav">
                    <NavLink className="header-link" to="/campaign">Campaigns</NavLink>
                    <NavLink className="header-link" to="/dashboard">Dashboard</NavLink>
                </nav>
            </section>

        </header >
    )
}
