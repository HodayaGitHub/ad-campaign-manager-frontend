import { campaignService } from "../../services/campaign.service.js"

export const SET_CAMPAIGNS = 'SET_CAMPAIGNS'
export const ADD_CAMPAIGN = 'ADD_CAMPAIGN'
export const UPDATE_CAMPAIGN = 'UPDATE_CAMPAIGN'
export const REMOVE_CAMPAIGN = 'REMOVE_CAMPAIGN'
export const CAMPAIGN_UNDO = 'CAMPAIGN_UNDO'
export const SET_FILTER_BY = 'SET_FILTER_BY'


const initialState = {
    campaigns: [],
    filterBy: campaignService.getDefaultFilter(),
}
export function campaignReducer(state = initialState, action = {}) {

    let campaigns
    let lastCampaigns

    switch (action.type) {
        case SET_CAMPAIGNS:
            return { ...state, campaigns: action.campaigns }

        case ADD_CAMPAIGN:
            return { ...state, campaigns: [action.campaign, ...state.campaigns] }

        case UPDATE_CAMPAIGN:
            campaigns = state.campaigns.map(campaign => campaign._id === action.campaign._id ? action.campaign : campaign)
            return { ...state, campaigns }

        case REMOVE_CAMPAIGN:
            lastCampaigns = [...state.campaigns]
            campaigns = state.campaigns.filter(campaign => campaign._id !== action.campaignId)
            return { ...state, campaigns, lastCampaigns }

        case CAMPAIGN_UNDO:
            lastCampaigns = state.lastCampaigns || []
            return { ...state, campaigns: [...lastCampaigns] }

        case SET_FILTER_BY:
            return { ...state, filterBy: { ...state.filterBy, ...action.filterBy } }


        default:
            return state
    }
}
