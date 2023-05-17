import { useUserStore } from "@/stores/user";

export async function getPDF(job_id) {
    const user = useUserStore();
    return fetch(`http://localhost:8000/pdf/pdf_job_items/${job_id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/pdf",
            "X-USER-EMAIL": user.email,
            "X-USER-TOKEN": user.token,
        }
    })
    .then((res) => {
        return res.blob();
    })
}

export async function getAllJobs(page = 1) {
    const user = useUserStore();
    return fetch(`http://localhost:8000/pdf/pdf_job_items?page=${page}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-USER-EMAIL": user.email,
            "X-USER-TOKEN": user.token,
        }
    })
    .then((res) => {
        return res.json();
    })
}

export async function destroyJob(id) {
    const user = useUserStore();
    return fetch(`http://localhost:8000/pdf/pdf_job_items/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "X-USER-EMAIL": user.email,
            "X-USER-TOKEN": user.token,
        }
    })
    .then((res) => {
        return res.json();
    })
}

export async function genArticlePDF(article_id) {
    const user = useUserStore();

    return fetch(
    `http://localhost:8000/pdf/articles/${article_id}`,
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-USER-EMAIL": user.email,
            "X-USER-TOKEN": user.token,
        }
    }
  )
}

export async function genArticlesPDF() {
    const user = useUserStore();

    return fetch(
    `http://localhost:8000/pdf/articles`,
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-USER-EMAIL": user.email,
            "X-USER-TOKEN": user.token,
        }
    }
  )
}

export async function genUsersPDF() {
    const user = useUserStore();

    return fetch(
    `http://localhost:8000/pdf/users`,
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-USER-EMAIL": user.email,
            "X-USER-TOKEN": user.token,
        }
    }
  )
}
