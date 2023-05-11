<script setup>
import ArticleForm from "@/components/ArticleForm.vue";
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <ArticleForm
    :article_id="router.currentRoute.value.params.article_id"
    :user_id="router.currentRoute.value.params.user_id"
    :edit="true"
    header="Edit Article"
  />
</template>
