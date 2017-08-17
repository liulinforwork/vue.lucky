<template>
  <div class="fire_wrap">

    <div class="fire_title">
        <h1>搭火线活动</h1>
    </div>

    <div class="fire_pic">
        <img src="/static/images/fire_pic.png" />
    </div>

    <div class="fire_text">
        <img src="./../assets/images/read_text.png" />
    </div>

    <div class="rule">
        <h3>
            <span class="rule_tl">规则说明</span>
            <span class="rule_bor"></span>
        </h3>
        <div>
            <p>1.成功参与【搭火线】中任意一活动，即可立即获得<span class="rule_f13838 fl_time">{{fireTime}}</span>个小时的被钱砸测试项目打卡资格。</p>
            <p>2.如果用户同时开启多个活动，测试项目打卡的计算时间，按照最晚开启活动的时间计算。</p>
            <p>3.测试项目打卡资格时间不叠加。</p>
            <p>4.新注册的用户，拥有<span class="rule_f13838">7</span>天的测试项目打卡时间，在此期间，无法参加【邀新赚信用】以及【速闻阅读】等活动。</p>
            <p>5.如果开启的【搭火线】活动没有完成，则会扣除您<span class="rule_f13838">50</span>分信用分，并冻结马币赎回功能。</p>
            <p>6.请保持良好的使用习惯，并遵守马克巴相关规则及规定，如果短时间内惩罚次数过多，将会影响以后的打卡资格以及获利权限。</p>
        </div>
    </div>

      <com-popup v-if="isPopUp"></com-popup>
  </div>
</template>

<script>
    import Vue from 'vue';
    import {mapState} from 'vuex';
    import popup from './../components/popup.vue'

    export default{
        data(){
            return{
            }
        },
        created(){
            this.$store.dispatch('fireNew');
        },
        computed:{
            ... mapState({
                /*是否是新用户*/
                fireTime(state){
                    return state.fire.isNew?24:4;
                },
                isPopUp: state => state.comm.isPopUp
            })
        },
        components:{
            comPopup:popup
        }
    }
</script>

<style lang="scss">
    @import './../../static/css/fire.scss';
</style>
