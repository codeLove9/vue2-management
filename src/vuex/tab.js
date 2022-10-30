import Cookie from 'js-cookie'
import router from '@/router'
export default {
  state: {
    // 控制菜单折叠
    isCollapse: false,
    // 面包屑
    breadCrumb: [{ path: '/home', label: '首页' }],
    // 侧边栏menu数据
    menu: []
  },
  mutations: {
    // 修改菜单折叠的方法
    changeCollapse(state) {
      state.isCollapse = !state.isCollapse
    },
    // 更新面包屑数据
    refreshBreadCrumb(state, data) {
      if (data.path !== '/home' && data.path !== '/') {
        if (!state.breadCrumb.find(item => item.path === data.path)) {
          // state.breadCrumb = [{ path: '/', label: '首页' }]
          state.breadCrumb.push(data)
        }
      }
    },
    // 删除tag
    closeTag(state, val) {
      // console.log(val);
      state.breadCrumb = state.breadCrumb.filter(item => item.path !== val.path)
    },
    // 设置menu的数据
    setMenu(state, val) {
      // console.log(val)
      state.menu = val
      Cookie.set('menu', JSON.stringify(val))
    },
    // 添加动态路由
    addRouter(state) {
      if (!Cookie.get('menu')) return
      const menu = JSON.parse(Cookie.get('menu'))
      state.menu = menu
      const menuArr = []
      menu.forEach(item => {
        if (item.children) {
          item.children = item.children.map(item => {
            item.component = import(`@/views/${item.url}`)
            return item
          })
          menuArr.push(...item.children)
        } else {
          item.component = () => import(`@/views/${item.url}`)
          menuArr.push(item)
        }
      })
      // console.log(menuArr)
      let routerConfig = {}
      menuArr.forEach(item => {
        routerConfig = { path: item.path, name: item.name, component: item.component }
        // console.log(routerConfig)
        router.addRoute('main', routerConfig)
      })
    }
  }
}
