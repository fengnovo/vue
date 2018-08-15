import axios from './config'
import {URLROUTER} from './config'
export  function getUserInfo() {
  const url=URLROUTER+'/user.php'
  return axios.get(url).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((error)=>{
    return Promise.resolve(error)
  })
}

//会员订单信息  收货地址  //会员订单数量  注销登录
export function vipAccountInfo(act){
  const url=URLROUTER+'/user.php'
  const data={
    act:act
  }
  return axios.get(url,{
    params:data
  }).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((error)=>{
    return Promise.resolve(error)
  })
}


//转入支付宝
export  function TransferAlipay(amount,real_name,account,user_note) {
  const url=URLROUTER+'/user.php'
  let params = new URLSearchParams();
  params.append('act', 'act_account');
  params.append('surplus_type', 1);
  params.append('amount', amount);
  params.append('real_name', real_name);
  params.append('account', account);
  params.append('user_note', user_note);
  return axios({
    method:'post',
    url,
    data:params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((error)=>{
    return Promise.resolve(error)
  })
}

//账户详情  我的收藏
export function accountDetail(act,page){
  const url=URLROUTER+'/user.php'
  const data={
    act:act,
    page:page
  }
  return axios.get(url,{
    params:data
  }).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((error)=>{
    return Promise.resolve(error)
  })
}

//会员订单信息
export function vipOrderInfo(amount,last,status){
  const url=URLROUTER+'/user.php'
  const data={
    act:"ajax_order_list",
    amount:amount,
    last:last,
    composite_status:status
  }
  return axios.get(url,{
    params:data
  }).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((error)=>{
    return Promise.resolve(error)
  })
}





// WEBPACK FOOTER //
// ./src/api/mine.js