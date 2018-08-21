<template>
    <div>
        {{ msg }}
        <br />
        <button @click="add">增加</button>
        <br />
        <button @click="asyncAdd">异步增加</button>
        {{num}}
        <br />
        <button @click="asyncGetData">异步获取数据</button>
        <div>{{ data }}</div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapDispatch } from 'vuex';
export default {
    data() {
        return {
            msg: 'Hello'
        }
    },
    computed: {
        // Object.assign({}, mapStates['num'])
        // ...mapState([
        //         'orderList',
        //         'login'
        //     ]),
        num() {
            // get() {
                return this.$store.state.num;
            // }
        },
        data() {
            return this.$store.state.data;
        }
    },
    methods: {
        add() {
            this.$store.commit('add')
        },
        asyncAdd() {
            this.$store.dispatch('asyncAdd')
        },
        asyncGetData() {
            this.$store.dispatch('asyncGetData')
        }
    }
}
</script>

