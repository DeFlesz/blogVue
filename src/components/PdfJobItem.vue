<script setup>
// const base64 = require("base64topdf");
// import base64 from "base64topdf";
import { ref } from "vue";
import { saveAs } from "file-saver";
import { destroyJob } from "@/api/pdfgen";
import { getPDF } from "../api/pdfgen";

const emit = defineEmits(["update"]);

const props = defineProps({
  pdfJobItem: null,
});

const delButton = ref(null);

function download() {
  getPDF(props.pdfJobItem.id).then((data) => {
    console.log(data);
    const title = `${
      props.pdfJobItem.title ? props.pdfJobItem.title : props.pdfJobItem.t
    } - ${props.pdfJobItem.datetime}`;
    saveAs(data, `${title}.pdf`);
    // const base64Str = Buffer.from(data).toString("base64");
    // base64.base64Decode(base64Str, "file.pdf");
  });
}

function deleteThis() {
  delButton.value.disabled = true;
  destroyJob(props.pdfJobItem.id).then(() => {
    emit("update");
  });
}
</script>
<!--
    :class="
            pdfJobItem.status != 'finished'
              ? 'placeholder placeholder-wave'
              : ''
          "
 -->
<template>
  <div
    class="list-group-item d-flex justify-content-end align-items-center gap-3"
    :class="
      pdfJobItem.status != 'finished' ? 'placeholder-wave bg-secondary' : ''
    "
  >
    <div id="item" class="ms-2 me-auto align-self-center">
      <span class="fw-bold" v-if="pdfJobItem.status == 'finished'"
        >{{ pdfJobItem.title ? pdfJobItem.title : pdfJobItem.t }} -
        {{ pdfJobItem.datetime }}</span
      >
      <span style="color: white" v-else>Generating...</span>
      <!-- <div>
        <span>{{ pdfJobItem.status }}</span>
      </div> -->
    </div>
    <button
      v-if="pdfJobItem.status == 'finished'"
      @click="download()"
      class="btn btn-success"
    >
      Download
    </button>
    <button
      ref="delButton"
      v-if="pdfJobItem.status == 'finished'"
      @click="deleteThis()"
      class="btn btn-danger"
    >
      Delete
    </button>
  </div>
</template>

<style scoped>
#item {
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
