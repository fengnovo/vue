<template>
    <div id="login">
        <nav class="nav">
            <img class="btn-back" src="../assets/back.png" @click="handleBack"/>
            <div class="nav-text">{{ title }}</div>
        </nav>
        <form class="login-from">
            <input ref="token" type="text" class="login-text" placeholder="请输入Access Token"/>
            <button class="login-btn" @click="fetchData">登录</button>
        </form>
    </div>
</template>

<script>
	import { toastIt } from '@/components/Toast' 

  export default {
    data() {
      return {
        title: '登录'
      }
    },
    
    created() {
        let data = localStorage.getItem('fengnovo.cnode.user')
        console.log(data)
		if(data){
            data = JSON.parse(data)
        }
    },
    
    methods: {
        handleBack() {
            window.history.back()
        },
        fetchData() {
            let accesstoken = this.$refs.token.value.replace(/^(\s|\u00A0)+/,'').replace(/(\s|\u00A0)+$/,'')
            console.log(accesstoken)
            if(!accesstoken){
                toastIt('请输入accesstoken！', 2000, {fontSize: '18px'})
                return
            }
            fetch(`${gobalUrl}/api/v1/accesstoken`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ accesstoken })
            })
            .then(response=>response.json())
            .then(data=> {
                if(data.success){
                    data.accesstoken = accesstoken
                    localStorage.setItem('fengnovo.cnode.user',JSON.stringify(data))
                    history.push(`/user/${data.loginname}`)
                }else{
                    toastIt(`登录失败！${data.error_msg}`, 2000, {fontSize: '18px'})
                }
            })
            .catch(e => {
                console.log(e)
            })
        }

    },
    beforeDestroy() {
        
    }
  }
</script>

<style>

.nav{
    position: fixed;
    top: 0;
    height: 3.3rem;
    width: 100%;
    /*background-color: rgb(0, 187, 156);*/
    background: -webkit-linear-gradient(top, #65bbce, #50b1c8);
    line-height: 3.3rem;
    padding: 0 .5rem;
}
.nav img{
    /*width: 4.4rem;*/
    /*line-height: 3.3rem;*/
    height: 3.3rem;
}

.nav .homepage-left-img {
    width: 4.4rem;
    float: left;    
}

.nav .homepage-right-img {
    margin-top: .7rem;
    margin-right: 1.2rem;
    width: 1.6rem;
    height: 1.6rem;
    line-height: 3.3rem;
    float: right;    
}

.nav-text {
    /*text-align: center;*/
    /*margin-left: 4rem;*/
    color: #fff;
    font-size: 1.2rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-right: .5rem;
    /*float: left;*/
}

.nav .nav-img{
    position: absolute;
    margin-top: .2rem;
    margin-right: 1.2rem;
    width: 1.6rem;
    height: 1.6rem;
    line-height: 3.3rem;
    /*float: right;*/
    right: 1rem;
    top: .5rem;
}

.nav .btn-back{
    margin-top: .7rem;
    margin-right: 1.2rem;
    width: 1.6rem;
    height: 1.6rem;
    line-height: 3.3rem;
    float: left;
}

#login .login-from{
    display: block;
    margin-top: 3.3rem;
    width: 100%;
    height: 100%;
}

#login .login-text{
    display: block;
    margin: 10rem auto 0;
    width: 90%;
    height: 2.6rem;
    font-size: 1.2rem;
    border-radius: .5rem;
    border: 1px solid #ccc;
}

#login .login-btn{
    display: block;
    margin: 2rem auto 0;
    background: #65bbce;
    color: #fff;
    font-size: 1.2rem;
    width: 5rem;
    height: 2.6rem;
    border-radius: .5rem;
    border: none;
}


</style>

