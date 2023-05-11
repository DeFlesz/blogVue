import { useUserStore } from "@/stores/user";

export async function getUsers() {
    const user = useUserStore()

    if (!user.isAdmin) {
        return;
    }

    return fetch("http://localhost:8000/admin/users",
    {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-USER-EMAIL": user.email,
          "X-USER-TOKEN": user.token,
        }
    })
    .then((response) => {
      return response.json();
    })
}

export async function deleteUser(user_id) {
    const user = useUserStore();

    if (!user.isAdmin) {
        return;
    }

    return fetch(
      "http://localhost:8000/admin/users/" + user_id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-USER-EMAIL": user.email,
          "X-USER-TOKEN": user.token,
        }
      }
    )
}

export async function updateUser(user_id, role) {
    const user = useUserStore();

    if (!user.isAdmin) {
        return;
    }

    return fetch(
      "http://localhost:8000/admin/users/" + user_id,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-USER-EMAIL": user.email,
          "X-USER-TOKEN": user.token,
        },
        body: JSON.stringify({
          user: {
            role: role
          },
        }),
      }
    )
}
