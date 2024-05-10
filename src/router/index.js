import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged} from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'
import HomeView from '../views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },

    {
      path: '/admin',
      mane: 'admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '/admin/list_contabilidad',
          name: 'admin-list-contabilidad',
          component: () => import('../views/admin/AdminListContView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: '/admin/nuevo',
          name: 'nuevo-reg-contabilidad',
          component: () => import('../views/admin/NuevoRegContabilidadView.vue'),
          meta: { requiresAuth: true },

        }, {
          path: '/admin/account-settings',
          name: 'account-settings',
          component: () => import('../views/AccountSettingsView.vue'),
          meta: { requiresAuth: true },

        },
      ]
    }
  ]
})


//Guard de navegación
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(url => url.meta.requiresAuth)

  if (requiresAuth) {
    //comprobar que el usuario este autenticado
    try {
      await authenticateUser() 
      next()
    } catch (error) {
      console.log(error)
      next({ name: 'login' })
    }

  } else {
    //No esta protegido, mostramos la vista
    next()
  }
  console.log(requiresAuth)

})

function authenticateUser(){
  const auth = useFirebaseAuth();
  return new Promise((resolve, reject) => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      if(user){
        resolve(user)
      }else{
        reject()
      }
    })
  })
}
export default router
