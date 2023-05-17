<script setup>
import { reactive } from "vue";
import { useRouter, useRoute } from "vue-router";

import AdminArticleItem from "@/components/AdminArticleItem.vue";
import PageComponent from "@/components/PageComponent.vue";

import { isAdmin, getUserData } from "@/api/auth";
import { getArticles, getArticlesForUser } from "@/api/articles";

const router = useRouter();
const route = useRoute();

if (!isAdmin()) {
  router.push("/");
}

const state = reactive({
  articles: [],
  username: String,
  pages_count: 0,
  current_page: 1,
});

let user_id = -1;

if (route.params.user_id) {
  user_id = route.params.user_id;
  getUserData(user_id).then((data) => {
    state.username = data.displayname;
  });
}

function readData() {
  if (route.query.page) {
    state.current_page = route.query.page;
  }

  if (user_id < 1) {
    getArticles(state.current_page).then((data) => {
      // console.log(data);
      state.articles = data.articles;
      state.pages_count = data.pages_count;
    });
  } else {
    getArticlesForUser(user_id, state.current_page).then((data) => {
      state.articles = data.articles;
      state.pages_count = data.pages_count;
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
        :key="article.id"
        :article="article"
        @destroyed="readData()"
      />
    </ul>

    <PageComponent
      class="me-auto"
      :pages_count="state.pages_count"
      :current_page="state.current_page"
      @update="readData()"
    />
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
