<<template>
    <el-form-item label="" class="creative-add-label">
        <div class="creative-add-area">
            <div class="creative-add-item-title">标题 <div class="close"
                @click="closeCreativeElement(1)"><div class="min-icon-close"></div></div></div>
            <el-form-item label="文本长度" label-width="80px" class="creative-add-item" required>
                <div class="dsinline">
                    <el-col :span="5">
                        <el-form-item prop="formCreativeElements1Min"
                            :rules="[{ validator: validate, trigger: 'blur', type: 'number'}]">
                            <el-input placeholder="最小值" type="number" v-model="form.creativeElements[1].min" class="ad-spec-text-min">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="1"><center>-</center></el-col>
                    <el-col :span="5">
                        <el-form-item prop="creativeSetElementsMaxOccurs"
                            :rules="[{ validator: validate, trigger: 'blur', type: 'number'}]">
                            <el-input placeholder="最大值" type="number" v-model="form.creativeElements[1].max" class="ad-spec-text-max">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2">字数</el-col>
                </div>
            </el-form-item>
        </div>
    </el-form-item>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
    }
</script>

<style lang="sass">
    

</style>

