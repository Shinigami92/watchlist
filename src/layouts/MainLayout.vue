<template lang="pug">
q-layout(view="hHh lpR fFf")
  q-header.bg-primary.text-white(elevated)
    q-bar.q-electron-drag
      div Watchlist

      q-space

      q-btn(dense, flat, icon="close", @click="closeApp")

  q-page-container
    router-view
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainLayout',
  components: {},
  setup() {
    const closeApp: () => void = () => {
      if (process.env.MODE === 'electron') {
        window.electron.close();
      }
    };

    return { closeApp };
  },
});
</script>
