<script setup>
import Comment from "@/components/Comment.vue";
import PageComponent from "@/components/PageComponent.vue";
import { useRouter, useRoute } from "vue-router";
import { isAuthorized, isAdmin, isOwner } from "@/api/auth";
import { deleteArticle } from "@/api/articles";
import { postComment, getCommentsForArticle } from "../api/comments";
// import { useUserStore } from "@/stores/user";
import { reactive, ref } from "vue";

const router = useRouter();
const route = useRoute();
const authorized = isAuthorized();

const body = ref("");
const status = ref("public");

// console.log(router.currentRoute.value.params.id);
const state = reactive({
  username: "",
  user_id: 0,
  title: "",
  body: "",
  comments: [],
  pages_count: 0,
  current_page: 1,
});

function readComments() {
  if (route.query.page) {
    state.current_page = route.query.page;
  }
  // console.log(state.current_page);
  getCommentsForArticle(
    state.user_id,
    route.params.id,
    state.current_page
  ).then((data) => {
    // console.log(data);
    state.comments = data.comments;
    state.pages_count = data.pages_count;
    // data.forEach((element) => {
    //   state.articles.push(element);
    // });
  });
}

fetch("http://localhost:8000/articles/" + router.currentRoute.value.params.id)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    if (data.status == 404) {
      router.push("/");
      return;
    }
    // console.log(data);
    state.user_id = data.user_id;
    state.title = data.title;
    state.body = data.body;
    state.username = data.username;
  })
  .then(() => {
    readComments();
  });

// readComments();
</script>

<template>
  <div id="content">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/"> Articles </router-link>
        </li>
        <li class="breadcrumb-item active">
          @{{ state.username }} - {{ state.title }}
        </li>
      </ol>
    </nav>

    <div class="object-container pe-2 mb-3">
      <p class="card-text">{{ state.body }}</p>

      <div v-if="authorized && (isOwner(state.user_id) || isAdmin())">
        <button
          @click="
            deleteArticle(router.currentRoute.value.params.id).then(() =>
              router.push('/')
            )
          "
          class="btn btn-danger"
        >
          Destroy Article
        </button>
        <router-link
          :to="`/edit-article/${router.currentRoute.value.params.id}`"
          class="btn btn-primary ms-3"
          >Edit Article</router-link
        >
      </div>

      <hr />
      <h4>Leave a comment</h4>
      <div v-if="authorized">
        <form>
          <div class="mb-3">
            <textarea
              v-model="body"
              name="comment[body]"
              id="comment_body"
              class="form-control"
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="comment_status" class="form-label">Status</label>
            <select
              v-model="status"
              name="comment[status]"
              id="comment_status"
              class="form-select"
            >
              <option value="public">public</option>
              <option value="private">private</option>
              <option value="archieved">archieved</option>
            </select>
          </div>
          <div class="mb-3">
            <button
              @click.prevent="
                postComment(
                  router.currentRoute.value.params.id,
                  body,
                  status
                ).then((res) => {
                  readComments();
                })
              "
              class="btn btn-primary"
              name="commit"
            >
              Create comment
            </button>
          </div>
        </form>
      </div>
      <div v-else>
        In order to leave a comment you need to
        <router-link to="/login">log in...</router-link>
      </div>
      <hr />
      <div>
        <PageComponent
          :pages_count="state.pages_count"
          :current_page="state.current_page"
          @update="readComments()"
        />
        <template v-if="state.comments.length < 1"> No comments... </template>
        <Comment
          :key="comment.id"
          v-for="comment in state.comments"
          :comment="comment"
          @deleted="readComments()"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
#content {
  display: flex;
  flex-flow: column nowrap;
  max-height: 88vh;
}
</style>
