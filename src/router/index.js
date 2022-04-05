import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home/'
import Layout from '@/views/layout/'
import Article from '@/views/article/'
import Publish from '@/views/publish/'
import Image from '@/views/image/'
import Comment from '@/views/comment/'

Vue.use(VueRouter)

// 路由配置表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'layout',
    component: Layout,
    children: [
      {
        path: '', // path 为空，会作为默认子路由渲染
        name: 'home',
        component: Home
      },
      {
        path: '/article', // path 为空，会作为默认子路由渲染
        name: 'article',
        component: Article
      },
      {
        path: '/publish', // path 为空，会作为默认子路由渲染
        name: 'publish',
        component: Publish
      },
      {
        path: '/image', // path 为空，会作为默认子路由渲染
        name: 'image',
        component: Image
      },
      {
        path: '/comment', // path 为空，会作为默认子路由渲染
        name: 'comment',
        component: Comment
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
