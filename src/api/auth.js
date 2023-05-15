import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

export async function getUserData(user_id) {
  const user = useUserStore();

  return fetch(`http://127.0.0.1:8000/admin/users/${user_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-USER-EMAIL": user.email,
      "X-USER-TOKEN": user.token,
    }})
  .then((response) => {
    return response.json();
  })
}

export function getUserID() {
    const user = useUserStore();
    return user.user_id;
}

export function isAuthorized() {
    const user = useUserStore();
    // console.log(user.email);
    if (user.email != "") {
        return true;
    }

    return false;
}

export function isAdmin() {
    const user = useUserStore();

    return user.isAdmin == true || user.isAdmin == "true";
}

export function isOwner(id) {
    const user = useUserStore();
    // console.log(user.user_id, id);
    return user.user_id == id;
}

export async function loginUser(email, password) {
    return fetch("http://localhost:8000/users/sign_in", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        user: {
          email: email,
          password: password
        }
      })
    }).then( res => {
      if (res.status == 422) {
        return false;
      }
      return res.json()
    })
  }

export function registerUser(displayname, email, password1, password2) {
    return fetch("http://localhost:8000/users", {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      user: {
        displayname: displayname,
        email: email,
        password: password1,
        password_confirmation: password2
      }
    })
  }).then( res => {
    return res.json()
  })
}

export function signOutUser() {
  const user = useUserStore();
  user.logout()
}

export function signOut() {
  const user = useUserStore();

  fetch("http://localhost:8000/users/sign_out", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-USER-EMAIL": user.email,
      "X-USER-TOKEN": user.token,
    }})
}
