import {sendRequest} from './facade'

function getUserCommunities(){
    return sendRequest({
        method: 'GET', 
        url: '/api/userCommunities',
        token: localStorage.accessToken
    })
}
function deleteUserCommunity(userCommunityId){
    return sendRequest({
        method: 'DELETE',
        url: `/api/userCommunities?id=${userCommunityId}`,
        token: localStorage.accessToken
    })
}
function addUserToCommunity(data){
    return sendRequest({
        method: 'POST',
        url: '/api/addUserToCommunity',
        data: data,
        token: localStorage.accessToken
    })
}

// function createFolder(data){
//     return sendRequest({
//         method: 'POST', 
//         url: '/api/folders',
//         data: data, 
//         token: localStorage.accessToken
//     })
// }

// function updateFolder(data){
//     return sendRequest({
//         method: 'PUT', 
//         url: '/api/folders',
//         data: data, 
//         token: localStorage.accessToken
//     })
// }

// function deleteFolder(folderId){
//     return sendRequest({
//         method: 'DELETE', 
//         url: `/api/folders?folderId=${folderId}`,
//         token: localStorage.accessToken
//     })
// }

export {
    getUserCommunities,
    addUserToCommunity,
    deleteUserCommunity
}