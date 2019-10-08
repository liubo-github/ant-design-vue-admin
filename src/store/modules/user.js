import Vue from 'vue'
import { login, getUserInfo, logout } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'

const user = {
    state: {
        info: {},

        uid: '', // 用户id === 商家id
        role_id: 2, // 角色id
        user: '',
        status: '',
        code: '',
        token: localStorage.getItem(ACCESS_TOKEN),
        name: '',
        avatar: '',
        introduction: '',
        roles: [],
        setting: {
            articlePlatform: []
        },
        copyright_id: 0,
        memberList: []
    },

    mutations: {
        SET_INFO: (state, info) => {
            state.info = info
        },


        SET_ID: (state, id) => {
            state.uid = id
        },
        SET_ROLEID: (state, role_id) => {
            state.role_id = role_id
        },
        SET_COPYRIGHT: (state, copyright_id) => {
            state.copyright_id = copyright_id
        },
        SET_CODE: (state, code) => {
            state.code = code
        },
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_INTRODUCTION: (state, introduction) => {
            state.introduction = introduction
        },
        SET_SETTING: (state, setting) => {
            state.setting = setting
        },
        SET_STATUS: (state, status) => {
            state.status = status
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_MEMBERLIST: (state, list) => {
            state.memberList = list
        }
    },

    actions: {
        // 登录
        Login({ commit }, { phone, passwd }) {
            return new Promise((resolve, reject) => {
                let response = {
                    data: {
                        access_token: "asdflkj3#/23sdfv2asdf/fdjksdf*sdf@sdf",
                        id: 10019,
                        loc_id: null,
                        login_count: 253,
                        org_id: null,
                        phone: "18811112222",
                        relname: "admin",
                        role_id: 999,
                        roles: ["admin"],
                        status: 1,
                    }
                }
                // login(phone, passwd).then(response => {
                    const result = response.data;
                    let access_token = result.access_token;
                    Vue.ls.set(ACCESS_TOKEN, access_token, 7 * 24 * 60 * 60 * 1000)
                    commit('SET_TOKEN', access_token)
                    resolve(response)
                // }).catch(error => {
                //     reject(error)
                // })
            })
        },

        // 获取用户信息
        GetUserInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                let response = {
                    data: {
                        access_token: "asdflkj3#/23sdfv2asdf/fdjksdf*sdf@sdf",
                        id: 10019,
                        loc_id: null,
                        login_count: 253,
                        org_id: null,
                        phone: "18811112222",
                        relname: "admin",
                        role_id: 999,
                        roles: ["admin"],
                        status: 1,
                    }
                }
                // getUserInfo(state.token).then(response => {
                    if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
                        reject('error')
                    }
                    const data = response.data
                    if (data.role_id === 999) {
                        data.roles = ['admin']
                    }
                    if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
                        commit('SET_ROLES', data.roles)
                    } else {
                        reject('getInfo: roles must be a non-null array !')
                    }
                    commit('SET_ID', data.id)
                    commit('SET_ROLEID', data.role_id)
                    commit('SET_NAME', data.relname)
                    commit('SET_AVATAR', data.icon || 'http://dares.oss-cn-shenzhen.aliyuncs.com/competmp/user_icon.png')
                    commit('SET_INTRODUCTION', data.relname)
                    commit('SET_COPYRIGHT', data.copyright_id)
                    resolve(data)
                // }).catch(error => {
                //     reject(error)
                // })
            })
        },

        // 登出
        Logout({ commit, state }) {
            return new Promise((resolve) => {
                logout(state.token).then(() => {
                    resolve()
                }).catch(() => {
                    resolve()
                }).finally(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_ROLES', [])
                    Vue.ls.remove(ACCESS_TOKEN)
                })
            })
        }

    }
}

export default user
