<script setup>
import { onMounted, onUpdated, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { isAuthorized, isOwner, isAdmin } from "@/api/auth";
import { deleteComment } from "@/api/comments";

const router = useRouter();
const props = defineProps({
  comment: null,
});

const authorized = isAuthorized();
const expanded = ref(true);
const element = ref(null);
const expandButton = ref(true);

function expand() {
  expanded.value = !expanded.value;
  // console.log(element.value.clientHeight);
  // element.value.focus();
}

// watch(element, async (oldHeight, newHeight) => {
//   console.log(oldHeight, newHeight);
// });

onMounted(() => {
  if (element.value.clientHeight < 200) {
    expandButton.value = false;
  }

  expanded.value = false;
});
</script>

<template>
  <div
    ref="element"
    class="card mb-2 comment"
    :class="expanded ? 'expanded' : ''"
  >
    <div class="card-body">
      <div class="d-flex mb-2">
        <h5 class="card-title me-auto">@{{ comment.username }}</h5>
        <div v-if="authorized && (isOwner(comment.user_id) || isAdmin())">
          <button
            @click="
              deleteComment(comment.id, comment.article_id).then(() =>
                $emit('deleted')
              )
            "
            class="btn btn-danger btn-sm"
          >
            Destroy comment
          </button>
        </div>
        <button
          v-if="expandButton"
          @click="expand()"
          class="btn btn-warning btn-sm ms-2"
        >
          <template v-if="expanded">retract</template>
          <template v-else>expand</template>
        </button>
      </div>
      <div class="card-text mb-2">{{ comment.body }}</div>
    </div>
  </div>
</template>

<style>
.comment {
  max-height: 9.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
}

.expanded {
  max-height: fit-content !important;
}
</style>
