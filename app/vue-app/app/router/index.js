import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello'
import Course from '../components/Course'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
      props: true
    },
    {
      path: '/course',
      name: 'Course',
      component: Course,
      props: true
    }
  ]
})
