<template id="template-layout">
    <div class="layout">
        <section class="layout-top-nav">

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

    import {mapState, mapActions, mapMutations, mapGetters} from 'vuex'

    import {GET_MENU_TREE} from 'store/modules/menu/getters'
    import {FETCH_MENU} from 'store/modules/menu/actions'

    function formatMenusData(menus, parentAlias) {

        let result = [];
        if (!menus)
            menus = [];
        for (let menu of menus) {
            if (menu.parentAlias === parentAlias || (!menu.parentAlias && !parentAlias)) {
                menu.children = formatMenusData(menus, menu.alias);
                result.push(menu);
            }
        }
        return result;
    }
    export default {
        data() {
            return {
                allMenus     : [],
                currentMenuId: null,
                isMenuShown  : true,
            }
        },
        components  : {
            'sidebar': sidebar
        },
        beforeCreate: function () {
            this.$store.dispatch(FETCH_MENU);
        },
        created     : function () {

        },
        computed    : {
            ...mapGetters({
                leftMenus: GET_MENU_TREE
            })
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
    @import "../common";

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
                padding: 0 15px 30px 15px;
                float: left;
                background-color: white;
                width: 970px;
                display: inline-block;
            }
        }
    }
</style>