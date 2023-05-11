<script setup>
import { RouterView, RouterLink } from "vue-router";
</script>

<!--
  methodes for auth:
  GET http://localhost:8000/users/sign_out
  POST http://localhost:8000/users/sing_in
 -->

<template>
  <div class="m-2">
    <div id="main" class="card">
      <div class="card-body">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>
#main {
  margin: auto;
  max-width: 48rem;
  max-height: 100vh;
}
</style>
