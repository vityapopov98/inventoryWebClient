import {sendRequest} from './facade'

function getUser(){
    return sendRequest({
        method: 'GET', 
        url: '/api/users',
        token: localStorage.accessToken
    })
}

function updateUser(data){
    return sendRequest({
        method: 'PUT',
        url: '/api/users',
        data: data,
        token: localStorage.accessToken
    })
}

export {
    getUser,
    updateUser
}