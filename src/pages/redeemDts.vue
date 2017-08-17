<template>
    <div>
        <div v-if="hasData">
            <div class="itd_now" v-if="hasNowData">
                <h1 class="itd_now_tl">当月邀请明细</h1>
                <ul class="itd_now_wp">
                    <li v-for="item in nowData" class="m_inviteDetails_com">
                        <div>
                            <h3 class="m_inviteDetails_h3"><span class="m_inviteDetails_num1">{{item.nickName}}</span></h3>
                            <h3 class="m_inviteDetails_h3 m_inviteDetails_h3right">
                                <span class="m_inviteDetails_num2" v-bind:class="{ 'm_inviteDetails_bule': item.status == '2', 'm_inviteDetails_red': item.status == '3', 'm_inviteDetails_bl': !item.status == '1'  }">
                                    {{item.status | tkDts}}
                                </span>
                            </h3>
                        </div>

                        <div>
                            <h3 class="m_inviteDetails_h3 m_inviteDetails_text">电话:<span class="m_inviteDetails_num2">{{item.phone}}</span></h3>
                            <h3 class="_inviteDetails_h3 m_inviteDetails_text m_inviteDetails_h3right">注册时间:<span class="m_inviteDetails_num2">{{item.createTime | getData}}</span></h3>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div v-else class="m_inviteDetails_noct">
            <img src="/static/images/no-cnt.png" alt="图片加载失败">
            <h1>暂无更多数据哦~</h1>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapState } from 'vuex'
    export default{
        data(){
            return{

            }
        },
        computed:{
            ...mapState({
                hasData: state => state.redeem.hasData,
                hasNowData: state => state.redeem.hasNowData,
                nowData: state => state.redeem.nowData
            })
        },
        created(){
            this.$store.dispatch('redeemDts');
        }
    }
</script>

<style lang="scss">
    @import '../../static/css/invDts.scss';
</style>
