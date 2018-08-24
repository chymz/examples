<template>
  <pre>{{ $store.state.data }}</pre>  
</template>

<script>
export default {
  middlewares: [
    async ({ store }) => {
      await store.dispatch("getData", "from middleware");
    }
  ]
};
</script>
