<template>
    <div id="publish">
        <nav class="nav">
            <img class="btn-back" src="../assets/back.png" @click="handleBack"/>
            <div class="nav-text">{{ user.loginname }}</div>
            <img class="nav-img" src="../assets/exit.png" @click="handleExit"/>
        </nav>
        <div v-if="user.loginname" id="editor">
            <input ref="title" type="text" class="login-text" placeholder="请输入标题"/>
            <editor ref="myeditor"></editor>
            <div class="login-btn" @click="publishTopic">发布新话题</div>
        </div> 
        <div v-if="!user.loginname" class="publish-from">
            <img src="../assets/unlogin.png" />
            <div class="unlogin">请登录</div>
        </div>
    </div>
</template>

<script>
    import { gobalUrl,HomePageLimit } from '@/util/commonConfig' 
    import Editor from '@/components/Editor'
    import { toastIt } from '@/components/Toast' 
    
  export default {
    data() {
        let user = JSON.parse(localStorage.getItem('fengnovo.cnode.user')) || {}
        return {
            user
        }
    },
    components: {
        Editor
    },
    
    methods: {
        publishTopic() {
            let content = this.$refs.myeditor.clickHandle();
            let title = this.$refs.title.value.replace(/^(\s|\u00A0)+/,'').replace(/(\s|\u00A0)+$/,'')
            let accesstoken = this.user.accesstoken
            content = content.replace(/^(\s|\u00A0)+/,'').replace(/(\s|\u00A0)+$/,'')
            if(title == ''){
                toastIt('请输入标题！', 2000, {fontSize: '18px'});
                return
            }
            if(!content){
                toastIt('请输入内容！', 2000, {fontSize: '18px'});
                return
            }
            console.log({
                accesstoken,
                title,
                tab: 'dev',
                content
            });
return
            fetch(`${gobalUrl}/api/v1/topics`,{
                method:'POST',
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json' 
                },
                body:JSON.stringify({
                    accesstoken,// String 用户的 accessToken
                    title,// String 标题
                    tab: 'dev',
                    content// String 主体内容
                })
            }).then(res => res.json())
                .then(json => {
                    if(json.success){
                        toastIt('成功', 2000, {fontSize: '18px'});
                        setTimeout(()=>{
                             this.$router.push({path: `/detail/${json.topic_id}`})
                        },2000)
                    }else{
                        toastIt(json.error_msg, 2000, {fontSize: '18px'});
                    }
                })
                .catch(error=>console.log(error))
        },
        handleExit() {
            localStorage.removeItem('fengnovo.cnode.user')
            this.user = {}
        },
        handleBack() {
            window.history.back()
        }

    }
  }
</script>

<style>
#publish .publish-from {
    display: block;
    margin-top: 3.3rem;
    width: 100%;
    height: 100%;
}


#publish .publish-from img{
    display: block;
    margin: 5rem auto 0;
}

#publish .publish-from div{
    text-align: center;
}



#editor {
	display: block;
    margin-top: 3.3rem;
    width: 100%;
    height: 100%;
}

#editor .login-text{
    display: block;
    margin: 3.5rem auto .5rem;
    width: 90%;
    font-size: 1.2rem;
    height: 2.6rem;
    border: none;
    border-bottom: 1px solid #ccc;
}

#editor .login-btn{
    display: block;
    margin: 1rem auto 0;
    background: #65bbce;
    color: #fff;
    font-size: 1.2rem;
    text-align: center;
    line-height: 2.6rem;
    width: 70%;
    height: 2.6rem;
    border-radius: .5rem;
    border: none;
}

.w-e-toolbar { display: block !important; }
.w-e-toolbar .w-e-menu {  display: inline-block !important; }

.w-e-text-container { height: 400px !important; }

</style>

