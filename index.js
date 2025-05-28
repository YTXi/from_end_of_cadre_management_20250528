import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CadreListView from '../views/CadreListView.vue'
import CadreDetailView from '../views/CadreDetailView.vue'
import ImportExportView from '../views/ImportExportView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/cadre-list',
    name: 'cadre-list',
    component: CadreListView
  },
  {
    path: '/cadre-detail/:id',
    name: 'cadre-detail',
    component: CadreDetailView,
    props: true
  },
  {
    path: '/import-export',
    name: 'import-export',
    component: ImportExportView
  },
  // 其他路由...
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router