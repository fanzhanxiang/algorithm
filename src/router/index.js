// import Vue from 'vue'
// import Router from 'vue-router'
import Test from '@/components/Test'
import User from '@/components/FinalDesign/User'
import Race from '@/components/FinalDesign/Race'
import Answer from '@/components/FinalDesign/Answer'

// Vue.use(Router)
const router = {
  routes: [
    {
      path: '/',
      name: 'Test',
      component: Test,
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
