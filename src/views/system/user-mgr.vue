<template>
    <div>
        <el-row class="row">
            <el-col>
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <el-row class="row">
            <el-col :span="12">
                <el-button type="primary" @click="userDialogVisible=true">添加用户</el-button>
            </el-col>
            <el-col :span="9" push="3">
                <el-input placeholder="请输入内容" v-model="queryParam.q" icon="search" :on-icon-click="loadData">
                    <el-select v-model="queryParam.type" slot="prepend" placeholder="请选择">
                        <el-option label="用户名" value="USERNAME"></el-option>
                        <el-option label="电话号码" value="TELEPHONE"></el-option>
                        <el-option label="电子邮箱" value="EMAIL"></el-option>
                    </el-select>
                </el-input>
            </el-col>
        </el-row>
        <el-row class="row">
            <el-col>
                <el-table :data="listData.content" height="500">
                    <el-table-column prop="id" label="ID" width="70"></el-table-column>
                    <el-table-column prop="username" label="用户名" width="200"></el-table-column>
                    <el-table-column prop="telephone" label="手机号码" width="180"></el-table-column>
                    <el-table-column prop="email" label="电子邮箱"></el-table-column>
                    <el-table-column label="操作">
                        <template scope="scope">
                            <el-button size="small" @click="editUser(scope.row)">编辑</el-button>
                            <el-button size="small" type="danger" @click="deleteUser(scope.row)">删除</el-button>
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
        <el-dialog title="提示" ref="userDialog" v-model="userDialogVisible" custom-class="userDialog"
                   @close="onUserDialogClose">
            <el-form :label-position="right" :rules="userFormRules" ref="userForm" :model="userForm" label-width="70px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="userForm.username"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="telephone">
                    <el-input v-model="userForm.telephone"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱" prop="email">
                    <el-input v-model="userForm.email"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-radio-group v-model="userForm.sex">
                        <el-radio label="Man">男</el-radio>
                        <el-radio label="Woman">女</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm('userForm')">保存</el-button>
                <el-button @click="closeUserDialog">取消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                userForm         : {
                    id       : null,
                    username : null,
                    email    : null,
                    telephone: null,
                    sex      : 'Man',
                },
                queryParam       : {
                    type: 'USERNAME',
                    q   : null,
                    page: 1,
                    size: 20
                },
                userDialogVisible: false,
                listData         : {},
                userFormRules    : {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ]
                },
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
                        let params = {
                            method     : vm.editMode ? 'PUT' : 'POST',
                            url        : vm.editMode ? '/api/sys/users/' + vm.userForm.id : '/api/sys/users',
                            loadingText: '正在提交数据，请稍候...',
                            successText: vm.editMode ? '修改用户成功' : '添加用户成功',
                            body       : vm.userForm
                        };
                        vm.$http(params).then(function (rsp) {
                            if (rsp.body.success)
                                vm.closeUserDialog();
                            vm.loadData();
                        });
                    } else {
                        return false;
                    }
                });
            },
            onUserDialogClose  : function () {
                this.resetForm();
            },
            closeUserDialog    : function () {
                this.userDialogVisible = false;
            },
            resetForm() {
                this.editMode = false;
                this.userForm = {
                    id       : null,
                    username : null,
                    email    : null,
                    telephone: null,
                    sex      : 'Man',
                }
            },
            deleteUser         : function (user) {
                let vm = this;
                vm.$http.delete('/api/sys/users/' + user.id).then(function (rsp) {
                    vm.loadData();
                    vm.$message({
                        showClose: true,
                        message  : '删除成功！',
                        type     : 'success'
                    });
                })
            },
            editUser           : function (user) {
                this.editMode = true;

                this.userForm.id        = user.id;
                this.userForm.username  = user.username;
                this.userForm.telephone = user.telephone;
                this.userForm.email     = user.email;
                this.userForm.sex       = user.sex;

                this.userDialogVisible = true;
            },
            loadData           : function () {
                let vm = this;
                vm.$http.get('/api/sys/users', {params: vm.queryParam}).then(function (rsp) {
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
    .userDialog {
        width: 500px;
    }

    .el-select .el-input {
        width: 105px;
    }
</style>