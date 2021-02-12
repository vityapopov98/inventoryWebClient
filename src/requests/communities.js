// '/api/communityUsers'
import {sendRequest} from './facade'

function getCommunity(communityId){
    return sendRequest({
        method: 'GET',
        url: `/api/community?communityId=${communityId}`,
        token: localStorage.accessToken
    })
}


function getCommunityUsers(selectedCommunity){
    return sendRequest({
        method: 'GET',
        url: `/api/communityUsers?selectedCommunity=${selectedCommunity}`,
        token: localStorage.accessToken
    })
}

function createCommunity(data){
    return sendRequest({
        method: 'POST',
        url: '/api/community',
        data: data,
        token: localStorage.accessToken
    })
}

function deleteCommunity(communityId){
    console.log('request delete: ', `/api/community?communityId=${communityId}`)
    return sendRequest({
        method: 'DELETE',
        url: `/api/community?communityId=${communityId}`,
        token: localStorage.accessToken
    })
}

export {
    getCommunity,
    getCommunityUsers,
    createCommunity,
    deleteCommunity
}