<script setup>
import { RouterLink } from "vue-router";
import { onMounted, reactive } from "vue";
import { getUserData } from "../api/auth";

const props = defineProps({
  article: null,
});

const state = reactive({ username: "" });

getUserData(props.article.user_id).then((data) => {
  // console.log(data);
  state.username = data.displayname;
});

// const username = "username";
// const title = "title";
// const body = "body";
</script>

<template>
  <router-link
    id="rlink"
    :to="`/article/${props.article.id}`"
    class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
  >
    <div class="ms-2 me-auto align-self-start" id="content">
      <div>
        @{{ state.username }} -
        <span class="fw-bold">{{ props.article.title }}</span>
      </div>
      {{ props.article.body }}
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
