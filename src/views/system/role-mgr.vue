<template>
    <div>
        <el-row class="row">
            <el-col>
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                    <el-breadcrumb-item>角色管理</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <el-row class="row">
            <el-col :span="12">
                <el-button type="primary" @click="roleDialogVisible=true">添加角色</el-button>
            </el-col>
        </el-row>
        <el-row class="row">
            <el-col>
                <el-table :data="listData.content" height="500">
                    <el-table-column prop="name" label="角色名" width="200"></el-table-column>
                    <el-table-column prop="alias" label="别名" width="180"></el-table-column>
                    <el-table-column prop="power" label="权限值"></el-table-column>
                    <el-table-column label="操作">
                        <template scope="scope">
                            <el-button size="small" @click="editRole(scope.row)">编辑</el-button>
                            <el-button size="small" type="danger" @click="deleteRole(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row class="row">
            <el-col>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="listData.page"
                        :page-sizes="[20, 50, 100, 200]"
                        :page-size="listData.size"
                        layout="prev, pager, next, total, sizes, jumper"
                        :total="listData.totalElements">
                </el-pagination>
            </el-col>
        </el-row>
        <el-dialog title="提示" ref="roleDialog" v-model="roleDialogVisible" custom-class="roleDialog"
                   @close="onRoleDialogClose">
            <el-form :label-position="right" :rules="roleFormRules" ref="roleForm" :model="roleForm" label-width="70px">
                <el-form-item label="角色名" prop="name">
                    <el-input v-model="roleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="别名" prop="alias">
                    <el-input v-model="roleForm.alias"></el-input>
                </el-form-item>
                <el-form-item label="权限值" prop="power">
                    <el-input v-model="roleForm.power" type="number"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm('roleForm')">保存</el-button>
                <el-button @click="roleDialogVisible=false">取消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                roleForm         : {
                    id   : null,
                    name : null,
                    alias: null,
                    power: 0
                },
                queryParam       : {
                    page: 1,
                    size: 20
                },
                roleFormRules    : {
                    name : [
                        {required: true, message: '角色名不可为空', trigger: 'blur'},
                        {min: 1, max: 50, message: '角色名长度为1-50个字符', trigger: 'blur'}
                    ],
                    alias: [
                        {required: true, message: '别名不可为空'}
                    ]
                },
                roleDialogVisible: false,
                listData         : {},
                editMode         : false
            }
        },
        mounted : function () {
            this.loadData();
        },
        methods : {
            submitForm         : function (formName) {
                let vm = this;
                vm.$refs[formName].validate((valid) => {
                    if (valid) {
                        vm.$http.post('/api/sys/roles', vm.roleForm, {
                            loadingText: '正在提交数据，请稍候...',
                            successText: vm.editMode ? '修改角色成功' : '添加角色成功'
                        }).then(function (rsp) {
                            if (rsp.body.success)
                                vm.roleDialogVisible = false;
                            vm.loadData();
                        });
                    } else {
                        return false;
                    }
                });
            },
            onRoleDialogClose  : function () {
                this.resetForm();
            },
            resetForm() {
                this.editMode = false;
                this.roleForm = {
                    id   : null,
                    name : null,
                    alias: null,
                    power: 0
                }
            },
            deleteRole         : function (role) {
                let vm = this;
                vm.$http.delete('/api/sys/roles/' + role.id, {loadingText:'正在删除，请稍候...', successText:'删除成功！'}).then(function (rsp) {
                    vm.loadData();
                })
            },
            editRole           : function (role) {
                this.editMode = true;

                this.roleForm.id    = role.id;
                this.roleForm.name  = role.name;
                this.roleForm.alias = role.alias;
                this.roleForm.power = role.power;

                this.roleDialogVisible = true;
            },
            loadData           : function () {
                let vm = this;
                vm.$http.get('/api/sys/roles', {params: vm.queryParam}).then(function (rsp) {
                    vm.listData = rsp.data.data;
                });
            },
            handleSizeChange   : function (val) {
                this.queryParam.size = val;
                this.loadData();
            },
            handleCurrentChange: function (val) {
                this.queryParam.page = val;
                this.loadData();
            }
        },
        computed: {}

    }
</script>
<style rel="stylesheet/scss" lang="sass">
    .roleDialog {
        width: 500px;
    }

    .el-select .el-input {
        width: 105px;
    }
</style>