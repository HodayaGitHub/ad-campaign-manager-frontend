import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'campaigns'

export const campaignMockService = {
    query,
    getById,
    save,
    remove,
}


function query() {
    return storageService.query(STORAGE_KEY)
}

function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

function save(item) {
    if (item._id) {
        return storageService.put(STORAGE_KEY, item)
    } else {
        return storageService.post(STORAGE_KEY, item)
    }
}

