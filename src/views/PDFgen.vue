<script setup>
import { createConsumer } from "@rails/actioncable";
import { ref, reactive } from "vue";
import PdfJobItem from "@/components/PdfJobItem.vue";
import { useRoute, useRouter } from "vue-router";
import PageComponent from "@/components/PageComponent.vue";
import {
  getAllJobs,
  genArticlePDF,
  genArticlesPDF,
  genUsersPDF,
} from "@/api/pdfgen";
import { isAdmin } from "@/api/auth";

const selected = ref("article");
const article = ref(1);
const route = useRoute();
const router = useRouter();
const state = reactive({ pdfJobItems: [], pages_count: 0, current_page: 1 });

if (!isAdmin()) {
  router.push("/");
}

// const pdfGenWebSocket = new WebSocket("ws://localhost:8000/cable");
// pdfGenWebSocket.onopen = (event) => {
//   const subscribeMsg = {
//     command: "subscribe",
//     identifier: JSON.stringify({ channel: "PdfGenChannel" }),
//   };
//   pdfGenWebSocket.send(JSON.stringify(subscribeMsg));
// };

// pdfGenWebSocket.addEventListener("message", (event) => {
//   console.log(event.data);
// });

function readData() {
  if (route.query.page) {
    state.current_page = route.query.page;
  }

  getAllJobs(state.current_page).then((data) => {
    state.pdfJobItems = data.pdf_job_items;
    state.pages_count = data.pages_count;
  });
}

readData();

function generate() {
  switch (selected.value) {
    case "article":
      genArticlePDF(article.value);
      break;
    case "articles":
      genArticlesPDF();
      break;
    case "users":
      genUsersPDF();
      break;
    default:
      console.log("what have you done?");
      break;
  }
}

const consumer = createConsumer("ws://localhost:8000/cable");
consumer.subscriptions.create(
  { channel: "PdfGenChannel" },
  {
    received(data) {
      //   console.log(data);
      readData();
    },
  }
);
</script>

<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <router-link to="/admin"> Admin panel </router-link>
      </li>
      <li class="breadcrumb-item active">PDF generation</li>
    </ol>
  </nav>
  <!--
    TODO
    [] article gen
    [] articles gen
    [] users gen
   -->

  <select v-model="selected" class="form-select from-select-lg mb-3">
    <option value="article">Article summary</option>
    <option value="articles">Articles list</option>
    <option value="users">Users list</option>
  </select>
  <button @click="generate()" class="btn btn-primary mb-3">
    Generate {{ selected }} pdf
  </button>

  <p v-if="selected == 'article'">
    Choose your article
    <input v-model="article" type="number" min="1" class="form-control" />
  </p>

  <hr />
  <h5>Queue</h5>

  <template v-if="state.pdfJobItems.length < 1">No jobs queued...</template>
  <ul class="list-group mb-3">
    <PdfJobItem
      v-for="pdfJobItem in state.pdfJobItems"
      :key="pdfJobItem.id"
      :pdf-job-item="pdfJobItem"
      @update="readData()"
    />
  </ul>

  <PageComponent
    :current_page="state.current_page"
    :pages_count="state.pages_count"
    @update="readData()"
  />
</template>
