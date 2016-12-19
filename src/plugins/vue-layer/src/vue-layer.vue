<template>
    <div :id="layerId" v-show="visible">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'vue-layer',
        data() {
            return {
                visible: false
            }
        },

        mounted : function () {
            let self = this;
            window.layer.open({
                content: $('#' + self.layerId).html()
            })
        },
        computed: {
            layerId: function () {
                return 'layer-dialog-' + parseInt(Math.random() * 10000);
            }
        }
    }
</script>
<style>

</style>