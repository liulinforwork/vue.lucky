<template>
    <div class="read_wrap">

        <!--<i v-title data-title="速闻阅读"></i>-->

        <div class="read_title">
            <h1 v-if='openStatus'>今日已阅读：{{validReadCount}}</h1>
            <h1 v-else>速闻阅读活动</h1>
        </div>

        <div class="read_pic">
            <img src="/static/images/read_pic.png" />
        </div>

        <div class="read_text">
            <img src="./../assets/images/read_text.png" />
        </div>

        <div v-if="openStatus">
            <h3 class="time_tl">当前任务完成剩余时间：</h3>
            <span class="time_txt">{{readTime | time }}</span>
            <div class="read_btn">
                <mt-button type="primary" size="large" class="read_btn_off">已参与</mt-button>
            </div>
        </div>
        <div class="read_btn" v-else>
            <mt-button @click.native="openRead" type="primary" size="large">我要参与</mt-button>
        </div>

        <router-link to="/readInfo" class="read_link">
            如何参与速闻阅读活动？>>
        </router-link>
        <div class="rule">
            <h3>
                <span class="rule_tl">规则说明</span>
                <span class="rule_bor"></span>
            </h3>
            <div>
                <p>1.参与活动后，您将立即获得<span class="rule_f13838 read_time">{{readHour}}</span>个小时的被钱砸测试项目打卡资格。</p>
                <p>2.同时，在24小时倒计时任务结束之前，您需要完成阅读<span class="rule_f13838">至少10篇</span>不同的速闻，如未完成，将扣除您<span class="rule_f13838">50</span>的信用分，并冻结马币赎回功能。</p>
                <p>3.新用户需要在奖励的被钱砸测试项目打卡时间结束后才能参与该活动。</p>
                <p>4.请珍惜来之不易的信用分，如果信用分低于<span class="rule_f13838">1</span>分，您将无法使用相关获利系统（无法进行被钱砸、群主广告上线、广告与速闻分享赚马币以及搭火线等活动）。</p>
                <p>5.请保持良好的使用习惯，并遵守马克巴相关规则及规定，如果短时间内惩罚次数过多，将会影响以后的打卡资格以及获利权限。</p>
            </div>
        </div>

        <com-popup v-if="isPopUp"></com-popup>
    </div>
</template>

<script>
    import Vue from 'vue'
    import popup from './../components/popup.vue'
    import { mapState} from 'vuex'
    import { MessageBox, Button } from 'mint-ui';

    Vue.component(Button.name, Button);

    export default{
        data(){
            return{
            }
        },
        created(){
            this.$store.dispatch('readInfo');
        },
        computed:{
            ...mapState({
                /*是否是新用户*/
                readHour(state){
                    return state.read.isNew?24:4;
                },
                openStatus: state => state.read.openStatus,
                validReadCount: state => state.read.validReadCount,
                readTime: state => state.read.readTime,
                code: state => state.read.code,
                isPopUp: state => state.comm.isPopUp
            })
        },
        mounted:function(){
        },
        methods:{
            openRead:function(){
                switch(this.code){
                    case 200:
                        MessageBox.confirm('请认真阅读活动细则，如未完成相关任务，则有一定的惩罚。您确认开通吗？').then(action => {
                            this.$store.dispatch('readOpen');
                        }, () => {
                        });
                        break;
                    case 820:
                        MessageBox('提示', '您尚未完成邀新任务，暂时无法使用该功能');
                        break;
                    case 751:
                        MessageBox('提示', '新注册的用户7天之后可开启该活动');
                        break;
                    default:
                        MessageBox('提示', '当前网络繁忙~');
                        break;
                }
            }
        },
        components:{
            comPopup:popup
        }
    }
</script>

<style lang="scss">
    @import './../../static/css/read.scss';
</style>
