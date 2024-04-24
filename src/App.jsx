import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import './assets/style/main.css'

import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { CampaignDetails } from './pages/CampaignDetails.jsx'


import { store } from './store/store.js'
import { CampaignIndex } from './pages/CampaignIndex.jsx'
import { CampaignEdit } from './pages/CampaignEdit.jsx'
import { AboutUs } from './pages/AboutUs.jsx'


export function App() {

    return (
        <Provider store={store}>
            <Router>
                <section className="main-layout app">
                    <AppHeader />
                    <main>
                        <Routes>
                            <Route element={<CampaignIndex />} path="/campaign" />
                            <Route element={<AboutUs />} path="/about" />
                            <Route element={<CampaignEdit />} path="/campaign/:campaignId" />
                            <Route element={<CampaignDetails />} path="/campaign/details/:campaignId" />
                        </Routes>
                    </main>
                    <AppFooter />
                </section>
            </Router>
        </Provider>
    )
}


