<template>
    <span>
        <span style="color: #ccc;" v-show="row.ClassState === '有效'"> 删除 </span>
        <Poptip
            v-show="row.ClassState !== '有效'"
            confirm
            title="您确认删除这条数据吗？"
            @on-ok="deleteOk(row)"
            @on-cancel="deleteCancel">
            <span style="color: #2d8cf0; cursor: pointer;"> 删除 </span>
        </Poptip>
    </span>
</template>
<script>
import * as Types from '../store/types';

export default {
    props: {
        row: Object
    },
    methods: {
        deleteOk (row) {
            this.$store.dispatch(Types.deleteOk, row);
        },
        deleteCancel () { }
    }
};
</script>
<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>