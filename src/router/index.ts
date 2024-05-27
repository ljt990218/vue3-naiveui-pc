import { createRouter, createWebHistory } from 'vue-router/auto'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import type { EnhancedRouteLocation } from './types'
import useRouteCacheStore from '@/stores/modules/routeCache'

NProgress.configure({ showSpinner: false, parent: '#app' })

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_PUBLIC_PATH),
  extendRoutes: routes => routes,
})

router.beforeEach((to: EnhancedRouteLocation, _from, next) => {
  NProgress.start()

  const routeCacheStore = useRouteCacheStore()

  // Route cache
  routeCacheStore.addRoute(to)

  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
