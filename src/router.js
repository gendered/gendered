import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home/Home.vue'
import About from '@/components/About';
import WordContainer from '@/components/WordContainer';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
     path: '/words/:word',
     name: 'word',
     component: WordContainer,
     props: true
   }
  ],
});