<template>
    <div>
        <nav class="nav">
            <img class="btn-back" src="../assets/back.png" @click="handleBack"/>
            <div class="nav-text">{{ title }}</div>
        </nav>
        <div v-if="content == ''" class="content-center">
             <Loading r=52 z=4 c='#65bbce'></Loading> 
        </div>  
        <div v-if="content != ''" id="detail">
            <li>
                <router-link :to="{path: '/user/'+author.loginname}">
                    <img :src="author.avatar_url"/>
                </router-link>
                <div class="list-item">
                    <p>{{ title }}</p>
                    <h5>作者：{{ author.loginname }} 时间：{{ transTimeFunc(create_at) }}</h5>
                    <h5>回复数：{{ reply_count }} 浏览量：{{ visit_count }}</h5>
                </div>
            </li>
            <div v-html="content"></div>
            <!-- <Replies {...this.state}/> -->
        </div>
    </div>
</template>

<script>
	import { transTime } from '@/util/time' 
	import { getScrollTop,getWindowHeight,getScrollHeight } from '@/util/scroll' 
    import { gobalUrl,HomePageLimit } from '@/util/commonConfig' 
    import loading from '@/components/Loading.vue' 
console.log(loading)
  export default {
    data() {
      return {
            id: null,
            content: '',
            title: '详情',
            replies: [],
            author: {},
            author_id: '',
            reply_count: 0,
            visit_count: 0,
            create_at: null,
            tab: ''
        }
    },
    components: {
			
    },
    
    created() {
        if( this.$route && this.$route.params && this.$route.params.id){
            this.id = this.$route.params.id; 
        }
        fetch(`${gobalUrl}/api/v1/topic/${this.id}`)
		.then(response=>response.json())
		.then(data=> {
            let d = data.data;
            this.content = d.content;
            this.title = d.title;
            this.replies = d.replies;
            this.author = d.author;
            this.author_id = d.author_id;
            this.reply_count = d.reply_count;
            this.visit_count = d.visit_count;
            this.create_at = d.create_at;
            this.tab = d.tab;
		})
		.catch(e => {
            console.log(e)
            this.content = '<p>出错了</p>';
        })
    },
    
    methods: {
        handleBack() {
            window.history.back()
        },
        transTimeFunc(str) {
            return transTime(str)
        },

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

.footer{
    width: 100%;
    height: 3rem;
    position: fixed;
    bottom: 0;
    background: -webkit-linear-gradient(top, #65bbce, #50b1c8);
}

#footer-list {
	font-size: 0;
}

#footer-list li{
    text-align: center;
    width: 20%;
    height: 3rem;
    line-height: 3rem;
    font-size: 1rem;
    display: inline-block;
    color: #fff;
    
}
#footer-list li.active{
    text-shadow: 4px 2px 4px #480b0b;
}



</style>

