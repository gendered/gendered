<template>
  <div id="app">
  	<header>
	    <section class="logo">
	   		<router-link to="/">The Gendered Project</router-link> 
	     	<span>A library of gendered words </span>
	    </section>
	    <nav>
	      <router-link to="/about">About</router-link>
	      <router-link to="/contribute">Contribute</router-link>
	    </nav>
	</header>
	<router-view></router-view>
</div>
</template>
<style src="./App.scss"></style>