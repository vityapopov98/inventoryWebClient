import {sendRequest} from './facade'

function getItems(from){
    return sendRequest({
        method: 'GET',
        url: `/api/items?${from.prop}=${from.value}`,
        token: localStorage.accessToken
    })
}
function createItem(data){
    console.log(data)
    return sendRequest({
        method: 'POST',
        url: '/api/items',
        data: data,
        contentType: 'multipart/form-data',
        token: localStorage.accessToken
    })
}

function updateItem(data){
    return sendRequest({
        method: 'PUT',
        url: '/api/items',
        data: data,
        contentType: 'multipart/form-data',
        token: localStorage.accessToken
    })
}

export {
    getItems,
    createItem,
    updateItem
}