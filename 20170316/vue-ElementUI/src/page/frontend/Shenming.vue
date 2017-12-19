<template>
 <pre>
  var arr = [1,2,3,4,5];

  //命令式
  var newArr = [];
  for(var i = 0;i < arr.length; i++){
    newArr.push(arr[i]*2);
  }

  //申明式
  var newArr2 = arr.map(function(item){
    return item * 2;
  });

  console.log(newArr);
  console.log(newArr2);

  </pre>
</template>

<script>
export default {
  name: 'Shenming',
  data () {
    return {
      id: 'sdfsd'
    }
  } 
}
</script>