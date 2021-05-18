import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Sign from '../views/Sign.vue';
import Tpsign from '../views/Tpsign.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import('../views/index/Index.vue'),
        children: [
          {
            path: '/index',
            name: 'videoList',
            component: () => import('../components/index/VideoList.vue'),
          },
        ]
      },
      {
        path: '/follow',
        name: 'follow',
        component: () => import('../views/follow/Follow.vue')
      },
      {
        path: '/msg',
        name: 'msg',
        component: () => import('../views/msg/msg.vue')
      },
    ]
  },
  {
    path: '/sign',
    name: 'sign',
    component: Sign,
  },
  {
    path: '/tpsign',
    name: 'tpsign',
    component: Tpsign,
  },
  {
    path: '/toast',
    name: 'toast',
    component: () => import('../components/toast/toast.vue'),
  },
  {
    path: '/publish',
    name: 'publish',
    component: () => import('../views/publish/Publish.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
