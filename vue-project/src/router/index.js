import { createRouter, createWebHistory } from 'vue-router'
import Cagnottes from '../views/Cagnottes.vue'
import CagnotteNew from '../views/CagnotteNew.vue'
import CagnotteDetails from '../views/CagnotteDetails.vue'
import CagnotteInfos from '../views/CagnotteInfos.vue'
import CagnotteEdit from '../views/CagnotteEdit.vue'

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
    },
    {
      path: '/cagnottes/:id/edit',
      name: 'cagnotte-edit',
      component: CagnotteEdit
    },
    {
      path: '/cagnottes/:id',
      component: CagnotteDetails,
      redirect: to => `/cagnottes/${to.params.id}/infos`,
      children: [
        {
          path: 'infos',
          name: 'cagnotte-infos',
          component: CagnotteInfos
        },
        {
          path: 'donations',
          name: 'cagnotte-donations',
          component: () => import('../views/Donations.vue')
        }
      ]
    }
  ]
})

export default router
