<template>
  <div id="app" v-on:click='closeModal'>
  	<header>
	    <section class="logo">
	   		<h1><router-link to="/">The Gendered Project</router-link></h1>
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
	mounted() {
		(function() {
				var trial = document.createElement('script');
				trial.type = 'text/javascript';
				trial.async = true;
				trial.src = 'https://easy.myfonts.net/v2/js?sid=362(font-family=Romana+Std+Roman)&sid=363(font-family=Romana+Std+Bold)&key=43V6OV8XMY';
				var head = document.getElementsByTagName("head")[0];
				head.appendChild(trial);
		})();
	},
  methods: {
  	closeModal: function(e) {
  		const params = this.$route.params;
  		const target = e.target;
  		if (params.word && !target.classList.contains('can-open-modal')) router.push({ name: 'home' })
  	}
  }
};
</script>
<style lang="scss" src="./App.scss"></style>
