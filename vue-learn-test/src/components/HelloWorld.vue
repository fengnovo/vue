<template>
    <div class="hello">
        <h1 v-cloak>{{ msg }}</h1>
        <h1 v-once>v-once --> {{ msg }}</h1>
        <h1 v-pre> v-pre --> {{ msg }}</h1>
        <p>{{ 9 | addZero}}</p>
        <p>{{ 73.278494982 | fixedNum(3)}}</p>
        <button @click="change">change</button><br />
        <button @click="getData">getData</button><br />
        <button @click="postData">postData</button><br />
    </div>
</template>

<script>
export default {
    name: 'HelloWorld',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    },
    methods: {
        change() {
            this.msg = '测试'
        },
        getData() {
            this.$axios.get('http://localhost/vue-test-server/get.php?userName=22&passWord=2342')
                .then(data => {
                    console.log(data);
                })
                .catch(e => {
                    console.log(e);
                })
        },
        postData() {
            this.$axios.post('http://localhost/vue-test-server/post.php',{
                    userName: 11,
                    passWord: 'asfdsf'
                })
                .then(data => {
                    console.log(data);
                })
                .catch(e => {
                    console.log(e);
                })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
    font-weight: normal;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
[v-cloak] {
    display: none;
}
</style>
