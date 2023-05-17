<script setup>
import { ref } from "vue";
import { updateUser, deleteUser } from "@/api/admin";

const props = defineProps({
  user: null,
});

const emit = defineEmits(["changed"]);

const role = ref(props.user.role);
const delButton = ref(null);

// console.log(props.user.role);

function del() {
  delButton.value.disabled = true;
  deleteUser(props.user.id).then(() => {
    emit("changed");
  });
}

function save() {
  updateUser(props.user.id, role.value).then(() => {
    emit("changed");
  });
}
</script>

<template>
  <div class="list-group-item d-flex flex-row justify-content-between">
    <div class="d-inline-flex flex-column justify-content-between">
      <div class="ms-2">@{{ user.displayname }}</div>
      <div class="mt-2">
        <button
          ref="delButton"
          @click="del()"
          class="btn btn-danger ms-2 btn-sm"
        >
          Destroy user
        </button>
        <button
          @click="$router.push(`/admin/${user.id}/articles`)"
          class="btn btn-primary ms-2 btn-sm"
        >
          Articles
        </button>
      </div>
    </div>
    <form class="row d-inline-flex align-items-end">
      <div class="col-auto">
        <label for="role" class="form-label">Role</label>
        <select
          v-model="role"
          name="role"
          id="role"
          class="form-select form-select-sm"
        >
          <option value="client">client</option>
          <option value="admin">admin</option>
        </select>
      </div>
      <div class="col-auto">
        <button @click.prevent="save()" class="btn btn-primary btn-sm">
          Save
        </button>
      </div>
    </form>
  </div>
</template>
