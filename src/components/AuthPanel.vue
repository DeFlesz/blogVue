<script setup>
import { isAuthorized, isAdmin, signOutUser } from "@/api/auth";
import { RouterLink } from "vue-router";

// const authorized = isAuthorized();
</script>

<template>
  <div class="d-flex flex-row">
    <div v-if="!isAuthorized()">
      <router-link class="btn btn-link" to="/login">Sign in</router-link>
    </div>
    <div v-else>
      <button
        class="btn btn-link"
        @click="
          signOutUser();
          $emit('logout');
        "
      >
        Sign Out
      </button>
    </div>
    <div class="ms-3" v-if="isAdmin()">
      <router-link class="btn btn-link" to="admin">Admin panel</router-link>
    </div>
  </div>
</template>
