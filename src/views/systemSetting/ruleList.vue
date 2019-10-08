<template>
    <inner-layout :title="$t('route.ruleList')">
        <template slot="header">
            <router-link :to="'/setting/ruleAdd'">
                <el-button
                    type="success"
                    icon="el-icon-plus">
                    {{ $t('table.add') }}
                </el-button>
            </router-link>
        </template>
        <el-tree
            ref="tree"
            :data="ruleData"
            :props="defaultProps"
            :filter-node-method="filterNode"
            default-expand-all
            class="filter-tree"
            @node-click="bindNodeClick"/>
    </inner-layout>
</template>

<script>
    import { ruleTreeList } from '@/api/setting'
    import { getPageNeedRefresh, setPageNeedRefresh } from '@/utils/util'
    export default {
        name: 'RuleList',
        filters: {
            statusFilter(status) {
                const statusMap = {
                    '1': 'success',
                    '0': 'info'
                }
                return statusMap[status]
            }
        },
        data() {
            return {
                ruleData: [],
                list: null,
                total: 0,
                listLoading: true,
                listQuery: {},
                defaultProps:
                    {
                        children: 'children',
                        label: 'label'
                    }
            }
        },
        activated() {
            // console.log('activated', getPageNeedRefresh('member_list'))
            if (getPageNeedRefresh('rule_list')) {
                this.getruleTreeList()
            }
        },
        created() {
            this.getruleTreeList()
        },
        methods: {
            getruleTreeList() {
                this.listLoading = true
                setPageNeedRefresh('rule_list', 0)
                ruleTreeList(this.listQuery).then(response => {
                    // console.log(response)
                    this.ruleData = response.data.data
                    this.listLoading = false
                })
            },
            filterNode(value, data) {
                if (!value) return true
                return data.label.indexOf(value) !== -1
            },
            bindNodeClick(value) {
                // console.log(value)
                this.$router.push({ path: '/setting/ruleEdit/' + value.id })
            }
        }
    }
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.filter-tree{
  margin-top: 20px;
}
.filter-container .filter-item{
  margin-bottom: 0px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
