import { mutationTypeEnum, stateNameEnum } from '@/common/config.aside';
export default {
    [mutationTypeEnum.UPDATE_COLLAPSE](state, payload) {
        Object.assign(state, {
            [stateNameEnum.COLLAPSE]: payload
        })
    }
}
