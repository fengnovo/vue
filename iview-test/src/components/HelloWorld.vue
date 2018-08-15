<template>
  <div>
    <Table :columns="columns1" :data="data1"></Table>
  </div>
</template>

<script>
import EditTips from './EditTips';
console.log(EditTips);
export default {
    name: 'HelloWorld',
    components: { 
        EditTips
    } ,
    data () {
        return {
            columns1: [
                {
                    title: 'Name',
                    key: 'name'
                },
                {
                    title: 'Age',
                    key: 'age'
                },
                {
                    title: '地址',
                    key: 'address',
                    render: (h, params) => {
                        return h('div', [
                            h(EditTips, {
                                props: {
                                    row: params.row
                                },
                                on: {
                                    change(val) {
                                       params.row.address = val;
                                    }
                                }
                            }, '编辑')
                        ]);
                    }
                }
            ],
            data1: [
                {
                    name: 'John Brown',
                    age: 18,
                    address: 'New York No. 1 Lake Park',
                    date: '2016-10-03'
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: 'London No. 1 Lake Park',
                    date: '2016-10-01'
                },
                {
                    name: 'Joe Black',
                    age: 30,
                    address: 'Sydney No. 1 Lake Park',
                    date: '2016-10-02'
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No. 2 Lake Park',
                    date: '2016-10-04'
                }
            ]
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
</style>
