
import React from 'react'
import { NavLink } from 'react-router-dom'

export function AppHeader() {
    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <NavLink to="/" className="nav-link">
                    <h1>Ad Campaign Manager</h1>
                </NavLink>
                <nav className="app-nav">
                    <NavLink className="header-link" to="/new-campaign">+New</NavLink>
                    <NavLink className="header-link" to="/">Campaigns</NavLink>
                </nav>
            </section>

        </header >
    )
}
