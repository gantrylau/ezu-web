<template>
    <div>
        <el-row>
            <el-col>
                <el-menu :default-active="$route.name" class="el-menu-vertical-demo" @select="toRouter">
                    <template v-for="l1 in menus">
                        <el-submenu v-if="l1.children && l1.children.length>0" :index="l1.id">
                            <template slot="title"><i class="el-icon-message"></i>{{l1.name}}</template>
                            <el-menu-item v-for="l2 in l1.children" :index="l2.alias">{{l2.name}}</el-menu-item>
                        </el-submenu>
                        <el-menu-item v-else :index="l1.alias"><i class="el-icon-menu"></i>{{l1.name}}</el-menu-item>
                    </template>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'

    function eachRouter(routes) {
        let names = [];
        for (let route of routes) {
            if (route.name)
                names.push(route.name);
            if (!$.utils.isBlank(route.children)) {
                names = names.concat(eachRouter(route.children));
            }
        }
        return names;
    }

    export default {
        props   : {
            menus: {
                type: Array,
            }
        },
        computed: {
            routerNames: function () {
                return eachRouter(this.$router.options.routes);
            }
        },
        methods : {
            toRouter: function (name) {
                if (this.routerNames.indexOf(name) >= 0)
                    this.$router.push({name: name});
            },
            toggle  : function (menu) {
                if (menu.children && menu.children.length > 0)
                    this.$set(menu, '_open', !menu._open);
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="sass" scope>
    ul.menu-nav.lv1 {
        width: 100%;
        border: 1px solid #eeeeee;
        padding: 0;
        margin: 0;
        > li {
            padding: 0;
            text-align: center;
            list-style-type: none;
            border-bottom: 1px solid #eeeeee;
            cursor: pointer;
            > a.menu-name {
                color: black;
                text-decoration: none;
                display: block;
                height: 45px;
                line-height: 45px;
                font-size: 18px;
                position: relative;
                i.fa {
                    position: absolute;
                    right: 10px;
                    top: 50%;
                    margin-top: -9px;
                }
                &.router-link-active {
                    color: white;
                    background-color: #4778c7;
                }
            }
            > ul.lv2 {
                display: none;
            }
            &.active {
                > ul.lv2 {
                    display: block;
                    padding: 0;
                    > li {
                        list-style-type: none;

                        > a.menu-name {
                            color: black;
                            text-decoration: none;
                            display: block;
                            font-size: 14px;
                            line-height: 30px;
                            height: 30px;
                            &.router-link-active {
                                color: #4778c7;
                                /*background-color: #4778c7;*/
                            }
                        }
                    }
                }
            }
        }
    }
</style>
