import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home/Home.vue'
import About from '@/components/About';
import Contribute from '@/components/Contribute';
import WordContainer from '@/components/WordContainer';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
			meta: {
	      title: 'The Gendered Project - Home',
	      metaTags: [
					{
						name: 'viewport',
						content: 'width=device-width, initial-scale=1'
					},
	        {
	          name: 'description',
	          content: 'A library of gendered words.'
	        },
	        {
	          property: 'og:description',
	          content: 'A library of gendered words.'
	        }
	      ]
	    },
      children: [
        {
          path: '/words/:word',
          name: 'word',
          component: WordContainer,
          props: true
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/contribute',
      name: 'contribute',
      component: Contribute,
    }
  ],
});
