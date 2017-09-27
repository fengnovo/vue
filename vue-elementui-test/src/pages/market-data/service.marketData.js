import yfetch from '../../common/util.fetch';
import { cgi } from '../../common/config.cgi';

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
    // return fetch({
    //     url: '//xoa.pp.jd.com/xoa/ztexp/adspec/querylist',
    //     method: 'POST',
    //     // params: query
    //     data: query
    // });

    return fetch(cgi.mdlist, params);
}

function fetchAdd(params) {
    // return fetch({
    //     url: '//xoa.pp.jd.com/xoa/ztexp/adspecmarket/addbatchtask',
    //     method: 'POST',
    //     data: query
    // });
    return fetch(cgi.mdadd, params);
}


function fetchEdit(params) {
    // return fetch({
    //     url: '//xoa.pp.jd.com/xoa/ztexp/adspecmarket/update',
    //     method: 'POST',
    //     data: query
    // });
    return fetch(cgi.mdupdate, params);
}

export { fetchList, fetchAdd, fetchEdit };