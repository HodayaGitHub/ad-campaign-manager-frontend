
// import { campaignMockService as campaignService } from '../../services/campaign.mock.service'
import { campaignService } from '../../services/campaign.service.js'
import { store } from "../store.js"
import { SET_IS_LOADING, SET_CAMPAIGNS, ADD_CAMPAIGN, UPDATE_CAMPAIGN, REMOVE_CAMPAIGN, CAMPAIGN_UNDO } from '../reducers/campaign.reducer.js'



export async function loadCampaigns() {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })

    try {
        try {
            const campaigns = await campaignService.query()
            store.dispatch({ type: SET_CAMPAIGNS, campaigns })
        } catch (err) {
            console.log('campaign action -> Cannot load campaigns', err)
            throw err
        }
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}

export async function loadCampaignsForStatistics() {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })

    try {
        try {
            const campaigns = await campaignService.query()
            return campaigns
        } catch (err) {
            console.log('campaign action -> Cannot load campaigns', err)
            throw err
        }
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}

export async function loadLabels() {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })

    try {
        try {
            const campaigns = await campaignService.query()
            // store.dispatch({ type: SET_CAMPAIGNS, campaigns })
            const labels = campaignService.labelsCategories(campaigns)
            return labels
        } catch (err) {
            console.log('campaign action -> Cannot load labels', err)
            throw err
        }
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}


export async function removeCampaign(campaignId) {
    store.dispatch({ type: REMOVE_CAMPAIGN, campaignId })
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })

    try {
        try {
            return await campaignService.remove(campaignId)
        } catch (err) {
            store.dispatch({ type: CAMPAIGN_UNDO })
            console.log('item action -> Cannot remove item', err)
            throw err
        }
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}


export async function saveCampaign(campaign) {
    const type = campaign._id ? UPDATE_CAMPAIGN : ADD_CAMPAIGN
    try {
        const campaignToSave = await campaignService.save(campaign)
        store.dispatch({ type, campaign: campaignToSave })
        return campaignToSave
    } catch (err) {
        console.log('item action -> Cannot save item', err)
        throw err
    }
}

