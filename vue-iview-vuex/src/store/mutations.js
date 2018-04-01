import * as Types from './types';
import iView from 'iview';
import {
    cgiPrefix,
    cgiName
} from '../commons/cgiConst.js';
const mutations = {
    [Types.exportFile](state) {
        let exportUrl = cgiPrefix + cgiName['download'];
        let s = state.searchCgiParam;
        let pStr = {
            ClassL1Id: s.ClassL1Id || '',
            ClassL2Id: s.ClassL2Id || '',
            ClassL1Name: s.ClassL1Name || '',
            ClassL2Name: s.ClassL2Name || '',
            ClassShop: s.ClassShop || '',
            BusinessShop: s.BusinessShop || '',
            ModBy: s.ModBy || '',
            ClassState: s.ClassState === 0 ? '' : s.ClassState
        };
        pStr = Object.keys(pStr).reduce((i1, i2) => i1 + i2 + '=' + pStr[i2] + '&', '?');
        pStr = pStr.substring(0, pStr.length - 1);
        console.log(exportUrl + pStr);
        window.location.href = exportUrl + pStr;
    },
    [Types.fileFormatError]() {
        iView.LoadingBar.finish();
        iView.Message.warning({
            content: '文件格式错误，仅支持csv文件格式',
            duration: 2
        });
    },
    [Types.beforeUpload]() {
        iView.LoadingBar.start();
    },
    [Types.fileUpError]() {
        iView.LoadingBar.finish();
        iView.Message.error({
            content: '文件上传失败',
            duration: 2
        });
    },
    [Types.ok](state) {
        state.visible = false;
    },
    [Types.cancel](state) {
        state.visible = false;
    },
    [Types.updateFormItem](state, payload) {
        state.formItem = Object.assign({}, state.formItem, payload);
    },
    [Types.updateModalVisible](state, val) {
        state.visible = val;
    },
    [Types.updateEditInVal](state, val) {
        state.inVal = val;
    },
    [Types.updateEditVisible](state, val) {
        state.editVisible = val;
    },
    [Types.modifyCancel](state) {
        state.editLoading = false;
        state.inVal = '';
    },
    [Types.closePop]() {
        document.getElementById('blur').click();
    }
};
export default mutations;
