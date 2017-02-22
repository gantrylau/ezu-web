<template>
    <div>
        <el-row class="row">
            <el-col>
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                    <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <el-row class="row">
            <el-col :span="12">
                <el-button type="primary" @click="menuDialogVisible=true">添加菜单</el-button>
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
                            <el-button size="small" @click="editMenu(scope.row)">编辑</el-button>
                            <el-button size="small" type="danger" @click="deleteMenu(scope.row)">删除</el-button>
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
        <el-dialog title="提示" ref="menuDialog" v-model="menuDialogVisible" custom-class="menuDialog"
                   @close="onMenuDialogClose">
            <el-form :label-position="right" :rules="menuFormRules" ref="menuForm" :model="menuForm" label-width="90px">
                <el-form-item label="菜单名" prop="name">
                    <el-input v-model="menuForm.name"></el-input>
                </el-form-item>
                <el-form-item label="上级菜单" prop="name">
                    <el-select v-model="value8" filterable placeholder="请选择">
                        <el-option v-for="item in options" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="别名" prop="alias">
                    <el-input v-model="menuForm.alias"></el-input>
                </el-form-item>
                <el-form-item label="权限值" prop="power">
                    <el-input v-model="menuForm.power" type="number"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm('menuForm')">保存</el-button>
                <el-button @click="menuDialogVisible=false">取消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import {mapActions, mapMutations} from 'vuex'
    export default {
        data() {
            return {
                menuForm         : {
                    id   : null,
                    name : null,
                    alias: null,
                    power: 0
                },
                queryParam       : {
                    page: 1,
                    size: 20
                },
                menuFormRules    : {
                    name : [
                        {required: true, message: '角色名不可为空', trigger: 'blur'},
                        {min: 1, max: 50, message: '角色名长度为1-50个字符', trigger: 'blur'}
                    ],
                    alias: [
                        {required: true, message: '别名不可为空'}
                    ]
                },
                menuDialogVisible: false,
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
                        vm.$http.post('/api/sys/menus', vm.menuForm, {
                            loadingText: '正在提交数据，请稍候...',
                            successText: vm.editMode ? '修改角色成功' : '添加角色成功'
                        }).then(function (rsp) {
                            if (rsp.body.success)
                                vm.menuDialogVisible = false;
                            vm.loadData();
                        });
                    } else {
                        return false;
                    }
                });
            },
            onMenuDialogClose  : function () {
                this.resetForm();
            },
            resetForm() {
                this.editMode = false;
                this.menuForm = {
                    id   : null,
                    name : null,
                    alias: null,
                    power: 0
                }
            },
            deleteMenu         : function (menu) {
                let vm = this;
                vm.$http.delete('/api/sys/menus/' + menu.id, {
                    loadingText: '正在删除，请稍候...',
                    successText: '删除成功！'
                }).then(function (rsp) {
                    vm.loadData();
                })
            },
            editMenu           : function (menu) {
                this.editMode = true;

                this.menuForm.id    = menu.id;
                this.menuForm.name  = menu.name;
                this.menuForm.alias = menu.alias;
                this.menuForm.power = menu.power;

                this.menuDialogVisible = true;
            },
            loadData           : function () {
                let vm = this;
                vm.$http.get('/api/sys/menus/list', {params: vm.queryParam}).then(function (rsp) {
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
    .menuDialog {
        width: 500px;
    }

    .el-select .el-input {
        width: 105px;
    }
</style>