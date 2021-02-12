// function get(){

// }
// function post(){

// }
// function put(){

// }

// req = {
//     method: '',
//     url: '', 
//     body: '',
//     token: '',
//     contentType: ''
// }

function sendRequest(req){
    return new Promise(function(resolve, reject){
        var requestObject = requestGenerator(req.method, req.data, req.token, req.contentType)
        fetch(req.url, requestObject).then(res=>{
            var data = res.json();
            // console.log('RESPONSE: ', data);
            return data
        }).then(data=>{
            // console.log('this is data: ', data);
            resolve(data)
        }).catch(error=>{
            console.log('403 happend')
            reject(error)
        })

    })
}

function requestGenerator(method, data, token, contentType){
    var requestObject = {}; 
        // if(contentType == undefined){
        //     contentType = 'application/json'
        // }
        // 
        if(contentType == 'multipart/form-data'){
            console.log('where are you?', requestObject)
            
            requestObject = {
                method: method, // метод PUT 
                headers: new Headers({
                    'Authorization': 'Bearer '+ token,
                }),
                body: data  
            }
            delete requestObject.headers['Content-Type'];
        }
        else if(method == 'POST' || method == 'PUT'){
            
            requestObject = {
                method: method, // метод PUT 
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ token,
                }),
                body: JSON.stringify(data)  
            }
            console.log('ahaha', requestObject)
        }
        else{
            console.log('tut?', requestObject)
            requestObject = {
                method: method, // метод GET, DELETE
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer '+ token
                }
            }
        }
        return requestObject
}
export {
    sendRequest
}