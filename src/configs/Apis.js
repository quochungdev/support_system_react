import axios from "axios";
import cookie from "react-cookies";


const SERVER_CONTEXT = "/support_system";
const SERVER = "http://localhost:8080";

export const endpoints = {
    "banners_homepage":  `${SERVER_CONTEXT}/api/banners_homepage/`,
    "login": `${SERVER_CONTEXT}/api/login/`,
    "register": `${SERVER_CONTEXT}/api/register/`,
    "current-user": `${SERVER_CONTEXT}/api/current-user/`,

    "faculties": `${SERVER_CONTEXT}/api/faculties/`,
    "create_faculty": `${SERVER_CONTEXT}/api/create_faculty/`,
    "update_faculty": `${SERVER_CONTEXT}/api/create_faculty/`,
    "delete_faculty": (facultyId) => `${SERVER_CONTEXT}/api/delete_faculty/${facultyId}/`,
    
    "categories": `${SERVER_CONTEXT}/api/categories/`,
    "create_category": `${SERVER_CONTEXT}/api/create_category/`,
    "update_category": `${SERVER_CONTEXT}/api/create_category/`,
    "delete_category": (categoryId) => `${SERVER_CONTEXT}/api/delete_category/${categoryId}/`,

    "articles": `${SERVER_CONTEXT}/api/articles/`,
    "create_article": `${SERVER_CONTEXT}/api/create_article/`,
    "update_article": `${SERVER_CONTEXT}/api/create_article/`,
    "delete_article": (articleId) => `${SERVER_CONTEXT}/api/delete_article/${articleId}/`,

    "comments": (articleId) => `${SERVER_CONTEXT}/api/comments/article/${articleId}/`,
    "create_comment": (articleId) => `${SERVER_CONTEXT}/api/view_article/${articleId}/comment_article/`,
    "delete_comment": (articleId) => `${SERVER_CONTEXT}/api/delete_comment/${articleId}/`,

    "majors": `${SERVER_CONTEXT}/api/majors/`,
    "create_major": `${SERVER_CONTEXT}/api/create_major/`,
    "update_major": `${SERVER_CONTEXT}/api/create_major/`,
    "delete_major": (majorId) => `${SERVER_CONTEXT}/api/delete_major/${majorId}/`,

    "scores": `${SERVER_CONTEXT}/api/scores/`,
    "create_score": `${SERVER_CONTEXT}/api/create_score/`,
    "update_score": `${SERVER_CONTEXT}/api/create_score/`,
    "delete_score": (majorId) => `${SERVER_CONTEXT}/api/delete_score/${majorId}/`,

    "livestreams": `${SERVER_CONTEXT}/api/livestreams/`,
    "create_livestream": `${SERVER_CONTEXT}/api/create_livestream/`,
    "update_livestream": `${SERVER_CONTEXT}/api/create_livestream/`,
    "delete_livestream": (majorId) => `${SERVER_CONTEXT}/api/delete_livestream/${majorId}/`,

    "questions": (liveId) => `${SERVER_CONTEXT}/api/questions/livestream/${liveId}/`,
    "send_question": `${SERVER_CONTEXT}/api/questions/send_question/`,

}

export const authApi = () => {
    return axios.create({
        baseURL: SERVER,
        headers: {
            "Authorization": cookie.load("token"),
        }
    })
}

export default axios.create({
    baseURL: SERVER
})