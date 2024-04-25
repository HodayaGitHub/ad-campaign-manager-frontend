import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { campaignService } from '../services/campaign.service.js'
import { CampaignImage } from '../cmps/CampaignImage.jsx'
import { showErrorMsgRedux } from '../store/actions/app.actions.js'

export function CampaignDetails() {
    const [campaign, setCampaign] = useState(null)
    const { campaignId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadCampaign()
    }, [campaignId])

    async function loadCampaign() {
        try {
            const campaign = await campaignService.getById(campaignId)
            setCampaign(campaign)
        } catch (err) {
            showErrorMsgRedux('Cant load campaign')
            navigate('/')
        }
    }

    if (!campaign) return <div>Loading...</div>
    return (
        <section className="campaign-details">
            <h1>{campaign.name}</h1>
            <h4>advertising Platform: {campaign.advertisingPlatform}</h4>
            <h4>advertiser Landing Page: {campaign.advertiserLandingPage}</h4>

            <CampaignImage campaign={campaign} />

            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas
                cumque tempore, aperiam sed dolorum rem!
            </p>

            <button> <Link className='back-btn' to={`/`}>Back</Link></button>
        </section>
    )
}
