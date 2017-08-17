<template>

        <div class="index">
            <!--title-->
            <i v-title data-title="幸运轮"></i>

            <!--swiper-->
            <div class="index_banner" v-if="bannerData.length == 0">
                <router-link :to="{ path: 'rank' , query:query}" class="swiper_img">
                    <img src="/static/images/banner.png" alt="图片加载失败">
                </router-link>
            </div>
            <mt-swipe :auto="5000" class="swiper_wp" v-else>
                <mt-swipe-item>
                    <div class="index_banner">
                        <router-link :to="{ path: 'rank' , query:query}" class="swiper_img">
                            <img src="/static/images/banner.png" alt="图片加载失败">
                        </router-link>
                    </div>
                </mt-swipe-item>
                <mt-swipe-item  v-for='item in bannerData' :key="item.id">
                    <div class="index_banner">
                        <a href="#" class="swiper_img" v-if="item.url==''">
                            <img :src="item.img" alt="图片加载失败">
                        </a>
                        <a :href="item.url+'?pim='+query.pim+'&userId='+query.userId" class="swiper_img" v-else>
                            <img :src="item.img" alt="图片加载失败">
                        </a>
                    </div>
                </mt-swipe-item>
            </mt-swipe>
            <div class="bk_F2F2F2"></div>

            <!--index_box-->
            <ul class="index_box" v-if="showTask">
                <!--fg1-->
                <div class="index_fg1">
                    <span class="al_cut_lt"></span>
                    <img src="./../assets/images/fg1.png" alt="图片加载失败">
                    每月任务
                    <span class="al_cut_rg"></span>
                </div>

                <li>
                    <router-link :to="{ path: 'invTk', query: query}">

                        <img src="/static/images/task_invite.png">
                        <div class="index_pic">
                            <h3>邀新任务</h3>
                            <h3 class='index_picDescription'>邀新任务每个月都需要完成的哟~</h3>
                            <img src="./../assets/images/go.png">
                        </div>
                    </router-link>
                </li>
            </ul>
            <div class="index_fg2" v-if="showTask"></div>

            <!--al_time-->
            <div class="al_time">
                <span class="al_cut_lt"></span>
                <img src="./../assets/images/fg3.png" alt="图片加载失败">

              <span v-if="showTime">
                  活动剩余时间
                  <span class="al_time_show">
                      {{endTime | time}}
                  </span>
              </span>
                <span v-else>活动专区</span>

                <span class="al_cut_rg"></span>
            </div>

            <!--index_container-->
            <p class="al_txt">任意开启一个活动即可获得测试项目打卡资格</p>
            <ul class="index_container">
                <li v-for="item in list" v-if='item.title!=="寻宝" || showTs'>
                    <router-link :to="{ path: item.link, query: query}">
                        <img :src="item.imgUrl" class="index_wp_img">
                        <div class="index_pic">
                            <h3>{{item.title}}</h3>
                            <h3 class='index_picDescription'>{{item.description}}</h3>
                            <img src="./../assets/images/go.png">
                        </div>
                    </router-link>
                </li>
            </ul>

            <!--index_link-->
            <div class="index_link">

                <router-link :to="{ path: 'rank' , query:query}">
                    <img src="./../assets/images/rank@3x.png" alt="图片加载失败">
                </router-link>
            </div>
            <!--<loading v-if="showLoading"></loading>-->
            <!--<router-view></router-view>-->
        </div>

</template>
<script>
    import Vue from 'vue'
    import {mapState} from 'vuex';
    import loading from '../components/common/loading';
    import data from './data.json';
    export default{
        data() {
            return {
                swiperOption: {
                    autoplay: 3000,
                    speed:500,
                    loop : true,
                    pagination  : '.swiper-pagination',
                    paginationType:'bullets',
                },
                dsq:null,
            }
        },
        beforeCreate(){
            //截止时间/banner图
            this.$store.dispatch('indexBanner');
            this.$store.dispatch('indexGetTime');
            //静态数据
            this.list = data.list;
            //路径栏参数
            this.query = this.$route.query;
        },
        computed:{
            ...mapState({
                showTask:state => state.index.showTask,/*是否显示邀新任务*/
                showTime:state => state.index.showTime,/*是否显示时间*/
                endTime:state => state.index.endTime,/*时间*/
                bannerData:state => state.index.bannerData,/*bannerData*/
                showLoading:state => state.comm.showLoading/*showLoading*/
            }),
        },
        mounted(){
            let self = this;
            this.dsq = setInterval(function(){
                 self.$store.dispatch('indexClear');
            }, 1000)
        },
        beforeDestroy () {
            clearInterval(this.dsq);
        },
        components: {
            loading,
        },
  }
</script>
<style lang="scss">
    @import './../../static/css/index.scss';
</style>
