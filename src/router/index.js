import NotFound from "@/views/NotFound.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Articles from "@/views/Articles.vue";
import ArticleView from "@/views/ArticleView.vue";
import EditArticle from "@/views/EditArticle.vue";
import NewArticle from "@/views/NewArticle.vue";
import AdminPanel from "@/views/AdminPanel.vue";
import AdminArticles from "@/views/AdminArticles.vue";
import AdminComments from "@/views/AdminComments.vue";

import { createRouter, createWebHistory } from "vue-router";

const routes = [
    { path: '/:pathMatch(.*)*', name: 'notFound', component: NotFound},
    { path: '/', name: 'home', component: Articles},
    { path: '/article/:id', name: 'articleView', component: ArticleView},
    { path: '/edit-article/:article_id', name: 'editArticle', component: EditArticle},
    { path: '/new-article', name: 'newArticle', component: NewArticle},
    { path: '/login', name: 'login', component: Login},
    { path: '/register', name: 'register', component: Register},
    { path: '/admin', name: "adminPanel", component: AdminPanel},
    { path: '/admin/articles', name: "adminArticles", component: AdminArticles},
    { path: '/admin/:user_id/articles', name: "adminUserArticles", component: AdminArticles},
    { path: '/admin/:user_id/articles/:article_id/admin-edit', name: 'adminEdit', component: EditArticle},
    { path: '/admin/:user_id/articles/:article_id/comments', name: "adminUserArticleComments", component: AdminComments}
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
