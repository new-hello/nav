import { createRouter, createWebHistory } from 'vue-router'
import NavigationPage from '@/views/NavigationPage.vue'
import SimplePage from '@/views/SimplePage.vue'

const routes = [
  {
    path: '/',
    name: 'navigation',
    component: NavigationPage,
    meta: {
      title: '导航页面'
    }
  },
  {
    path: '/search',
    name: 'search',
    component: SimplePage,
    meta: {
      title: '简洁搜索'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 设置页面标题
router.beforeEach((to) => {
  document.title = to.meta.title || '导航页面'
})

export default router
