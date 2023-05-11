<script setup>
import { reactive } from "vue";
import { RouterLink } from "vue-router";

import { deleteArticle } from "@/api/articles";
import { editArticle } from "../api/articles";

const props = defineProps({
  article: null,
  //   user: null,
});

const state = reactive({ displayname: String });

fetch("http://127.0.0.1:8000/admin/users/" + props.article.user_id)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // console.log(data);
    state.username = data.displayname;
  });
</script>

<template>
  <router-link
    id="rlink"
    :to="`/article/${props.article.id}`"
    class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
  >
    <div id="item" class="ms-2 me-auto align-self-start">
      <div class="mb-2">
        @{{ state.username }} -
        <span class="fw-bold">{{ article.title }}</span>
      </div>
      <button
        @click="
          deleteArticle(article.id);
          $emit('destroyed');
        "
        class="btn btn-danger btn-sm"
      >
        Destroy Article
      </button>
      <router-link
        :to="`/admin/${article.user_id}/articles/${article.id}/admin-edit`"
        class="btn btn-primary ms-2 btn-sm"
      >
        Edit Article
      </router-link>
      <router-link
        :to="`/admin/${article.user_id}/articles/${article.id}/comments`"
        class="btn btn-warning ms-2 btn-sm"
        >Comments</router-link
      >
    </div>
  </router-link>
</template>

<style scoped>
#item {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
