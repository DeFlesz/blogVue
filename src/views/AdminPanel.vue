<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { isAdmin, getUserID } from "@/api/auth";
import { getUsers } from "@/api/admin";
import UserElement from "@/components/UserElement.vue";

const router = useRouter();
const state = reactive({ users: null });

if (!isAdmin()) {
  router.push("/");
}

function readData() {
  getUsers().then((data) => {
    state.users = [];
    // console.log(data);
    const userID = getUserID();
    data.forEach((user) => {
      if (user.id == userID) {
        return;
      }
      state.users.push(user);
    });
  });
}

readData();
</script>
<template>
  <div id="content">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <!-- <li class="breadcrumb-item">
        <router-link to="/admin"> Admin panel </router-link>
      </li> -->
        <li class="breadcrumb-item active">Admin panel</li>
      </ol>
    </nav>
    <!-- You're the king! -->
    <ul class="object-container list-group mb-3 pe-2">
      <template v-if="state.users && state.users.length < 1"
        >No users...</template
      >
      <UserElement
        @changed="readData()"
        v-for="user in state.users"
        :user="user"
      />
    </ul>
    <div class="mb-2">
      <router-link class="btn btn-primary" to="/admin/articles"
        >All articles</router-link
      >
      <router-link
        class="btn btn-success ms-2"
        :to="`/admin/${getUserID()}/articles`"
        >My articles</router-link
      >
    </div>
    <router-link to="/">back to main page</router-link>
  </div>
</template>

<style scoped>
#content {
  display: flex;
  max-height: 95vh;
  flex-flow: column nowrap;
  justify-content: start;
}
</style>
