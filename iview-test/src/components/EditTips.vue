<template>
    <Poptip v-model="visible">
        <div slot="content">
            <Input placeholder="请输入" v-model="inVal"></Input><br>
            <div style="margin-top: 5px; margin-right:5px;float: right;">
                <Button @click="ok" size="small" type="primary">确认</Button>
                <Button @click="close" size="small" type="ghost">取消</Button>
            </div>
        </div>
        <span>{{row.address}}</span><Icon type="edit" style="margin-left: 5px;"></Icon>
    </Poptip>
</template>
<script>
export default {
    name: 'edit-tips',
    props: ['row', 'change'],
    data () {
        return {
            visible: false,
            inVal: ''
        }
    },
    methods: {
        ok (e) {
            this.$emit('change', this.inVal);
            this.visible = false;
            this.inVal = '';
            this.$Message.info('修改成功!');
        },
        close () {
            this.visible = false;
            this.inVal = '';
        }
    }
}
</script>