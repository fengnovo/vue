import axios from 'axios'

export const URLROUTER="http://www.tuoniaoshangcheng.com/app"
export const ERROK="0"
export const NOTLOGIN=301
export const AMOUNT=10
export const options = {
  param: 'jsonpCallback'
}
axios.defaults.withCredentials=true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
export default axios



// WEBPACK FOOTER //
// ./src/api/config.js