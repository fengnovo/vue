<template>
  <transition name="slide">
    <div class="my-order">
      <router-view></router-view>
      <head-self headText="地址管理"></head-self>
      <scroll class="scroll" ref="scroll">
          <ul>
            <li v-for="item in addressArr">
              <div class="address-info">
                  <div class="is-select">
                      <i class="circle" :class="{'circle-select':item.address_id===addressId}"></i>
                  </div>
                  <div class="info-detail">
                    <p>
                      <span class="name" v-html="item.consignee"></span>
                      <span class="phone-number">{{item.mobile | phone}}</span>
                    </p>
                    <p>
                      <span v-html="item.country_name"></span>
                      <span v-html="item.province_name"></span>
                      <span v-html="item.city_name"></span>
                      <span v-html="item.district_name"></span>
                    </p>
                  </div>
              </div>
              <div class="address-operation">
                <div class="default">
                  <p v-show="item.address_id===addressId">
                    默认
                  </p>
                </div>
                <div>
                  <button @click="jumpEdit(item)">编辑</button>
                  <button @click="deleteAddress(item)">删除</button>
                </div>
              </div>
            </li>
          </ul>
      </scroll>
      <router-link to="/mine/addressAdministration/addAddress">
        <div class="bottomBtn">
          添加收货地址
        </div>
      </router-link>
    </div>
  </transition>
</template>

<script>
  import Scroll from '../../base/scroll/scroll'
  import HeadSelf from '../../base/fixedHead/fixedHead'
  import {vipAccountInfo} from "../../api/mine";
  import {ERROK} from "../../api/config";

  export default {
        name: "address-administration",
      data(){
        return {
          selected:false,
          addressArr:[],
          addressId:""
        }
      },
    created(){
      this.getAddress()
    },
      methods:{
        jumpEdit(item){
          this.$router.push({
            path:"/mine/addressAdministration/addAddress",
            query:{
              isEdit:true,
              addressInfo:JSON.stringify(item)
            }
          })
        },
        deleteAddress(item){

        },
        getAddress(){
          vipAccountInfo("address_list").then(res=>{
            console.log(res);
            if(res.error===ERROK){
              if(!res.content.consignee_list){
                return
              }
              this.addressArr=res.content.consignee_list
              this.addressId=res.content.address_id
            }
          })
        }
      },
        components:{
          Scroll,
          HeadSelf
        },
      filters:{
        phone(value){
          if(value){
            return value.toString().replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
          }
        }
      },
      activated(){
        setTimeout(()=>{
          this.$refs.scroll.refresh()
        },20)
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"
  .my-order
    position:fixed
    z-index:100000
    top:0
    left:0
    right:0
    bottom:0
    background :#efefef
    padding-top 4.4rem
    color #333
    .scroll
      height 100%
      overflow hidden
      ul
        padding-bottom 4.9rem
      li
        margin-bottom 1rem
      .address-info
        flex-start()
        background #fff
        border-bottom 1px solid #ddd
        text-align left
        .is-select
          flex-row(center)
          padding-left 1.2rem
          .circle
            circle()
          .circle-select
            background url("../../assets/shop/duigou@2x.png")
            background-size contain
            border 0
        .info-detail
          font-size 1.3rem
          flex-row(center)
          padding 1.2rem
          p:first-child
            margin-bottom .6rem
      .address-operation
        flex-between()
        background #fff
        padding-left 1.2rem
        align-items center
        .default
          p
            background #F62F78
            color #fff
            border-radius 2px
            font-size 1rem
            width 3rem
            height 1.5rem
            line-height 1.5rem
        div
          padding .5rem 0
          button
            border 1px solid #666
            outline none
            background #fff
            padding 0 2rem
            border-radius 3px
            margin-right 1.2rem
            height 2.5rem
            line-height 2.5rem
</style>