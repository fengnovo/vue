<template>
  <div>
    重塑数组 <br />
    变异方法(mutation method)，顾名思义，会改变被这些方法调用的原始数组。<br />
    相比之下，也有非变异(non-mutating method)方法，例如： filter(), concat(), slice() 。<br />
    这些不会改变原始数组，但总是返回一个新数组。当使用非变异方法时，可以用新数组替换旧数组：<br />
    <pre>
    example1.items = example1.items.filter(function (item) {
        return item.message.match(/Foo/)
    })
    </pre>
    你可能认为这将导致 Vue 丢弃现有 DOM 并重新渲染整个列表。幸运的是，事实并非如此。 <br />
    Vue 实现了一些智能启发式方法来最大化 DOM 元素重用，所以用一个含有<b>相同元素的数组去替换原来的数组</b>是非常高效的操作。<br />

    <div>
        <div v-pre>
            <pre>
                <code>
                    <!-- 阻止单击事件冒泡 -->
                    <a v-on:click.stop="doThis">测试链接</a>
                    <!-- 提交事件不再重载页面 -->
                    <form v-on:submit.prevent="onSubmit">测试表单</form>
                    <!-- 修饰符可以串联  -->
                    <a v-on:click.stop.prevent="doThat">测试链接</a>
                    <!-- 只有修饰符 -->
                    <form v-on:submit.prevent>测试表单</form>
                    <!-- 添加事件侦听器时使用事件捕获模式 -->
                    <div v-on:click.capture="doThis">测试文本</div>
                    <!-- 只当事件在该元素本身（而不是子元素）触发时触发回调 -->
                    <div v-on:click.self="doThat">测试文本</div>
                </code>
            </pre>
        </div>
    </div>
  </div>
</template>

<script>
    export default {
        data () {
            return {
                html: `<code>
                    <!-- 阻止单击事件冒泡 -->
                    <a v-on:click.stop="doThis"></a>
                    <!-- 提交事件不再重载页面 -->
                    <form v-on:submit.prevent="onSubmit"></form>
                    <!-- 修饰符可以串联  -->
                    <a v-on:click.stop.prevent="doThat"></a>
                    <!-- 只有修饰符 -->
                    <form v-on:submit.prevent></form>
                    <!-- 添加事件侦听器时使用事件捕获模式 -->
                    <div v-on:click.capture="doThis">...</div>
                    <!-- 只当事件在该元素本身（而不是子元素）触发时触发回调 -->
                    <div v-on:click.self="doThat">...</div>
                </code>`
            }
        }
    }
</script>

