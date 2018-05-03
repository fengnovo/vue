export function dateFilter(time){
    time = new Date(time * 1000);
  let y=time.getFullYear(),
      mm=(time.getMonth() + 1)<10?'0'+(time.getMonth() + 1):(time.getMonth() + 1),
      dd=time.getDate()<10?'0'+time.getDate():time.getDate(),
      hh=time.getHours()<10?'0'+time.getHours():time.getHours(),
      m=time.getMinutes()<10?'0'+time.getMinutes():time.getMinutes(),
      s=time.getSeconds()<10?'0'+time.getSeconds():time.getSeconds()

   let _date=y+ "-" +mm + "-" + dd+ " " + hh + ":" + m + ":" +s ;
  return _date
}



// WEBPACK FOOTER //
// ./src/common/js/util.js