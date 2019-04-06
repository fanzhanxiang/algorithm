// import Vue from 'vue'
// import Router from 'vue-router'
import Display from '@/components/Display'
import User from '@/components/FinalDesign/User'
import Race from '@/components/FinalDesign/Race'
import Answer from '@/components/FinalDesign/Answer'

// Vue.use(Router)
const router = {
  routes: [
    {
      path: '/',
      name: 'display',
      component: Display,
      redirect: 'user',
      children: [
        {
          path: 'user',
          component: User
        },
        {
          path: 'race',
          component: Race
        },
        {
          path: 'answer',
          component: Answer
        }
      ]
    }
  ]
}
export default router
