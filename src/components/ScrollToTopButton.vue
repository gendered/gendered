<template>
	<button class="to-top" @click="handleScrollAction">
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

<style lang="scss" scoped></style>
