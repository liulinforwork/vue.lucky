<template>
    <div class="popup">
        <div class="help">
            <div class="help_tl">
                <img src="/static/images/help-bg.png" alt="图片加载失败">
            </div>
            <div class="help_wp">
                <h1>规则说明</h1>
                <p>
                    <span>
                        <img src="./../assets/images/help-spot.png" alt="图片加载失败">
                    </span>
                    新注册的用户，拥有7天的测试项目打卡时间，在此期间，无法参加【速闻阅读】和【邀新赚信用】活动。
                </p>
                <p>
                    <span>
                        <img src="./../assets/images/help-spot.png" alt="图片加载失败">
                    </span>
                    测试项目打卡资格时间不叠加。
                </p>
                <p>
                    <span>
                        <img src="./../assets/images/help-spot.png" alt="图片加载失败">
                    </span>
                    如果用户同时开启多个活动，测试项目打卡的计算时间，按照最晚开启活动的时间计算。
                </p>
            </div>
            <div class="help_cls" @click="clsPopUp">
                <img src="./../assets/images/help-close.png" alt="图片加载失败">
            </div>
        </div>
        <div class="help_mk"></div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
            }
        },
        methods:{
            clsPopUp:function(){
                this.$store.dispatch('clsPopUp');
            }
        }
    }
</script>

<style lang="scss">
    @import "./../../static/css/popup.scss";
</style>
