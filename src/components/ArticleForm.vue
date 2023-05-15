<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getArticle, newArticle, editArticle } from "@/api/articles";
import { isAuthorized, getUserID, isAdmin } from "@/api/auth";

const router = useRouter();
const props = defineProps({
  header: String,
  edit: false,
  new: false,
  article_id: String,
  user_id: String,
});

if (!isAuthorized()) {
  router.push("/");
}

let value = "Create Article";

if (props.edit) {
  value = "Update Article";
}

let username = "";
const title = ref("");
const body = ref("");
const status = ref("public");

if (props.edit) {
  getArticle(props.article_id).then((newData) => {
    if (!isAdmin() && newData.user_id != getUserID()) {
      router.push("/");
    }

    title.value = newData.title;
    body.value = newData.body;
    status.value = newData.status;
    username = newData.username;
  });
}

function action() {
  // console.log(
  //   title.value,
  //   body.value,
  //   status.value,
  //   props.title,
  //   props.body,
  //   props.status
  // );
  if (props.edit && props.new) {
    console.log("you can't set both parameters to true :c");
    return;
  }

  if (props.new) {
    newArticle(title.value, body.value, status.value).then(() => {
      router.push("/");
    });
  }

  if (props.edit) {
    editArticle(props.article_id, title.value, body.value, status.value).then(
      () => {
        router.push("/");
      }
    );
  }
}
</script>

<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item" v-if="props.user_id">
        <router-link to="/admin"> Admin panel </router-link>
      </li>
      <li class="breadcrumb-item" v-else>
        <router-link to="/"> Articles </router-link>
      </li>
      <li class="breadcrumb-item" v-if="props.user_id">
        <router-link :to="`/admin/${props.user_id}/articles`"
          >@{{ username }} - articles</router-link
        >
      </li>
      <li class="breadcrumb-item" v-else-if="edit">
        <router-link :to="`/article/${props.article_id}`"
          >@{{ username }} - {{ title }}</router-link
        >
      </li>
      <li class="breadcrumb-item active">{{ props.header }}</li>
    </ol>
  </nav>

  <form>
    <div class="mb-3">
      <label for="article_title" class="form-label">Title</label>
      <input
        v-model="title"
        type="text"
        name="article[title]"
        id="article_title"
        class="form-control"
      />
    </div>
    <div class="mb-3">
      <label for="article_body" class="form-label">Body</label>
      <textarea
        v-model="body"
        type="text"
        name="article[body]"
        id="article_body"
        class="form-control"
      />
    </div>
    <div class="mb-3">
      <label for="article_status" class="form-label">Status</label>
      <select
        v-model="status"
        name="article[status]"
        id="article_status"
        class="form-select"
      >
        <option value="public">public</option>
        <option value="private">private</option>
        <option value="archieved">archieved</option>
      </select>
    </div>
    <div class="mb-3">
      <button @click.prevent="action()" class="btn btn-primary">
        {{ value }}
      </button>
    </div>
  </form>
</template>
