import { CampaignPreview } from "./CampaignPreview.jsx"

export function CampaignList({ campaigns, onRemoveCampaign, onEditCampaign, addToCampaign }) {

    return (
        <ul className="campaign-list">
            {campaigns.map(campaign =>
                <CampaignPreview
                    key={campaign._id}
                    campaign={campaign}
                    onRemoveCampaign={onRemoveCampaign}
                    onEditCampaign={onEditCampaign}
                    addToCampaign={addToCampaign}
                />
            )}
        </ul>
    )
}