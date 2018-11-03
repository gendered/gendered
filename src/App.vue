<template>
  <div id="app" v-on:click='closeModal'>
  	<header>
	    <section class="logo">
	   		<router-link to="/">The Gendered Project</router-link> 
	     	<span>A library of gendered words </span>
	    </section>
		<router-link to="/about">About</router-link>
		<router-link to="/contribute">Contribute</router-link>
	</header>
	<!-- when we're on home it's home, it's the view of whatever page we're on -->
	<router-view></router-view>
</div>
</template>
<script>
import router from './router';
export default {
  name: 'App',
  methods: {
  	closeModal: function(e) {
  		const params = this.$route.params;
  		const target = e.target;
  		if (params.word && !target.classList.contains('can-open-modal')) router.push({ name: 'home' })
  	}
  }
};
</script>
<style src="./App.scss"></style>