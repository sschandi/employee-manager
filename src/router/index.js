import Vue from 'vue'
import Router from 'vue-router'
import NewEmployee from '@/components/NewEmployee'
import ViewEmployee from '@/components/ViewEmployee'
import EditEmployee from '@/components/EditEmployee'
import AllEmployees from '@/components/AllEmployees'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'all-employees',
      component: AllEmployees
    },
    {
      path: '/new',
      name: 'new-employee',
      component: NewEmployee
    },
    {
      path: '/edit/:employee_id',
      name: 'edit-employee',
      component: EditEmployee
    },
    {
      path: '/view/:employee_id',
      name: 'view-employee',
      component: ViewEmployee
    }
  ]
})
