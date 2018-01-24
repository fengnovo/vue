<template>
    <div>  
        <input type="text" v-model='componentName'>
        <button @click='add'>click me to add a component</button>
        <br />
        <button @click='edit'>弹框</button>
        <br />
        <button @click='alertMe'>弹框alert</button>
        <br />
        <InputComponent a='sdfsdf'></InputComponent>
    </div> 
</template>

 
<script>  
    import InputComponent from '@/components/InputComponent.vue';
    export default {
        data() {
            return {
                allComponents: [],
                componentName: ''
            }
        },  
        components: { 
            InputComponent, 
            component1: { //第一个子组件  
                template: "<div>这里是子组件1</div>"  
            },  
            component2: { //第二个子组件  
                template: "<div>这里是子组件2</div>"  
            } 
        } ,
        methods: {
            add: function() {
                this.allComponents.push(this.componentName)
                // 重置输入框
                this.componentName = ''
            },
            edit: function() {
                this.$prompt('请输入邮箱', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                    inputErrorMessage: '邮箱格式不正确'
                }).then(({ value }) => {
                    this.$message({
                        type: 'success',
                        message: '你的邮箱是: ' + value
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });       
                });
            },
            alertMe: function() {
                const h = this.$createElement;
                let _this = this;
                let tempData;
                this.$alert('请输入邮箱', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    message: h('div', null, [
                        h(InputComponent, {
                            props: {
                                a: 'foo'
                            },
                            on: {
                                change: data => {
                                    tempData = data;
                                }
                            }
                        })
                    ]),
                    beforeClose: (action, instance, done) => {
                        console.log(tempData);
                        done();
                    }
                }).then((action, instance, done) => {
                    this.$message({
                        type: 'success',
                        message: tempData
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });       
                });
            },
            render: function(h) { // h 为 createElement 函数，接受三个参数
                // tag 
                // data
                // children 具体看文档吧
                return h('div',this.allComponents.map(function(componentName) {
                    return h(componentName)
                }))
            }
        } 
    } 
</script>  