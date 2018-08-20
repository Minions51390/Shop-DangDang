<template>
  <div class="wrapper">
    <div class="logo_line_out">
      <div class="logo_line">
        <div class="logo">
          <img @click="jumpTo('/home')" src="http://img53.ddimg.cn/9002830041660173.jpg">
        </div>
        <div class="search">
          <input type="text" class="text gray" name="key" id="key_S" autocomplete="off" v-model="search">
          <input type="button" class="button" @click="goToSearch('/searchItem', search)">
        </div>
        <div id="suggest_key" class="suggest_key"></div>
        <div class="logReg">
          <div v-if="!ifUser" class="cw-logReg">
            <a @click="toLogin()">登陆</a>
            <a @click="jumpTo('/register')">注册</a>
          </div>
          <div v-if="ifUser" class="cw-logReg">
            <a @click="logOut()">退出登录</a>
          </div>
        </div>
        <div @click="jumpTo('/bookCar')" class="ddnew_cart">
          <a name="购物车">
            <i class="icon_card"></i>
            购物车
            <b id="cart_items_count">{{goodsCount}}</b>
          </a>
        </div>
        <div class="ddnew_order">
          <a @click="jumpTo('/myOrder')" name="我的订单" rel="nofollow">
            我的订单
          </a>
        </div>
      </div>
    </div>
    <login v-on:closeIt="closeLogin()" :show="showLogin"></login>
  </div>
</template>

<script>
  import Qs from 'qs'
  import login from './login'
  export default {
    name: 'commonTitle',
    components:{login},
    data(){
      return {
        showLogin: false,
        goodsCount: 0,
        search: "",
        ifUser: ""
      }
    },
    mounted() {
      if (sessionStorage.getItem("userId")) {
        this.ifUser = sessionStorage.getItem("userId");
      }
      this.getShopCar()
    },
    methods:{
      logOut: function() {
        sessionStorage.removeItem("userId");
        this.$router.go(0);
      },
      goToSearch: function(url, value) {
        sessionStorage.setItem("search", this.search);
        if (this.$route.name === 'searchItem') {
          this.$router.go(0);
        }
        this.jumpTo(url);
        // let _self = this;
        // this.$http({
        //   method: 'get',
        //   url: 'http://127.0.0.1:8080/indiv-web/keyword/search',
        //   params: {
        //     keyword: value
        //   }
        // }).then(function(response){
        //   console.log(response.data);
        // }).catch(function (response){
        //   console.log(response);
        // });
      },
      newJumpTo: function (url ,value) {
        this.$router.push({
          path: url,
          query: {
            id: value
          }
        })
      },
      closeLogin: function() {
        this.showLogin = false;
      },
      toLogin: function() {
        this.showLogin = true;
      },
      jumpTo: function(url) {
        this.$router.push({path: url})
      },
      getShopCar: function() {
        let userId1 = "";
        if (sessionStorage.getItem("userId")) {
          userId1 = sessionStorage.getItem("userId");
        } else {
          userId1 = "";
        }
        let _self = this;
        this.$http({
          method: 'get',
          url: 'http://127.0.0.1:8080/indiv-web/cart/getItemFromCart',
          params: {
            userId: userId1
          }
        }).then(function(response){
          console.log(response.data);
          if (response.data.data) {
            _self.goodsCount = response.data.data.items.length;
          } else {
            _self.goodsCount = 0;
          }
        }).catch(function (response){
          console.log(response);
        });
      },
    }
  }
</script>

<style scoped>
  .logo_line_out {
    position: relative;
    z-index: 10002;
    background-color: #fff;
  }

  .logo_line {
    height: 120px;
    width: 1200px;
    min-width: 1200px;
    margin: 0 auto;
    position: relative;
  }

  .logo_line .logo {
    overflow: hidden;
    width: 362px;
    height: 120px;
    vertical-align: middle;
    position: absolute;
    left: 0;
    top: 0;
  }

  .logo_line .logo >img {
    height: 120px;
    cursor: pointer;
  }

  img {
    margin: 0;
    padding: 0;
    list-style-type: none;
    border: 0;
  }

  .logo_line .search {
    position: absolute;
    margin-top: 20px;
    height: 48px;
    z-index: 9999;
    left: 427px;
    top: 40px;
  }

  .logo_line .search .text {
    width: 398px;
    height: 18px;
    border: 2px solid #ff2832;
    border-right: none;
    padding: 9px 0 9px 10px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    color: #323232;
    font: 12px/18px 'Hiragino Sans GB',"simsun",Arial;
    outline: 0;
    background: none;
  }

  .logo_line .search .button {
    width: 48px;
    height: 40px;
    border: none;
    background: url(http://img63.ddimg.cn/upload_img/00459/home/head_sprite.png) no-repeat 0 -346px;
    cursor: pointer;
    position: absolute;
    left: 410px;
    top: 0;
  }

  .logo_line .suggest_key {
    display: none;
    width: 408px;
    border: 1px solid #c8c8c8;
    border-top: none;
    z-index: 7777;
    position: absolute;
    left: 427px;
    top: 100px;
    background-color: #fff;
    color: #323232;
  }

  .logo_line .ddnew_cart {
    right: 88px;
    width: 107px;
    border-color: #ff2832;
    background: url(http://img62.ddimg.cn/upload_img/00459/home/icon_cart.png) 5px 0 no-repeat #ff2832;
    cursor: pointer;
  }

  .logo_line .ddnew_cart {
    height: 36px;
    position: absolute;
    top: 60px;
    border: 2px solid #dcdcdc;
    font: 14px/36px "Microsoft Yahei";
  }

  .logo_line .ddnew_cart a {
    padding-left: 35px;
    width: 72px;
    display: inline-block;
  }

  .logo_line .ddnew_cart a {
    color: #fff;
  }

  .logo_line .ddnew_cart a b {
    color: #fff;
    padding-left: 3px;
    font-family: Arial;
    font-weight: bold;
  }

  .logo_line .ddnew_order {
    width: 86px;
    padding: 0;
    text-align: center;
    right: 0;
    border-left: 0;
    background-color: #f6f6f6;
    cursor: pointer;
  }

  .logo_line .ddnew_order {
    height: 36px;
    position: absolute;
    top: 60px;
    border: 2px solid #dcdcdc;
    font: 14px/36px "Microsoft Yahei";
  }

  a {
    color: #646464;
    text-decoration: none;
  }

  .logo_line .ddnew_order a {
    display: inline-block;
    width: 86px;
  }

  .logo_line .ddnew_cart:hover {
    background-position: 5px -36px;
    background-color: #f6f6f6;
    border-color: #dcdcdc;
    color: #ff2832;
  }

  .logo_line .ddnew_cart:hover a, .logo_line .ddnew_cart:hover a b {
    color: #ff2832;
  }

  .ddnew_order a:hover {
    color: #ff2832;
  }

  .logReg {
    position: absolute;
    right: 3px;
    top: 15px;
    z-index: 21;
    width: 140px;
    height: 33px;
    background-color: #fff;
    text-align: center;
    line-height: 33px;
  }

  .logReg .cw-logReg {
    width: 140px;
    height: 33px;
    background-color: #fff;
    text-align: center;
    line-height: 33px;
    overflow: hidden;
    position: relative;
    z-index: 1;
    float: left;
    border: 1px solid #e3e4e5;
    font-size: 14px;
  }

  .logReg .cw-logReg > a {
    cursor: pointer;
    padding: 0 6px;
  }

  .logReg .cw-logReg > a:hover {
    color: #ff2832;
  }
</style>
