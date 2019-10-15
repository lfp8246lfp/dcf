import Login from '../views/login/index.vue'
import Register1 from '../views/register/register1/index.vue'
import Register2 from '../views/register/register2/index.vue'
import Register3 from '../views/register/register3/index.vue'
import Forget1 from '../views/forget/forget1/index.vue'
import Forget2 from '../views/forget/forget2/index.vue'
import Forget3 from '../views/forget/forget3/index.vue'

export default [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register1',
    component: Register1,
  },
  {
    path: '/register2',
    component: Register2,
  },
  {
    path: '/register3',
    component: Register3,
  },
  {
    path: '/forget1',
    component: Forget1,
  },
  {
    path: '/forget2',
    component: Forget2,
  },
  {
    path: '/forget3',
    component: Forget3,
  },
]