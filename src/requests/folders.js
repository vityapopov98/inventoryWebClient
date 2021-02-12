import {sendRequest} from './facade'

function getFolders(){
    console.log('GET /api/folders')
    return sendRequest({
        method: 'GET', 
        url: '/api/folders',
        token: localStorage.accessToken
    })
}

function createFolder(data){
    console.log('POST /api/folders')
    return sendRequest({
        method: 'POST', 
        url: '/api/folders',
        data: data, 
        token: localStorage.accessToken
    })
}

function updateFolder(data){
    console.log('PUT /api/folders')
    return sendRequest({
        method: 'PUT', 
        url: '/api/folders',
        data: data, 
        token: localStorage.accessToken
    })
}

function deleteFolder(folderId){
    console.log('DELETE /api/folders')
    return sendRequest({
        method: 'DELETE', 
        url: `/api/folders?folderId=${folderId}`,
        token: localStorage.accessToken
    })
}

export {
    getFolders,
    createFolder, 
    updateFolder, 
    deleteFolder
}