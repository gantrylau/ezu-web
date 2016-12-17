<template>
    <div>
        home<br/>
        <button class="btn btn-primary" @click="open()">打开layer</button>
    </div>
</template>
<script>
    export default {
        methods: {
            open : function() {
                this.$layer.open();
            }
        }
    }
</script>