import {sendRequest} from './facade'

function previewUploadImage(data){
    return sendRequest({
        method: 'POST',
        url: '/api/previewUploadImage',
        data: data,
        contentType: 'multipart/form-data',
        token: localStorage.accessToken
    })
}

function deletePreviewImage(file){
    return sendRequest({
        method: 'DELETE',
        url: `/api/previewUploadImage?file=${file}`,
        token: localStorage.accessToken
    })
}

export {
    previewUploadImage,
    deletePreviewImage
}