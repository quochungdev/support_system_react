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
    "delete_article": (articleId) => `${SERVER_CONTEXT}/api/delete_article/${articleId}/`,
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