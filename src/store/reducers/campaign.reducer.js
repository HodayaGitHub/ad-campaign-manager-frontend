import { campaignService } from "../../services/campaign.service.js"

export const SET_CAMPAIGNS = 'SET_CAMPAIGNS'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const ADD_CAMPAIGN = 'ADD_CAMPAIGN'
export const UPDATE_CAMPAIGN = 'UPDATE_CAMPAIGN'
export const REMOVE_CAMPAIGN = 'REMOVE_CAMPAIGN'
export const CAMPAIGN_UNDO = 'CAMPAIGN_UNDO'



const initialState = {
    campaigns: [],
    isLoading: false,
}
export function campaignReducer(state = initialState, action = {}) {

    let campaigns
    let lastCampaigns

    switch (action.type) {
        case SET_CAMPAIGNS:
            return { ...state, campaigns: action.campaigns }

        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }

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
        default:
            return state
    }
}
