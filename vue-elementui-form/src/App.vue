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
                    <el-form-item v-if="creativeElements[3][1]" label="" class="creative-add-label">
                        <div class="creative-add-area">
                            <div class="creative-add-item-title">图片 <div class="close"
                                @click="closeCreativeElement(3,1)"><div class="min-icon-close"></div></div></div>
                            <div>
                                <el-form-item label="尺寸" label-width="80px" class="creative-add-item" required>
                                    <div class="dsinline">
                                        <el-col :span="5">
                                            <el-form-item prop="creativeSetElementsMinOccurs"
                                                :rules="[{ validator: validate, trigger: 'blur', type: 'number'}]">
                                                <el-input placeholder="请输入" type="number" v-model="form.creativeElements[3][1].width" class="ad-spec-wh-min">
                                                    <template slot="prepend">宽</template>
                                                </el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="1">&nbsp;</el-col>
                                        <el-col :span="5">
                                            <el-form-item prop="creativeSetElementsMaxOccurs"
                                                :rules="[{ validator: validate, trigger: 'blur', type: 'number'}]">
                                                <el-input placeholder="请输入" type="number" v-model="form.creativeElements[3][1].height" class="ad-spec-wh-max">
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
                                                <el-input placeholder="请输入" type="number" v-model="form.creativeElements[3][1].picSize">
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
                                    <el-checkbox-group v-model="form.creativeElements[3][1].format">
                                        <el-checkbox label="1">jpg</el-checkbox>
                                        <el-checkbox label="2">png</el-checkbox>
                                        <el-checkbox label="4">gif</el-checkbox>
                                    </el-checkbox-group>
                                </el-form-item>
                                <el-form-item label="界面说明" label-width="80px" class="creative-add-item">
                                    <div class="dsinline">
                                        <el-input placeholder="请输入内容" v-model="form.creativeElements[3][1].picContent"></el-input>
                                    </div>
                                </el-form-item>
                                <el-form-item label="添加水印" label-width="80px" class="creative-add-item">
                                    <span style="margin-right: 20px;">水印位置</span>
                                    <el-radio class="radio" v-model="form.creativeElements[3][1].position" label="1">左上角样式</el-radio>
                                    <el-radio class="radio" v-model="form.creativeElements[3][1].position" label="2">右上角样式</el-radio>
                                    <el-input style="margin-left: 30px;width: 400px;" 
                                            placeholder="请输入" 
                                            v-model="form.creativeElements[3][1].picLink">
                                        <template slot="prepend">水印链接</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="添加图层" label-width="80px" class="creative-add-item">
                                    <!-- <el-upload
                                        class="example-preview"
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        :on-preview="handlePreview1"
                                        :on-remove="handleRemove1"
                                        :file-list="fileList1"
                                        list-type="picture">
                                        <span style="margin-right: 20px;">水印图层</span>
                                        <el-button size="small" type="primary">点击上传</el-button>
                                    </el-upload> -->
                                    <el-upload
                                        class="example-preview"
                                        :action="form.uploadImgUrl"
                                        :data="form.uploadParam2"
                                        :on-preview="handlePreview311"
                                        :on-remove="handleRemove311"
                                        :show-file-list="true"
                                        :on-success="handleSuccess311"
                                        :on-error="handleError"
                                        accept="jpg,png,jpeg,gif"
                                        name="imgfile"
                                        list-type="picture"
                                        ref="upload311"
                                        :on-change="handleChange311">
                                        <span style="margin-right: 20px;">水印图层</span>
                                        <el-button size="small" type="primary"
                                            :disabled="!(form.creativeElements[3][1].width>0 && form.creativeElements[3][1].height>0)">点击上传</el-button>
                                    </el-upload>
                                    <el-upload
                                        :action="form.uploadImgUrl"
                                        :data="form.uploadParam312"
                                        :on-preview="handlePreview312"
                                        :on-remove="handleRemove312"
                                        :show-file-list="true"
                                        :on-success="handleSuccess312"
                                        :on-error="handleError"
                                        accept="jpg,png,jpeg,gif"
                                        name="imgfile"
                                        list-type="picture"
                                        ref="upload312"
                                        :on-change="handleChange312">
                                        <span style="margin-right: 20px;">提示图层</span>
                                        <el-button size="small" type="primary"
                                            :disabled="(form.creativeElements[3][1].width>0 && form.creativeElements[3][1].height>0)">点击上传</el-button>
                                    </el-upload>
                                    <!-- <el-upload
                                        class="example-preview"
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        :on-preview="handlePreview1"
                                        :on-remove="handleRemove1"
                                        :file-list="fileList1"
                                        list-type="picture">
                                        <span style="margin-right: 20px;">提示图层</span>
                                        <el-button size="small" type="primary">点击上传</el-button>
                                    </el-upload> -->
                                </el-form-item>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item v-if="creativeElements[3][2]" label="" class="creative-add-label">
                        <div class="creative-add-area">
                            <div class="creative-add-item-title">图片 <div class="close"
                                @click="closeCreativeElement(3,2)"><div class="min-icon-close"></div></div></div>
                            <div>
                                <el-form-item label="尺寸" label-width="80px" class="creative-add-item" required>
                                    <div class="dsinline">
                                        <el-col :span="5">
                                            <el-form-item prop="creativeSetElementsMinOccurs"
                                                :rules="[{ validator: validate, trigger: 'blur', type: 'number'}]">
                                                <el-input placeholder="请输入" type="number" v-model="form.creativeElements[3][2].width" class="ad-spec-wh-min">
                                                    <template slot="prepend">宽</template>
                                                </el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="1">&nbsp;</el-col>
                                        <el-col :span="5">
                                            <el-form-item prop="creativeSetElementsMaxOccurs"
                                                :rules="[{ validator: validate, trigger: 'blur', type: 'number'}]">
                                                <el-input placeholder="请输入" type="number" v-model="form.creativeElements[3][2].height" class="ad-spec-wh-max">
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
                                                <el-input placeholder="请输入" type="number" v-model="form.creativeElements[3][2].picSize">
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
                                    <el-checkbox-group v-model="form.creativeElements[3][2].format">
                                        <el-checkbox label="1">jpg</el-checkbox>
                                        <el-checkbox label="2">png</el-checkbox>
                                        <el-checkbox label="4">gif</el-checkbox>
                                    </el-checkbox-group>
                                </el-form-item>
                                <el-form-item label="界面说明" label-width="80px" class="creative-add-item">
                                    <div class="dsinline">
                                            <el-input placeholder="请输入内容" v-model="form.creativeElements[3][2].picContent"></el-input>
                                    </div>
                                </el-form-item>
                                <el-form-item label="添加水印" label-width="80px" class="creative-add-item">
                                    <span style="margin-right: 20px;">水印位置</span>
                                    <el-radio class="radio" v-model="form.creativeElements[3][2].position" label="1">左上角样式</el-radio>
                                    <el-radio class="radio" v-model="form.creativeElements[3][2].position" label="2">右上角样式</el-radio>
                                    <el-input style="margin-left: 30px;width: 400px;" 
                                            placeholder="请输入" 
                                            v-model="form.creativeElements[3][2].picLink">
                                        <template slot="prepend">水印链接</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="添加图层" label-width="80px" class="creative-add-item">
                                    <el-upload
                                        :action="form.uploadImgUrl"
                                        :data="form.uploadParam321"
                                        :on-preview="handlePreview321"
                                        :on-remove="handleRemove321"
                                        :show-file-list="true"
                                        :on-success="handleSuccess321"
                                        :on-error="handleError"
                                        accept="jpg,png,jpeg,gif"
                                        name="imgfile"
                                        list-type="picture"
                                        ref="upload321"
                                        :on-change="handleChange321">
                                        <span style="margin-right: 20px;">水印图层</span>
                                        <el-button size="small" type="primary">点击上传</el-button>
                                    </el-upload>
                                    <el-upload
                                        :action="form.uploadImgUrl"
                                        :data="form.uploadParam322"
                                        :on-preview="handlePreview322"
                                        :on-remove="handleRemove322"
                                        :show-file-list="true"
                                        :on-success="handleSuccess322"
                                        :on-error="handleError"
                                        accept="jpg,png,jpeg,gif"
                                        name="imgfile"
                                        list-type="picture"
                                        ref="upload322"
                                        :on-change="handleChange322">
                                        <span style="margin-right: 20px;">提示图层</span>
                                        <el-button size="small" type="primary">点击上传</el-button>
                                    </el-upload>
                                </el-form-item>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item v-if="creativeElements[3][3]" label="" class="creative-add-label">
                        <div class="creative-add-area">
                            <div class="creative-add-item-title">图片 <div class="close"
                                @click="closeCreativeElement(3,3)"><div class="min-icon-close"></div></div></div>
                            <div>
                                <el-form-item label="尺寸" label-width="80px" class="creative-add-item" required>
                                    <div class="dsinline">
                                        <el-col :span="5">
                                            <el-form-item prop="creativeSetElementsMinOccurs"
                                                :rules="[{ validator: validate, trigger: 'blur', type: 'number'}]">
                                                <el-input placeholder="请输入" type="number" v-model="form.creativeElements[3][3].width" class="ad-spec-wh-min">
                                                    <template slot="prepend">宽</template>
                                                </el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="1">&nbsp;</el-col>
                                        <el-col :span="5">
                                            <el-form-item prop="creativeSetElementsMaxOccurs"
                                                :rules="[{ validator: validate, trigger: 'blur', type: 'number'}]">
                                                <el-input placeholder="请输入" type="number" v-model="form.creativeElements[3][3].height" class="ad-spec-wh-max">
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
                                                <el-input placeholder="请输入" type="number" v-model="form.creativeElements[3][3].picSize">
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
                                    <el-checkbox-group v-model="form.creativeElements[3][3].format">
                                        <el-checkbox label="1">jpg</el-checkbox>
                                        <el-checkbox label="2">png</el-checkbox>
                                        <el-checkbox label="4">gif</el-checkbox>
                                    </el-checkbox-group>
                                </el-form-item>
                                <el-form-item label="界面说明" label-width="80px" class="creative-add-item">
                                    <div class="dsinline">
                                            <el-input placeholder="请输入内容" v-model="form.creativeElements[3][3].picContent"></el-input>
                                    </div>
                                </el-form-item>
                                <el-form-item label="添加水印" label-width="80px" class="creative-add-item">
                                    <span style="margin-right: 20px;">水印位置</span>
                                    <el-radio class="radio" v-model="form.creativeElements[3][3].position" label="1">左上角样式</el-radio>
                                    <el-radio class="radio" v-model="form.creativeElements[3][3].position" label="2">右上角样式</el-radio>
                                    <el-input style="margin-left: 30px;width: 400px;" 
                                            placeholder="请输入" 
                                            v-model="form.creativeElements[3][3].picLink">
                                        <template slot="prepend">水印链接</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="添加图层" label-width="80px" class="creative-add-item">
                                    <el-upload
                                        :action="form.uploadImgUrl"
                                        :data="form.uploadParam331"
                                        :on-preview="handlePreview331"
                                        :on-remove="handleRemove331"
                                        :show-file-list="true"
                                        :on-success="handleSuccess331"
                                        :on-error="handleError"
                                        accept="jpg,png,jpeg,gif"
                                        name="imgfile"
                                        list-type="picture"
                                        ref="upload331"
                                        :on-change="handleChange331">
                                        <span style="margin-right: 20px;">水印图层</span>
                                        <el-button size="small" type="primary">点击上传</el-button>
                                    </el-upload>
                                    <el-upload
                                        :action="form.uploadImgUrl"
                                        :data="form.uploadParam332"
                                        :on-preview="handlePreview332"
                                        :on-remove="handleRemove332"
                                        :show-file-list="true"
                                        :on-success="handleSuccess332"
                                        :on-error="handleError"
                                        accept="jpg,png,jpeg,gif"
                                        name="imgfile"
                                        list-type="picture"
                                        ref="upload332"
                                        :on-change="handleChange332">
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
                                        :action="form.uploadImgUrl"
                                        :data="form.uploadParam41"
                                        :on-preview="handlePreview41"
                                        :on-remove="handleRemove41"
                                        :show-file-list="true"
                                        :on-success="handleSuccess41"
                                        :on-error="handleError"
                                        accept="jpg,png,jpeg,gif"
                                        name="imgfile"
                                        list-type="picture"
                                        ref="upload41"
                                        :on-change="handleChange41">
                                        <span style="margin-right: 20px;">水印图层</span>
                                        <el-button size="small" type="primary">点击上传</el-button>
                                    </el-upload>
                                    <el-upload
                                        :action="form.uploadImgUrl"
                                        :data="form.uploadParam42"
                                        :on-preview="handlePreview42"
                                        :on-remove="handleRemove42"
                                        :show-file-list="true"
                                        :on-success="handleSuccess42"
                                        :on-error="handleError"
                                        accept="jpg,png,jpeg,gif"
                                        name="imgfile"
                                        list-type="picture"
                                        ref="upload42"
                                        :on-change="handleChange42">
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
                                            :action="form.uploadImgUrl"
                                            :data="form.uploadParam51"
                                            :on-preview="handlePreview51"
                                            :on-remove="handleRemove51"
                                            :show-file-list="true"
                                            :on-success="handleSuccess51"
                                            :on-error="handleError"
                                            accept="jpg,png,jpeg,gif"
                                            name="imgfile"
                                            list-type="picture"
                                            ref="upload51"
                                            :on-change="handleChange51">
                                            <span style="margin-right: 20px;">水印图层</span>
                                            <el-button size="small" type="primary">点击上传</el-button>
                                        </el-upload>
                                        <el-upload
                                            :action="form.uploadImgUrl"
                                            :data="form.uploadParam52"
                                            :on-preview="handlePreview52"
                                            :on-remove="handleRemove52"
                                            :show-file-list="true"
                                            :on-success="handleSuccess52"
                                            :on-error="handleError"
                                            accept="jpg,png,jpeg,gif"
                                            name="imgfile"
                                            list-type="picture"
                                            ref="upload52"
                                            :on-change="handleChange52">
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
                            :on-error="handleError"
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
                            :data="form.uploadParam1"
                            :on-preview="handlePreview2"
                            :on-remove="handleRemove2"
                            :show-file-list="true"
                            :on-success="handleSuccess2"
                            :on-error="handleError"
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
import Appa from './app.js';
export default Appa;
</script>

<style lang="scss">
@import './app.scss';
</style>