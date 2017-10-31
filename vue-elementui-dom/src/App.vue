<template>
    <div>  
        <input type="text" v-model='componentName'>
        <button @click='add'>click me to add a component</button>
    </div> 
</template>

 
<script>  
    export default {
        data() {
            return {
                allComponents: [],
                componentName: ''
            }
        },  
        methods: {
            add: function() {
                this.allComponents.push(this.componentName)
                // 重置输入框
                this.componentName = ''
            },
            render: function(h) { // h 为 createElement 函数，接受三个参数
                // tag 
                // data
                // children 具体看文档吧
                return h('div',this.allComponents.map(function(componentName) {
                    return h(componentName)
                }))
            }
        },  
        components: {  
            component1: { //第一个子组件  
                template: "<div>这里是子组件1</div>"  
            },  
            component2: { //第二个子组件  
                template: "<div>这里是子组件2</div>"  
            } 
        }  
    } 
</script>  