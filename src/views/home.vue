<template>
    <div>
        <p>home</p>
        <p>{{name}}</p>
        <button class="btn btn-primary" @click="open()">打开layer</button>
        <!--<vue-layer>-->
            <!--<input v-model="name">-->
        <!--</vue-layer>-->
    </div>
</template>
<script>
    export default {
        data() {
            return {
                name: 'hello',
                layerShow: false
            }
        },
        computed: {
            filterMenus: function () {
                return [];
            }
        },
        methods : {
            test: function () {
                alert(11);
            },
            open: function () {
                this.layerShow = true;
            }
        }
    }
</script>