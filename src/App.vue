<template>
  <div
    id="app"
    @click="closeModal"
  >
    <nav>
      <section class="logo">
        <h1>
          <router-link to="/">
            The Gendered Project
          </router-link>
        </h1>
        <span>A library of gendered words </span>
      </section>
      <router-link to="/about">
        About
      </router-link>
    </nav>
    <!-- when we're on home it's home, it's the view of whatever page we're on -->
    <router-view />
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
        if (params.word && !target.classList.contains('can-open-modal')) {
          router.push({ name: 'home' });
        }
      }
    }
  };
</script>
<style lang="scss" src="./App.scss"></style>
