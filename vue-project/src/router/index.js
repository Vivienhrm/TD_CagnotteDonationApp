import { createRouter, createWebHistory } from 'vue-router'
import Cagnottes from '../views/Cagnottes.vue'
import CagnotteNew from '../views/CagnotteNew.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Cagnottes
    },
    {
      path: '/cagnottes',
      redirect: '/'
    },
    {
      path: '/cagnottes/new',
      name: 'cagnotte-new',
      component: CagnotteNew
    }
  ]
})

export default router
