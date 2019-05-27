import axios from './http';

const postHttp = (url, params) => {
    return axios({
        url: url,
        method: 'post',
        params
    })
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
    return postHttp(
        "/getOne",
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
    addSubject
}
