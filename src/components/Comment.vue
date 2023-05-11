<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { isAuthorized, isOwner, isAdmin } from "@/api/auth";
import { deleteComment } from "@/api/comments";

const router = useRouter();
const props = defineProps({
  comment: null,
});

const authorized = isAuthorized();
const state = reactive({ username: "" });

fetch("http://127.0.0.1:8000/admin/users/" + props.comment.user_id)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // console.log(data);
    state.username = data.displayname;
  });
</script>

<template>
  <div class="card mb-2">
    <div class="card-body">
      <h5 class="card-title">@{{ state.username }}</h5>
      <div class="card-text mb-2">{{ props.comment.body }}</div>

      <div v-if="authorized && (isOwner(props.comment.user_id) || isAdmin())">
        <button
          @click="
            deleteComment(props.comment.id, props.comment.article_id).then(() =>
              $emit('deleted')
            )
          "
          class="btn btn-danger"
        >
          Destroy comment
        </button>
      </div>
    </div>
  </div>
</template>
