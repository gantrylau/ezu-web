<template id="template-layout">
    <div class="layout">
        <section class="layout-top-nav">
            <!--<ul class="top-menus">-->
                <!--<li v-for="menu in filterMenus" v-on:click="getChildMenus(menu.id)">-->
                    <!--<router-link v-if="menu.alias" :to="{name:menu.alias}">{{menu.name}}</router-link>-->
                    <!--<a v-else>{{menu.name}}</a>-->
                <!--</li>-->
            <!--</ul>-->
        </section>
        <section class="layout-main">
            <sidebar v-if="leftMenus && leftMenus.length>0" :menus="leftMenus" class="sidebar"></sidebar>
            <div class="content container">
                <router-view></router-view>
            </div>
        </section>
    </div>
</template>
<script>
    import sidebar from './sidebar';
    function formatMenusData(menus, id) {
        let result = [];
        for (let menu of menus) {
            if (menu.pid == id) {
                menu.children = formatMenusData(menus, menu.id);
                result.push(menu);
            }
        }
        return result;
    }
    export default {
        data() {
            return {
                leftMenus    : [],
                currentMenuId: null,
                isMenuShown  : true,
            }
        },
        components  : {
            'sidebar': sidebar
        },
        beforeCreate: function () {
            let that = this;
            this.$http.get('/api/sys/menus').then(function (rsp) {
                that.leftMenus = that.$store.state.menus = formatMenusData(rsp.body.data);
            })
        },
        created     : function () {
        },
        computed    : {
            filterMenus: function () {
                let self = this;
                console.log(this.$router);
                return self.$store.state.menus.filter(function (menu) {
                    return !menu.pid
                })
            }
        },
        mounted     : function () {
        },
        methods     : {
            switchMenu   : function () {
                this.isMenuShown = !this.isMenuShown;
            },
            getChildMenus: function (id) {
                let self = this;
                for (let menu of self.$store.state.menus) {
                    if (menu.id == id)
                        self.leftMenus = menu.children || [];
                }
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="sass">
    .layout {
        min-width: 1190px;
        padding-top: 70px;
        .layout-top-nav {
            height: 70px;
            line-height: 70px;
            background-color: #4778c7;
            position: fixed;
            top: 0;
            width: 100%;
            .top-menus {
                width: 1190px;
                margin: 0 auto;
                li {
                    list-style-type: none;
                    float: left;
                    margin-left: 10px;
                    > a {
                        font-size: 18px;
                        color: black;
                    }
                }
            }
        }
        .layout-main {
            width: 1190px;
            margin: 10px auto;
            position: relative;
            &:after, &:before {
                display: block;
                content: ' ';
                clear: both;
            }
            .sidebar {
                width: 180px;
                float: left;
                background-color: white;
                display: inline-block;
            }
            .content {
                margin-left: 10px;
                float: left;
                background-color: white;
                width: 1000px;
                display: inline-block;
            }
        }
    }
</style>