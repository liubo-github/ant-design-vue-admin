<template>
    <a-locale-provider :locale="locale">
        <div id="app">
            <router-view />
        </div>
    </a-locale-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { AppDeviceEnquire } from '@/utils/mixin'

export default {
    mixins: [AppDeviceEnquire],
    data() {
        return {
            locale: zhCN
        }
    },
    mounted() {
        console.log(process.env.NODE_ENV)
    }
}
</script>
<style>
#app {
    height: 100%;
}
</style>
