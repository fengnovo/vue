<template>
    <div class="select-container">
        <el-card>
            <el-form :inline="true" size="mini" class="select-text">
                <!-- <el-row> -->
                    <el-col :span="5">
                        <el-form-item label="卖家QQ：">
                            <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="京东ID：">
                            <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="商品ID：">
                            <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="素材标题：">
                            <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="广告ID：">
                            <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                        </el-form-item>
                    </el-col>
                <!-- </el-row>
                <el-row> -->
                    <el-col :span="5">
                        <el-form-item label="广告状态：">
                            <el-select v-model="formInline.region" placeholder="活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="素材描述：">
                            <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="审核状态：">
                            <el-select v-model="formInline.region" placeholder="活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="媒体类型：">
                            <el-select v-model="formInline.region" placeholder="活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="广告类型：">
                            <el-select v-model="formInline.region" placeholder="活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                <!-- </el-row>
                <el-row> -->
                    <el-col :span="5">
                        <el-form-item label="投放站点：">
                            <el-select v-model="formInline.region" placeholder="活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="素材规格：">
                            <el-select v-model="formInline.region" placeholder="活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="创意来源：">
                            <el-select v-model="formInline.region" placeholder="活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="投放时间：">
                            <el-date-picker
                                v-model="formInline.dateValue"
                                type="daterange"
                                align="right"
                                unlink-panels
                                range-separator="到"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                format="yyyy-MM-dd HH:mm:ss"
                                :default-time="['00:00:00', '23:59:59']"
                                :picker-options="formInline.pickerOptions">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                <!-- </el-row>
                <el-row> -->
                    <el-col :span="8">
                        <el-form-item label="修改时间：">
                            <el-date-picker
                                v-model="formInline.dateValue2"
                                type="daterange"
                                align="right"
                                unlink-panels
                                range-separator="到"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                format="yyyy-MM-dd HH:mm:ss"
                                :default-time="['00:00:00', '23:59:59']"
                                :picker-options="formInline.pickerOptions2">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="投放平台：">
                            <el-select v-model="formInline.region" placeholder="活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="一级类目：">
                            <el-select v-model="formInline.region" placeholder="活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="卖家等级：">
                            <el-select v-model="formInline.region" placeholder="活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                <!-- </el-row>
                <el-row> -->
                    <el-col :span="5">
                        <el-form-item label="操作人：">
                            <el-select v-model="formInline.region" placeholder="活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                
                    <el-col :span="5">
                        <el-form-item label="OCR审核：">
                            <el-select v-model="formInline.region" placeholder="活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="大促素材标记：">
                            <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="primary" @click="onSubmit" size="mini">查询</el-button>
                    </el-col>
                <!-- </el-row> -->
            </el-form>
        </el-card>
        <el-card size="mini">
            <el-col :span="24" class="select-opear-btn">
                <el-button type="primary" plain size="mini" icon="el-icon-circle-close-outline">审核不通过</el-button>
                <el-button type="primary" plain size="mini" icon="el-icon-circle-check-outline">审核通过</el-button>
                <el-button type="primary" plain size="mini" icon="el-icon-edit">批量标记大促素材</el-button>
                <el-button type="primary" plain size="mini" icon="el-icon-edit">批量不标记大促素材</el-button>
                <el-button type="primary" plain size="mini" icon="el-icon-download">导出EXCEL</el-button>
            </el-col>
        </el-card>
    </div>
</template>

<script>
  export default {
      name: 'SelectContainer',
      data() {
          return {
              formInline: {
                  user: '',
                  region: 'shanghai',
                  pickerOptions: {
                      shortcuts: [{
                          text: '最近一周',
                          onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                          }
                      }, {
                          text: '最近一个月',
                          onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                          }
                      }, {
                          text: '最近三个月',
                          onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                          }
                      }]
                  },
                  dateValue: '',
                  pickerOptions2: {
                      shortcuts: [{
                          text: '最近一周',
                          onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                          }
                      }, {
                          text: '最近一个月',
                          onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                          }
                      }, {
                          text: '最近三个月',
                          onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                          }
                      }]
                  },
                  dateValue2: '',
              }
          }
      },
      methods: {
          onSubmit() {
             
          }
      }
  }
</script>

<style scoped>
  .select-container {
      /* padding: 10px 10px 10px 10px; */
  }

  .select-container .select-opear-btn {
      padding: 0 0 20px;
  }
</style>
