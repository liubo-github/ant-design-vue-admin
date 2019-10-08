<template>
    <page-layout 
        :pageTitle="'基础表单'"
        :tabInfo="{
            default: 'com1',
            tabs: [
                {
                    label:'基本信息',
                    key: 'com1'
                },
                {
                    label:'助理订单',
                    key: 'com2'
                }
            ]
        }">
        <div slot="action">
            <a-button type="primary" icon="plus">添加</a-button>
        </div>
        <!-- <div slot="custom">
            自定义
        </div> -->
        <template slot-scope="{ currentTab }">
            <keep-alive>
                <component :is="currentTab"></component>
            </keep-alive>
        </template>
    </page-layout>
</template>

<script>
import com1 from './form1'
import com2 from './form2'
export default {
    name: 'BaseForm',
    data () {
        return {
            value: 1,
        }
    },
    components: {
        com1,
        com2
    },
    mounted(){
    },
    methods: {

    }
}
</script>
