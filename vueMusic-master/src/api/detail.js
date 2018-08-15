import axios from './config'
import {URLROUTER} from './config'
export  function getDetailInfo(goodId) {
  const url=URLROUTER+'/goods.php'
  const data={
    id:goodId
  };
  return axios.get(url,{
    params:data
  }).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((error)=>{
    return Promise.resolve(error)
  })
}
export  function joinShopCart(goods) {
  const url=URLROUTER+'/flow.php?step=add_to_cart'
  let params = new URLSearchParams();
  params.append('goods', goods);
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
//评论
export  function getComment(goodId,page) {
  const url=URLROUTER+'/goods_comment.php'
  const data={
    act:"list_json",
    goods_id:goodId,
    type:0,
    page:page
  };
  return axios.get(url,{
    params:data
  }).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((error)=>{
    return Promise.resolve(error)
  })
}




// WEBPACK FOOTER //
// ./src/api/detail.js