<script setup>
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

import Comment from "@/components/Comment.vue";
import { getCommentsForArticle } from "@/api/comments";
import { isAdmin, getUserData } from "../api/auth";
import { getArticle } from "../api/articles";
import PageComponent from "../components/PageComponent.vue";

const route = useRoute();
const router = useRouter();

if (!isAdmin()) {
  router.push("/");
}

const state = reactive({
  comments: [],
  username: String,
  title: String,
  pages_count: 0,
  current_page: 1,
});

const user_id = router.currentRoute.value.params.user_id;
const article_id = router.currentRoute.value.params.article_id;

getUserData(user_id).then((data) => {
  state.username = data.displayname;
});

getArticle(article_id).then((data) => {
  state.title = data.title;
});

function readData() {
  if (route.query.page) {
    state.current_page = route.query.page;
  }
  getCommentsForArticle(user_id, article_id, state.current_page).then(
    (data) => {
      state.comments = data.comments;
      state.pages_count = data.pages_count;
    }
  );
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
        <li class="breadcrumb-item">
          <router-link :to="`/admin/${user_id}/articles`">
            @{{ state.username }} - articles
          </router-link>
        </li>
        <li class="breadcrumb-item active">{{ state.title }} - comments</li>
      </ol>
    </nav>
    <div class="object-container">
      <template v-if="state.comments.length < 1">No comments...</template>

      <Comment
        v-for="comment in state.comments"
        :comment="comment"
        @deleted="readData()"
      />
    </div>
    <PageComponent
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
