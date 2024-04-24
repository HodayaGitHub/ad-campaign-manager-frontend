import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import './assets/style/main.scss';
import { AppHeader } from './cmps/AppHeader';
import { AppFooter } from './cmps/AppFooter';
import { CampaignDetails } from './pages/CampaignDetails';
import { CampaignEdit } from './pages/CampaignEdit';
import { CampaignIndex } from './pages/CampaignIndex';
import {AddCampaign} from './pages/AddCampaign';
import { AboutUs } from './pages/AboutUs';
import { store } from './store/store';


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
                            <Route element={<AddCampaign />} path="/new-campaign" />
                            <Route element={<CampaignDetails />} path="/campaign/details/:campaignId" />
                        </Routes>
                    </main>
                    <AppFooter />
                </section>
            </Router>
        </Provider>
    )
}


