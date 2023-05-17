<script setup>
import ArticleForm from "@/components/ArticleForm.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <ArticleForm
    :article_id="route.params.article_id"
    :user_id="route.params.user_id"
    :edit="true"
    header="Edit Article"
  />
</template>
