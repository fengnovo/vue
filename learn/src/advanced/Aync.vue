<template>
    <div>{{message}}</div>
</template>

<script>
    export default {
        data () {
            return {
                message: '没有更新'
            }
        },
        methods: {
            updateMessage () {
                console.log('updateMessage');
                this.message = '更新完成'
                console.log(this.$el.textContent) // => '没有更新'
                this.$nextTick(function () {
                    console.log(this.$el.textContent) // => '更新完成'
                })
            }
        }
    }
</script>