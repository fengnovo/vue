<template>
  <transition name="slide">
    <div class="register">
      <head-self :headText="isEdit?'编辑收货人地址':'添加收货人地址'"></head-self>
      <div class="user-info">
        <div class="user-input">
          <div>
            收货人
          </div>
          <div>
            <input
              type="text"
              placeholder="请输入收货人姓名"
              v-model="consignee"
            >
          </div>
        </div>
        <div class="user-input">
          <div>
            联系电话
          </div>
          <div>
            <input
              type="text"
              placeholder="请输入联系电话"
              v-model="mobile"
            >
          </div>
        </div>
        <div  @click="addressShow=true"
              class="user-input select-address">
          <div>
            所在地区
          </div>
          <div>
            <div class="address">
              <h2>
                <span v-html="country_name"></span>
                <span v-html="province_name"></span>
                <span v-html="city_name"></span>
                <span v-html="district_name"></span>
              </h2>
              <p>
                <img src="../../assets/mine/jiankuohao@2x.png"/>
              </p>
           </div>
          </div>
        </div>
        <div class="user-input">
          <div>
            详细地址
          </div>
          <div>
            <input
              type="text"
              placeholder="请输入详细地址"
              v-model="xiangcun_name"
            >
          </div>
        </div>
        <div class="user-input set-default-address">
          <div>
            设为默认地址
          </div>
          <div>
              <p
                :class="{'active':isDefaultAddress}"
                @click="isDefaultAddress=!isDefaultAddress"
              >
                <span></span>
              </p>
          </div>
        </div>
      </div>
      <div class="register-confirm">
        <p>
          保存
        </p>
      </div>
      <vue-pickers :show="addressShow"
                   :selectData="pickData3"
                   v-on:cancel="close"
                   v-on:confirm="confirmFn"></vue-pickers>
   </div>
  </transition>
</template>

<script>
  import VuePickers from '../../base/address-picker/address-picker'
  import {provs_data, citys_data, dists_data} from '../../base/address-picker/areaData'
  import HeadSelf from '../../base/fixedHead/fixedHead'
  export default {
    name: "register",
    created(){
      this.getParams()
    },
    data(){
      return {
        registerSelf:true,
        isDefaultAddress:true,
        addressShow:false,
        pickData3: {
          columns: 3,
          link: true,
          pData1: provs_data,
          pData2: citys_data,
          pData3: dists_data,
        },
        addressObj:{},
        isEdit:false,
        addressInfo:{},
        xiangcun_name:"",
        mobile:"",
        consignee:"",
        country_name:"",
        province_name:"",
        city_name:"",
        district_name:""
      }
    },
    methods:{
      getParams(){
        let isEdit=this.$route.query.isEdit
        if(isEdit){
          this.isEdit=isEdit
        }
        let addressInfo=this.$route.query.addressInfo
        if(addressInfo){
          this.addressInfo=JSON.parse(addressInfo)
          this.xiangcun_name=this.addressInfo.xiangcun_name
          this.mobile=this.addressInfo.mobile
          this.consignee=this.addressInfo.consignee
          this.country_name=this.addressInfo.country_name
          this.province_name=this.addressInfo.province_name
          this.city_name=this.addressInfo.city_name
          this.district_name=this.addressInfo.district_name
        }
      },
      close(){
        this.addressShow=false
      },
      confirmFn(obj){
        this.addressObj=obj
        console.log(this.addressObj.select1);
        this.addressShow=false

      }
    },
    components:{
      VuePickers,
      HeadSelf
    }
  }
</script>

<style  scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"
  .register
    position:fixed
    top:0
    left:0
    right:0
    bottom:0
    padding-top 4.4rem
    z-index 100000
    background #efefef
    .user-info
      text-align left
      background #fff
      font-size 1.3rem
      overflow hidden
      .user-input
        border-bottom 1px solid #F3F3F3
        div:first-child
          width 9rem
          height 4rem
          line-height 4rem
          float left
          padding-left 1.2rem
        div:last-child
          width 100%
          padding-left 9rem
          height 4rem
          line-height 4rem
        div
          img
            width 100%
          input
            color #999
            outline none
            width 100%
      .select-address
        div:last-child
          padding-right 1.2rem
          div.address
            width 100%
            padding-left 0
            flex-between()
            p
              flex-row(center)
              img
                width .6rem
                height 1.2rem
                vertical-align middle
      .set-default-address
        position relative
        p
          position absolute
          right 1.2rem
          top 50%
          transform translateY(-50%)
          height 2rem
          width 4.5rem
          background #efefef
          border-radius 1rem
          transition all .2s linear
          span
            position absolute
            top 0
            left .1rem
            transition all .2s linear
            display inline-block
            height 2rem
            width 2rem
            background #fff
            border-radius 50%
        p.active
          background #FF1171
          span
           left 2.4rem
    .register-confirm
      padding 0 1.2rem
      margin-top 1rem
      p
        background #FF1171
        height 4rem
        line-height 4rem
        border-radius .3rem
        text-align center
        font-size 1.8rem
        color #fff
</style>