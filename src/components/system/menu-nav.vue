<template>
    <ul class="menu-nav lv1">
        <li v-for="l1 in menus">
            <span class="menu-name">{{l1.name}}</span>
            <ul v-if="l1.children && l1.children.length>0" class="lv2">
                <li v-for="l2 in l1.children">{{l2.name}}</li>
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
        li {
            list-style-type: none;
            .menu-name {

            }
            ul.lv2 {

            }
        }
    }
</style>
