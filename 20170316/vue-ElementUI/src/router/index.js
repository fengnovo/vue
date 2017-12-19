import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

// 由于addRouters只支持在根路由append，无法append或者replace，无法满足在动态组件内进行子路由新增，暂时先把所有路由集中维护在此
let router = new Router({
    // mode: 'hash',
    routes: [
        // 首页
        {
            path: '/',
            name: 'index',
            alias: ['/index'],
            component: resolve => require.ensure([], () => resolve(require(`../page/index/app.vue`)),'index')
        },
        {
            path: '/html',
            name: 'html',
            component: resolve => require.ensure([], () => resolve(require(`../page/frontend/Component.vue`)),'html')
        },
        {
            path: '/js',
            name: 'js',
            component: resolve => require.ensure([], () => resolve(require(`../page/frontend/ComputedWatch.vue`)),'js')
        },
        {
            path: '/css',
            name: 'css',
            component: resolve => require.ensure([], () => resolve(require(`../page/frontend/Detail.vue`)),'css')
        },
        {
            path: '/nodejs',
            name: 'nodejs',
            component: resolve => require.ensure([], () => resolve(require(`../page/frontend/Home.vue`)),'nodejs')
        },
        {
            path: '/php',
            name: 'php',
            component: resolve => require.ensure([], () => resolve(require(`../page/frontend/Home.vue`)),'php')
        },
        {
            path: '/ai',
            name: 'ai',
            component: resolve => require.ensure([], () => resolve(require(`../page/frontend/ListFunction.vue`)),'ai')
        },
        {
            path: '/bigData',
            name: 'bigData',
            component: resolve => require.ensure([], () => resolve(require(`../page/frontend/Moban.vue`)),'bigData')
        },
        {
            path: '/vr',
            name: 'vr',
            component: resolve => require.ensure([], () => resolve(require(`../page/frontend/Shengmingzhouqi.vue`)),'vr')
        },
        {
            path: '/smallScale',
            name: 'smallScale',
            component: resolve => require.ensure([], () => resolve(require(`../page/frontend/Shenming.vue`)),'smallScale')
        }
    ]
});
export default router;
