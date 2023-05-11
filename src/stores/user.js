import { defineStore } from "pinia";
import { signOut, loginUser } from "@/api/auth";
// import { useRouter } from "vue-router";




// function apiLogout() {
//   fetch("http://localhost:8000/users/sign_out")
// }

export const useUserStore = defineStore({
  id: "user",

  state: () => ({
    token: (localStorage.getItem("token") || ""),
    isAdmin: (localStorage.getItem("isAdmin") || false),
    email: (localStorage.getItem("email") || ""),
    user_id: (localStorage.getItem("user_id") || -1)
  }),

  actions: {
    saveUser() {
      localStorage.setItem("token", this.token)
      localStorage.setItem("isAdmin", this.isAdmin)
      localStorage.setItem("email", this.email)
      localStorage.setItem("user_id", this.user_id)
    },

    clearUser(){
      localStorage.clear();
    },
    logout() {
      this.$patch({
        token: "",
        isAdmin: false,
        email: "",
        user_id: -1
      });
      signOut();
      this.clearUser()

      this.$router.push("/");
    },

    async login(email, password) {
      const data = await loginUser(email, password)
      // console.log(data);
      if (data == false) {
        return false
      }

      this.$patch({
        email: email,
        isAdmin: data.isAdmin,
        token: data.authentication_token,
        user_id: data.id
      });
      this.saveUser();
      this.$router.push("/");
      return true
    },
  },
});
