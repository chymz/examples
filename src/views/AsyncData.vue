<template>
  <pre>{{ $store.state.data }}</pre>
</template>

<script>
/**
 * Page to show protected data
 * This page is protected with a middleware setup in src/views/PrivateLayout.vue
 */
export default {
  async asyncData({ store }) {
    await store.dispatch("getData", "from asyncData");
  }
};
</script>
