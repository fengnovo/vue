import * as Types from './types';
import iView from 'iview';
import {
    transTime,
    yztFetch,
    decodeHtml
} from '../commons/util.js';

import {
    cgiPrefix,
    cgiName
} from '../commons/cgiConst.js';

const actions = {
    [Types.sreachListData]({ state, dispatch }) {
        let params = Object.assign(state.searchCgiParam, state.formItem, {pageNo: 1});
        dispatch(Types.getListData, params);
    },
    [Types.changePageno]({ state, dispatch }, pageNo) {
        let params = Object.assign(state.searchCgiParam, {pageNo});
        dispatch(Types.getListData, params);
    },
    [Types.changePagesize]({ state, dispatch }, pageSize) {
        let params = Object.assign(state.searchCgiParam, {pageSize});
        dispatch(Types.getListData, params);
    },
    [Types.fileUpSuccess]({ state, dispatch }, response) {
        iView.LoadingBar.finish();
        if (response.errcode === 0) {
            iView.Message.success({
                content: '文件上传成功',
                duration: 2
            });
            dispatch(Types.getListData);
        } else {
            state.modalMsg = response.errmsg;
            state.errDesc = response.errDesc || [];
            iView.Message.error({
                content: `${response.errmsg}`,
                duration: 1
            });
            state.visible = true;
        }
    },
    [Types.getListData]({ commit, state }, d) {
        state.loading = true;
        let listCgi = cgiPrefix + cgiName['getList'];
        let changeTip = st => {
            let t = '未知';
            if (st === '1') {
                t = '有效';
            } else if (st === '2') {
                t = '无效';
            }
            return t;
        };
        let param = d || state.searchCgiParam;
        param.ClassState === 0 ? param.ClassState = '' : null;
        yztFetch(listCgi, param).then(data => {
            let list = data.list || [];
            if (list.length > 0) {
                for (let item of list) {
                    item.ClassL1Id = decodeHtml(item.ClassL1Id) || '未知';
                    item.ClassL1Name = decodeHtml(item.ClassL1Name) || '未知';
                    item.ClassL2Id = decodeHtml(item.ClassL2Id) || '未知';
                    item.ClassL2Name = decodeHtml(item.ClassL2Name) || '未知';
                    item.ClassShop = decodeHtml(item.ClassShop) || '未知';
                    item.BusinessShop = decodeHtml(item.BusinessShop) || '未知';
                    item.ClassState = changeTip(item.ClassState);
                    item.ModTime = transTime(item.LastModTimeMs) || '- -';
                    item.ModBy = item.ModBy || '- -';
                    item.key = Math.random();
                }
            }
            state.listData = list;
            state.total = +data.total;
            state.current = +data.pageNo;
            state.pageSize = +data.pageSize;
            state.loading = false;
        }).catch(() => {
            state.loading = false;
            iView.Message.error({
                content: '请求服务器数据失败！',
                duration: 2
            });
        });
    },
    [Types.deleteOk]({ commit, state, dispatch }, row) {
        let delCgi = cgiPrefix + cgiName['delete'];
        yztFetch(delCgi, {
            classInfo: JSON.stringify([{
                classIds: row.ClassL1Id + '-' + row.ClassL2Id,
                className: row.ClassL1Name + '-' + row.ClassL2Name
            }])
        }).then(response => {
            if (response.errcode === 0) {
                iView.Message.success('删除成功');
                dispatch(Types.getListData);
            } else {
                iView.Message.error('删除失败！' + response.errmsg);
            }
        }, err => {
            iView.Message.error('删除失败！' + err);
        }).catch(e => {
            iView.Message.error('删除失败！' + e);
        });
    },
    [Types.modifyOk]({ commit, state }, payload) {
        if (!state.inVal) {
            iView.Message.error('字段不能为空');
            return;
        }
        state.editLoading = true;
        let editCgi = cgiPrefix + cgiName['update'];
        yztFetch(editCgi, {
            classShop: payload.name === 'ClassShop' ? state.inVal : payload.row.ClassShop,
            businessShop: payload.name === 'BusinessShop' ? state.inVal : payload.row.BusinessShop,
            classInfo: JSON.stringify([{
                classIds: payload.row.ClassL1Id + '-' + payload.row.ClassL2Id,
                className: payload.row.ClassL1Name + '-' + payload.row.ClassL2Name
            }])
        }).then(response => {
            state.editLoading = false;
            if (response.errcode === 0) {
                iView.Message.success('修改成功');
                // state.$emit('change', row.BusinessShop, state.inVal);
                payload.name === 'ClassShop' ? payload.row.ClassShop = state.inVal : null;
                payload.name === 'BusinessShop' ? payload.row.BusinessShop = state.inVal : null;
                state.visible = false;
                commit(Types.updateEditInVal, '');
                commit(Types.closePop);
            } else {
                iView.Message.error(response.errmsg);
            }
        }, err => {
            state.editLoading = false;
            iView.Message.error('修改失败！' + err);
        }).catch(e => {
            state.editLoading = false;
            iView.Message.error('修改失败！' + e);
        });
    }
};
export default actions;
