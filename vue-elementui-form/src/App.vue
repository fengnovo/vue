<template>
    <div class="standard-manage-right-slide-editor">
        <div class="rscontent-content-item">
            <div class="rscontent-content-item-content">
                <el-form :model="form" ref="addForm" :rules="rules" label-width="140px">
                    <el-form-item label="产品类型">
                        <el-radio-group v-model="form.adBizId">
                            <el-radio :label="1">腾讯社交资源</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="商品类型" class="spec-type-area">
                        <el-select v-model="form.specType" placeholder="请选择">
                            <el-option
                                v-for="item in options.specType"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="子产品类型">
                        <el-radio-group v-model="form.subAdBizId">
                            <el-radio 
                                v-for="item in options.adType" 
                                :key="item.value"
                                :value="item.value"
                                :label="item.value">
                                {{item.label}}
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="投放站点">
                        <div class="sub-biz-name">
                            <el-checkbox-group v-model="form.adSiteSet">
                                <el-checkbox
                                    v-for="item in options.adSiteSet"
                                    :key="item.value"
                                    :value="item.label"
                                    :label="item.value">
                                    {{item.label}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </el-form-item>
                    <el-form-item label="添加素材" class="creative-add">
                        <el-select v-model="form.adElement" placeholder="请选择">
                            <el-option
                                v-for="item in options.adElement"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                        <el-button type="primary" :disabled="disabledAdd" @click="addCreativeElement">增加</el-button>
                    </el-form-item>
                    <el-form-item v-if="creativeElements[1]" label="" class="creative-add-label">
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
                    <el-form-item v-if="creativeElements[2]" label="" class="creative-add-label">
                        <div class="creative-add-area">
                            <div class="creative-add-item-title">描述 <div class="close"
                                @click="closeCreativeElement(2)"><div class="min-icon-close"></div></div></div>
                            <el-form-item label="文本长度" label-width="80px" class="creative-add-item" required>
                                <div class="dsinline">
                                    <el-col :span="5">
                                        <el-form-item prop="creativeSetElementsMinOccurs"
                                            :rules="[{ validator: validate, trigger: 'blur', type: 'number'}]">
                                            <el-input placeholder="最小值" type="number" v-model="form.creativeElements[2].min" class="ad-spec-text-min">
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1"><center>-</center></el-col>
                                    <el-col :span="5">
                                        <el-form-item prop="creativeSetElementsMaxOccurs"
                                            :rules="[{ validator: validate, trigger: 'blur', type: 'number'}]">
                                            <el-input placeholder="最大值" type="number" v-model="form.creativeElements[2].max" class="ad-spec-text-max">
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="2">字数</el-col>
                                </div>
                            </el-form-item>
                        </div>
                    </el-form-item>
                    <el-form-item v-if="creativeElements[3]" label="" class="creative-add-label">
                        <div class="creative-add-area">
                            <div class="creative-add-item-title">图片 <div class="close"
                                @click="closeCreativeElement(3)"><div class="min-icon-close"></div></div></div>
                            <div>
                                <el-form-item label="尺寸" label-width="80px" class="creative-add-item" required>
                                    <div class="dsinline">
                                        <el-col :span="5">
                                            <el-form-item prop="creativeSetElementsMinOccurs"
                                                :rules="[{ validator: validate, trigger: 'blur', type: 'number'}]">
                                                <el-input placeholder="请输入" type="number" v-model="form.creativeElements[3].width" class="ad-spec-wh-min">
                                                    <template slot="prepend">宽</template>
                                                </el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="1">&nbsp;</el-col>
                                        <el-col :span="5">
                                            <el-form-item prop="creativeSetElementsMaxOccurs"
                                                :rules="[{ validator: validate, trigger: 'blur', type: 'number'}]">
                                                <el-input placeholder="请输入" type="number" v-model="form.creativeElements[3].height" class="ad-spec-wh-max">
                                                    <template slot="prepend">高</template>
                                                </el-input>
                                            </el-form-item>
                                        </el-col>
                                    </div>
                                </el-form-item>
                                <el-form-item label="图片大小" label-width="80px" class="creative-add-item" required>
                                    <div class="dsinline">
                                        <el-col :span="16">
                                            <el-form-item prop="creativeSetElementsMinOccurs"
                                                :rules="[{ validator: validate, trigger: 'blur', type: 'number'}]">
                                                <el-input placeholder="请输入" type="number" v-model="form.creativeElements[3].picSize">
                                                    <template slot="append">KB</template>
                                                </el-input>
                                            </el-form-item>
                                        </el-col>
                                    </div>
                                </el-form-item>
                                <el-form-item label="图片格式" label-width="80px" 
                                            class="creative-add-item" required 
                                            prop="creativeSetElementsMinOccurs"
                                            :rules="[{ validator: validate, trigger: 'blur', type: 'number'}]">
                                    <el-checkbox-group v-model="form.creativeElements[3].format">
                                        <el-checkbox label="1">jpg</el-checkbox>
                                        <el-checkbox label="2">png</el-checkbox>
                                        <el-checkbox label="4">gif</el-checkbox>
                                    </el-checkbox-group>
                                </el-form-item>
                                <el-form-item label="界面说明" label-width="80px" class="creative-add-item">
                                    <div class="dsinline">
                                        <!-- <el-form-item label="界面说明" class="creative-add-item creative-add-item-desc"> -->
                                            <el-input placeholder="请输入内容" v-model="form.creativeElements[3].picContent"></el-input>
                                        <!-- </el-form-item> -->
                                    </div>
                                </el-form-item>
                                <el-form-item label="添加水印" label-width="80px" class="creative-add-item">
                                    <span style="margin-right: 20px;">水印位置</span>
                                    <el-radio class="radio" v-model="form.creativeElements[3].position" label="1">左上角样式</el-radio>
                                    <el-radio class="radio" v-model="form.creativeElements[3].position" label="2">右上角样式</el-radio>
                                    <el-input style="margin-left: 30px;width: 400px;" 
                                            placeholder="请输入" 
                                            v-model="form.creativeElements[3].picLink">
                                        <template slot="prepend">水印链接</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="添加图层" label-width="80px" class="creative-add-item">
                                    <el-upload
                                        class="example-preview"
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        :on-preview="handlePreview1"
                                        :on-remove="handleRemove1"
                                        :file-list="fileList1"
                                        list-type="picture">
                                        <span style="margin-right: 20px;">水印图层</span>
                                        <el-button size="small" type="primary">点击上传</el-button>
                                    </el-upload>
                                    <el-upload
                                        class="example-preview"
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        :on-preview="handlePreview1"
                                        :on-remove="handleRemove1"
                                        :file-list="fileList1"
                                        list-type="picture">
                                        <span style="margin-right: 20px;">提示图层</span>
                                        <el-button size="small" type="primary">点击上传</el-button>
                                    </el-upload>
                                </el-form-item>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item v-if="creativeElements[4]" label="" class="creative-add-label">
                        <div class="creative-add-area">
                            <div class="creative-add-item-title">Sortable <div class="close"
                                @click="closeCreativeElement(4)"><div class="min-icon-close"></div></div></div>
                            <div>
                                <el-form-item label="选项" label-width="80px" required
                                    class="creative-add-item" prop="creativeSetElementsMinOccurs"
                                    :rules="[{ validator: validate, trigger: 'blur', type: 'number'}]">
                                        <el-checkbox-group v-model="form.creativeElements[4].sortFlag">
                                            <el-checkbox label="0">自动优化</el-checkbox>
                                            <el-checkbox label="1">顺序播放</el-checkbox>
                                        </el-checkbox-group>
                                </el-form-item>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item v-if="creativeElements[5]" label="" class="creative-add-label">
                        <div class="creative-add-area">
                            <div class="creative-add-item-title">URL <div class="close"
                                @click="closeCreativeElement(5)"><div class="min-icon-close"></div></div></div>
                            <div>
                                <el-form-item label="链接长度" label-width="80px" class="creative-add-item" required>
                                    <div class="dsinline">
                                        <el-col :span="5">
                                            <el-form-item prop="creativeSetElementsMinOccurs"
                                                :rules="[{ validator: validate, trigger: 'blur', type: 'number'}]">
                                                <el-input placeholder="最小值" type="number" v-model="form.creativeElements[5].urlMin" class="ad-spec-text-min">
                                                </el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="1"><center>-</center></el-col>
                                        <el-col :span="5">
                                            <el-form-item prop="creativeSetElementsMinOccurs"
                                                :rules="[{ validator: validate, trigger: 'blur', type: 'number'}]">
                                                <el-input placeholder="最大值" type="number" v-model="form.creativeElements[5].urlMax" class="ad-spec-text-max">
                                                </el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="2">字数</el-col>    
                                    </div>
                                </el-form-item>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item v-if="creativeElements[6]" label="" class="creative-add-label">
                        <div class="creative-add-area">
                            <div class="creative-add-item-title">图片集合(image_list) <div class="close"
                                @click="closeCreativeElement(6)"><div class="min-icon-close"></div></div></div>
                            <div>
                                <el-form-item label="图片个数" label-width="80px" class="creative-add-item">
                                    <div class="dsinline">
                                        <el-col :span="5">
                                            <el-form-item prop="creativeSetElementsMinOccurs"
                                                :rules="[{ validator: validate, trigger: 'blur', type: 'number'}]">
                                            <el-input placeholder="最小值" type="number" v-model="form.creativeElements[6].setListMin" class="ad-spec-text-min">
                                            </el-input>
                                        </el-form-item>
                                        </el-col>
                                        <el-col :span="1"><center>-</center></el-col>
                                        <el-col :span="5">
                                            <el-form-item prop="creativeSetElementsMinOccurs"
                                                :rules="[{ validator: validate, trigger: 'blur', type: 'number'}]">
                                                <el-input placeholder="最大值" type="number" v-model="form.creativeElements[6].setListMax" class="ad-spec-text-max">
                                                </el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="2">个</el-col> 
                                    </div>
                                </el-form-item>
                                <el-form-item label="尺寸" label-width="80px" class="creative-add-item" required>
                                    <div class="dsinline">
                                        <el-col :span="5">
                                            <el-form-item prop="creativeSetElementsMinOccurs"
                                                :rules="[{ validator: validate, trigger: 'blur', type: 'number'}]">
                                                <el-input placeholder="请输入" type="number" v-model="form.creativeElements[6].width" class="ad-spec-wh-min">
                                                    <template slot="prepend">宽</template>
                                                </el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="1">&nbsp;</el-col>
                                        <el-col :span="5">
                                                <el-form-item prop="creativeSetElementsMinOccurs"
                                                :rules="[{ validator: validate, trigger: 'blur', type: 'number'}]">
                                                <el-input placeholder="请输入" type="number" v-model="form.creativeElements[6].height" class="ad-spec-wh-max">
                                                    <template slot="prepend">高</template>
                                                </el-input>
                                            </el-form-item>
                                        </el-col>
                                    </div>
                                </el-form-item>
                                <el-form-item label="图片大小" label-width="80px" class="creative-add-item" required>
                                    <div class="dsinline">
                                        <el-col :span="16">
                                            <el-form-item prop="creativeSetElementsMinOccurs"
                                                :rules="[{ validator: validate, trigger: 'blur', type: 'number'}]">
                                                <el-input placeholder="请输入" type="number" v-model="form.creativeElements[6].picSize">
                                                    <template slot="append">KB</template>
                                                </el-input>
                                            </el-form-item>
                                        </el-col>
                                    </div>
                                </el-form-item>
                                <el-form-item label="图片格式" label-width="80px" 
                                            class="creative-add-item" required 
                                            prop="creativeSetElementsMinOccurs"
                                            :rules="[{ validator: validate, trigger: 'blur', type: 'number'}]">
                                    <el-checkbox-group v-model="form.creativeElements[6].format">
                                        <el-checkbox label="1">jpg</el-checkbox>
                                        <el-checkbox label="2">png</el-checkbox>
                                        <el-checkbox label="4">gif</el-checkbox>
                                    </el-checkbox-group>
                                </el-form-item>
                                <el-form-item label="界面说明" label-width="80px" class="creative-add-item">
                                    <div class="dsinline">
                                        <el-input placeholder="请输入内容" v-model="form.creativeElements[6].picContent"></el-input>
                                    </div>
                                </el-form-item>
                                <el-form-item label="添加水印" label-width="80px" class="creative-add-item">
                                    <span style="margin-right: 20px;">水印位置</span>
                                    <el-radio class="radio" v-model="form.creativeElements[6].position" label="1">左上角样式</el-radio>
                                    <el-radio class="radio" v-model="form.creativeElements[6].position" label="2">右上角样式</el-radio>
                                    <el-input style="margin-left: 30px;width: 400px;" 
                                            placeholder="请输入" 
                                            v-model="form.creativeElements[6].picLink">
                                        <template slot="prepend">水印链接</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="添加图层" label-width="80px" class="creative-add-item">
                                    <el-upload
                                        class="example-preview"
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        :on-preview="handlePreview1"
                                        :on-remove="handleRemove1"
                                        :file-list="fileList1"
                                        list-type="picture">
                                        <span style="margin-right: 20px;">水印图层</span>
                                        <el-button size="small" type="primary">点击上传</el-button>
                                    </el-upload>
                                    <el-upload
                                        class="example-preview"
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        :on-preview="handlePreview1"
                                        :on-remove="handleRemove1"
                                        :file-list="fileList1"
                                        list-type="picture">
                                        <span style="margin-right: 20px;">提示图层</span>
                                        <el-button size="small" type="primary">点击上传</el-button>
                                    </el-upload>
                                </el-form-item>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item v-if="creativeElements[7]" label="" class="creative-add-label">
                        <div class="creative-add-area">
                            <div class="creative-add-item-title">商标 <div class="close"
                                @click="closeCreativeElement(7)"><div class="min-icon-close"></div></div></div>
                            <div>
                                <el-form-item label="商标名称长度" label-width="120px" class="creative-add-item" required>
                                    <div class="dsinline-mini">
                                        <el-col :span="5">
                                            <el-form-item prop="creativeSetElementsMinOccurs"
                                                :rules="[{ validator: validate, trigger: 'blur', type: 'number'}]">
                                                <el-input placeholder="最小值" type="number" v-model="form.creativeElements[7].min" class="ad-spec-text-min">
                                                </el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="1"><center>-</center></el-col>
                                        <el-col :span="6">
                                            <el-form-item prop="creativeSetElementsMaxOccurs"
                                                :rules="[{ validator: validate, trigger: 'blur', type: 'number'}]">
                                                <el-input placeholder="最大值" type="number" v-model="form.creativeElements[7].max" class="ad-spec-text-max">
                                                </el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="2">字数</el-col>
                                    </div>
                                </el-form-item>
                                <el-form-item label="商标图片尺寸" label-width="120px" class="creative-add-item" required>
                                    <div class="dsinline-mini">
                                        <el-col :span="5">
                                            <el-form-item prop="creativeSetElementsMinOccurs"
                                                :rules="[{ validator: validate, trigger: 'blur', type: 'number'}]">
                                                <el-input placeholder="请输入" type="number" v-model="form.creativeElements[7].width" class="ad-spec-wh-min">
                                                    <template slot="prepend">宽</template>
                                                </el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="2">&nbsp;</el-col>
                                        <el-col :span="6">
                                                <el-form-item prop="creativeSetElementsMinOccurs"
                                                :rules="[{ validator: validate, trigger: 'blur', type: 'number'}]">
                                                <el-input placeholder="请输入" type="number" v-model="form.creativeElements[7].height" class="ad-spec-wh-max">
                                                    <template slot="prepend">高</template>
                                                </el-input>
                                            </el-form-item>
                                        </el-col>
                                    </div>
                                </el-form-item>
                                <el-form-item label="商标图片大小" label-width="120px" class="creative-add-item" required>
                                    <div class="dsinline-mini">
                                        <el-col :span="16">
                                            <el-form-item prop="creativeSetElementsMinOccurs"
                                                :rules="[{ validator: validate, trigger: 'blur', type: 'number'}]">
                                                <el-input placeholder="请输入" type="number" v-model="form.creativeElements[7].picSize">
                                                    <template slot="append">KB</template>
                                                </el-input>
                                            </el-form-item>
                                        </el-col>
                                    </div>
                                </el-form-item>
                                <el-form-item label="商标图片格式" label-width="120px" 
                                            class="creative-add-item" required 
                                            prop="creativeSetElementsMinOccurs"
                                            :rules="[{ validator: validate, trigger: 'blur', type: 'number'}]">
                                    <el-checkbox-group v-model="form.creativeElements[7].format">
                                        <el-checkbox label="1">jpg</el-checkbox>
                                        <el-checkbox label="2">png</el-checkbox>
                                        <el-checkbox label="4">gif</el-checkbox>
                                    </el-checkbox-group>
                                </el-form-item>
                                <el-form-item label="商标界面说明" label-width="120px" class="creative-add-item">
                                    <div class="dsinline-mini">
                                        <el-input placeholder="请输入内容" v-model="form.creativeElements[7].content"></el-input>
                                    </div>
                                </el-form-item>
                                <el-form-item label="GDT-UIN" label-width="120px" 
                                            class="creative-add-item">
                                    <el-radio class="radio m-l" v-model="form.creativeElements[7].gdtuin" label="1">是</el-radio>
                                    <el-radio class="radio" v-model="form.creativeElements[7].gdtuin" label="2">否</el-radio>
                                </el-form-item>
                            </div>
                        </div>
                    </el-form-item>

                    <el-form-item label="素材集合" class="creative-add">
                        <el-switch
                            v-model="form.creativeSetElements.open"
                            on-text=""
                            off-text="">
                        </el-switch>
                    </el-form-item>
                    <div v-if="form.creativeSetElements.open">
                        <el-form-item label="" class="creative-add-label">
                            <el-form-item label="子素材个数" label-width="120px" class="creative-add-item">
                                <div class="dsinline m-l">
                                    <el-col :span="5">
                                        <el-form-item prop="creativeSetElementsMinOccurs"
                                            :rules="[{ validator: validate, trigger: 'blur', type: 'number'}]">
                                            <el-input placeholder="最小值" type="number" v-model="form.creativeSetElements.min_occurs" class="ad-spec-text-min">
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="1"><center>-</center></el-col>
                                    <el-col :span="5">
                                        <el-form-item prop="creativeSetElementsMaxOccurs"
                                            :rules="[{ validator: validate, trigger: 'blur', type: 'number'}]">
                                            <el-input placeholder="最大值" type="number" v-model="form.creativeSetElements.max_occurs" class="ad-spec-text-max">
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="2">个</el-col>
                                </div>
                            </el-form-item>
                        </el-form-item>
                        <el-form-item label="" class="creative-add-label">
                            <div class="creative-add-area">
                                <div class="creative-add-item-title">子素材图片 
                                    <el-switch
                                        v-model="form.creativeSetElements[1].open"
                                        on-text=""
                                        off-text="">
                                    </el-switch>
                                </div>
                                <div v-if="form.creativeSetElements[1].open">
                                    <el-form-item label="尺寸" label-width="80px" class="creative-add-item" required>
                                        <div class="dsinline">
                                            <el-col :span="5">
                                                <el-form-item prop="creativeSetElementsMinOccurs"
                                                    :rules="[{ validator: validate, trigger: 'blur', type: 'number'}]">
                                                    <el-input placeholder="请输入" type="number" v-model="form.creativeSetElements[1].width" class="ad-spec-wh-min">
                                                        <template slot="prepend">宽</template>
                                                    </el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="1">&nbsp;</el-col>
                                            <el-col :span="5">
                                                <el-form-item prop="creativeSetElementsMaxOccurs"
                                                    :rules="[{ validator: validate, trigger: 'blur', type: 'number'}]">
                                                    <el-input placeholder="请输入" type="number" v-model="form.creativeSetElements[1].height" class="ad-spec-wh-max">
                                                        <template slot="prepend">高</template>
                                                    </el-input>
                                                </el-form-item>
                                            </el-col>
                                        </div>
                                    </el-form-item>
                                    <el-form-item label="图片大小" label-width="80px" class="creative-add-item" required>
                                        <div class="dsinline">
                                            <el-col :span="16">
                                                <el-form-item prop="creativeSetElementsMinOccurs"
                                                    :rules="[{ validator: validate, trigger: 'blur', type: 'number'}]">
                                                    <el-input placeholder="请输入" type="number" v-model="form.creativeSetElements[1].picSize">
                                                        <template slot="append">KB</template>
                                                    </el-input>
                                                </el-form-item>
                                            </el-col>
                                        </div>
                                    </el-form-item>
                                    <el-form-item label="图片格式" label-width="80px" 
                                                class="creative-add-item" required 
                                                prop="creativeSetElementsMinOccurs"
                                                :rules="[{ validator: validate, trigger: 'blur', type: 'number'}]">
                                        <el-checkbox-group v-model="form.creativeSetElements[1].format">
                                            <el-checkbox label="1">jpg</el-checkbox>
                                            <el-checkbox label="2">png</el-checkbox>
                                            <el-checkbox label="4">gif</el-checkbox>
                                        </el-checkbox-group>
                                    </el-form-item>
                                    <el-form-item label="界面说明" label-width="80px" class="creative-add-item">
                                        <div class="dsinline">
                                            <el-input placeholder="请输入内容" v-model="form.creativeSetElements[1].comment"></el-input>
                                        </div>
                                    </el-form-item>
                                    <el-form-item label="添加水印" label-width="80px" class="creative-add-item">
                                        <span style="margin-right: 20px;">水印位置</span>
                                        <el-radio class="radio" v-model="form.creativeSetElements[1].jdwatermarkpos" label="1">左上角样式</el-radio>
                                        <el-radio class="radio" v-model="form.creativeSetElements[1].jdwatermarkpos" label="2">右上角样式</el-radio>
                                        <el-input style="margin-left: 30px;width: 400px;" 
                                                placeholder="请输入" 
                                                v-model="form.creativeSetElements[1].jdwatermarkpos">
                                            <template slot="prepend">水印链接</template>
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="添加图层" label-width="80px" class="creative-add-item">
                                        <el-upload
                                            class="example-preview"
                                            action="https://jsonplaceholder.typicode.com/posts/"
                                            :on-preview="handlePreview1"
                                            :on-remove="handleRemove1"
                                            :file-list="fileList1"
                                            list-type="picture">
                                            <span style="margin-right: 20px;">水印图层</span>
                                            <el-button size="small" type="primary">点击上传</el-button>
                                        </el-upload>
                                        <el-upload
                                            class="example-preview"
                                            action="https://jsonplaceholder.typicode.com/posts/"
                                            :on-preview="handlePreview1"
                                            :on-remove="handleRemove1"
                                            :file-list="fileList1"
                                            list-type="picture">
                                            <span style="margin-right: 20px;">提示图层</span>
                                            <el-button size="small" type="primary">点击上传</el-button>
                                        </el-upload>
                                    </el-form-item>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item label="" class="creative-add-label">
                            <div class="creative-add-area">
                                <div class="creative-add-item-title">子素材标题 
                                    <el-switch
                                        v-model="form.creativeSetElements[2].open"
                                        on-text=""
                                        off-text="">
                                    </el-switch>
                                </div>
                                <div v-if="form.creativeSetElements[2].open">
                                    <el-form-item label="文本长度" label-width="80px" class="creative-add-item" required>
                                        <div class="dsinline">
                                            <el-col :span="5">
                                                <el-form-item prop="creativeSetElementsMinOccurs"
                                                    :rules="[{ validator: validate, trigger: 'blur', type: 'number'}]">
                                                    <el-input placeholder="最小值" type="number" v-model="form.creativeSetElements[2].min_length" class="ad-spec-text-min">
                                                    </el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="1"><center>-</center></el-col>
                                            <el-col :span="5">
                                                <el-form-item prop="creativeSetElementsMaxOccurs"
                                                    :rules="[{ validator: validate, trigger: 'blur', type: 'number'}]">
                                                    <el-input placeholder="最大值" type="number" v-model="form.creativeSetElements[2].max_length" class="ad-spec-text-max">
                                                    </el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="2">字数</el-col>
                                        </div>
                                    </el-form-item>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item label="" class="creative-add-label">
                            <div class="creative-add-area">
                                <div class="creative-add-item-title">子素材描述 
                                    <el-switch
                                        v-model="form.creativeSetElements[3].open"
                                        on-text=""
                                        off-text="">
                                    </el-switch>
                                </div>
                                <div v-if="form.creativeSetElements[3].open">
                                    <el-form-item label="文本长度" label-width="80px" class="creative-add-item" required>
                                        <div class="dsinline">
                                            <el-col :span="5">
                                                <el-form-item prop="creativeSetElementsMinOccurs"
                                                    :rules="[{ validator: validate, trigger: 'blur', type: 'number'}]">
                                                    <el-input placeholder="最小值" type="number" v-model="form.creativeSetElements[3].min_length" class="ad-spec-text-min">
                                                    </el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="1"><center>-</center></el-col>
                                            <el-col :span="5">
                                                <el-form-item prop="creativeSetElementsMaxOccurs"
                                                    :rules="[{ validator: validate, trigger: 'blur', type: 'number'}]">
                                                    <el-input placeholder="最大值" type="number" v-model="form.creativeSetElements[3].max_length" class="ad-spec-text-max">
                                                    </el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="2">字数</el-col>
                                        </div>
                                    </el-form-item>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item label="" class="creative-add-label">
                            <div class="creative-add-area">
                                <div class="creative-add-item-title">子素材URL 
                                    <el-switch
                                        v-model="form.creativeSetElements[4].open"
                                        on-text=""
                                        off-text="">
                                    </el-switch>
                                </div>
                                <div v-if="form.creativeSetElements[4].open">
                                    <el-form-item label="链接长度" label-width="80px" class="creative-add-item" required>
                                        <div class="dsinline">
                                            <el-col :span="5">
                                                <el-form-item prop="creativeSetElementsMinOccurs"
                                                    :rules="[{ validator: validate, trigger: 'blur', type: 'number'}]">
                                                    <el-input placeholder="最小值" type="number" v-model="form.creativeSetElements[4].urlMin" class="ad-spec-text-min">
                                                    </el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="1"><center>-</center></el-col>
                                            <el-col :span="5">
                                                <el-form-item prop="creativeSetElementsMaxOccurs"
                                                    :rules="[{ validator: validate, trigger: 'blur', type: 'number'}]">
                                                    <el-input placeholder="最大值" type="number" v-model="form.creativeSetElements[4].urlMax" class="ad-spec-text-max">
                                                    </el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="2">字数</el-col>
                                        </div>
                                    </el-form-item>
                                </div>
                            </div>
                        </el-form-item>
                    </div>
                    <el-form-item label="示例图(大图)" required>
                        <el-upload
                            class="example-preview"
                            :action="form.uploadImgUrl"
                            :data="form.uploadParam1"
                            :on-preview="handlePreview1"
                            :on-remove="handleRemove1"
                            :show-file-list="true"
                            :on-success="handleSuccess1"
                            :on-error="handleError1"
                            accept="jpg,png,jpeg,gif"
                            name="imgfile"
                            list-type="picture"
                            ref="upload1"
                            :on-change="handleChange1">
                            <el-button size="small" type="primary" :disabled="form.imgUrlDisabled1">点击上传</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="示例图(小图)" required>
                        <el-upload
                            class="example-preview"
                            :action="form.uploadImgUrl"
                            :data="form.uploadParam2"
                            :on-preview="handlePreview2"
                            :on-remove="handleRemove2"
                            :show-file-list="true"
                            :on-success="handleSuccess2"
                            :on-error="handleError2"
                            accept="jpg,png,jpeg,gif"
                            name="imgfile"
                            ref="upload2"
                            :on-change="handleChange2"
                            list-type="picture">
                            <el-button size="small" type="primary" :disabled="form.imgUrlDisabled2">点击上传</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="规格名称" prop="adBidTypeCPCFlagMin" required>
                        <el-input v-model="form.adSpecName" placeholder="请输入名称" class="ad-spec-name-input"></el-input>
                    </el-form-item>
                    <el-form-item label="规格ID同步" prop="adSpecGdt" required>
                        <el-checkbox v-model="form.adSpecGdtFlag">GDT</el-checkbox>
                        <el-input placeholder="请输入" type="number"
                            v-model="form.adSpecGdt" class="ad-spec-name-input">
                            <template slot="prepend">crtsize</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="出价方式" required>
                        <div class="dsinline">
                            <el-col :span="4">
                                <el-checkbox v-model="form.adBidTypeCPCFlag">CPC</el-checkbox>
                            </el-col>    
                            <el-col :span="4">
                                <el-form-item prop="adBidTypeCPCFlagMin">
                                    <el-input placeholder="最小值" 
                                        type="number"
                                        v-model="form.adBidTypeCPCMin" 
                                        :disabled="!form.adBidTypeCPCFlag" 
                                        class="ad-spec-charge-min">
                                        <template slot="prepend">底价范围</template>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="7"><center>-</center></el-col>
                            <el-col :span="5">
                                <el-form-item prop="adBidTypeCPCFlagMax">
                                    <el-input placeholder="最大值" 
                                        type="number"
                                        v-model="form.adBidTypeCPCMax" 
                                        :disabled="!form.adBidTypeCPCFlag" 
                                        class="ad-spec-charge-max">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </div>
                    </el-form-item>
                    <el-form-item label=" ">
                        <div class="dsinline">
                            <el-col :span="4">
                                <el-checkbox v-model="form.adBidTypeCPMFlag">CPM</el-checkbox>
                            </el-col>    
                            <el-col :span="4">
                                <el-form-item prop="adBidTypeCPCFlagMin">
                                    <el-input placeholder="最小值" 
                                        type="number"
                                        v-model="form.adBidTypeCPMMin" 
                                        :disabled="!form.adBidTypeCPMFlag" 
                                        class="ad-spec-charge-min">
                                        <template slot="prepend">底价范围</template>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="7"><center>-</center></el-col>
                            <el-col :span="5">
                                <el-form-item prop="adBidTypeCPCFlagMax">
                                    <el-input placeholder="最大值" 
                                        type="number"
                                        v-model="form.adBidTypeCPMMax" 
                                        :disabled="!form.adBidTypeCPMFlag" 
                                        class="ad-spec-charge-max">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </div>
                    </el-form-item>
                    <el-form-item label="投放平台">
                        <el-radio-group v-model="form.showPlat">
                            <el-radio
                                v-for="item in options.showPlat"
                                :key="item.value"
                                :value="item.value"
                                :label="item.value">
                                {{item.label}}
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="审核规则">
                        <el-radio-group v-model="form.auditType">
                            <el-radio
                                v-for="item in options.auditType"
                                :key="item.value"
                                :value="item.value"
                                :label="item.value">
                                {{item.label}}
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <div class="market-data-editor-form-submit">
                        <div class="market-data-editor-form-submit-btn">
                            <el-button @click="cancel()">取消</el-button>
                            <el-button type="primary" :loading="actioning" @click="handleSubmit()">保存并提交</el-button>
                        </div>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import { dataConst, dataEnum } from './config.const.js';
    import { mergeData } from './data.js';
    import { rules } from './rules.js';
    import { arrRemove } from './util';
    import { 
        fetchAdd,
        getUploadImgUrl,
        getUploadLayerUrl
    } from './common';
            

    function initCreativeElementsData() {
        return {
            1: {
                type: 'TEXT',
                name: "title",
                desc: "标题"
            },
            2: {
                type: 'TEXT',
                name: "description",
                desc: "文案"
            },
            3: {
                type: "IMAGE",
                name: "image",
                desc: "图片",
                format: ['1'],
                position: '1',
            },
            4: {
                type: "ENUM",
                name: "sortable",
                desc: "自动优化图片排序",
                sortFlag: ['0','1']
            },
            5: {
                type: "URL",
                name: "url",
                desc: "链接",
                urlMin: 1,
                urlMax: 1024
            },
            6: {
                type: "IMAGE",
                name: "image_list",
                desc: "图片",
                format: ['1'],
                position: '1'
            },
            7: {
                type: "STRUCT",
                name: "corporate",
                desc: "商标",
                format: ['1'],
                gdtuin: '1'
            }
        }
    }
    function initCreativeSetElementsData() {
        return {
            open: false,
            min_occurs: '',
            max_occurs: '',
            type: "STRUCT",
            name: "element_story",
            1: {
                open: false,
                type: "IMAGE",
                name: "image",
                desc: "图片",
                comment: '',
                format: ['1'],
                jdwatermarkpos: '1',
            },
            2: {
                open: false,
                type: 'TEXT',
                name: "title",
                desc: "子标题"
            },
            3: {
                open: false,
                type: 'TEXT',
                name: "description",
                desc: "子文案"
            },
            4: {
                open: false,
                type: "URL",
                name: "url",
                desc: "链接",
                urlMin: 1,
                urlMax: 1024
            }
        }
    }

    function initOptionsData() {
        return {
            showPlat: [],
            auditType: [],
            adSiteSet: [],
            adType: [],
            specType: [],
            adElement: [{
                value: '1',
                label: '标题'
            },{
                value: '2',
                label: '描述'
            }, {
                value: '3',
                label: '图片'
            }, {
                value: '4',
                label: 'Sortable'
            }, {
                value: '5',
                label: 'URL'
            }, {
                value: '6',
                label: '图片集合(image_list)'
            }, {
                value: '7',
                label: '商标'
            }],
            adSetElement: [{
                value: '1',
                label: '子素材图片'
            }, {
                value: '2',
                label: '子素材标题'
            },{
                value: '3',
                label: '子素材描述'
            },{
                value: '4',
                label: '子素材URL'
            }]
        }
    } 

    function initFormData() {
        return {
            adSpecName: '',
            adBizId: 1,
            specType: '',
            subAdBizId: '',
            adSiteSet: '',
            adElement: '1',
            adSetElement: '子素材图片',
            creativeElements: initCreativeElementsData(),
            creativeSetElements: initCreativeSetElementsData(),
            adSpecGdtFlag: true,
            adSpecGdt: '',
            adBidTypeCPCFlag: true,
            adBidTypeCPCMin: '',
            adBidTypeCPCMax: '',
            adBidTypeCPMFlag: true,
            adBidTypeCPMMin: '',
            adBidTypeCPMMax: '',
            showPlat: '',
            auditType: '',
            examplePreviewImgUrl1: '',
            imgUrlDisabled1: false,
            examplePreviewImgUrl2: '',
            imgUrlDisabled2: false,

            uploadImgUrl: getUploadImgUrl(),
            uploadParam1: {
                buisinesstype: 0,
                imagelimitconfig: '0-0-0:0x0-0:0-1|2',
                userType: 1,
                uploadUin: 51959
            },
            uploadParam2: {
                buisinesstype: 0,
                imagelimitconfig: '0-0-0:0x0-0:0-1|2',
                userType: 1,
                uploadUin: 51959
            },
        }
    }

    export default {
        data() {
            return {
                actioning: false,
                options: initOptionsData(),
                form: initFormData(),
                creativeElements: {},
                disabledAdd: false,
                elements: {},
                rules,

                creativeSetElements: {},
                disabledSetAdd: false,
                elementsSet: {},
                fileList1: [],
                fileList2: [{name: 'food2.jpeg', 
                url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
            }
        },

        mounted() {
            this.initData();
            this.initOptions();
        },
        methods: {
            initData() {
                this.options = initOptionsData();
                this.form = initFormData();
                this.creativeElements = {};
                this.disabledAdd = false;
                this.elements = {};

                this.creativeSetElements = {};
                this.disabledSetAdd = false;
                this.elementsSet = {};

                this.fileList1 = [{name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}];
                this.fileList2 = [{name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}];
            },
            handleRemove1(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview1(file) {
                console.log(file);
            },
            handleSuccess1(e) {
                console.log(e)
                if(+e.errcode === 0){
                    this.form.examplePreviewImgUrl1 = e.imageUrl;
                    this.imgUploadSuccess1();
                }else{
                    this.handleError1(e);
                }
            },
            handleChange1 (file,fileList) {
                console.log(file,fileList);
                if(fileList.length > 1 && file.status === "success") {
                   fileList.shift(); 
                }
            },
            imgUploadSuccess1() {
                this.$message({
                    message: '图片上传成功',
                    type: 'success'
                });
            },
            handleError1(e) {
                this.$message({
                    message: '图片上传失败，' + e.errmsg,
                    type: 'error'
                });
            },
            handleRemove2(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview2(file) {
                console.log(file);
            },
            handleSuccess2(e) {
                console.log(e)
                if(+e.errcode === 0){
                    this.form.examplePreviewImgUrl2 = e.imageUrl;
                    this.imgUploadSuccess2();
                }else{
                    this.handleError2(e);
                }
            },
            handleChange2(file,fileList) {
                console.log(file,fileList);
                if(fileList.length > 1 && file.status === "success") {
                   fileList.shift(); 
                }
            },
            imgUploadSuccess2() {
                this.$message({
                    message: '图片上传成功',
                    type: 'success'
                });
            },
            handleError2(e) {
                this.$message({
                    message: '图片上传失败，' + e.errmsg,
                    type: 'error'
                });
            },
            addCreativeElement() {
                let adElement = this.form.adElement;
                this.disabledAdd = this.elements[adElement] ?  false : true;
                this.elements[adElement] = true;
                this.creativeElements[adElement] = true;
                this.form.creativeElements[adElement].open = true;
            },
            closeCreativeElement(adElement) {
                this.disabledAdd = this.elements[adElement] ?  false : true;
                this.elements[adElement] = false;
                this.creativeElements[adElement] = false;
                this.form.creativeElements[adElement] = initCreativeElementsData()[adElement];
                let adElementX = this.form.adElement;
                this.disabledAdd = this.elements[adElementX] ? true : false;
            },
            initOptions() {
                let bizTypeMap = dataEnum.bizTypeMap;
                let specType = dataEnum.specTypeEnum;               // 商品类型
                let showPlat = dataEnum.showPlatFormEnum;           // 投放平台
                let auditType = dataEnum.auditTypeEnum;             // 审核规则

                let bizTypeArr = [];        // 产品类型
                let adTypeArr = [];         // 子产品类型
                let adSiteSetArr = [];      // 投放站点
                let specTypeArr = [];       // 商品类型
                let showPlatArr = [];       // 投放平台
                let auditTypeArr = [];      // 审核规则
                specType.forEach(function(item) {     // 子产品类型
                    specTypeArr.push({
                        label: item.name,
                        value: item.id
                    });
                });
                bizTypeMap.forEach(function(item1) {     
                    bizTypeArr.push({                       // 产品类型
                        label: item1.name,
                        value: item1.id
                    });
                    item1.child.forEach(function(item2) {     // 子产品类型
                        adTypeArr.push({
                            label: item2.name,
                            value: item2.id
                        });
                    });
                }); 

                showPlat.forEach(function(item) {       // 投放平台
                    showPlatArr.push({
                        label: item.name,
                        value: item.id
                    });
                });

                auditType.forEach(function(item) {      // 审核规则
                    auditTypeArr.push({
                        label: item.name,
                        value: item.id
                    });
                });
                
                this.options.bizType = bizTypeArr;
                this.options.specType = specTypeArr;
                this.form.specType = '1';
                this.options.adType = adTypeArr;
                this.form.subAdBizId = '3';
                // this.options.adSiteSet = adSiteSetArr;

                this.options.showPlat = showPlatArr;
                this.form.showPlat = '2';
                this.options.auditType = auditTypeArr;
                this.form.auditType = '1';
            },
            cancel() {
                this.$emit('closeAddSlide');
                this.initData();
            },
            handleSubmit() {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                       // alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                console.log(this.form);
                this.actioning = true;
                setTimeout(()=>{
                    this.actioning = false;
                },3000);
                return;
                fetchAdd(mergeData(this.form)).then(response => {
                    this.actioning = false;
                    let tipType = response.errcode === 0 ? 'success' : 'error';
                    let tipText = response.errcode === 0 ? '新增成功！' : '新增失败！' + response.errmsg;
                    this.$notify({
                        title: '提示',
                        message: tipText,
                        type: tipType
                    });
                    // if(response.errcode == '0'){
                    //     debugger
                    // }
                }).catch(e => {
                    this.actioning = false;
                    console.log(e);
                });
            },
            validate(rule, value, callback,a) {
                if (value === '') {
                    callback(new Error('不能为空'));
                } else if(!/^\d+(?:\.\d{1,2})?$/.test(value)) {
                    callback(new Error('输入不对'));
                } else {
                    callback();
                }
            },
        },
        watch: {
            'form.subAdBizId': function() {
                let adBizId = this.form.adBizId;
                let subAdBizId = this.form.subAdBizId;
                let bizTypeMap = dataEnum.bizTypeMap;
                let adSiteSetArr = [];
                bizTypeMap.forEach(function(item1) {   
                    item1.child.forEach(function(item2) {     // 子产品类型
                        if(item2.id === subAdBizId){
                            item2.child.forEach(function(item3) {       // 投放站点
                                adSiteSetArr.push({
                                    label: item3.name,
                                    value: item3.id
                                });
                            });
                        }
                    });
                }); 
                this.form.adSiteSet = '';
                this.options.adSiteSet = adSiteSetArr;
                this.form.adSiteSet = adSiteSetArr[0] && [adSiteSetArr[0].value];
                
            },
            'form.adElement': function() {
                let adElementX = this.form.adElement;
                this.disabledAdd = this.creativeElements[adElementX] ? true : false;
            }
        }
    }
</script>

<style lang="scss">
    @import './css/const';
    @import './css/icons';
    .standard-manage-right-slide-editor {
        margin-top: 100px;
        .rscontent-content-item {
            background-color: #fff;
            margin: 20px;
            padding: 50px 20px 50px 20px;
            .el-form-item label {
                color: #000;
                margin-right: 30px;
            }
            .el-form-item .el-form-item__content {
                color: #5c5c5c;
            }
            .example-preview {
                margin: 0 30px;
            }

            .sub-biz-name {
                margin: 0 15px;
                min-height: 72px;
            }
            .spec-type-area .el-input__inner {
                width: 300px;
            }
            .ad-spec-name-input {
                width: 300px;
            }
            .ad-spec-charge-min {
                width: 200px;
            }
            .ad-spec-charge-max {
                width: 100px;
            }
            
            .creative-add-label {
                .creative-add-area {
                    width: 650px;
                    height: 100%;
                    margin-left: 25px;
                    border: 1px solid #e9e9e9;
                    .creative-add-item-title {
                        padding-left: 20px;
                        border-bottom: 1px solid #e9e9e9;
                    }
                    .creative-add-item {
                        margin: 20px;
                    }
                    .creative-add-item-desc .el-form-item__content {
                        display: inline-block;
                        width: 300px;
                    }
                    .m-l {
                        margin-left: 28px;
                    }
                    .close {
                        width: 20px;
                        height: 20px;
                        margin-right: 10px;
                        float: right;
                    }
                }
               
            }


            .ad-spec-text-min {
                width: 100px;
            }
            .ad-spec-text-max {
                width: 100px;
                margin-right: 10px;
            }

            .ad-spec-wh-min {
                width: 120px;
            }
            .ad-spec-wh-max {
                width: 120px;
                margin-right: 40px;
            }

            .dsinline {
                display: inline-block;
                width: 500px;
            }

            .dsinline-mini {
                display: inline-block;
                width: 450px;
            }

            .el-upload-list__item {
                width: 500px;
            }
            .el-upload-list--picture .el-upload-list__item-status-label {
                right: -48px;
            }
            .market-data-editor-form-submit {
                position: relative;
                height: 50px;
                margin-top: 30px;
                .market-data-editor-form-submit-btn {
                    position: absolute;
                    top: 0;
                    left: 400px;
                    button {
                        bottom: 24px;
                        width: 150px;
                        height: 40px;
                    }
                    .el-button.is-loading {
                        top: 0px;
                    }
                }
            }
        }
    }
</style>