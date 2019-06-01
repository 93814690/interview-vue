import axios from './http';

const http = (url, method, params) => {
    return axios({
        url: url,
        method: method,
        params
    });
};

const postHttp = (url, params) => {
    return http(url, 'post', params);
};

const getHttp = (url, params) => {
    return http(url, 'get', params);
};

export const getAllCategory = params => {
    return postHttp(
        "/cat/getAll",
        params)
};

export const addCategory = params => {
    return postHttp(
        "/cat/add",
        params
    )
};

export const getSubjectByRandom = params => {
    return getHttp(
        "/sub/getOneByRandom",
        params
    )
};

export const getSubjectByCategory = params => {
    return getHttp(
        "/sub/getByCategory",
        params
    )
};

export const addSubject = params => {
    return postHttp(
        "/sub/add",
        params
    );
};

export default{
    getAllCategory,
    addCategory,
    getSubjectByRandom,
    getSubjectByCategory,
    addSubject
}
