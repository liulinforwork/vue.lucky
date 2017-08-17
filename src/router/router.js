/***@author blue @create date 2017-4-5 @info router.js***/

import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './../app.vue'
import Index from './../pages/index'
import Rank from './../pages/rank'
import InvTk from './../pages/invTk.vue'
import Read from './../pages/read'
import Invite from './../pages/invite'
import Fire from './../pages/fire'
import ReadInfo from './../pages/readInfo'
import InvTkDts from './../pages/invTkDts.vue'
import Redeem from './../pages/redeem.vue'
import RedeemDts from './../pages/redeemDts.vue'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: App,
        children: [
            {
                path: '', redirect: '/index'
            },
            {
                path: '/index', name: 'rank',component: Index},
            {
                path: '/rank', name: 'rank', component: Rank
            },
            {
                path: '/invTk', name: 'invTk', component: InvTk
            },
            {
                path: '/read', name: 'read', component: Read
            },
            {
                path: '/invite', name: 'invite', component: Invite
            },
            {
                path: '/fire', name: 'fire', component: Fire
            },
            {
                path: '/readInfo', name: 'readInfo', component: ReadInfo
            },
            {
                path: '/invTkDts', name: 'invTkDts', component: InvTkDts
            },
            {
                path: '/redeem', name: 'redeem', component: Redeem
            },
            {
                path: '/redeemDts', name: 'redeemDts', component: RedeemDts
            }
        ]
    }
];

const router = new VueRouter({
    hashbang:false,//去除#！开头
    mode:'history',
    routes: routes, // short for routes: routes
    linkActiveClass: 'active',  // router-link的选中状态的class，也有一个默认的值
    history: true,
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
});

export default router
