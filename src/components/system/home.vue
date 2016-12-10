<template id="template-home">
    <div class="home-page">
        <section class="left-nav" v-if="isMenuShown">
            <ul class="menus-list">
                <li v-for="menu in menus">{{menu.name}}</li>
            </ul>
        </section>
        <section class="home-main" v-bind:class="{ml-0:isMenuShown}">
            <nav class="top-nav">
                <span class="menu-switcher glyphicon glyphicon-align-justify" v-on:click="switchMenu()"></span>
            </nav>
            <div class="content"></div>
        </section>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                isMenuShown: true,
                menus      : []
            }
        },
        mounted: function () {
            let that = this;
            this.$http.get('/api/sys/menus').then(function (rsp) {
                that.menus = rsp.body.data;
            })
        },
        methods: {
            switchMenu: function () {
                this.isMenuShown = !this.isMenuShown;
            },
            getMenus  : function () {

            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="sass">
    .home-page {
        height: 100%;
        .left-nav {
            height: 100%;
            width: 150px;
            float: left;
            background-color: #1b2737;
            .menus-list {
                padding: 0;
                margin: 0;
                width: 100%;
                list-style-type: none;
                color: #707883;
                li {
                    font-size: 20px;
                    text-align: center;
                    height: 68px;
                    line-height: 68px;
                    border-bottom: 2px solid #172331;
                }
            }
        }
        .home-main {
            width: auto;
            height: 100%;
            margin-left: 150px;
            &.ml-0 {
                margin-left: 0;
            }
            .top-nav {
                height: 85px;
                line-height: 85px;
                background-color: #4778c7;
                .menu-switcher {
                    margin-left: 20px;
                    height: auto;
                    display: inline-block;
                    color: white;
                    font-size: 24px;
                    text-align: center;
                }
            }
        }
    }
</style>