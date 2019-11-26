import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../../layout/index.vue'

Vue.use(Router)

/*
  redirect:                      if set to 'noredirect', no redirect action will be trigger when clicking the breadcrumb
  meta: {
    title: 'title'               the name showed in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon showed in the sidebar
    breadcrumb: false            if false, the item will be hidden in breadcrumb (default is true)
    hidden: true                 if true, this route will not show in the sidebar (default is false)
  }
*/

export default new Router({
  // mode: 'history',  // Enable this if you need.
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/404',
      component: () => import(/* webpackChunkName: "404" */ './views/404.vue'),
      meta: { hidden: true }
    },
    {
      path: '/',
      component: Layout,
      redirect: '/dashboard1',
      children: [
        {
          path: 'dashboard1',
          component: () => import(/* webpackChunkName: "dashboard" */ './views/dashboard/index.vue'),
          meta: {
            title: '客服解决方案首页',
            icon: 'dashboard'
          }
        }
      ]
    },
    {
      path: '/example',
      component: Layout,
      redirect: '/example/tree',
      meta: {
        title: 'Example',
        icon: 'example'
      },
      children: [
        {
          path: 'tree',
          component: () => import(/* webpackChunkName: "tree" */ './views/tree/index.vue'),
          meta: {
            title: 'Tree',
            icon: 'tree'
          }
        },
        {
          path: 'table',
          component: () => import(/* webpackChunkName: "table" */ './views/table/index.vue'),
          meta: {
            title: 'Table',
            icon: 'table'
          }
        }
      ]
    },
    {
      path: 'external-link',
      component: Layout,
      children: [
        {
          path: 'https://github.com/Armour/vue-typescript-admin-template',
          meta: {
            title: 'External Link',
            icon: 'link'
          }
        }
      ]
    },
    {
      path: '*',
      redirect: '/404',
      meta: { hidden: true }
    }
  ]
})
