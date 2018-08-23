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
export default {
    data() {
        return {
            msg: '私有属性'
        }
    },
    // computed: {
    //     isOdd() {
    //         return this.$store.getters.isOdd;
    //     },
    //     num() {
    //         return this.$store.state.num;
    //     },
    //     data() {
    //         return this.$store.state.data;
    //     }
    // },
    // methods: {
    //     add() {
    //         this.$store.commit('add')
    //     },
    //     asyncAdd() {
    //         this.$store.dispatch('asyncAdd')
    //     },
    //     asyncGetData() {
    //         this.$store.dispatch('asyncGetData')
    //     }
    // }
}
</script>

