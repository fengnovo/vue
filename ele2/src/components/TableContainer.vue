<template>
    <div class="table-area">
        <table border="1" bordercolor="#ebeef5" style="border-collapse:collapse;" width="100%">
            <thead>
                <th width="30px"><input type="checkbox" v-model='checked' @click='checkedAll'></th>
                <th class="cell">创意信息</th>
                <th class="cell">OCR审核</th>
                <th class="cell">主推SKU</th>
                <th class="cell">规格信息</th>
                <th class="cell">推广链接</th>
                <th class="cell">用户服务类型</th>
                <th class="cell">创建时间</th>
                <th class="cell">修改时间</th>
                <th class="cell">状态</th>
                <th class="cell">操作</th>
            </thead>
            <tbody>
                <template v-for="item in list">
                    <tr :key="item.creativemtlid">
                        <td width="30px" style="text-align: center;"><input type="checkbox" v-model='checkList' :value="item.creativemtlid"></td>
                        <td class="cell">
                            <div class="table-admsg">
                                <div class="table-admsg-left">
                                    <div v-if="item.adImagesFlag">
                                        <template v-for="i in item.adImages">
                                            <el-popover trigger="hover" :key="i" placement="right">
                                                <img :src="i" class="box-img-limit"/>
                                                <div slot="reference" class="name-wrapper" :class="item.marking ? 'img-active' : ''">
                                                    <span class="middlespan"></span>
                                                    <span class="check-icon" v-show="item.marking"></span>
                                                    <img :src="i" width="100px"  class="table-pr odu-img"/>
                                                </div>
                                            </el-popover>
                                        </template>
                                    </div>
                                    <div v-if="!item.adImagesFlag">
                                        <template>
                                            <div slot="reference" class="name-wrapper" :class="item.marking ? 'img-active' : ''">
                                                <span class="middlespan"></span>
                                                <span class="check-icon" v-show="item.marking"></span>
                                                <img src="//x.360buyimg.com/images/boss/yizhitou/ad_placeholder.png" width="100px"  class="table-produ-img" />
                                            </div>
                                        </template>
                                    </div>
                                </div>
                                <div class="table-admsg-right" :class="(item.adImages && item.adImages.length>1) ? 'table-admsg-more' :''">
                                    <p class="desc-text"><span v-html="item.creativeShowTitle"></span></p>
                                    <p class="desc-text">描述：{{ item.creativedesc }}</p>
                                    <p class="desc-text">创意ID：{{ item.creativemtlid }}</p>
                                    <p class="desc-text">素材描述：{{ item.adDesc || '无' }}</p>
                                    <p class="desc-text" v-if="item.bottomTextShow">左下辅助文字：{{ item.bottomText }}</p>
                                    <p class="desc-text" v-if="item.leftBottomTxtShow">左下角描述：{{ item.leftBottomTxt}}</p>
                                    <p class="desc-text" v-if="item.buttonTextShow">按钮文字：{{ item.buttonText }}</p>
                                </div>
                            </div>
                        </td>
                        <td class="cell">无黑词</td>
                        <td class="cell">
                            <div class="table-admsg">
                                <div class="table-admsg-sku">
                                    <!-- <div v-if="item.skuImageUrl" class="table-img-border"> -->
                                        <el-popover trigger="hover" placement="right">
                                            <img :src="item.skuImageUrl" class="box-img-limit"/>
                                            <div slot="reference" class="name-wrapper">
                                                <span class="middlespan"></span>
                                                <img :src="item.skuImageUrl" width="100px"  class="table-produ-img" />
                                            </div>
                                        </el-popover>
                                    <!-- </div> -->
                                </div>
                            </div>
                        </td>
                        <td class="cell">QQ购物号多图文</td>
                        <td class="cell">
                            <p v-if="item.targeturl">[<a type="text" target="blank" :href="item.targeturl" size="mini">查看</a>]</p>
                            <p v-if="!item.targeturl"><span>暂无</span></p>
                        </td>
                        <td class="cell">
                            <div>
                                <span>{{ item.uin }}</span><br />
                                <span>{{ item.jdId }}</span><br />
                                <span>{{ item.userscoretext }}</span><br />
                            </div>
                        </td>
                        <td class="cell"><div v-html="item.inserttimemstext && item.inserttimemstext.replace(' ','<br/>')"></div></td>
                        <td class="cell"><div v-html="item.lastmodTimemstext && item.lastmodTimemstext.replace(' ','<br/>')"></div></td>
                        <td class="cell">
                            <div>
                                <el-tooltip placement="top" v-if="item.innerauditstatus === 2">
                                    <div slot="content" style="width: 300px;" v-html="item.innerauditmsg.replace(/\n/g, '<br/>')"></div>
                                    <span>内部：{{ item.inneraudittext }}</span>
                                </el-tooltip>
                                <span v-if="item.innerauditstatus !== 2">内部：{{ item.inneraudittext }}</span><br/>
                                <span v-if="item.outeraudittext">外部：{{ item.outeraudittext }}</span>
                            </div>
                        </td>
                        <td class="cell">
                            <div>
                                <el-button v-if="item.innerauditstatus === 0 || item.innerauditstatus === 3 || item.innerauditstatus === 2" size="mini" class="table-btn" type="primary" plain :loading="loading.auditPass" @click="handlePass(item)">审核通过</el-button> <br/>
                                <el-button v-if="item.innerauditstatus === 0 || item.innerauditstatus === 3 || item.innerauditstatus === 1" size="mini" class="table-btn" type="danger" plain :loading="loading.auditUnPass" @click="handleUnPass(item)">审核不通过</el-button>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="item.subStorys && item.subStorys.length" v-for="(story, index) in item.subStorys" :key="index+'story'">
                        <td width="30px" style="text-align: center;"></td>
                        <td class="cell">
                            <div class="table-admsg">
                                <div class="table-admsg-left">
                                    <div v-if="story.storyImage">
                                        <template>
                                                <el-popover trigger="hover" placement="right">
                                                <img :src="story.storyImage" class="box-img-limit"/>
                                                <div slot="reference" class="name-wrapper" :class="item.marking ? 'img-active' : ''">
                                                    <span class="middlespan"></span>
                                                    <span class="check-icon" v-show="item.marking"></span>
                                                    <img :src="story.storyImage" width="100px"  class="table-produ-img"/>
                                                </div>
                                            </el-popover>
                                        </template>
                                    </div>
                                    <div v-if="!story.storyImage">
                                        <template>
                                            <div slot="reference" class="name-wrapper" :class="item.marking ? 'img-active' : ''">
                                                <span class="middlespan"></span>
                                                <span class="check-icon" v-show="item.marking"></span>
                                                <img src="//x.360buyimg.com/images/boss/yizhitou/ad_placeholder.png" width="100px"  class="table-produ-img" />
                                            </div>
                                        </template>
                                    </div>
                                </div>
                                <div class="table-admsg-right">
                                    <p class="desc-text"><span v-html="story.storyTitle"></span></p>
                                    <p class="desc-text">描述：{{ story.storyDesc }}</p>
                                </div>
                            </div>
                        </td>
                        <td class="cell"></td>
                        <td class="cell"></td>
                        <td class="cell"></td>
                        <td class="cell">
                            <p v-if="story.productUrl">[<a type="text" target="blank" :href="story.productUrl" size="mini">查看</a>]</p>
                            <p v-if="!story.productUrl"><span>暂无</span></p>
                        </td>
                        <td class="cell"></td>
                        <td class="cell"></td>
                        <td class="cell"></td>
                        <td class="cell"></td>
                        <td class="cell"></td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script>
import data from '../commons/data';
let idsOptions = [];
  export default {
      name: 'TableContainer',
      data() {
            return {
                checked: false,
                allProductTotal: null,
                checkList: [],
                loading: {
                    auditPass: false,
                    auditUnPass: false
                }
            }
      },
      computed: {
          list() {
              return data.data;
          }
      },
      mounted(){
      },
      methods: {
            checkedAll: function() {
                console.log(this.checkList);
                if (this.checked) { //实现反选
                    this.checkList = [];
                } else { //实现全选
                    this.checkList = [];
                    this.list.forEach((item, index) => {
                        this.checkList.push(item.creativemtlid);
                    });
                }
            },
            handlePass() {

            },
            handleUnPass() {

            }
      },
    watch: { //深度 watcher
        'checkList': {
            handler: function(val, oldVal) {
                if (val.length === this.list.length) {
                    this.checked = true;
                } else {
                    this.checked = false;
                }
            },
            deep: true
        }
     }
  }
</script>

<style lang="scss" scoped>
.page-foot-fixed{
    position: fixed;
    background: #f2f6fc;
    padding-bottom: 10px;
    padding-right: 30px;
    margin-top: 10px;
    width: 100%;
    text-align: right;
    bottom: 0px;
    right: 0;
    z-index: 2;
}
.table-area {
    font-size: 12px;
    margin-top: 20px;
    margin-bottom: 50px;
    .select-opear-btn {
        padding: 0 0 20px;
    }
    .table-admsg {
        .table-admsg-left {
            float: left;
            margin: 0 0 10px;
            min-height: 100px;
            width: 100px;
            text-align: center;
            .middlespan {
                display: inline-block;
                width: 1px;
                height: 100%;
                vertical-align: middle;
                margin-left: -1px;
                margin-top: 5px;
                float: none !important;
            }
        }
        .check-icon {
            background: url('//xoa.pp.jd.com/static/img/promote_icon1.png') center center no-repeat;
            display: inline-block;
            position: absolute;
            left: 5px;
            top: 5px;
            width: 28px;
            height: 28px;
            border-radius: 14px;
        }
        .table-admsg-right {
            // padding: 10px 11px;
            .desc-text{
                margin-left: 110px;
            }
        }
        .table-admsg-more {
            position: absolute;
            // margin-top: 40%;
        }
        .table-admsg-sku {
            min-height: 100px;
            width: 100px;
            text-align: center;
            .table-img-border {
                border: 1px solid #ccc;
                width: 106px;
            }
            .middlespan {
                display: inline-block;
                width: 1px;
                height: 100%;
                vertical-align: middle;
                margin-left: -1px;
                margin-top: 5px;
                float: none !important;
            }
        }
    }
    .name-wrapper {
        position: relative;
        width: 104px;
        height: 110px;
        border: solid 1px #ddd;
        // padding: 2px;
        text-align: center;
        font-size: 0;
        margin-bottom: 5px;
        .table-produ-img {
            vertical-align: middle;
            max-height: 100%;
        }
    }
    .img-active {
        border: solid 1px #33a0d5;
        
    }
    
    .table-text {
        float: right;
        width: 170px;
    }

    .table-btn {
        width: 90px;
        margin-bottom: 10px;
    }
    .cell {
        padding: 0 4px;
    }

    th {
        background: #f8fafd;
        border-width: 1px;
        padding: 8px 0;
        border-style: solid;
        color: #909399;
        font-weight: 500;
    }
    tr {
        &:hover{
            background-color: #f5f7fa;
        }
    }
}


</style>
