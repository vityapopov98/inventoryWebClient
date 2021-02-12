import {sendRequest} from './facade'

function getStorages(){
    console.log('GET /api/storages')
    return sendRequest({
        method: 'GET', 
        url: '/api/storages',
        token: localStorage.accessToken
    })
}

function createStorage(data){
    console.log('POST /api/storages')
    return sendRequest({
        method: 'POST', 
        url: '/api/storages',
        data: data, 
        token: localStorage.accessToken
    })
}

function updateStorage(data){
    console.log('PUT /api/storages')
    return sendRequest({
        method: 'PUT', 
        url: '/api/storages',
        data: data, 
        token: localStorage.accessToken
    })
}

function deleteStorage(storageId){
    console.log('DELETE /api/storages')
    return sendRequest({
        method: 'DELETE', 
        url: `/api/storages?folderId=${storageId}`,
        token: localStorage.accessToken
    })
}

export {
    getStorages,
    createStorage,
    updateStorage, 
    deleteStorage
}