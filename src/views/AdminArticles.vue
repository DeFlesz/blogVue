<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";

import AdminArticleItem from "@/components/AdminArticleItem.vue";

import { isAdmin, getUserData } from "@/api/auth";
import { getAllArticles, getArticlesForUser } from "@/api/articles";

const router = useRouter();

if (!isAdmin()) {
  router.push("/");
}

const state = reactive({ articles: [], username: String });

let user_id = -1;

if (router.currentRoute.value.params.user_id) {
  user_id = router.currentRoute.value.params.user_id;
  getUserData(user_id).then((data) => {
    state.username = data.displayname;
  });
}

function readData() {
  if (user_id < 1) {
    getAllArticles().then((data) => {
      // console.log(data);
      state.articles = data;
    });
  } else {
    getArticlesForUser(user_id).then((data) => {
      state.articles = data;
    });
  }
}

readData();
</script>

<template>
  <div id="content">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/admin"> Admin panel </router-link>
        </li>
        <li v-if="state.username != String" class="breadcrumb-item active">
          @{{ state.username }} - articles
        </li>
        <li v-else class="breadcrumb-item active">articles</li>
      </ol>
    </nav>
    <ul class="object-container list-group mb-3 pe-2">
      <template v-if="state.articles.length < 1">No articles...</template>
      <AdminArticleItem
        v-for="article in state.articles"
        :article="article"
        @destroyed="readData()"
      />
    </ul>
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
