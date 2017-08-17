<template>
  <div class="invite_wrap">

    <div class="invite_title">
        <h1 v-if='openStatus'>已邀请人数：{{inviteUserIds}}</h1>
        <h1 v-else>邀请新用户</h1>
    </div>

    <div class="invite_pic">
        <img src="/static/images/invite_pic.png" />
    </div>

    <div class="invite_text">
        <img src="/static/images/invite_text.png" />
    </div>

    <div v-if="openStatus">
        <h3 class="inv_tl">当前任务完成剩余时间</h3>
        <span class="inv_time">{{inviteTime | time}}</span>
        <div class="invite_btn">
            <mt-button @click.native="inviteUser" type="primary" size="large">邀请好友</mt-button>
        </div>
    </div>

    <div class="invite_btn" v-else>
        <mt-button @click.native="openInvite" type="primary" size="large">我要参与</mt-button>
    </div>

    <div class="rule">
        <h3>
            <span class="rule_tl">规则说明</span>
            <span class="rule_bor"></span>
        </h3>
        <div>
            <p>1.参与活动后，您会立刻获得<span class="rule_f13838">24</span>个小时的被钱砸测试项目打卡资格。</p>
            <p>2.在24小时倒计时任务结束之前，您需要邀请<span class="rule_f13838">至少1位</span>未注册使用过【马克巴】的好友下载并登录【马克巴】，若未完成，系统将会扣除您<span class="rule_f13838">50</span>的信用分，并冻结马币赎回功能。</p>
            <p>3.在一轮倒计时结束之前，累计邀请到的好友数越多奖励越丰厚。</p>
            <p>
                <span class="rule_e5b34d">累计邀请到：</span><br/>
                <span class="rule_e5b34d">&nbsp;&nbsp;&nbsp;&nbsp;多于1位好友后，每多邀请1位好友，奖励<span class="rule_f13838">20</span>分信用分。</span>
            </p>
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
    import { mapState } from 'vuex'
    import { MessageBox,Button} from 'mint-ui';

    Vue.component(Button.name, Button);

    export default{
        data(){
            return{
                share:{
                    type: 'act',
                }
            }
        },
        created(){
            this.$store.dispatch('inviteInfo');
        },
        computed:{
            ...mapState({
                openStatus: state => state.invite.openStatus,
                inviteUserIds: state => state.invite.inviteUserIds,
                inviteTime: state => state.invite.inviteTime,
                code: state => state.invite.code,
                isPopUp: state => state.comm.isPopUp
            })
        },
        methods:{
            openInvite:function(){
                switch(this.code){
                    case 200:
                        MessageBox.confirm('请认真阅读活动细则，如未完成相关任务，则有一定的惩罚。您确认开通吗？').then(action => {
                            this.$store.dispatch('inviteOpen');
                        }, () => {
                            /*console.log("取消");*/
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
            },
            inviteUser:function(){
                console.log("点击调用原生分享方法");
                console.log(this.share)
                this.$store.dispatch('inviteUser',this.share);
            }
        },
        components:{
            comPopup:popup
        }
    }
</script>

<style lang="scss">
    @import '../../static/css/_invite.scss';
</style>
