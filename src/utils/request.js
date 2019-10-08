import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import { Modal, notification }  from 'ant-design-vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'

// 创建 axios 实例
const service = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL, // api base_url
    timeout: 6000 // 请求超时时间
})

const err = (error) => {
    if (error.response) {
        const data = error.response.data
        const token = Vue.ls.get(ACCESS_TOKEN)
        if (error.response.status === 403) {
            notification.error({
                message: 'Forbidden',
                description: data.message
            })
        }
        if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
            notification.error({
                message: 'Unauthorized',
                description: 'Authorization verification failed'
            })
            if (token) {
                store.dispatch('Logout').then(() => {
                    setTimeout(() => {
                        window.location.reload()
                    }, 1500)
                })
            }
        }
    }
    return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(
    config => {
        const token = Vue.ls.get(ACCESS_TOKEN)
        if (token) {
            config.headers['access_token'] = token
        }
        return config
    }, 
    err
)

// response interceptor
service.interceptors.response.use( 
    response => {
        const res = response.data
        // if (response.config.responseType === 'blob') {
        //     downFile(res, response.config.filename)
        //     return res
        // } else 
        if (res.code !== 1) {
            notification.error({
                message: '请求错误！',
                description: res.msg || res.message || '请求服务器发生错误:(',
            })
            res.data = res.data || {}
            if (res.data.loginoutitme) {
                Modal.confirm({
                    title: '登出',
                    content: '你已被登出，可以取消继续留在该页面，或者重新登录',
                    okText: '确定登出',
                    onOk() {
                        store.dispatch('Logout').then(() => {
                            location.reload() // 为了重新实例化vue-router对象 避免bug
                        })
                    },
                    onCancel() {},
                })
            }
            return Promise.reject(res)
        } else {
            return response.data
        }
    }, 
    error => {
        notification.error({
            message: '请求错误！',
            description: error.message || '请求服务器发生错误:(',
        })
        return Promise.reject(error)
    }
)

export default service

