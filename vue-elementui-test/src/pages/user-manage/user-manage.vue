<template>
  <div class="yzt-container user-manage">
      <p class="content-nav-title">
          <span>用户管理</span>
      </p>
      <user-manage-main
            ref="main"
            @openDetailSlide="openDetailSlide"
            @toggleShowOrHide="toggleShowOrHide" 
        ></user-manage-main>

        <right-slide title="资质详情"
             ref="detailSlide">
            <user-manage-right-slide></user-manage-right-slide> 
        </right-slide>


        
        <boss-dialog 
            :dialogVisible="configDialog"
            title="配额管理"
            size="tiny"
            name="configDialog"
            @toggleShowOrHide="toggleShowOrHide" 
            width="500" >
                <div slot="dialog-body" class="dialog-body">
                    <el-form ref="form" :model="dialogForm" class="unpass-dialog-form">
                        <el-form-item label="京东用户ID:" class="unpass-dialog-form-textarea">
                            <el-input v-model="dialogForm.input" placeholder="test_pop_1"></el-input>
                        </el-form-item>
                        <el-form-item label="用户包人群功能权限:" class="unpass-dialog-form-select">
                            <el-radio-group v-model="dialogForm.radio1">
                                <el-radio :label="1">开通</el-radio>
                                <el-radio :label="2">关闭</el-radio>
                            </el-radio-group>
                        </el-form-item>
                         <el-form-item label="扩展人群功能权限:" class="unpass-dialog-form-select">
                            <el-radio-group v-model="dialogForm.radio2">
                                <el-radio :label="1">开通</el-radio>
                                <el-radio :label="2">关闭</el-radio>
                            </el-radio-group>
                        </el-form-item>
                         <el-form-item label="当前账号已用空间/账户配额:" class="unpass-dialog-form-select">
                            <span>{{dialogForm.quota}}亿/0.1亿</span>
                        </el-form-item>
                         <el-form-item label="当前整体配额余额:" class="unpass-dialog-form-select">
                            <span>{{dialogForm.balance}}亿</span>
                        </el-form-item>
                         <el-form-item label="请为当前账号分配:" class="unpass-dialog-form-select">
                            <el-radio-group v-model="dialogForm.radio3">
                                <el-radio :label="1">0.1亿</el-radio>
                                <el-radio :label="2">0.2亿</el-radio>
                                <el-radio :label="3">0.3亿</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-form>
                </div>

               <div slot="dialog-footer" class="dialog-footer">
                    <el-button @click="configDialog = false">取 消</el-button>
                    <el-button type="primary" @click="configDialog = false">确 定</el-button>
                </div>
        </boss-dialog>


         <boss-dialog 
            :dialogVisible="permissionsDialog"
            title="权限管理"
            size="tiny"
            name="permissionsDialog"
            @toggleShowOrHide="toggleShowOrHide" 
            width="500" >
                <div slot="dialog-body" class="dialog-body">
                    <el-form ref="form" :model="dialogForm" class="unpass-dialog-form">
                        <el-form-item label="投放权限:" class="unpass-dialog-form-select">
                            <el-radio-group v-model="dialogForm.radio1">
                                <el-radio :label="1">开通</el-radio>
                                <el-radio :label="2">关闭</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-form>
                </div>

               <div slot="dialog-footer" class="dialog-footer">
                    <el-button @click="permissionsDialog = false">取 消</el-button>
                    <el-button type="primary" @click="permissionsDialog = false">确 定</el-button>
                </div>
        </boss-dialog>

  </div>
</template>

<script>
    import RightSlide from '../../components/right-slide'
    import UserManageRightSlide from './user-manage-right-slide'
    import UserManageMain from './user-manage-main'
    import BossDialog from '../../components/dialog'

    export default {
        name: 'UserManage',
        components: { RightSlide,UserManageRightSlide,UserManageMain,BossDialog },
        data() {
            return {
                configDialog: false,
                permissionsDialog: false,
                dialogForm: {
                    input: '',
                    radio1: 1,
                    radio2: 1,
                    radio3: 1,
                    balance: 13,
                    quota: 0.12
                }
            }
        },
        mounted() {
            this.$refs.main.getList();
        },
        methods: {
            openDetailSlide(val) {
                this.$refs.detailSlide.openSlide(val);
            },
            closeDetailSlide() {
                this.$refs.detailSlide.closeSlide();
            },
            toggleShowOrHide(name, flag) {
                this[name] = flag;
            }
        }
    }
</script>

<style lang="scss">
    @import '../../css/const';

.user-manage {
    @import './user-manage-main-table.scss';
    @import './user-manage-main-dialog.scss';
}


</style>