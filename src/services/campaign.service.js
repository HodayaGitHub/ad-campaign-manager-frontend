import Axios from 'axios'
import { utilService } from './util.service.js'
import { httpService } from './http.service.js'

// for cookies
const axios = Axios.create({
    withCredentials: true
})

export const campaignService = {
    query,
    getById,
    save,
    remove,
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

