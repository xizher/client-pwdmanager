import { createRouter, createMemoryHistory } from "vue-router"
import { useCheck } from "../hooks/login.hooks"

/** @type { import("vue-router").RouteRecordRaw[] } */
const routes = [
  { name: 'Login', path: '/login', component: () => import('../views/Login.view.vue') },
  {
    name: 'Main',
    path: '/main',
    component: () => import('../views/Main.view.vue'),
  },
  { path: '/', redirect: '/main' },
]

const router =  createRouter({
  routes,
  history: createMemoryHistory()
})

router.beforeEach(res => {
  if (res.path !== '/login') {
    useCheck().then(success => {
      if (!success) {
        router.push('/login')
      }
    })
  }
})

export default router