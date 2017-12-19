import mutations from './mutations';
import {stateNameEnum} from '@/common/config.aside';

export default {
    strict: true,
    namespaced: true,
    state: {
        [stateNameEnum.COLLAPSE]: false
    },
    mutations
}
