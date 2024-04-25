import { Link } from 'react-router-dom';
import { CampaignImage } from './CampaignImage';

export function CampaignList({ campaigns, onRemoveCampaign, onEditCampaign, onCampaignDetails }) {
    return (
        <table className="campaign-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Advertising Platform</th>
                    <th>Advertiser Landing Page</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {campaigns.map(campaign =>
                    <CampaignPreview
                        key={campaign._id}
                        campaign={campaign}
                        onRemoveCampaign={onRemoveCampaign}
                        onCampaignDetails={onCampaignDetails}
                        onEditCampaign={onEditCampaign}
                    />
                )}
            </tbody>
        </table>
    )
}

export function CampaignPreview({ campaign, onRemoveCampaign, onEditCampaign, onCampaignDetails }) {
    return (
        <tr className="campaign-preview" key={campaign._id}>
            <td>
                <Link to={`/campaign/details/${campaign._id}`}>
                    {campaign.name}
                </Link>
            </td>
            <td>{campaign.advertisingPlatform}</td>
            <td>{campaign.advertiserLandingPage}</td>
            <td>
                <button onClick={() => { onCampaignDetails(campaign._id) }}>Details</button>
                <button onClick={() => { onRemoveCampaign(campaign._id) }}>Remove</button>
                <button onClick={() => { onEditCampaign(campaign) }}>Edit</button>
            </td>
        </tr>
    )
}
