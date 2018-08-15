import Vue from 'vue'
import Router from 'vue-router'
const Login=(resolve)=>{
  import('.././components/login/login').then((module)=>{
    resolve(module)
  })
}
const Register=(resolve)=>{
  import('.././components/register/register').then((module)=>{
    resolve(module)
  })
}
const ResetPassword=(resolve)=>{
  import('../components/Login/reset-password/reset-password').then((module)=>{
    resolve(module)
  })
}
const ResetCipher=(resolve)=>{
  import('.././components/mine/setting/resetPassWord/resetPassWord').then((module)=>{
    resolve(module)
  })
}
const SetPassword=(resolve)=>{
  import('../components/Login/reset-password/set-password/set-password').then((module)=>{
    resolve(module)
  })
}
const Classify=(resolve)=>{
  import('.././components/classify/classify').then((module)=>{
    resolve(module)
  })
}
const Mine=(resolve)=>{
  import('../components/mine/mine').then((module)=>{
    resolve(module)
  })
}
const MyOrder=(resolve)=>{
  import('.././components/my-order/my-order').then((module)=>{
    resolve(module)
  })
}
const ReturnReq=(resolve)=>{
  import('../components/my-order/returnReq/returnReq').then((module)=>{
    resolve(module)
  })
}
const Detail=(resolve)=>{
  import('.././components/product-details/product-details').then((module)=>{
    resolve(module)
  })
}

const Discover=(resolve)=>{
  import('.././components/discover/discover').then((module)=>{
    resolve(module)
  })
}
const Shop=(resolve)=>{
  import('.././components/shop/shop').then((module)=>{
    resolve(module)
  })
}
const Home=(resolve)=>{
  import('.././components/home/home').then((module)=>{
    resolve(module)
  })
}
const Prefecture=(resolve)=>{
  import('.././components/home/prefecture/prefecture').then((module)=>{
    resolve(module)
  })
}
const Brand=(resolve)=>{
  import('.././components/home/brand/brand').then((module)=>{
    resolve(module)
  })
}
const Seckill=(resolve)=>{
  import('.././components/home/seckill/seckill').then((module)=>{
    resolve(module)
  })
}
const SearchModule=(resolve)=>{
  import('.././components/searchModule/searchModule').then((module)=>{
    resolve(module)
  })
}

const Merchandise=(resolve)=>{
  import('.././components/merchandise/merchandise').then((module)=>{
    resolve(module)
  })
}
const addressAdministration=(resolve)=>{
  import('.././components/address-administration/address-administration').then((module)=>{
    resolve(module)
  })
}
const AddAddress=(resolve)=>{
  import('.././components/add-address/add-address').then((module)=>{
    resolve(module)
  })
}
const LogisticsDetails=(resolve)=>{
  import('.././components/logistics-details/logistics-details').then((module)=>{
    resolve(module)
  })
}
const Enshrine=(resolve)=>{
  import('.././components/enshrine/enshrine').then((module)=>{
    resolve(module)
  })
}
const Setting=(resolve)=>{
  import('.././components/mine/setting/setting').then((module)=>{
    resolve(module)
  })
}
const SalesReturn=(resolve)=>{
  import('.././components/sales-return/sales-return').then((module)=>{
    resolve(module)
  })
}
const ReturnDetail=(resolve)=>{
  import('.././components/returnDetail/returnDetail').then((module)=>{
    resolve(module)
  })
}
const EvaluateBask=(resolve)=>{
  import('.././components/evaluate-bask/evaluate-bask').then((module)=>{
    resolve(module)
  })
}
const CommodityEvaluation=(resolve)=>{
  import('.././components/commodity-evaluation/commodity-evaluation').then((module)=>{
    resolve(module)
  })
}
const Thanks=(resolve)=>{
  import('.././components/commodity-evaluation/Thanks/Thanks').then((module)=>{
    resolve(module)
  })
}
//收益转余额
const Transfer=(resolve)=>{
  import('.././components/mine/distribution/transfer/transfer').then((module)=>{
    resolve(module)
  })
}
//团队订单
const TeamOrder=(resolve)=>{
  import('../components/mine/distribution/team-order/team-order').then((module)=>{
    resolve(module)
  })
}
//新手必看
const NewBie=(resolve)=>{
  import('../components/mine/distribution/newbie/newbie').then((module)=>{
    resolve(module)
  })
}
//团队会员
const TeamVip=(resolve)=>{
  import('../components/mine/distribution/teamVip/teamVip').then((module)=>{
    resolve(module)
  })
}
//收益账单
const Bill=(resolve)=>{
  import('../components/mine/distribution/bill/bill').then((module)=>{
    resolve(module)
  })
}
//推广二维码
const QRCode=(resolve)=>{
  import('../components/mine/distribution/QR-code/QR-code').then((module)=>{
    resolve(module)
  })
}
//我的资产
const MyProperty=(resolve)=>{
  import('.././components/mine/my-property/my-property').then((module)=>{
    resolve(module)
  })
}
//我的红包
const RedPacket=(resolve)=>{
  import('.././components/mine/red-packet/red-packet').then((module)=>{
    resolve(module)
  })
}
//充值
const TopUp=(resolve)=>{
  import('../components/mine/my-property/top-up/top-up').then((module)=>{
    resolve(module)
  })
}
//提现
const Withdrawals=(resolve)=>{
  import('../components/mine/my-property/withdrawals/withdrawals').then((module)=>{
    resolve(module)
  })
}
//账户明细
const AccountDetail=(resolve)=>{
  import('../components/mine/my-property/account-detail/account-detail').then((module)=>{
    resolve(module)
  })
}
const PersonalData=(resolve)=>{
  import('.././components/personal-data/personal-data').then((module)=>{
    resolve(module)
  })
}
const UserName=(resolve)=>{
  import('.././components/personal-data/user-name').then((module)=>{
    resolve(module)
  })
}
const PhoneNum=(resolve)=>{
  import('.././components/personal-data/phone-num').then((module)=>{
    resolve(module)
  })
}
const WeChart=(resolve)=>{
  import('.././components/personal-data/we-chart').then((module)=>{
    resolve(module)
  })
}
const QQ=(resolve)=>{
  import('.././components/personal-data/QQ').then((module)=>{
    resolve(module)
  })
}
const Gender=(resolve)=>{
  import('.././components/personal-data/gender').then((module)=>{
    resolve(module)
  })
}
const OrderConfirm=(resolve)=>{
  import('.././components/order-confirm/order-confirm').then((module)=>{
    resolve(module)
  })
}
const PayFinish=(resolve)=>{
  import('../components/order-confirm/pay-finish/pay-finish').then((module)=>{
    resolve(module)
  })
}
const Distribution=(resolve)=>{
  import('.././components/mine/distribution/distribution').then((module)=>{
    resolve(module)
  })
}
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      redirect:"/home"
    },
    {
      path: '/home',
      component:Home,
      children:[
        {
          path: '/home/prefecture',
          component:Prefecture
        },
        {
          path: '/home/brand',
          component:Brand
        },
        {
          path: '/home/seckill',
          component:Seckill
        },
        {
          path: '/home/detail',
          component:Detail
        },
        {
          path: '/home/merchandise',
          component:Merchandise
        },
      ]
    },
    {
      path: '/merchandise',
      component:Merchandise
    },
    //支付完成
    {
      path: '/payFinish',
      component:PayFinish
    },
    {
      path: '/search',
      component:SearchModule
    },
    {
      path: '/classify',
      component:Classify,
      children:[
        {
          path: '/classify/merchandise',
          component:Merchandise
        },
      ]
    },
    {
      path: '/discover',
      component:Discover
    },
    {
      path: '/shop',
      component:Shop,
      children:[
        {
          path: '/shop/orderConfirm',
          component:OrderConfirm
        }
      ]
    },
    {
      path: '/login',
      component:Login,
      children:[
        {
          path: '/login/resetPassword',
          component:ResetPassword,
          children:[
            {
              path: '/login/resetPassword/setPassword',
              component:SetPassword,
            }
          ]
        },

      ]
    },
    {
      path: '/register',
      component:Register,
      meta:{keepAlive:true}
    },


    {
      path: '/detail',
      component:Detail,
      meta:{keepAlive:true}
    },
    {
      path: '/orderConfirm',
      component:OrderConfirm
    },
    {
      path:"/newbie",
      component:NewBie
    },
    {
      path: '/mine',
      component:Mine,
      children:[
        {
          path: '/mine/order',
          component:MyOrder,
          children:[
            {
              path: '/mine/order/LogisticsDetails',
              component:LogisticsDetails
            },
            {
              path: '/mine/order/commodityEvaluation',
              component:CommodityEvaluation,
              children:[
                {
                  path: '/mine/order/commodityEvaluation/thanks',
                  component:Thanks
                }
              ]
            },
            {
              path: '/mine/order/returnReq',
              component:ReturnReq
            },
            {
              path: '/mine/order/orderConfirm',
              component:OrderConfirm
            }

          ]
        },
        {
          path: '/mine/addressAdministration',
          component:addressAdministration,
          children:[
            {
              path: '/mine/addressAdministration/addAddress',
              component:AddAddress
            }
          ]
        },
        //设置
        {
          path: '/mine/setting',
          component:Setting,
          children:[
            {
              path:"/mine/setting/newbie",
              component:NewBie
            },
            {
              path: '/mine/setting/personalData',
              component:PersonalData
            },
            {
              path: '/mine/setting/resetPassWord',
              component:ResetCipher
            }

          ]
        },
        //我的收藏
        {
          path: '/mine/enshrine',
          component:Enshrine
        },
        //我的红包
        {
          path: '/mine/redPacket',
          component:RedPacket
        },
        //我的资产
        {
          path: '/mine/myProperty',
          component:MyProperty,
          children:[
            {
              path:"/mine/myProperty/topUp",
              component:TopUp
            },
            {
              path:"/mine/myProperty/withdrawals",
              component:Withdrawals
            },
            {
              path:"/mine/myProperty/accountDetail",
              component:AccountDetail
            }
          ]
        },
        //我的推广
        {
          path: '/mine/distribution',
          component:Distribution,
          children:[
            {
              path:"/mine/distribution/transfer",
              component:Transfer
            },
            {
              path:"/mine/distribution/teamOrder",
              component:TeamOrder
            },
            {
              path:"/mine/distribution/teamVip",
              component:TeamVip
            },
            {
              path:"/mine/distribution/bill",
              component:Bill
            },
            {
              path:"/mine/distribution/newbie",
              component:NewBie
            },
            {
              path:"/mine/distribution/QRCode",
              component:QRCode
            }
          ]
        },
        //个人资料
        {
          path: '/mine/personalData',
          component:PersonalData,
          children:[
            {
              path: '/mine/personalData/userName',
              component:UserName
            },
            {
              path: '/mine/personalData/phoneNum',
              component:PhoneNum
            },
            {
              path: '/mine/personalData/weChart',
              component:WeChart
            },
            {
              path: '/mine/personalData/QQ',
              component:QQ
            },
            {
              path: '/mine/personalData/gender',
              component:Gender
            }
          ]
        },
        //评价晒单
        {
          path: '/mine/evaluateBask',
          component:EvaluateBask,
          children:[
            {
              path: '/mine/evaluateBask/commodityEvaluation',
              component:CommodityEvaluation
            }
          ]
        },
        //退换货
        {
          path: '/mine/salesReturn',
          component:SalesReturn,
          children:[
            {
              path: '/mine/salesReturn/returnDetail',
              component:ReturnDetail
            }
          ]
        }
      ]
    }

  ]
})



// WEBPACK FOOTER //
// ./src/router/index.js