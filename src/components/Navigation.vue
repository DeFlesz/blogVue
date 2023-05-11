<script setup>
import { RouterLink } from "vue-router";

const props = defineProps({
  register: false,
  login: false,
});

// console.log(props.register);
</script>

<template>
  <nav class="nav nav-pills flex-column flex-sm-row">
    <router-link
      to="/login"
      class="flex-sm-fill text-sm-center nav-link"
      :class="props.login ? 'active' : ''"
    >
      Login
    </router-link>
    <router-link
      to="/register"
      class="flex-sm-fill text-sm-center nav-link"
      :class="props.register ? 'active' : ''"
    >
      Register
    </router-link>
  </nav>
</template>
