<template>
    <div v-show="preloader" class="preloader">
        <i class="fad fa-spinner fa-pulse"></i>
    </div>
</template>

<script>
    export default {
        computed: {
            preloader () {
                //return this.$store.state.preloader.loading
                return false;
            }
        }
    }
</script>

<style scoped>
    .preloader{
        text-align: center;
        background: #262626;
        color: #FFF;
        position: absolute;
        z-index: 9999;
        opacity: .4;
        top: 0;
        width: 100%;
        left: 0;
        height: 100%;
    }
    img.preloader{
        width: 274px;
        height: auto;
        max-width: 100%;
        position: relative;
    }
</style>
