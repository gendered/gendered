<template>
	<div id="app">
		<button @click="skipNav" class="visuallyhidden">Skip navigation</button>
		<nav ref="nav" class="container">
			<section class="logo">
				<h1>
					<router-link to="/">
						The Gendered Project
					</router-link>
				</h1>
				<span>A library of gendered words </span>
			</section>
			<h3 class= "about light">
				<router-link  to="/about">
					About
				</router-link>
			</h3>
		</nav>
		<!-- when we're on home it's home, it's the view of whatever page we're on -->
		<router-view />
		<!-- <VFooter/> -->
	</div>
</template>
<script>
import router from "./router";
import VFooter from "@/components/VFooter";
const navRoutes = {
	'home': 1,
	'about': 1
};

export default {
	name: "App",
	components: {
		VFooter
	},
	watch: {
		$route: function(to, from) {
			if (navRoutes[to.name] && navRoutes[from.name] && !to.hash) {
				// $nextTick = DOM updated
				this.$nextTick(() => {
					// Focus management on route change
					setTimeout(() => {
						// setAriaCurrent in navigation only after focus management
						this.setAriaCurrent();
					}, 0);
				});
			}
		}
  },
	methods: {
		setAriaCurrent() {
      this.$nextTick(() => {
        let nav = this.$refs.nav,
          current = nav.querySelector("[aria-label]");
        if (current) {
          current.removeAttribute("aria-label");
        }
        let activeLink = nav.querySelector(".router-link-exact-active");
      	if (activeLink) activeLink.setAttribute("aria-label", "current page");
      });
    },
		skipNav() {
			const list = document.querySelector(".word-list");
			setTimeout(() => {
				list.focus();
			}, 200);
		}
	}
};
</script>
<style lang="scss" src="./App.scss"></style>
