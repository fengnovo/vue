<template>
    <div>
        <SelectContainer />
        <TableContainer />
    </div>
</template>

<script>
import TableContainer from './components/TableContainer.vue';
import SelectContainer from './components/SelectContainer.vue';
export default {
    name: 'App',
    components: {
       TableContainer,
       SelectContainer
    }
}
</script>

<style>
.el-form-item__label {
    font-size: 12px;
}
</style>
