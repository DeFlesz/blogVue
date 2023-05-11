<script setup>
import { reactive, ref } from "vue";
import Navigation from "@/components/Navigation.vue";
import { useUserStore } from "@/stores/user";

const user = useUserStore();

// action="http://localhost:8000/users/sign_in"

const email = ref("");
const password = ref("");
const checkbox = ref(false);
const validationMessage = reactive({});

function login() {
  user.login(email.value, password.value).then((valid) => {
    // console.log(valid);
    if (!valid) {
      validationMessage.value = "wrong email or password";
    }
  });
}
</script>

<template>
  <form class="d-flex flex-column">
    <Navigation class="mb-2" :login="true"></Navigation>
    <div class="mb-3">
      <label class="form-label">Email</label>
      <input
        v-model="email"
        type="email"
        class="form-control"
        name="user[email]"
        placeholder="name@example.com"
        require
      />
    </div>
    <div class="mb-3">
      <label class="form-label">Password</label>
      <input
        v-model="password"
        type="password"
        class="form-control"
        name="user[password]"
        require
      />
    </div>

    <div class="form-check">
      <input
        v-model="checkbox"
        type="checkbox"
        name="user[remember-me]"
        class="form-check-input"
        id="flexCheckDefault"
      />
      <label for="flexCheckDefault" class="form-check-label">Remember me</label>
    </div>

    <div class="d-flex invalid-feedback mb-3">
      {{ validationMessage.value }}
    </div>

    <div class="actions mb-2">
      <button @click.prevent="login()" class="btn btn-primary">Log in</button>
    </div>
    <router-link to="/">back to main page</router-link>
  </form>
</template>
