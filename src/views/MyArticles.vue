<script setup>
import ArticleListItem from "@/components/ArticleListItem.vue";
import AuthPanel from "@/components/AuthPanel.vue";
import PageComponent from "@/components/PageComponent.vue";
import { reactive } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";

import { isAuthorized, getUserID } from "@/api/auth";
import { getArticles } from "@/api/articles";
import { getArticlesForUser } from "../api/articles";

const router = useRouter();
const route = useRoute();
const state = reactive({
  articles: [],
  // userArticles: [],
  pages_count: 0,
  current_page: 1,
});

if (!isAuthorized()) {
  router.push("/");
}

function readData() {
  if (route.query.page) {
    state.current_page = route.query.page;
  }

  const user_id = getUserID();
  getArticlesForUser(user_id, state.current_page).then((data) => {
    state.articles = data.articles;
    state.pages_count = data.pages_count;
  });
}

readData();
</script>

<template>
  <div id="content">
    <div class="d-flex justify-content-between flex-fill">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item active">Your articles</li>
        </ol>
      </nav>
      <!-- <span>{{ state.articles.length }} articles</span> -->
    </div>
    <div class="object-container flex-fill mb-3 pe-2">
      <template v-if="state.articles.length < 1">No articles...</template>
      <ul class="list-group mb-3">
        <ArticleListItem
          v-for="article in state.articles"
          :key="article.id"
          :article="article"
        />
      </ul>
      <!-- <template v-if="state.userArticles.length > 0">
        <hr />
        <span class="mb-2">Your articles</span>
        <ul class="list-group">
          <ArticleListItem
            v-for="article in state.userArticles"
            :article="article"
          />
        </ul>
      </template> -->
    </div>
    <div class="d-flex flex-row justify-content-start align-items-start">
      <router-link
        to="/new-article"
        class="btn btn-primary"
        v-if="isAuthorized()"
      >
        New Article
      </router-link>

      <PageComponent
        class="ms-auto"
        :current_page="state.current_page"
        :pages_count="state.pages_count"
        @update="readData()"
      />
    </div>
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
