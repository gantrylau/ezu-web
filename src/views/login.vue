<template>
    <div class="login">
        <div class="form">
            <el-row>
                <el-col>
                    <el-form :model="loginForm" ref="loginForm" label-width="100px"
                             class="demo-ruleForm">
                        <el-form-item label="帐号" prop="username">
                            <el-input type="text" v-model="loginForm.username"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input type="password" v-model="loginForm.password"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="login">登录</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                loginForm: {
                    username: 'test1',
                    password: 'E10ADC3949BA59ABBE56E057F20F883E'
                }
            }
        },
        methods: {
            login: function () {
                let vm = this;
                vm.$http.post('/api/auth/login', vm.loginForm).then(function (rsp) {
                    vm.$router.push({name: 'home'})
                })
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="sass">
    .login {
        height: 100%;
        width: 100%;
        .form {
            position: absolute;
            width: 500px;
            height: 400px;
            top: 40%;
            left: 50%;
            margin-top: -200px;
            margin-left: -250px;

        }
    }
</style>