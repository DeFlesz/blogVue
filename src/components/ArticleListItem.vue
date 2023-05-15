<script setup>
import { RouterLink } from "vue-router";

const props = defineProps({
  article: null,
});
</script>

<template>
  <router-link
    id="rlink"
    :to="`/article/${article.id}`"
    class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
  >
    <div class="ms-2 me-auto align-self-start" id="content">
      <div>
        @{{ article.username }} -
        <span class="fw-bold">{{ article.title }}</span>
      </div>
      {{ article.body }}
    </div>
  </router-link>
</template>

<style scoped>
#rlink {
  width: 100%;
  height: 65.75px;
}

#content {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
