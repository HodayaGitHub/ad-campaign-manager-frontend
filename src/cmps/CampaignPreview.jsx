import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'

// const { Link } = ReactRouterDOM
export function CampaignPreview({ campaign, onRemoveCampaign, onEditCampaign }) {

    const fallbackImg = "https://res.cloudinary.com/drlt4yjnj/image/upload/v1713959046/campaignManager/oenjkvmkqcksnasx2f5o.png"
    return (
        <li className="campaign-preview" key={campaign._id}>

            <Link to={`/campaign/${campaign._id}`} >
                <h4>{campaign.name}</h4>
            </Link>

            <div className="img-container">
                <img className="campaign-img"
                    src={campaign.src || fallbackImg}
                    alt={campaign.name}
                    onError={event => {
                        event.target.src = { fallbackImg }
                        event.onerror = null
                    }}
                />
            </div>

            <div className="actions-btns-container">
                <button> <Link className='details-btn' to={`/campaign/details/${campaign._id}`}>Details</Link></button>

                <button onClick={() => {
                    onRemoveCampaign(campaign._id)
                }}>x</button>
                <button onClick={() => {
                    onEditCampaign(campaign)
                }}>Edit</button>

            </div>
        </li>
    )
}
