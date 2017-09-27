<template>
    <el-dialog :title="title" 
            :name="name"
            :visible.sync="dialogVisible" 
            :before-close="ai_dialog_close" 
            :size="size">
        <slot name="dialog-body"></slot>
        <slot name="dialog-footer"></slot>
    </el-dialog>
</template>

<script>
export default {
    props: {
        dialogVisible: {
            required: true,
            default: false
        },
        width: {
            required: true,
            default: '500px'
        },
        title: {
            required: true,
            default: '标题'
        },
        size: {
            size: 'tiny'
        },
        name: {
            required: true
        }
    },
    data() {
        return {}
    },
    methods: {
        ai_dialog_close() {
            this.$emit('toggleShowOrHide', this.name ,false);   //ture即显示对话框，将对应name的dialog关闭则false
        }
    }
};
</script>