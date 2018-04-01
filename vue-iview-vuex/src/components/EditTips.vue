<template>
    <Poptip @on-popper-hide="setNullVal">
        <div slot="content">
            <Input placeholder="请输入" :maxlength="25" v-model="inVal"></Input><br>
            <div style="margin-top: 5px; margin-right:5px;float: right;">
                <Button @click="modifyOk(row, name)" size="small" :loading="editLoading" type="primary">
                    <span v-if="!editLoading">确认修改</span>
                    <span v-else>修改中</span>
                </Button>
                
                <Button @click="modifyCancel" size="small" type="ghost">取消</Button>
            </div>
        </div>
        <span>{{propsVal}}</span><Icon type="edit" style="margin-left: 5px; cursor: pointer;"></Icon>
    </Poptip>
</template>
<script>
import * as Types from '../store/types';
import { mapGetters, mapState } from 'vuex';

export default {
    name: 'edit-tips',
    props: ['row', 'name'],
    computed: {
        ...mapState([
            'editLoading'
        ]),
        inVal: {
            get () {
                return this.$store.state.inVal;
            },
            set (value) {
                this.$store.commit(Types.updateEditInVal, value);
            }
        },
        propsVal() {
            return this.row[this.name];
        }
    },
    methods: {
        modifyOk (row, name) {
            this.$store.dispatch(Types.modifyOk, {row, name});
        },
        modifyCancel () {
            this.$store.commit(Types.closePop);
        },
        setNullVal () {
            this.$store.commit(Types.updateEditInVal, '');
        }
    }
}
</script>