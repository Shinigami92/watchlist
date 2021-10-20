<template lang="pug">
.fullscreen.bg-blue.text-white.text-center.q-pa-md.flex.flex-center
  div
    div(style="font-size: 30vh") 404

    .text-h2(style="opacity: 0.4") Oops. Nothing here...

    q-btn.q-mt-xl(
      label="Go Home",
      color="white",
      text-color="blue",
      unelevated,
      to="/",
      no-caps
    )
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Error404',
});
</script>
