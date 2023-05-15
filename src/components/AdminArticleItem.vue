<script setup>
import { reactive } from "vue";
import { RouterLink } from "vue-router";

import { deleteArticle } from "@/api/articles";
import { editArticle } from "../api/articles";
import { deleteComment } from "../api/comments";

const emit = defineEmits(["destroyed"]);

const props = defineProps({
  article: null,
  //   user: null,
});

function removeComment() {
  deleteArticle(props.article.id).then(() => {
    emit("destroyed");
  });
}
</script>

<template>
  <!-- <router-link
    id="rlink"
    :to="`/article/${props.article.id}`"
    class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
  > -->
  <div
    class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
    id="rlink"
  >
    <div id="item" class="ms-2 me-auto align-self-start">
      <div class="mb-2">
        @{{ article.username }} -
        <span class="fw-bold">{{ article.title }}</span>
      </div>
      <button @click="removeComment()" class="btn btn-danger btn-sm">
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
      <router-link
        class="btn btn-secondary ms-2 btn-sm"
        :to="`/article/${props.article.id}`"
        >Go to</router-link
      >
    </div>
  </div>
  <!-- </router-link> -->
</template>

<style scoped>
#item {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
