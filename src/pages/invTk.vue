<template>
  <div class="task_wrap">

      <div class="task_title">
          <h1 v-if='status'>已邀请人数：{{count}}</h1>
          <h1 v-else>邀请新用户</h1>
      </div>

      <div class="task_pic">
          <img src="/static/images/task_pic.png" />
      </div>

      <div class="task_btn">
          <mt-button @click.native="inviteUser" type="primary" size="large">邀请好友</mt-button>
      </div>

      <router-link :to="{ path: 'invTkDts', query: query}" class="task_link">
          邀新详情>>
      </router-link>

      <hr class="border">

      <section>
        <div class="tabs tabs-style-bar">
          <nav>
            <ul>
              <li><a href="#section-bar-1"><span>规则说明</span></a></li>
              <li><a href="#section-bar-2"><span>图文说明</span></a></li>
            </ul>
          </nav>
          <div class="content-wrap">
            <section id="section-bar-1">
              <p>1.马克巴新注册的用户须在规定月份内，成功邀请<span class="rule_f13838">至少1名</span>好友，否则次月不能使用相关获利系统（无法进行被钱砸测试项目打卡、广告与速闻分享赚马币等活动）。</p>
              <p>2.系统会根据相关规则，判断被邀请的用户是否为<span class="rule_f13838">活跃用户</span>，如果被系统判断为非活跃用户，则邀请失败。</p>
              <p>3.如果用户无法使用获利系统，其在当月月底之前成功邀请到<span class="rule_f13838">至少1名</span>好友，将获得当月获利系统权限；其在当月月底之前成功邀请到<span class="rule_f13838">至少2名</span>好友，将获得<span class="rule_f13838">当月和次月</span>获利系统使用权限。</p>
              <p>4.当月注册的新用户，立即获取本月和次月的获利系统使用权限。</p>
              <p>5.用户邀请的人数与获利系统月份数不叠加。</p>
              <p>6.用户每成功邀请一名新用户，奖励信用分<span class="rule_time">20</span>分。</p>
            </section>
            <section id="section-bar-2">
              <div class="cnt">
                <div class="cnt_tl">
                  <img src="/static/images/01.png" alt="图片加载失败">
                </div>
                <div class="cnt_wp">亲爱的马友，欢迎来到马克巴邀新任务，作为马克巴的新用户，院长有几句话要告诉大家。</div>
              </div>
              <div class="cnt cnt_right">
                <div class="comment_wp">是什么呢？别卖关子了，赶紧说吧。</div>
                <div class="comment_tl">
                  <img src="/static/images/02.png" alt="图片加载失败">
                </div>
              </div>
              <div class="cnt cnt_center">
                <div class="cnt_tl">
                  <div class="cnt_tl_num cnt_tl_one"></div>
                </div>
                <div class="cnt_wp">新注册的马友需在注册的第二个自然月起，邀请自己的朋友加入马克巴，否则就不能再玩如被钱砸等一系列获得马币的游戏了。</div>
              </div>
              <div class="cnt cnt_right">
                <div class="comment_wp">如果不邀请，会怎么办呢？</div>
                <div class="comment_tl">
                  <img src="/static/images/04.png" alt="图片加载失败">
                </div>
              </div>
              <div class="cnt cnt_center">
                <div class="cnt_tl">
                  <div class="cnt_tl_num cnt_tl_two"></div>
                </div>
                <div class="cnt_wp">不邀请的话，就不能再玩如被钱砸等一系列获得马币的游戏了。</div>
              </div>
              <div class="cnt cnt_right">
                <div class="comment_wp">如果邀请失败，会怎么样呢？</div>
                <div class="comment_tl">
                  <img src="/static/images/06.png" alt="图片加载失败">
                </div>
              </div>
              <div class="cnt">
                <div class="cnt_tl">
                  <img src="/static/images/07.png" alt="图片加载失败">
                </div>
                <div class="cnt_wp">邀请失败和没邀请是一样的效果。如果想要获得“挣钱”权限，就得重新邀请，直到邀请成功为止。</div>
              </div>
              <div class="cnt cnt_right">
                <div class="comment_wp">为什么邀请了还会失败，那怎么才能算邀请成功呢？</div>
                <div class="comment_tl">
                  <img src="/static/images/08.png" alt="图片加载失败">
                </div>
              </div>
              <div class="cnt">
                <div class="cnt_tl">
                  <img src="/static/images/09.png" alt="图片加载失败">
                </div>
                <div class="cnt_wp">这些被邀请的朋友，必须得成为马克巴的活跃用户（活跃用户意味着在一定时间内，每天都登陆），否则算邀请失败哦！邀请成功失败与否，在邀请详情中可以看到哦！</div>
              </div>
              <div class="cnt">
                <div class="cnt_tl">
                  <img src="/static/images/10.png" alt="图片加载失败">
                </div>
                <div class="cnt_wp">顺便说一句，新用户每个月都有任务哦，如果不及时完成，你懂得……，规劝马友们，还是每个月早早完成任务比较好。</div>
              </div>
              <div class="cnt cnt_right">
                <div class="comment_wp">原来如此啊，那要是多邀请了怎么办呢？</div>
                <div class="comment_tl">
                  <img src="/static/images/11.png" alt="图片加载失败">
                </div>
              </div>
              <div class="cnt">
                <div class="cnt_tl">
                  <img src="/static/images/12.png" alt="图片加载失败">
                </div>
                <div class="cnt_wp">如果马友邀请了很多朋友进来，马克巴会奖励马友们更多的信用分哦，一个人就是20分啊，你的信用等级达到一定程度的话，说不定后期可以在马克巴解锁更多的”新姿势“呢！</div>
              </div>
            </section>
          </div>
        </div>
      </section>

  </div>
</template>

<script>
    import Vue from 'vue'
    import { mapState } from 'vuex'
    import { MessageBox,Button} from 'mint-ui';
    import CBPFWTabs from 'cbpFWTabs';

    Vue.component(Button.name, Button);

    export default{
        data(){
            return{
               share:{
                type: 'task',
              }
            }
        },
        beforeCreate(){
            this.$store.dispatch('invTk');

            //路径栏参数
            this.query = this.$route.query;
        },
        computed:{
            ...mapState({
                count: state => state.invTk.count,
                status(state){
                    return state.invTk.count?1:0
                }
            })
        },
        created(){
        },
        mounted:function(){
            (function() {
              [].slice.call( $( '.tabs' ) ).forEach( function( el ) {
                new CBPFWTabs( el );
              });
            })();
        },
        methods:{
            inviteUser:function(){
              this.$store.dispatch('inviteUser',this.share);
            }
        }
    }
</script>

<style lang="scss">
  @import './../../static/css/task_invite.scss';
</style>
