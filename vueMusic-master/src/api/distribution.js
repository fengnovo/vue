//推广中心
import axios from './config'
import {URLROUTER} from './config'
export  function popularizeInfo() {
  const url=URLROUTER+'/v_user.php'
  return axios.get(url).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((error)=>{
    return Promise.resolve(error)
  })
}

export  function getVipCount() {
  const url=URLROUTER+'/v_user_huiyuan.php'
  return axios.get(url).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((error)=>{
    return Promise.resolve(error)
  })
}
export  function getOrderCount() {
  const url=URLROUTER+'/v_user_order.php'
  return axios.get(url).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((error)=>{
    return Promise.resolve(error)
  })
}
export  function Commission(type,last,amount) {
  const url=URLROUTER+'/v_user_order_list.php'
  const data={
    last:last,
    type:type,
    amount:amount
  }
  return axios.get(url,{
    params:data
  }).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((error)=>{
    return Promise.resolve(error)
  })
}

export  function vipInfo(type,last,amount) {
  const url=URLROUTER+'/v_user_huiyuan_list.php'
  const data={
    last:last,
    type:type,
    amount:amount
  }
  return axios.get(url,{
    params:data
  }).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((error)=>{
    return Promise.resolve(error)
  })
}

export  function distributionBill(type,last,amount) {
  const url=URLROUTER+'/v_user_notes.php'
  const data={
    last:last,
    type:type,
    amount:amount
  }
  return axios.get(url,{
    params:data
  }).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((error)=>{
    return Promise.resolve(error)
  })
}

export  function QRcode() {
  const url=URLROUTER+'/v_user_erweima.php'
  return axios.get(url).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((error)=>{
    return Promise.resolve(error)
  })
}
export  function maxTransfer() {
  const url=URLROUTER+'/v_user_tixian.php'
  return axios.get(url).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((error)=>{
    return Promise.resolve(error)
  })
}

export  function shift(money) {
  const url=URLROUTER+'/v_user_tixian.php'
  let params = new URLSearchParams();
  params.append('act', 'act_tixian');
  params.append('deposit_money', money);
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



// WEBPACK FOOTER //
// ./src/api/distribution.js