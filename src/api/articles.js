import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

export async function getArticles(page = 1) {
    return fetch(`http://localhost:8000?page=${page}`)
    .then((response) => {
      return response.json();
    })
}

export async function getArticlesForUser(user_id, page = 1) {
  const user = useUserStore();

  return fetch(`http://localhost:8000/admin/users/${user_id}/articles?page=${page}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-USER-EMAIL": user.email,
          "X-USER-TOKEN": user.token,
        },
  }).then((res) => {
    return res.json()
  });
}

export async function getArticle(id) {
    const articleResponse = await fetch("http://localhost:8000/articles/" + id);
    const articleData = await articleResponse.json();
    if (articleData.status == 404) {
        // const router = useRouter();
        useRouter().push("/");
        return null;
    }
    let newData = {};
    // console.log(data);
    newData.user_id = articleData.user_id;
    newData.title = articleData.title;
    newData.body = articleData.body;
    newData.status = articleData.status

    newData.username = articleData.username;
    return newData;
}

export async function newArticle(title, body, status) {
    const user = useUserStore();

    return fetch(
      "http://localhost:8000/articles/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-USER-EMAIL": user.email,
          "X-USER-TOKEN": user.token,
        },
        body: JSON.stringify({
          article: {
            title: title,
            body: body,
            status: status,
          },
        }),
      }
    )
  }

  export async function deleteArticle(id) {
    const user = useUserStore();

    return fetch(
      "http://localhost:8000/articles/" + id,
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

  export async function editArticle(id, title, body, status) {
    const user = useUserStore();

    return fetch(
      "http://localhost:8000/articles/" + id,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-USER-EMAIL": user.email,
          "X-USER-TOKEN": user.token,
        },
        body: JSON.stringify({
          article: {
            title: title,
            body: body,
            status: status,
          },
        }),
      }
    )
  }
