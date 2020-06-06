<template>
    <div class="pizzaro-breadcrumb" v-if="pages !== null">
        <nav class="woocommerce-breadcrumb" itemprop="breadcrumb">
            <a href="/">Home</a>
            <span>
                <span v-for="page in JSON.parse( this.pages )">
                    <span class="delimiter"><i class="po po-arrow-right-slider"></i></span>
                    <a :href="`/${page.url}`" :class="page.class">{{page.name}}</a>
                </span>
            </span>
        </nav>
    </div>
</template>

<script>
    export default {
        props: {
            pages:{
                type: String,
                required: false,
                default: null
            }
        }
    }
</script>

<style scoped>
    .actived {
        padding: 0.465em 0.929em;
        background-color: #f5f5f5;
        border-radius: 0.357em;
    }
</style>
