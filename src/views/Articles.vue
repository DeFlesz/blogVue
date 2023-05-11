<script setup>
import ArticleListItem from "@/components/ArticleListItem.vue";
import AuthPanel from "@/components/AuthPanel.vue";
import { reactive } from "vue";
import { RouterLink } from "vue-router";

import { isAuthorized, getUserID } from "@/api/auth";
import { getAllArticles } from "@/api/articles";

const state = reactive({ articles: [], userArticles: [] });

function readData() {
  getAllArticles().then((data) => {
    // console.log(data);

    state.articles = [];
    state.userArticles = [];
    const user_id = getUserID();
    data.forEach((element) => {
      if (element.user_id == user_id) {
        state.userArticles.push(element);
        return;
      }
      state.articles.push(element);
    });
  });
}

readData();
</script>

<template>
  <div id="content">
    <div class="d-flex justify-content-between flex-fill">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item active">Articles</li>
        </ol>
      </nav>
      <!-- <span>{{ state.articles.length }} articles</span> -->
    </div>
    <div class="object-container flex-fill mb-3 pe-2">
      <template v-if="state.articles.length < 1">No articles...</template>
      <ul class="list-group mb-3">
        <ArticleListItem v-for="article in state.articles" :article="article" />
      </ul>
      <template v-if="state.userArticles.length > 0">
        <hr />
        <span class="mb-2">Your articles</span>
        <ul class="list-group">
          <ArticleListItem
            v-for="article in state.userArticles"
            :article="article"
          />
        </ul>
      </template>
    </div>
    <div class="d-flex flex-row justify-content-between flex-fill">
      <AuthPanel @logout="readData()" />

      <router-link
        to="/new-article"
        class="btn btn-primary"
        v-if="isAuthorized()"
        >New Article</router-link
      >
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
