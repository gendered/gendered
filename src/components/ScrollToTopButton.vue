<template>
	<button class="to-top" @click="handleScrollAction">
		Scroll to top
	</button>
</template>

<script>
export default {
	name: "ScrollToTopButton",
	methods: {
		handleScrollAction() {
			this.scrollToTop();
			this.$emit("scroll");
		},
		scrollToTop() {
			window.scrollTo(0, 0);
		}
	}
};
</script>

<style lang="scss" scoped></style>
