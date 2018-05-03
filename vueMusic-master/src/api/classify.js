import axios from 'axios'
import {URLROUTER} from './config'
export  function getCataLog(){
  const url=URLROUTER+'/catalog.php'
  return axios.get(url).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((error)=>{
    return Promise.resolve(error)
  })
}

export  function category(class_id,page,sort){
  const url=URLROUTER+'/category.php'
  const data={
    id:class_id,
    page:page,
    sort:sort
  }
  return axios.get(url,{
    params:data
  }).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((error)=>{
    return Promise.resolve(error)
  })
}