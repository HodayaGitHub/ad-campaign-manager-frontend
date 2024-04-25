import { httpService } from './http.service.js'


export const campaignService = {
    query,
    getById,
    save,
    remove,
    getEmptyCampaign,
    getDefaultFilter,
}

const BASE_URL = 'campaign'

function query() {
    return httpService.get(BASE_URL, {})
}

function getById(campaignId) {
    return httpService.get(`${BASE_URL}/${campaignId}`)
}

function remove(campaignId) {
    return httpService.delete(`${BASE_URL}/${campaignId}`)
}

function save(campaign) {
    return httpService.put(BASE_URL, campaign)
}

function getEmptyCampaign() {
    return {
        name: '',
        advertisingPlatform: '',
        advertiserLandingPage: '',
        bannerImageURL: '',
    }
}


// Filtering 
function getDefaultFilter() {
    return { txt: '', platform: '', }
}