import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'
import { CampaignImage } from './CampaignImage'

export function CampaignPreview({ campaign, onRemoveCampaign, onEditCampaign }) {

    return (
        <li className="campaign-preview" key={campaign._id}>
            <Link to={`/campaign/${campaign._id}`}>
                <h1>{campaign.name}</h1>
                <h4>advertising Platform: {campaign.advertisingPlatform}</h4>
                <h4>advertiser Landing Page: {campaign.advertiserLandingPage}</h4>
            </Link>

            <CampaignImage campaign={campaign}/>


            <div className="actions-btns-container">
                <button> <Link className='details-btn' to={`/campaign/details/${campaign._id}`}>Details</Link></button>

                <button onClick={() => {
                    onRemoveCampaign(campaign._id)
                }}>Remove</button>
                <button onClick={() => {
                    onEditCampaign(campaign)
                }}>Edit</button>

            </div>
        </li>
    )
}
