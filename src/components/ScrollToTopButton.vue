<template>
<button class="to-top" @click="scrollToTop">
			Scroll to top
</button>
</template>

<script>
export default {
	name: "ScrollToTopButton",
	methods: {
		scrollToTop() {
			window.scrollTo(0, 0);
		},
	}
};
</script>

<style lang="scss" scoped>

</style>
