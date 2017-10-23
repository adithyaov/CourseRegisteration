import Vue from 'vue'
import Router from 'vue-router'
import MyCourses from '../components/MyCourses'
import Course from '../components/Course'
import Group from '../components/Group'
import Hello from '../components/Hello'

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
      path: '/my-courses',
      name: 'MyCourses',
      component: MyCourses,
      props: true
    },
    {
      path: '/course',
      name: 'Course',
      component: Course,
      props: true
    },
    {
      path: '/group',
      name: 'Group',
      component: Group,
      props: true
    }
  ]
})
