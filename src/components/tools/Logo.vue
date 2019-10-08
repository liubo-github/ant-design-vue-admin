<template>
  <div class="logo">
    <router-link :to="{name:'dashboard'}">
      <!-- <LogoSvg alt="logo" /> -->
      <img 
        class="logo-img"
        :style="sidebar ? 'width:70%;' : 'width: 85%;'"
        :src="Logo1" alt />
      <!-- <h1 v-if="showTitle">{{ title }}</h1> -->
    </router-link>
  </div>
</template>

<script>
// import LogoSvg from '@/assets/logo.svg?inline'
import Logo1 from '@/assets/logo.png'

import { mapState } from 'vuex'

export default {
    name: 'Logo',
    // components: {
    //     LogoSvg
    // },
    props: {
        title: {
            type: String,
            default: 'Ant Design Pro',
            required: false
        },
        showTitle: {
            type: Boolean,
            default: true,
            required: false
        }
    },
    computed:{
        ...mapState({
            sidebar: state => state.app.sidebar
        })
    },
    created(){
        // console.log(this.$store.state.app)
    },
    watch: {
        sidebar(val){
            console.log(val)
        }
    },
    data(){
        return {
            Logo1,
        }
    }
}
</script>

<style lang="less" scoped>
.logo-img{
    // width: 70% !important;
    height: auto !important;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
}
</style>
