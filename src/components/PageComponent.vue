<script setup>
const props = defineProps({
  current_page: 1,
  pages_count: 0,
});

function isLast() {
  return props.current_page == props.pages_count;
}

function isFirst() {
  return props.current_page == 1;
}
</script>

<template>
  <nav v-if="props.pages_count > 1">
    <ul class="pagination">
      <li
        @click="$emit('update')"
        class="page-item"
        :class="isFirst() ? 'disabled' : ''"
      >
        <template v-if="!isFirst()">
          <router-link
            :to="`?page=${parseInt(props.current_page) - 1}`"
            class="page-link"
            >Previous</router-link
          >
        </template>
        <template v-else>
          <span class="page-link">Previous</span>
        </template>
      </li>
      <template v-if="props.pages_count < 10">
        <li
          @click="$emit('update')"
          v-for="i in props.pages_count"
          class="page-item"
        >
          <router-link
            :to="`?page=${i}`"
            class="page-link"
            :class="props.current_page == i ? 'active' : ''"
            >{{ i }}</router-link
          >
        </li>
      </template>
      <template v-else>
        <li @click="$emit('update')" class="page-item">
          <router-link
            :to="`?page=1`"
            class="page-link"
            :class="props.current_page == 1 ? 'active' : ''"
            >1</router-link
          >
        </li>
        <li
          v-if="!isFirst() && !isLast()"
          @click="$emit('update')"
          class="page-item"
        >
          <router-link
            :to="`?page=${props.current_page}`"
            class="page-link active"
            >{{ current_page }}</router-link
          >
        </li>
        <li @click="$emit('update')" class="page-item">
          <router-link
            :to="`?page=${props.pages_count}`"
            class="page-link"
            :class="props.current_page == props.pages_count ? 'active' : ''"
            >{{ pages_count }}</router-link
          >
        </li>
      </template>
      <li
        @click="$emit('update')"
        class="page-item"
        :class="isLast() ? 'disabled' : ''"
      >
        <template v-if="!isLast()">
          <router-link
            :to="`?page=${parseInt(props.current_page) + 1}`"
            class="page-link"
            >Next</router-link
          >
        </template>
        <template v-else>
          <span class="page-link">Next</span>
        </template>
      </li>
    </ul>
  </nav>
</template>
