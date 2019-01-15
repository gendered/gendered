import Vue from 'vue';
import Router from 'vue-router';

const Home = () => import('./components/Home/Home.vue');
const About = () => import('./components/About');
const Contribute = () => import('./components/Contribute');
const WordContainer = () => import('./components/WordContainer');
const NotFound = () => import('./components/NotFound');

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
			path: '/404',
			component: NotFound,
		},
  	{
			path: '*',
			redirect: '/404',
		},
  ],
});
