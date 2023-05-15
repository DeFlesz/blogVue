<script setup>
import { isAuthorized, isAdmin, signOutUser } from "@/api/auth";
import { RouterLink } from "vue-router";

// const authorized = isAuthorized();
</script>

<template>
  <div id="main" class="d-flex justify-content-between  gap-2 pt-2 pe-2 ps-2">
    <router-link to="/" class="btn btn-outline-secondary">Home</router-link>
    <router-link
      to="/my-articles"
      class="btn btn-outline-primary ms-2"
      v-if="isAuthorized()"
    >
      My Articles
    </router-link>
    <div v-if="isAdmin()">
      <router-link class="btn btn-outline-success" to="/admin"
        >Admin panel</router-link
      >
    </div>
    <div v-if="!isAuthorized()">
      <router-link class="btn btn-outline-primary" to="/login"
        >Sign in</router-link
      >
    </div>
    <div v-else>
      <button
        class="btn btn-outline-danger"
        @click="
          signOutUser();
          $emit('logout');
        "
      >
        Sign Out
      </button>
    </div>
  </div>
</template>

<style scoped>
#main {
  max-width: 48rem;
  margin: auto;
}
</style>
