import {sendRequest} from './requests/facade'

const request = {
    login(data){
        return sendRequest({
            method: 'POST', 
            url: '/api/login',
            data: data, 
        })
    },
    register(data){
        return sendRequest({
            method: 'POST', 
            url: '/api/register',
            data: data, 
        })
    },
    refreshToken(){
        return sendRequest({
            method: 'POST', 
            url: '/api/refreshToken',
            data: {
                refreshToken: localStorage.refreshToken
            }, 
        })
    },

    install: function(Vue){
        Object.defineProperty(Vue.prototype, 'request', {
          get () { return request }
        })
      }

   
}

export default request