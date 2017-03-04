<template>
    <div>

        <p>home</p>
        <p>{{name}}</p>
        <button class="btn btn-primary" @click="open()">打开layer</button>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                name     : 'hello',
                layerShow: false
            }
        },
        created : function () {
        },
        computed: {
            filterMenus: function () {
                return [];
            }
        },
        methods : {
            open: function () {
                this.$http.post('/api/auth/login', {
                    username: 'test1',
                    password: 'E10ADC3949BA59ABBE56E057F20F883E'
                }).then(function (rsp) {
                    console.log(rsp);
                })
            }
        }
    }
</script>