import axios from './config'
import {URLROUTER} from './config'
export  function getIndex() {
  const url=URLROUTER+'/index.php'

  return axios.get(url).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((error)=>{
    return Promise.resolve(error)
  })
}

export function loadForYou(last,amount,act) {
  const url=URLROUTER+'/index_bestgoods.php'

  const data={
    last:last,
    amount:amount,
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

export function topic(topic_id) {
  const url=URLROUTER+'/topic.php'
  const data={
    topic_id:topic_id
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
// ./src/api/home.js