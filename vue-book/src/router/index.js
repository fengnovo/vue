import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home';
import List from '../components/List';
import Collection from '../components/Collection';
import Add from '../components/Add';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },{
            path: '/home',
            name: 'home',
            component: Home
        },{
            path: '/list',
            name: 'list',
            component: List
        },{
            path: '/collection',
            name: 'collection',
            component: Collection
        },{
            path: '/add',
            name: 'add',
            component: Add
        },
    ]
})
