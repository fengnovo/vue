<template>
    <div>
        {{ msg }}
        <br />
        <button @click="add">增加</button>
        <br />
        <button @click="asyncAdd">异步增加</button>
        {{num}}
        <br />
        <div>{{ isOdd }}</div>
        <br />
        <button @click="asyncGetData">异步获取数据</button>
        <div>{{ data }}</div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters, mapDispatch } from 'vuex';
export default {
    data() {
        return {
            msg: '私有属性'
        }
    },
    computed: {
        ...mapState([
                'num',
                'data'
            ]),
        ...mapGetters([
            'isOdd'
        ])
    },
    methods: {
        ...mapMutations([
                'add'
            ]),
        ...mapActions([
            'asyncAdd',
            'asyncGetData'
        ])
    }
}
</script>

