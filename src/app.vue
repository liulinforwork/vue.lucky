<template>
    <div>
        <!--<div class="el-header">-->
            <!--这是头部-->
        <!--</div>-->
        <div class="el-content">
            <!--<transition name="router-fade" mode="out-in">-->
                <router-view></router-view>
            <!--</transition>-->
        </div>
        <!--<div class="el-footer">-->
            <!--这是底部-->
        <!--</div>-->
    </div>
</template>

<script>
    export default{
    }
</script>

<style lang="scss">
    /*@import "./style/common";*/
    /*.el-header{*/
        /*width:100%;*/
        /*min-height:50px;*/
        /*background-color:blue;*/
        /*position:fixed;*/
        /*z-index: 9999;*/
        /*text-align: center;*/
        /*line-height: 50px;*/
    /*}*/
    /*.el-footer{*/
        /*width:100%;*/
        /*min-height:50px;*/
        /*background-color:orange;*/
        /*position:fixed;*/
        /*z-index: 9999;*/
        /*bottom: 0;*/
        /*text-align: center;*/
        /*line-height: 50px;*/
    /*}*/
    /*.router-fade-enter-active, .router-fade-leave-active {*/
        /*transition: opacity .3s;*/
    /*}*/
    /*.router-fade-enter, .router-fade-leave-active {*/
        /*opacity: 0;*/
    /*}*/
</style>
