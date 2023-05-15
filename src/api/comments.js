import { useUserStore } from "@/stores/user";

export async function getCommentsForArticle(user_id, article_id, page = 1) {
  const user = useUserStore();

  return fetch(
    `http://localhost:8000/admin/users/${user_id}/articles/${article_id}/comments?page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-USER-EMAIL": user.email,
        "X-USER-TOKEN": user.token,
      }
    }
  ).then((res) => {
    return res.json()
  })
}

export async function deleteComment(id, article_id) {
    const user = useUserStore();

    return fetch(
      `http://localhost:8000/articles/${article_id}/comments/${id}`,
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

  export async function postComment(article_id, body, status) {
    const user = useUserStore();

    return fetch(
      "http://localhost:8000/articles/" +
        article_id +
        "/comments",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-USER-EMAIL": user.email,
          "X-USER-TOKEN": user.token,
        },
        body: JSON.stringify({
          comment: {
            body: body,
            status: status,
          },
        }),
      }
    )
  }
