<template>
	<div id="app" @click="closeModal">
		<button @click="skipNav" class="visuallyhidden">Skip navigation</button>
		<nav v-current-page>
			<section class="logo">
				<h1>
					<router-link to="/">
						The Gendered Project
					</router-link>
				</h1>
				<span>A library of gendered words </span>
			</section>
			<h3 class= "about">
				<router-link  to="/about">
					About
				</router-link>
			</h3>
		</nav>
		<!-- when we're on home it's home, it's the view of whatever page we're on -->
		<router-view />
	</div>
</template>
<script>
import router from "./router";
export default {
	name: "App",
	methods: {
		closeModal: function(e) {
			const params = this.$route.params;
			const target = e.target;
			if (params.word && !target.classList.contains("can-open-modal")) {
				router.push({ name: "home" });
			}
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
