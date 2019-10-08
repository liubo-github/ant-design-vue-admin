<template>
  <div class="main">
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :form="form"
      @submit="handleSubmit"
    >
      <a-alert
        v-if="isLoginError"
        type="error"
        showIcon
        style="margin-bottom: 24px;"
        :message="errorInfo"
      />
      <a-form-item>
        <a-input
          size="large"
          type="text"
          placeholder="手机号码"
          v-decorator="['phone',{rules: [{ required: true, message: '请输入帐户名或邮箱地址' }], validateTrigger: 'blur'}]">
          <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          size="large"
          type="password"
          autocomplete="false"
          placeholder="密码"
          v-decorator="['passwd',{rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}]">
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
        </a-input>
      </a-form-item>

      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="state.loginBtn"
          :disabled="state.loginBtn"
        >确定</a-button>
      </a-form-item>
      
    </a-form>
  </div>
</template>

<script>
import md5 from 'md5'
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'

export default {
    data() {
        return {
            isLoginError: false,
            errorInfo: '账号或密码错误！',
            form: this.$form.createForm(this),
            state: {
                loginBtn: false,
            }
        }
    },
    created() {
    },
    methods: {
        ...mapActions(['Login', 'Logout']),
        handleSubmit(e) {
            e.preventDefault()
            const {
                form: { validateFields },
                state,
                Login
            } = this


            const validateFieldsKey =  ['phone', 'passwd'] ;

            validateFields(validateFieldsKey, { force: true }, (err, values) => {
                if (!err) {
                    state.loginBtn = true
                    const loginParams = { ...values }
                    Login(loginParams).then(res => {
                        this.loginSuccess(res)
                    }).catch(err => {
                        this.isLoginError = true;
                        this.errorInfo = err.msg || '账号或密码错误！';
                    }).finally(() => {
                        state.loginBtn = false
                    })
                } else {
                    setTimeout(() => {
                        state.loginBtn = false
                    }, 600)
                }
            })
        },
        loginSuccess(res) {
            let { data } = res;
            this.$router.push({ name: 'dashboard' })
            // 延迟 800ms 显示欢迎信息
            setTimeout(() => {
                this.$notification.success({
                    message: '欢迎' + data.relname,
                    description: `${timeFix()}，欢迎回来`
                })
            }, 800)
            this.isLoginError = false
        },
    }
}
</script>

<style lang="less" scoped>
.user-layout-login {
  margin-top: 50px;
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
