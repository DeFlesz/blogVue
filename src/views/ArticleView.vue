<script setup>
import Comment from "@/components/Comment.vue";
import PageComponent from "@/components/PageComponent.vue";
import { useRouter, useRoute } from "vue-router";
import { isAuthorized, isAdmin, isOwner } from "@/api/auth";
import { deleteArticle } from "@/api/articles";
import { postComment, getCommentsForArticle } from "../api/comments";
// import { useUserStore } from "@/stores/user";
import { reactive, ref } from "vue";
import { getArticle } from "../api/articles";

const router = useRouter();
const route = useRoute();
const authorized = isAuthorized();

const body = ref("");
const status = ref("public");
const delButton = ref(null);

// console.log(route.params.id);
const state = reactive({
  username: "",
  user_id: 0,
  title: "",
  body: "",
  comments: [],
  pages_count: 0,
  current_page: 1,
  validation_msg: "",
});

function validate() {
  if (body.value.length < 3) {
    state.validation_msg = "At least 3 characters required to post a comment!";
    return;
  } else if (body.value.length > 1000) {
    state.validation_msg =
      "More than 1000 characters is too much to post a comment!";
    return;
  }
  state.validation_msg = "";
}

function readComments() {
  if (route.query.page) {
    state.current_page = route.query.page;
  }
  // console.log(state.current_page);
  getCommentsForArticle(route.params.id, state.current_page).then((data) => {
    // console.log(data);
    state.comments = data.comments;
    state.pages_count = data.pages_count;
    // data.forEach((element) => {
    //   state.articles.push(element);
    // });
  });
}

getArticle(route.params.id)
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

function destroyArticle() {
  delButton.value.disabled = true;
  deleteArticle(route.params.id).then(() => router.push("/"));
}
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
          ref="delButton"
          @click="destroyArticle()"
          class="btn btn-danger"
        >
          Destroy Article
        </button>
        <router-link
          :to="`/edit-article/${route.params.id}`"
          class="btn btn-primary ms-3"
          >Edit Article</router-link
        >
      </div>

      <hr />
      <!-- <h4>Leave a comment</h4> -->

      <div class="d-flex align-items-baseline justify-content-between">
        <h4>Leave a comment</h4>
        <span :class="body.length > 1000 ? 'indanger' : ''"
          >{{ body.length }}/1000</span
        >
      </div>
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
          <div class="d-flex invalid-feedback mb-3">
            {{ state.validation_msg }}
          </div>
          <div class="mb-3">
            <button
              @click.prevent="
                postComment(
                  route.params.id,
                  body,
                  status
                ).then((res) => {
                  validate();
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

.indanger {
  color: var(--bs-danger-text-emphasis) !important;
}
</style>
