<template>
	<button class="to-top" @click="handleScrollAction" aria-label="Scroll to top">
		↑
	</button>
</template>

<script>
export default {
	name: "ScrollToTopButton",
	methods: {
		handleScrollAction() {
			this.scrollToTop();
			this.$emit("scrollToTop");
		},
		scrollToTop() {
			window.scrollTo(0, 0);
		}
	}
};
</script>

<style lang="scss" scoped>
.to-top {
	font-size: 1.6rem;
	padding: 0.625rem 1rem;
}
</style>
