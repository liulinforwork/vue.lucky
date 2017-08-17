<template>
    <div class="rk" :class="{rk_move : hasData || hasGroupData}">
        <mt-navbar v-model="selected">
            <mt-tab-item id="people">个人收益</mt-tab-item>
            <span style="flex:.5"></span>
            <mt-tab-item id="group">群主收益</mt-tab-item>
        </mt-navbar>
        <p class="rk_time">截止：{{own.dateLimit}}</p>
        <div class="rk_wp">
            <div class="rk_own">
                <img class="rk_own_pic" :src="own.headImg+'?imageView2/1/w/60/h/60'">
                <h1 class="rk_own_txt" >{{own.nickName}}</h1>

                <div class="rank_info">
            <span>
                <i class="rank_person_myRank">{{own.myRank}}</i>
                <br>
                排名
            </span>
            <span>
                <i class="rank_person_amount">{{own.amount}}</i>
                <br>
                收益
            </span>
                </div>
            </div>
            <hr>
            <mt-tab-container v-model="selected" :swipeable="true">

                <mt-tab-container-item id="people">
                    <p style="text-align:center;padding-top:2rem" v-if="hasData">当前无数据</p>
                    <ul class="rk_list"
                        v-infinite-scroll="loadMore"
                        infinite-scroll-disabled="loading"
                        infinite-scroll-distance="10">
                        <li v-for="item in peopleData">
                            <span class="rk_rank">{{item.rank}}</span>

            <span class="rk_headImg">
              <img :src="item.headImg+'?imageView2/1/w/60/h/60'">
            </span>
                            <span class="rk_nickName">{{item.nickName}}</span>
                            <span class="rk_amount">{{item.amount}}</span>
                        </li>
                    </ul>

                </mt-tab-container-item>

                <mt-tab-container-item id="group">

                    <p style="text-align:center;padding-top:2rem" v-if="hasGroupData">当前无数据</p>
                    <ul class="rk_list"
                        v-infinite-scroll="loadMoreGroup"
                        infinite-scroll-disabled="loadingGroup"
                        infinite-scroll-distance="10">
                        <li v-for="item in groupData">
                            <span class="rk_rank">{{item.rank}}</span>

            <span class="rk_headImg">
              <img :src="item.headImg+'?imageView2/1/w/60/h/60'">
            </span>
                            <span class="rk_nickName">{{item.nickName}}</span>
                            <span class="rk_amount">{{item.amount}}</span>
                        </li>
                    </ul>
                </mt-tab-container-item>

            </mt-tab-container>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {mapState} from 'vuex'

    export default{
        data(){
            return{
              selected:'people',
              loading:false,
              loadingGroup:false
            }
        },
        computed:{
          ...mapState({
              peopleData:state=>state.rank.peopleData,
              groupData:state=>state.rank.groupData,
              own:state=>state.rank.own,
              hasData:state=>state.rank.hasData,
              hasGroupData:state=>state.rank.hasGroupData
          })
        },
        created(){
        },
        methods:{
          loadMore(){
             this.loadingGroup = true;
             this.$store.dispatch('rankPeople');
          },
          loadMoreGroup(){
              this.loading = true;
              this.$store.dispatch('rankGroup');
          }

        },
        watch:{
          selected:function(newVal,oldVal){
              if(newVal=="people"){
                  this.loadingGroup = true;
                  this.loading = false;
              }
               if(newVal=="group"){
                  this.loading = true;
                  this.loadingGroup = false;
              }

          }
        }
    }
</script>

<style lang="scss">
  @import './../../static/css/rank.scss';
</style>
