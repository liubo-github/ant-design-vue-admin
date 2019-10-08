<template>
    <div :style="!$route.meta.hiddenHeaderContent ? 'margin: -24px -24px 0px;' : null">
        <page-header v-if="!$route.meta.hiddenHeaderContent" :page-title="pageTitle">
            <div slot="content">
                <a-row type="flex" style="margin: 2px 0 15px;">
                    <a-col :span="14">
                        <h2>{{ pageTitle }}</h2>
                    </a-col>
                    <a-col :offset="6" :span="4">
                        <slot name="action"></slot>
                    </a-col>
                </a-row>
                <a-row type="flex">
                    <slot name="custom"></slot>
                </a-row>
                <a-tabs v-if="tabInfo" :defaultActiveKey="tabInfo.default" @change="handleChangeTab">
                    <a-tab-pane v-for="(item, index) in tabInfo.tabs" :tab="item.label" :key="item.key"></a-tab-pane>
                </a-tabs>
            </div>
        </page-header>
        <div class="content">
            <a-card class="page-header-index-wide">
                <slot :currentTab="currentTab"></slot>
            </a-card>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import PageHeader from './components/PageHeader'

export default {
    name: 'PageLayout',
    components: {
        PageHeader
    },
    props: {
        pageTitle: {
            type: [String, Boolean],
            default: false
        },
        tabInfo: {
            type: [ Object, Boolean ],
            default: false
        }
    },
    data(){
        return {
            currentTab: this.tabInfo ? this.tabInfo.default : '',
        }
    },
    computed: {
        ...mapState({
            multiTab: state => state.app.multiTab
        })
    },
    updated () {
    },
    methods: {
        handleChangeTab(key){
            this.currentTab = key;
        }
    },
}
</script>

<style lang="less" scoped>
.content {
    margin: 24px 24px 0;

}
/deep/ .ant-tabs-bar{
    margin-bottom: 0;
}
</style>
