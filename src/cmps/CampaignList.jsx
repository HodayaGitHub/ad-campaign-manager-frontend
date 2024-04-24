import { CampaignPreview } from "./CampaignPreview.jsx"

export function CampaignList({ campaigns, onRemoveCampaign, onEditCampaign, addToCampaign, onCampaignDetails}) {

    return (
        <ul className="campaign-list">
            {campaigns.map(campaign =>
                <CampaignPreview
                    key={campaign._id}
                    campaign={campaign}
                    onRemoveCampaign={onRemoveCampaign}
                    onCampaignDetails={onCampaignDetails}
                    onEditCampaign={onEditCampaign}
                    addToCampaign={addToCampaign}
                />
            )}
        </ul>
    )
}