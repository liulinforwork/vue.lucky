<template>
    <div class="rm_wp">

        <div class="rm_cnt">
            <img src="/static/images/rm-cnt.png" />
        </div>

        <div class="rm_sub">
            <img src="/static/images/rm-punch.png" alt="图片加载失败"/>
        </div>

        <div class="rm_sub">
            <mt-button @click.native="inviteUser" type="primary" size="large">邀请好友</mt-button>
        </div>

        <router-link :to="{ path: 'redeemDts', query: query}" class="rm_lk">
            查看详情>>
        </router-link>

        <div class="rule">
            <h3>
                <span class="rule_tl">规则说明</span>
                <span class="rule_bor"></span>
            </h3>
            <div class="rule_exp">
                <p>1.马币赎回被限制的用户需要成功邀请<span class="rule_f13838">至少1名</span>好友成为马克巴的<span class="rule_f13838">活跃用户</span>，否则马币赎回功能无法使用。</p>
                <p>2.系统会根据相关规则，判断被邀请的用户是否为<span class="rule_f13838">活跃用户</span>，如果被系统判断为活跃用户，用户会收到马克巴发来的消息通知，马币赎回功能即可正常使用；如果被系统判断为<span class="rule_f13838">非活跃用户</span>，马币赎回功能则无法使用。</p>
                <p>3.请保持良好的使用习惯，并遵守马克巴相关规则及规定，如果短时间内惩罚次数过多，将会影响以后的打卡资格以及获利权限。</p>
            </div>
        </div>

    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapState } from 'vuex'
    import { MessageBox,Button} from 'mint-ui';

    Vue.component(Button.name, Button);

    export default{
        data(){
            return{
               share:{
                type: 'redeem',
              }
            }
        },
        beforeCreate(){
            this.$store.dispatch('redeemMd5');

            //路径栏参数
            this.query = this.$route.query;
        },
        computed:{
            ...mapState({
                md5Data: state => state.redeem.md5Data,
                status(state){
                    return state.invTk.count?1:0
                }
            })
        },
        methods:{
            inviteUser:function(){
              this.$store.dispatch('inviteUser',this.share,this.md5Data);
            }
        }
    }
</script>

<style lang="scss">
    @import './../../static/css/redeem.scss';
</style>
