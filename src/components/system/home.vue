<template id="template-home">
    <div class="home-page">
        <section class="left-nav"></section>
        <section class="home-main">
            <nav class="top-nav"></nav>
            <div class="content"></div>
        </section>
    </div>
</template>
<script>
    export default {
        data: function () {
            this.$http.get('/api/test').then(function(rst) {
                console.log(rst);
            })
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
        }
        .home-main {
            width: auto;
            height: 100%;
            margin-left: 150px;
            .top-nav {
                height: 85px;
                background-color: #4778c7;
            }
        }
    }
</style>