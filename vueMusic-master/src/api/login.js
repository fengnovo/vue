import axios from './config'
import {URLROUTER} from './config'
export  function Login(username,password,captcha,remember) {
  const url=URLROUTER+'/user.php'
  let params = new URLSearchParams();
  params.append('username', username);
  params.append('password', password);
  params.append('captcha', captcha);
  params.append('act', 'act_login');
  params.append('back_act', './index.php');
  params.append('remember', remember);
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

//注册默认信息
export  function register(){
  const url=URLROUTER+'/register.php'
  const data={
    act:"default"
  }
  return axios.get(url,{
    params:data
  }).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((error)=>{
    return Promise.resolve(error)
  })
}
//检查手机号是否存在
export  function checkHasPhone(mobile){
  const url=URLROUTER+'/register.php'
  let params = new URLSearchParams();
  params.append('act', 'check_mobile_exist');
  params.append('mobile', mobile);
  return axios({
    method: 'post',
    url,
    data: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((error)=>{
    return Promise.resolve(error)
  })
}
//检查邀请码
export  function checkInvitation(code){
  const url=URLROUTER+'/register.php'
  let params = new URLSearchParams();
  params.append('act', 'check_code_info');
  params.append('code', code);
  const data={
    act:"check_code_info",
    code:code
  }
  return axios({
    method: 'post',
    url,
    data: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((error)=>{
    return Promise.resolve(error)
  })
}
//发送注册验证码
export  function sendCode(mobile){
  const url=URLROUTER+'/register.php'
  const data={
    act:"send_mobile_code",
    mobile:mobile
  }
  return axios.get(url,{
    params:data
  }).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((error)=>{
    return Promise.resolve(error)
  })
}
//提交注册
export  function registerCommit(mobile_phone,mobile_code,password,invitation_code,) {
  const url=URLROUTER+'/register.php'
  let params = new URLSearchParams();
  params.append('act', 'register');
  params.append('register_type', 'mobile');
  params.append('mobile_phone', mobile_phone);
  params.append('password', password);
  params.append('invitation_code', invitation_code);
  params.append('mobile_code', mobile_code);
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
// ./src/api/login.js