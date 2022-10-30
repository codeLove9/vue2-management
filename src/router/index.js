import Vue from 'vue'
import VueRouter from 'vue-router'
import Cookie from 'js-cookie'

// 重写push|replace方法,防止多次跳转同一个router抛出异常
//先把VueRouter的push和replace方法保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function (location, resolve, reject) {
  // 此函数上下文(this指向)为VueRouter的一个实例
  if (resolve && reject) {
    //如果我们自己指定了成功/失败的回调，则自己传入
    originPush.call(this, location, resolve, reject)
    //若此时直接使用originPush()方法，则函数内的this指向window（内部代码将无法执行）。故应用call或apply方法修改this指向
  } else {
    //如果我们没有指定成功/失败的回调，则自动帮我们生成，防止报错
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

// replace方法同理
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('@/views/Main.vue'),
    redirect: '/home',
    children: [
      // { path: 'home', component: () => import('@/views/Home.vue') },
      // { path: 'user', component: () => import('@/views/User.vue') },
      // { path: 'mall', component: () => import('@/views/Mall.vue') },
      // { path: 'page1', component: () => import('@/views/PageOne.vue') },
      // { path: 'page2', component: () => import('@/views/PageTwo.vue') }
    ]
  },
  { path: '/login', component: () => import('@/views/Login.vue') }
]

const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

router.beforeEach((to, from, next) => {
  const token = Cookie.get('token')
  if (token) {
    if (to.path == '/login') {
      next(false)
    } else {
      next()
    }
  } else {
    if (to.path == '/login') {
      next()
    } else {
      next('login')
    }
  }
})

export default router
