import {
    errcodeMap
} from '../commons/util.js';

export default {
    formItem: {
        ClassL1Name: '',
        ClassL2Name: '',
        ClassShop: '',
        BusinessShop: '',
        ClassState: 0
    },
    searchCgiParam: {
        ClassL1Id: '',
        ClassL2Id: '',
        ClassL1Name: '',
        ClassL2Name: '',
        ClassShop: '',
        BusinessShop: '',
        ModBy: '',
        ClassState: '',
        pageNo: 1,        // 页码
        pageSize: 50,     // 页大小
        ie: 'utf-8'
    },
    loading: true,
    total: 0,
    current: 1,
    pageSize: 50,
    listData: [],
    modalVisibleId: false,
    visible: false,
    modalMsg: '',
    errDesc: [],
    errcodeMap: errcodeMap,
    editModal: false,


    editVisible: false,
    inVal: '',
    editLoading: false
};