import axios from './config'
import {URLROUTER} from './config'
export  function getShopCart() {
  const url=URLROUTER+'/flow.php'

  return axios.get(url).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((error)=>{
    return Promise.resolve("error")
  })
}
export  function ShopAdd(step,sel_goods,rec_id,number,goods_id,suppid,is_package) {
  const url=URLROUTER+'/flow.php'
  const data={
    step:step,
    sel_goods:sel_goods,
    rec_id:rec_id,
    number:number,
    goods_id:goods_id,
    suppid:suppid,
    is_package:is_package,
  }
  return axios.get(url,{
    params:data
  }).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((res)=>{
    return Promise.resolve(res.data)
  })
}

export  function ShopDrop(step,goods_id) {
  const url=URLROUTER+'/flow.php'
  const data={
    step:step,
    id:goods_id
  }
  return axios.get(url,{
    params:data
  }).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((res)=>{
    return Promise.resolve(res.data)
  })
}
export  function Selcart(step,goods_id) {
  const url=URLROUTER+'/flow.php'
  const data={
    act:step,
    sel_goods:goods_id
  }
  return axios.get(url,{
    params:data
  }).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((res)=>{
    return Promise.resolve(res.data)
  })
}

export  function ChooseAttr(is_ajax,step,goods_id) {
  const url=URLROUTER+'/flow.php'
  const data={
    is_ajax:is_ajax,
    step:step,
    rec_id:goods_id
  }
  return axios.get(url,{
    params:data
  }).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((res)=>{
    return Promise.resolve(res.data)
  })
}
export  function theAttrDetail(act,did,attr,number) {
  const url=URLROUTER+'/goods.php';
  const data={
    act:act,
    id:did,
    attr:attr,
    number:number
  }
  return axios.get(url,{
    params:data
  }).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((res)=>{
    return Promise.resolve(res.data)
  })
}
export  function setAttr(rec_id,did,attr,number) {
  const url=URLROUTER+'/flow.php';
  const data={
    is_ajax:"1",
    step:"edit_cart_goods",
    rec_id:rec_id,
    goods_id:did,
    attr:attr,
    number:number
  }
  return axios.get(url,{
    params:data
  }).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((res)=>{
    return Promise.resolve(res.data)
  })
}

export  function ChooseConfirm() {
  // const url=URLROUTER+'/flow.php';
  const url="http://www.tuoniaoshangcheng.com/app/flow.php";
  const data={
    step:"cart"
  }
  return axios.get(url,{
    params:data
  }).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((res)=>{
    return Promise.resolve(res.data)
  })
}



// WEBPACK FOOTER //
// ./src/api/shop.js