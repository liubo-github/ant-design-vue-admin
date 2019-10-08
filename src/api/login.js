import request from '@/utils/request'

export function login(phone, passwd) {
    const data = {
        phone,
        passwd
    }
    return request({
        url: 'apimember/login',
        method: 'post',
        data
    })
}

export function logout() {
    return request({
        url: 'apimember/logout',
        method: 'post'
    })
}

export function getUserInfo(token) {
    const data = {
        token
    }
    return request({
        url: 'apimember/checklogin',
        method: 'post',
        // params: { token }
        data
    })
}

