
import { campaignService } from '../../services/campaign.service';
import { store } from '../store';
import { SET_CAMPAIGNS, ADD_CAMPAIGN, UPDATE_CAMPAIGN, REMOVE_CAMPAIGN, CAMPAIGN_UNDO, SET_FILTER_BY } from '../reducers/campaign.reducer';
import { setIsLoading } from './system.actions'; 

export async function loadCampaigns(filterBy) {
    setIsLoading(true);
    try {
        const campaigns = await campaignService.query(filterBy);
        store.dispatch({ type: SET_CAMPAIGNS, campaigns });
    } catch (err) {
        console.log('campaign action -> Cannot load campaigns', err);
        throw err;
    } finally {
        setIsLoading(false);
    }
}

export async function removeCampaign(campaignId) {
    store.dispatch({ type: REMOVE_CAMPAIGN, campaignId })
    setIsLoading(true);

    try {
        return await campaignService.remove(campaignId)
    } catch (err) {
        store.dispatch({ type: CAMPAIGN_UNDO });
        console.log('item action -> Cannot remove item', err);
        throw err;
    } finally {
        setIsLoading(false);
    }
}

export async function saveCampaign(campaign) {
    const type = campaign._id ? UPDATE_CAMPAIGN : ADD_CAMPAIGN
    try {
        const campaignToSave = await campaignService.save(campaign);
        store.dispatch({ type, campaign: campaignToSave });
        return campaignToSave;
    } catch (err) {
        console.log('item action -> Cannot save item', err);
        throw err;
    }
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy });
}
