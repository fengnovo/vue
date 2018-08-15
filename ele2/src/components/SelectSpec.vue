<template>
    <el-dialog
        title="规格选择"
        size="tiny"
        :visible="visible"
        :before-close="close"
    >
        <div>
            <el-form ref="form" label-width="80px">
                <el-form-item label="规格类型">
                    <el-select v-model="type" multiple placeholder="全部类型（可多选）" style="width: 90%;">
                        <el-option
                            v-for="item in typeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
        <div>
            <div class="box-speclist">
                <div>
                    <el-button @click="selectAllSpec">全选</el-button>
                    <el-button @click="unSelectAllSpec">反选</el-button>
                </div>
                <el-checkbox-group v-model="selectedSpec">
                    <ul class="list-spec">
                        <li v-for="spec in specData" class="item-spec" :key="spec.adSpecId">
                            <el-checkbox :label="spec.adSpecId" >{{spec.adSpecName}}</el-checkbox>
                        </li>
                    </ul>
                </el-checkbox-group>
            </div>
        </div>
        <div slot="footer">
            <el-button @click="close">取消</el-button>
            <el-button type="primary" @click="save">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    // 规格缓存
    let SPEC_CACHE = {};

    export default {
        props: {
            visible: Boolean,
            specList: Array
        },
        data() {
            return {
                specData: [],
                selectedSpec: []
            }
        },
        methods: {
            close() {
                this.$emit('update:visible', false);
            },
            // 初始化规格类型
            initSpecType() {
                this.specList.forEach(function(spec) {
                    let ctpl = spec.oCreativeTemplate;
                    let textNum = (ctpl.text && ctpl.text.length) || 0;
                    let imageNum = (ctpl.images && ctpl.images.length) || 0;
                    let key = textNum + '-' + imageNum;
                    
                    if (!SPEC_CACHE[key]) {
                        SPEC_CACHE[key] = [];
                    }
                    SPEC_CACHE[key].push(spec);
                });
                this.specData = this.specList;
            },
            save() {
                this.$emit('update:visible', false);
                this.$emit('setSpec', this.selectedSpec.join('|'));
            },
            // 全选规格
            selectAllSpec() {
                let arr = [];
                this.specList.forEach(function(spec) {
                    arr.push(spec.adSpecId);
                });
                
                this.selectedSpec = arr;
            },
            // 反选规格
            unSelectAllSpec() {
                let arr = [];
                
                this.specList.forEach((spec)=> {
                    if (this.selectedSpec.indexOf(spec.adSpecId) === -1) {
                        arr.push(spec.adSpecId);
                    }
                });
                this.selectedSpec = arr;
            }
        },
        watch: {
            specList() {
                this.initSpecType();
                this.selectedSpec = [];
            }
        }
    }
</script>

<style lang="scss">
    .el-dialog__body {
        .box-speclist {
            border: 1px solid #eaeaea;
            padding: 20px 25px;
            button {
                width: 100px;
            }
            .list-spec {
                overflow: auto;
                max-height: 400px;
            }
        }
        .list-spec {
            list-style: none;
            margin-top: 20px;
        }
        .item-spec {
            padding: 5px 0;
        }
    }

    .el-dialog--tiny {
        max-width: 70%;
        min-width: 40%;
    }

    .el-dialog__footer {
        padding-top: 20px;
        button {
            position: absolute;
            bottom: 24px;
            width: 100px;
            &:first-child {
                right: 140px;
            }
            &:nth-last-child(1) {
                right: 24px;
            }
        }
    }
</style>