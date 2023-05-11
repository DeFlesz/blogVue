<script setup>
import { reactive, ref } from "vue";
import { RouterLink } from "vue-router";
import { useUserStore } from "@/stores/user";

import Navigation from "@/components/Navigation.vue";
import { registerUser } from "@/api/auth";

const displayname = ref("");
const email = ref("");
const password1 = ref("");
const password2 = ref("");

const validation = reactive({
  dp: "",
  email: "",
  p1: "",
  p2: "",
});

function register() {
  registerUser(
    displayname.value,
    email.value,
    password1.value,
    password2.value
  ).then((data) => {
    // console.log(data);
    const user = useUserStore();
    user.login(email.value, password1.value).then((valid) => {
      if (valid) {
        return;
      }
      validation.dp = "";
      validation.email = "";
      validation.p1 = "";
      validation.p2 = "";
      if (displayname.value.length < 3) {
        validation.dp = "Displayname need to be at least 3 characters long";
      }
      if (!email.value.match(/[^\s@]+@[^\s@]+\.[^\s@]+/gi)) {
        validation.email = "Incorrect email";
      }
      if (password1.value.length < 6) {
        validation.p1 = "Password needs to be at least 6 characters long";
      }
      if (password1.value != password2.value) {
        validation.p2 = "Passwords need to match";
      }
    });
  });
}
</script>

<template>
  <!--
    dp > 3
    email == email
    password1 == password2
    password1 >= 6
   -->
  <Navigation class="mb-2" :register="true"></Navigation>
  <form method="post" class="d-flex flex-column">
    <!-- <input name="displayname" label="Displayname" require></input> -->
    <div class="mb-3">
      <label class="form-label">Displayname</label>
      <input
        v-model="displayname"
        type="displayname"
        class="form-control"
        name="displayname"
        require
      />
      <div class="d-flex invalid-feedback mb-3">{{ validation.dp }}</div>
    </div>
    <div class="mb-3">
      <label class="form-label">Email</label>
      <input
        v-model="email"
        type="email"
        class="form-control"
        name="email"
        placeholder="name@example.com"
        require
      />
      <div class="d-flex invalid-feedback mb-3">{{ validation.email }}</div>
    </div>
    <div class="mb-3">
      <label class="form-label">Password <i>(6 characters minimum)</i></label>
      <input
        v-model="password1"
        type="password"
        class="form-control"
        name="password"
        require
      />
      <div class="d-flex invalid-feedback mb-3">{{ validation.p1 }}</div>
    </div>
    <div class="mb-3">
      <label class="form-label">Password</label>
      <input
        v-model="password2"
        type="password"
        class="form-control"
        name="password"
        require
      />
      <div class="d-flex invalid-feedback mb-3">{{ validation.p2 }}</div>
    </div>

    <div class="actions mb-2">
      <button @click.prevent="register()" class="btn btn-primary">
        Register
      </button>
    </div>

    <router-link to="/">back to main page</router-link>
    <!-- <checkbox name="remember-me">Remember me</checkbox> -->
  </form>
</template>
