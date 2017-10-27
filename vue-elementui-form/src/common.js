import yfetch from './common/util.fetch';
import { CGI } from './common/config.cgi';

// 返回一个Promise(发送post请求)
function fetch(url, params) {
    return new Promise((resolve, reject) => {
        yfetch.post(url, params)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function fetchList(params) {
    return fetch(CGI.specList, params);
}

function fetchAdd(params) {
    return fetch(CGI.specAdd, params);
}

function fetchDeleteUser(params) {
    return fetch(CGI.specDelete, params);
}

function fetchEdit(params) {
    return fetch(CGI.specEdit, params);
}

function getUploadImgUrl() {        // 素材示例图上传
    return CGI.uploadImg;
}

function getUploadLayerUrl() {      // 水印/提示图层
    return CGI.uploadLayer;
}
function getUploadShareImgUrl() {   // 分享图层
    return CGI.uploadShareImg;
}

export {
    fetchList,
    fetchEdit,
    fetchAdd,
    fetchDeleteUser,
    getUploadImgUrl,
    getUploadLayerUrl,
    getUploadShareImgUrl


};