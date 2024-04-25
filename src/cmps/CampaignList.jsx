import { CampaignPreview } from "./CampaignPreview.jsx"

export function CampaignList({ campaigns, onRemoveCampaign, onEditCampaign, addToCampaign, onCampaignDetails }) {

    return (
        <table className="campaign-table">
            <thead>
                <tr>
                    <th>Banner image </th>
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