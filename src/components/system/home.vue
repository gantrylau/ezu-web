<template id="template-home" xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="home-page">
        <section class="home-top-nav">
            <ul class="top-menus">
                <li v-for="menu in filterMenus" v-on:click="getChildMenus(menu.id)">{{menu.name}}</li>
            </ul>
        </section>
        <section class="home-main">
            <div class="left-menus">
                <menu-nav :menus="leftMenus"></menu-nav>
            </div>
            <div class="content">

            </div>
        </section>
    </div>
</template>
<script>
    import MenuNav from './menu-nav';
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
            'menu-nav': MenuNav
        },
        beforeCreate: function () {
            let that = this;
            this.$http.get('/api/sys/menus').then(function (rsp) {
                that.$store.state.menus = formatMenusData(rsp.body.data);
                that.menus              = rsp.body.data;
            })
        },
        computed    : {
            filterMenus: function () {
                let self = this;
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
    .home-page {
        min-width: 1190px;
        height: 100%;
        padding-top: 80px;
        .home-top-nav {
            height: 80px;
            line-height: 80px;
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
                }
            }
        }
        .home-main {
            width: 1190px;
            margin: 0 auto;
            .content {

            }
        }
    }
</style>