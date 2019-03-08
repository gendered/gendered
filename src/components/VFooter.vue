<template>
	<footer class="footer container">
		<!-- <div> -->
		<span class="twitter-icon">
			<a href="https://twitter.com/@GenderedProject">
				<img
					src="../assets/imgs/twitter.svg"
					alt="Twitter for The Gendered Project"
				/>
			</a>
		</span>
		<span class="license">
			Content is licensed under <br />
			<a href="https://creativecommons.org/licenses/by-nc-sa/2.0/"
				>CC BY-NC-SA 2.0</a
			>
		</span>
		<!-- </div> -->
	</footer>
</template>
<style lang="scss" scoped>
@import "../mixins.scss";

.footer {
	z-index: -1;
	font-size: 14px;
	font-family: "RomanaBTWXX-Roman";
	background: white;
	position: relative;
	top: 2.56rem;
	padding-bottom: 0.625rem;

	display: -ms-grid;
	display: grid;
	-ms-grid-columns: (1fr) [10];
	grid-template-columns: repeat(10, 1fr);
	grid-gap: 1rem;

	@include break(small) {
		top: 1.6rem;
		padding-bottom: 6.554rem;
	}

	@include break(medium) {
		top: 1.6rem;
		padding-bottom: 6.554rem;
	}

	.twitter-icon {
		text-align: right;
	}

	.license {
		-ms-grid-column: 2;
		grid-column-start: 2;
		grid-column-end: 5;

		@include break(small) {
			grid-column-end: 10;
		}
	}

	&a {
		padding: 0.625rem;
	}

	img {
		width: 22px;
	}
}
</style>
