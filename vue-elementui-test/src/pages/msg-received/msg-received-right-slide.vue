<template>
<div class="rscontent-content msg-received-right-slide-detail">
    <el-form ref="form" :model="form" :rules="rules" class="rscontent-form">
        <el-form-item label="消息模块"  prop="region" class="rscontent-form-item">
            <el-select v-model="form.region" placeholder="请选择消息模块">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        
        <el-form-item label="消息类型"  prop="region" class="rscontent-form-item">
            <el-select v-model="form.region" placeholder="请选择消息类型">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="消息标题"  prop="region" class="rscontent-form-item">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="发布时间"  prop="region" class="rscontent-form-item">
            <el-col :span="11">
                <el-date-picker
                    v-model="form.value1"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions0">
                </el-date-picker>
            </el-col>
        </el-form-item>
        <el-form-item label="触达范围"  prop="region" class="rscontent-form-item">
            <el-select v-model="form.region" placeholder="请选择触达范围">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="自定义pin" prop="region" class="rscontent-form-item">
            <el-upload
                class="upload-demo"
                drag
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple>
                <img src="../../assets/imgs/plus.png"/>
                <div class="el-upload__text">点击或拖拽文件至此上传</div>
            </el-upload>
        </el-form-item>
        <el-form-item label="消息内容" prop="region" class="rscontent-form-item">
            <div class="el-form-item__content editor">
                <boss-editor ref="editor" v-model="content"></boss-editor>
            </div>
        </el-form-item>
        <el-form-item class="rscontent-form-item">
            <el-button>取消</el-button>
            <el-button type="danger">保存并提交</el-button>
        </el-form-item>
    </el-form>
</div> 
</template>

<script>
  import BossEditor from '../../components/editor';
  export default {
    components: { BossEditor },
    data() {
      return {
        content: `<p>尊敬的广告主：</p>
                  <p><span id='virPlaceholder' style='color:#ccc;'>描述系统消息内容</span></p>
                  <br>
                  <p>京东直投团队</p>`,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          value1: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      onSubmit(formName) {
        console.log('submit!');
      },
      pickerOptions0: {
        disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
        }
      }
    }
  }
</script>

<style lang="scss">
@import '../../css/const';

.msg-received-right-slide-detail {
    .rscontent-form {
        margin: 20px;
        padding: 20px 0;
        background-color: #fff;
        .rscontent-form-item {
            margin: 20px 20px 0;
            label {
                width: 100px;
                text-align: left;
                color: #5c5c5c;
                font-weight: $fontWeight;
                margin-right: 20px;
            }

            .el-input, .el-input__inner {
                width: 360px;
            }
            
            .el-upload-dragger {
                padding-top: 30px;
                background-color: rgb(242,247,250);
            }
            .editor {
                margin-left: 120px;
                width: 500px;
                height: 400px;
            }
        }
        .el-form-item.is-required .el-form-item__label:after {
            content: '*';
            color: $submitColor;
            margin-left: 8px;
        }
        .el-form-item.is-required .el-form-item__label:before {
            content: '';
            color: #fff;
            margin-right: 0;
        }
    }
}
</style>