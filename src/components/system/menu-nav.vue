<template>
    <ul class="menu-nav lv1">
        <li v-for="l1 in menus">
            <router-link v-if="l1.alias" :to="{name:l1.alias}" class="menu-name">{{l1.name}}</router-link>
            <a v-else class="menu-name">{{l1.name}}</a>
            <ul v-if="l1.children && l1.children.length>0" class="lv2">
                <li v-for="l2 in l1.children">
                    <router-link v-if="l2.alias" :to="{name:l2.alias}" class="menu-name">{{l2.name}}</router-link>
                    <a v-else class="menu-name">{{l2.name}}</a>
                </li>
            </ul>
        </li>
    </ul>
</template>
<script>
    export default {
        props: {
            menus: {
                type: Array,
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="sass">
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
                &.router-link-active {
                    color: white;
                    background-color: #4778c7;
                }
            }
            > ul.lv2 {
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
                            color: white;
                            background-color: #4778c7;
                        }
                    }
                }
            }
        }
    }
</style>
