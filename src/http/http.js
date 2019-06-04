import axios from 'axios'
import qs from 'qs';
import {Message} from 'element-ui'

export default function $axios(options) {
    return new Promise((resolve, reject) => {
        const instance = axios.create({
                baseURL: "http://localhost:8081/api",
                timeout: 15 * 1000
            }
        );

        // request 拦截器
        instance.interceptors.request.use(
            config => {
                if (config.method.toLocaleLowerCase() === 'post'
                    || config.method.toLocaleLowerCase() === 'put'
                    || config.method.toLocaleLowerCase() === 'delete') {

                    config.data = qs.stringify(config.data)
                }
                return config
            },
            error => {
                // 请求错误时做些事(接口错误、超时等)
                console.log('request:', error);

                //  1.判断请求超时
                if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
                    console.log('根据你设置的timeout/真的请求超时 判断请求现在超时了，你可以在这里加入超时的处理方案')
                    // return service.request(originalRequest);//例如再重复请求一次
                }
                //  2.需要重定向到错误页面
                // const errorInfo = error.response;
                // console.log(errorInfo)
                // if (errorInfo) {
                //     // error =errorInfo.data//页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
                //     const errorStatus = errorInfo.status; // 404 403 500 ... 等
                //     router.push({
                //         path: `/error/${errorStatus}`
                //     })
                // }
                return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
            }
        );

        // response 拦截器
        instance.interceptors.response.use(
            response => {
                let result;
                // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
                if (response.data == undefined) {
                    result = response.request.responseText
                } else {
                    result = response.data
                }

                if (result.code === 200) {
                    return result;
                }
                // 若不是正确的返回code，就抛出错误
                const err = new Error(result.msg);

                err.data = result;
                err.response = response;

                throw err;
            },
            err => {
                if (err.response.status === 404) {
                    Message.error({message: '走错地方了⊙﹏⊙∥'});
                } else if (err.response.status === 403) {
                    Message.error({message: '权限不足,请联系管理员!'});
                }else {
                    Message.error({message: '未知错误!请联系管理员!'});
                }
                return Promise.reject(err);
            }
        );


        //请求处理
        instance(options)
            .then((res) => {
                resolve(res);
                return false
            })
            .catch((error) => {
                reject(error)
            })
    });

}