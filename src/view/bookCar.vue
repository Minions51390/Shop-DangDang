<template>
  <div class="wrapper">
    <div id="hd">
      <div id="tools">
        <div class="tools">
          <div class="ddnewhead_operate">
            <div class="ddnewhead_welcome">
              <span id="nickname">
                <img :src="userInfo.img" class="userImg">
                <span class="hi">Hi,
                  <a class="login_link"><b>{{userInfo.name}}</b></a>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="background-color: #fff;">
      <div class="shoppingcart_wrapper">
        <div>
          <a>
            <img src="http://img63.ddimg.cn/2018/5/22/2018052219005287679.jpg">
          </a>
        </div>
      </div>
    </div>
    <div class="logo_line">
      <div class="w960">
        <div class="shopping_procedure"><span class="current">我的购物车</span><span>填写订单</span><span>完成订单</span></div>
        <div @click="jumpTo('/home')" class="logo" style="cursor: pointer;"><a><img src="http://shopping.dangdang.com/shoppingcart/images/dd_logo.jpg?v=20171226" alt=""></a></div>
      </div>
    </div>
    <div id="container" class="cart">
      <div class="cart-warp">
        <div class="w">
          <div id="jd-cart">
            <div class="cart-main cart-main-new">
              <div class="cart-thead">
                <div class="column t-checkbox">
                  <a @click="allBook()" class="checknow fn-checkall" :class="{'check_on': checkAll, 'check_on1': bug}" ></a>
                  全选
                </div>
                <div class="column t-goods">商品</div>
                <div class="column t-props"></div>
                <div class="column t-price">单价</div>
                <div class="column t-quantity">数量</div>
                <div class="column t-sum">小计</div>
                <div class="column t-action">操作</div>
              </div>
            </div>
          </div>
          <div id="cart-list" v-for="(value, index) in goods">
            <div class="cart-item-list">
              <div class="cart-tbody">
                <div class="item-list">
                  <div class="item-single  item-item  item-selected ">
                    <a @click="oneBook(index)" class="checknow itemCheck" :class="{'check_on': value.checkIt}"></a>
                    <div class="item-form">
                      <div class="cell p-goods">
                        <div class="goods-item">
                          <div class="p-img">
                            <a @click="newJumpTo('/item', value.bookId)" class="J_zyyhq_27389404769" style="cursor: pointer"><img style="width: 80px; height: 80px;" :src="value.book.imagesUrl"></a>
                          </div>
                          <div class="item-msg">
                            <div class="p-name">
                              <a>
                                {{value.book.bookName}}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="cell p-props p-props-new">
                        <div class="props-txt" title="136027-133奥运金牌">商品编码：{{value.bookId}}</div>
                        <div class="props-txt" title="44">商品库存： {{value.book.bookCount}}</div>
                      </div>
                      <div class="cell p-price p-price-new ">
                        <strong>{{value.book.defaultPrice}}</strong>
                      </div>
                      <div class="cell p-quantity">
                        <div class="quantity-form">
                          <a @click="acountR(index, value)" class="decrement" :class="{'disabled': value.reduce}">-</a>
                          <span class="itxt">{{value.bookCount}}</span>
                          <a @click="acountA(index, value)" class="increment">+</a>
                        </div>
                      </div>
                      <div class="cell p-sum">
                        <strong>{{value.finPrice}}</strong>
                      </div>
                      <div class="cell p-ops">
                        <a @click="deleteGoods(index, value)" class="cart-remove">删除</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w" style="text-align: right; margin-bottom: 20px;font-size: 12px; color: #e4393c">
        {{errMsg}}
      </div>
      <div class="w bdImg">
        <div id="cart-floatbar">
          <div class="ui-ceilinglamp-1">
            <div class="cart-toolbar">
              <div class="toolbar-wrap">
                <div class="options-box">
                  <div class="toolbar-right">
                    <div class="choose">
                      已选择{{count}}商品
                    </div>
                    <div class="normal">
                      <div class="comm-right">
                        <div class="btn-area">
                          <a @click="setAndJump('/newOrder')" class="submit-btn" data-bind="1">
                            去结算<b></b>
                          </a>
                        </div>
                        <div class="price-sum">
                          <div>
                            <span class="txt txt-new">总价：</span>
                            <span class="price sumPrice"><em data-bind="3766.00">{{allPrice}}</em></span>
                            <b class="ml5 price-tips"></b>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Qs from 'qs'
  export default {
    name: 'bookCar',
    data(){
      return {
        goods: [],
        allPrice: "¥0",
        userInfo: {
          img: "",
          name: ""
        },
        errMsg: "",
        checkAll: true,
        bug: true,
        count: 0
      }
    },
    mounted() {
      this.getShopCar();
      this.getUserInfo();
    },
    methods:{
      setAndJump: function(url) {
        let arr = [];
        this.goods.forEach(function(value) {
          if(value.checkIt) {
            arr.push(value);
          }
        });
        sessionStorage.setItem('order', JSON.stringify(arr));
        this.jumpTo(url);
      },
      sumBook: function() {
        let yesIt = 0;
        this.goods.forEach(function(value) {
          if (value.checkIt) {
            yesIt++
          }
        });
        this.count = yesIt;
      },
      allBook: function() {
        let _self = this;
        this.checkAll = !this.checkAll;
        this.goods.forEach(function(val) {
          val.checkIt = _self.checkAll;
        });
        this.sumBook();
      },
      oneBook: function(val) {
        let noIt = 0;
        let yesIt = 0;
        this.bug = !this.bug;
        this.$set(this.goods[val], 'checkIt', !this.goods[val].checkIt);
        this.goods.forEach(function(value) {
          if (value.checkIt) {
            yesIt++
          } else {
            noIt++
          }
        });
        if (yesIt === this.goods.length) {
          this.checkAll = true;
        } else if (noIt === this.goods.length) {
          this.checkAll = false;
        }
        this.sumBook();
      },
      deleteGoods: function(index, value) {
        this.goods.splice(index, 1);
        let _self = this;
        let userId1 = "";
        if (sessionStorage.getItem("userId")) {
          userId1 = sessionStorage.getItem("userId");
        } else {
          userId1 = "";
        }
        this.$http({
          method: 'post',
          url: 'http://127.0.0.1:8080/indiv-web/cart//delItemFromCart',
          data: Qs.stringify({
            bookId: value.bookId,
            userId: userId1
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }).then(function (response) {
          console.log(response);
          _self.$router.go(0);
        }).catch(function (error) {
          console.log(error);
        });
      },
      acountR: function(index, value) {
        if (this.goods[index].bookCount > 1) {
          this.goods[index].bookCount--;
          let price = parseFloat(this.goods[index].book.defaultPrice.slice(1, this.goods[index].book.defaultPrice.length));
          this.goods[index].finPrice = '¥' + (price * this.goods[index].bookCount).toFixed(2);
          this.priceSum();
          let _self = this;
          let userId1 = "";
          if (sessionStorage.getItem("userId")) {
            userId1 = sessionStorage.getItem("userId");
          } else {
            userId1 = "";
          }
          this.$http({
            method: 'post',
            url: 'http://127.0.0.1:8080/indiv-web/cart/modifyCartGoodsCount',
            data: Qs.stringify({
              bookId: value.bookId,
              bookCount: '-1',
              userId: userId1
            }),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
          }).then(function (response) {
            console.log(response);
          }).catch(function (error) {
            console.log(error);
          });
          this.goods[index].reduce = false;
        } else {
          this.goods[index].reduce = true;
        }
        if (this.goods[index].bookCount === 1) {
          this.goods[index].reduce = true;
        }
      },
      acountA: function(index, value) {
        this.goods[index].reduce = false;
        this.goods[index].bookCount++;
        let price = parseFloat(this.goods[index].book.defaultPrice.slice(1, this.goods[index].book.defaultPrice.length));
        this.goods[index].finPrice = '¥' + (price * this.goods[index].bookCount).toFixed(2);
        this.priceSum();
        let _self = this;
        let userId1 = "";
        if (sessionStorage.getItem("userId")) {
          userId1 = sessionStorage.getItem("userId");
        } else {
          userId1 = "";
        }
        this.$http({
          method: 'post',
          url: 'http://127.0.0.1:8080/indiv-web/cart//modifyCartGoodsCount',
          data: Qs.stringify({
            bookId: value.bookId,
            bookCount: 1,
            userId: userId1
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }).then(function (response) {
          console.log(response);
        }).catch(function (error) {
          console.log(error);
        });
      },
      priceSum: function() {
        let sum  = 0;
        this.goods.forEach(function(value) {
          sum = sum + parseFloat(value.finPrice.slice(1, value.finPrice.length));
        });
        this.allPrice = '¥' + sum.toFixed(2);
      },
      jumpTo: function(url) {
        this.$router.push({path: url})
      },
      newJumpTo: function (url ,value) {
        this.$router.push({
          path: url,
          query: {
            id: value
          }
        })
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
          _self.goods = _self.goods.concat(response.data.data.items);
          _self.goods.forEach(function(value) {
            value.finPrice = '¥' + (value.book.defaultPrice * value.bookCount).toFixed(2);
            value.book.defaultPrice = '￥' + (value.book.defaultPrice).toFixed(2);
            value.reduce = false;
            value.checkIt = true;
          });
          _self.count = _self.goods.length;
          _self.priceSum();
          console.log(_self.goods);
        }).catch(function (response){
          console.log(response);
        });
      },
      getUserInfo: function () {
        let _self = this;
        this.$http({
          method: 'get',
          url: 'http://127.0.0.1:8080/indiv-web/user/getUserInfo',
          params: {
            userId: sessionStorage.getItem("userId")
          }
        }).then(function(response){
          console.log(response.data);
          _self.userInfo.img = response.data.data.image;
          _self.userInfo.name = response.data.data.username;
        }).catch(function (response){
          console.log(response);
        });
      }
    }
  }
</script>

<style scoped>
  .w {
    width: 990px;
    margin: 0 auto;
  }

  .cart-filter-bar {
    margin-top: 10px;
    position: relative;
  }

  .cart-filter-bar:after {
    content: "";
    display: block;
    clear: both;
  }

  .cart-filter-bar .switch-cart {
    float: left;
    position: relative;
    height: 26px;
    overflow: hidden;
    list-style: none;
  }

  .cart-filter-bar .switch-cart li.curr, .cart-filter-bar .switch-cart li.curr a {
    color: #e4393c;
    text-decoration: none;
    cursor: pointer;
  }

  .cart-filter-bar .switch-cart li {
    float: left;
    position: relative;
    font-weight: 700;
    font-size: 16px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    padding: 0 0 10px;
    cursor: pointer;
    margin: 5px 30px 0 0;
  }

  em, i, u {
    font-style: normal;
  }

  .cart-filter-bar .cart-store {
    float: right;
  }

  .cart-store {
    position: relative;
    z-index: 5;
    display: block;
    margin-bottom: 10px;
    padding-left: 122px;
  }

  .cart-store .label {
    float: left;
    line-height: 26px;
    font-size: 12px;
    color: #666;
  }

  #jdarea {
    position: relative;
    float: left;
    z-index: 3;
    height: 26px;
    cursor: default;
    margin: 0;
    font-size: 12px;
  }

  .ui-area-wrap .ui-area-text-wrap {
    float: left;
    position: relative;
    top: 0;
    height: 23px;
    background: #fff;
    border: 1px solid #CECBCE;
    padding: 0 24px 0 4px;
    line-height: 23px;
    overflow: hidden;
  }

  .ui-area-wrap .ui-area-text-wrap b {
    display: block;
    position: absolute;
    top: 3px;
    right: 4px;
    width: 17px;
    height: 17px;
    background: url(//img12.360buyimg.com/uba/jfs/t4660/73/4024943067/1159/f1a90f68/59088392N8b6279bb.png) no-repeat 3px 5px;
    overflow: hidden;
  }

  .ui-area-wrap .ui-area-content-wrap {
    display: none;
    float: left;
    position: absolute;
    top: 25px;
    border: 1px solid #CECBCE;
    padding: 12px 12px 15px;
    background: #fff;
    -moz-box-shadow: 0 0 5px #ddd;
    -webkit-box-shadow: 0 0 5px #ddd;
    box-shadow: 0 0 5px #ddd;
    right: 0;
    font-size: 12px;
  }

  .ui-area-wrap .ui-area-content-wrap.ui-area-w-max {
    width: 460px;
  }

  .ui-area-wrap .ui-area-content-wrap .ui-area-module-title {
    color: #666;
    font-size: 12px;
    font-weight: 700;
    margin-bottom: 6px;
    position: relative;
  }

  .ui-area-wrap .ui-area-content-wrap .ui-area-common-wrap.ui-area-open .ui-area-common-content {
    display: block;
    height: auto;
    overflow: hidden;
  }

  ol, ul {
    list-style: none;
  }

  .ui-area-wrap .ui-area-content-wrap .ui-area-common-wrap .ui-area-common-content li {
    height: 18px;
    padding: 2px 0;
  }

  .ui-area-wrap .ui-area-content-wrap .ui-area-common-wrap .ui-area-common-content li a {
    color: #666;
    cursor: pointer;
  }

  .ui-area-wrap .ui-area-content-wrap .ui-area-common-wrap .ui-area-common-content li a:hover {
    color: #e4393c;
    cursor: pointer;
  }

  .ui-area-wrap a {
    outline: 0;
    text-decoration: none;
  }

  .ui-area-wrap .ui-area-content-wrap .ui-area-common-wrap .ui-area-common-content li a span.ui-area-common-c-i-l {
    width: 60px;
  }

  .ui-area-wrap .ui-area-content-wrap .ui-area-common-wrap .ui-area-common-content li a span {
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
  }

  .ui-area-wrap .ui-area-content-wrap.ui-area-w-max .ui-area-common-wrap .ui-area-common-content li a span.ui-area-common-c-i-r {
    width: 365px;
    margin-left: 20px;
  }

  .show {
    display: block!important;
  }

  .changeFindLocal {
    z-index: 1!important;
    height: 25px!important;
    border-bottom: 0!important;
  }

  .cart-warp {
    margin-bottom: 20px;
  }

  .cart-main .cart-thead {
    display: block;
    height: 32px;
    line-height: 32px;
    margin: 0 0 10px;
    padding: 5px 0;
    background: #f6f9fb;
    position: relative;
    font-size: 12px;
    color: #666;
  }

  .cart-main-new .cart-thead .t-goods {
    width: 208px;
  }

  .cart-main .cart-thead .column {
    float: left;
  }

  .cart-main-new .cart-thead .t-props {
    width: 140px;
  }

  .cart-main .cart-thead .t-props {
    height: 32px;
    padding: 0 10px 0 20px;
  }

  .cart-main .cart-thead .t-price {
    width: 120px;
    padding-right: 40px;
    text-align: right;
  }

  .cart-main .cart-thead .t-quantity {
    width: 80px;
    text-align: center;
  }

  .cart-main .cart-thead .t-sum {
    width: 100px;
    padding-right: 40px;
    text-align: right;
  }

  .cart-main .cart-thead .t-action {
    width: 75px;
  }

  .cart-main .cart-thead .t-checkbox {
    height: 18px;
    line-height: 18px;
    padding-top: 7px;
    width: 122px;
    padding-left: 11px;
  }

  .cart-item-list {
    margin-bottom: 20px;
    font-size: 12px;
    color: #666;
  }

  .item-list {
    border: 1px solid #ebebeb;
    background-color: #fafafa;
    position: relative;
  }

  .cart-tbody .item-selected {
    background-color: #fafafa;
  }

  .item-list .item-single:first-child {
    border-top: 0;
  }

  .cart-tbody .item-item {
    position: relative;
    padding: 0 0 1px 40px;
    line-height: 20px;
  }

  .p-goods {
    width: 300px;
  }

  .cart-tbody .item-item .cell {
    float: left;
    padding: 15px 0 10px;
  }

  .cart-tbody .item-item .goods-item {
    display: block;
  }

  .cart-tbody .item-item .goods-item .p-img {
    float: left;
    width: 80px;
    height: 80px;
    border: 1px solid #eee;
    margin-right: 10px;
    background: #fff;
    padding: 0;
    text-align: center;
    overflow: hidden;
  }

  a {
    color: #666;
    text-decoration: none;
  }

  img {
    border: 0;
    vertical-align: middle;
  }

  .cart-tbody .item-item .goods-item .p-name {
    height: 40px;
    line-height: 20px;
    overflow: hidden;
  }

  .cart-tbody .item-item .goods-item .p-name a {
    color: #333;
  }

  .cart-main-new .cart-tbody .item-item .p-props, .cart-main-new .cart-tbody .item-item .p-props-new {
    width: 130px;
    padding-right: 0;
  }

  .cart-tbody .item-item .p-props-new {
    line-height: 20px;
    overflow: hidden;
    padding: 15px 0 0 20px;
  }

  .cart-tbody .item-item .p-props {
    min-height: 10px;
  }

  .cart-tbody .item-item .cell {
    float: left;
  }

  .cart-main-new .cart-tbody .item-item .p-props-new .props-txt {
    width: 138px;
  }

  .cart-tbody .item-item .p-props-new .props-txt {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: default;
    width: 138px;
  }

  .cart-tbody .item-item .p-price-new {
    width: 150px;
  }

  .cart-tbody .item-item .p-price {
    padding-right: 40px!important;
    text-align: right;
    overflow: hidden;
  }

  .cart-tbody .item-item .cell {
    float: left;
    padding: 15px 0 10px;
  }

  .cart-tbody .item-item .p-price strong {
    display: block;
    color: #333;
    font-weight: 400;
  }

  .cart-tbody .item-item .p-quantity {
    width: 80px;
  }

  .cart-tbody .item-item .cell {
    float: left;
    padding: 15px 0 10px;
  }

  .cart-tbody .item-item .p-quantity .quantity-form {
    position: relative;
    overflow: hidden;
    height: 22px;
    width: 80px;
  }

  .cart-tbody .item-item .p-quantity .decrement.disabled {
    cursor: not-allowed;
    color: #e9e9e9;
  }

  .cart-tbody .item-item .p-quantity .decrement {
    float: left;
  }

  .cart-tbody .item-item .p-quantity .decrement, .cart-tbody .item-item .p-quantity .increment {
    border: 1px solid #cacbcb;
    border-right: 0;
    height: 18px;
    line-height: 18px;
    padding: 1px 0;
    width: 16px;
    text-align: center;
    margin: 0;
    background: #fff;
    cursor: pointer;
  }

  .cart-tbody .item-item .p-quantity .itxt {
    position: absolute;
    left: 17px;
    top: 0;
    border: 1px solid #cacbcb;
    width: 42px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    padding: 1px;
    margin: 0;
    font-size: 12px;
    font-family: verdana;
    color: #333;
    -webkit-appearance: none;
    background-color: white;
    -webkit-rtl-ordering: logical;
    cursor: text;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-rendering: auto;
  }

  .cart-tbody .item-item .p-quantity .increment {
    float: right;
    border: 1px solid #cacbcb;
    border-left: 0;
    color: #666;
  }

  .cart-tbody .item-item .p-sum {
    width: 100px;
    padding-right: 40px!important;
    text-align: right;
  }

  .cart-tbody .item-item .cell {
    float: left;
    padding: 15px 0 10px;
  }

  .cart-tbody .item-item .p-sum strong {
    color: #333;
    font-weight: 700;
    display: block;
  }

  .cart-tbody .item-item .p-ops {
    width: 75px;
  }

  .cart-tbody .item-item .cell {
    float: left;
    padding: 15px 0 10px;
  }

  .cart-tbody .item-item .p-ops a {
    color: #666;
    display: block;
    cursor: pointer;
  }

  .cart-tbody .item-item .p-ops a:hover {
    color: #e4393c;
    display: block;
    cursor: pointer;
  }

  .item-form:after {
    content: "";
    display: block;
    clear: both;
  }

  #cart-floatbar {
    position: relative;
  }

  .ui-ceilinglamp-1 {
    width: 990px;
    height: 52px;
    font-size: 12px;
  }

  .cart-toolbar {
    position: relative;
    width: 988px;
    height: 50px;
  }

  .toolbar-wrap {
    position: relative;
    width: 988px;
    margin: 0 auto;
  }

  .toolbar-wrap .options-box {
    position: relative;
    height: 50px;
  }

  .toolbar-wrap .toolbar-right {
    position: absolute;
    height: 52px;
    right: 0;
    top: -1px;
    width: 610px;
  }

  .toolbar-wrap .toolbar-right .normal {
    height: 52px;
  }

  .toolbar-wrap .toolbar-right .normal .comm-right {
    float: right;
    width: 650px;
  }

  .toolbar-wrap .btn-area {
    float: right;
  }

  .toolbar-wrap .btn-area .submit-btn {
    display: block;
    position: relative;
    width: 96px;
    height: 52px;
    line-height: 52px;
    color: #fff;
    text-align: center;
    font-size: 18px;
    font-family: "Microsoft YaHei";
    background: #e54346;
    overflow: hidden;
    text-decoration: none;
    cursor: pointer;
  }

  .toolbar-wrap .btn-area .submit-btn b {
    display: block;
    position: absolute;
    width: 96px;
    height: 52px;
    top: 0;
    left: 0;
    overflow: hidden;
    background: url(//misc.360buyimg.com/user/cart/css/i/cart-submit-btn.png) 0 0 no-repeat;
  }

  .toolbar-wrap .price-sum {
    float: right;
    height: 43px;
    line-height: 20px;
    margin: 7px 20px 0 10px;
    color: #666;
    width: auto;
    position: relative;
  }

  .toolbar-wrap .price-sum div {
    white-space: nowrap;
  }

  .toolbar-wrap .price-sum .txt-new {
    width: 50px;
  }

  .toolbar-wrap .price-sum .txt {
    float: left;
    width: 50px;
    text-align: right;
    color: #999;
  }

  .toolbar-wrap .price-sum .price {
    display: inline-block;
    text-align: right;
    font-family: verdana;
  }

  .toolbar-wrap .price-sum .price em {
    font-size: 16px;
    color: #e4393c;
    font-weight: 700;
    font-style: normal;
  }

  .toolbar-wrap .price-sum .price-tips {
    vertical-align: text-bottom;
    display: inline-block;
    height: 18px;
    width: 12px;
    background: url(//misc.360buyimg.com/user/cart/css/i/price-tips.png) 0 0 no-repeat;
  }

  .ml5 {
    margin-left: 5px;
  }

  .toolbar-wrap .amount-sum {
    float: right;
    color: #999;
    height: 44px;
    line-height: 20px;
    margin: 7px 0 0;
    cursor: pointer;
  }

  .toolbar-wrap .amount-sum em {
    color: #e4393c;
    font-family: verdana;
    font-weight: 700;
    margin: 0 3px;
    font-style: none;
  }

  .header {
    padding: 10px 0 0;
    position: relative;
  }

  #logo-2014 {
    float: left;
    position: relative;
    width: 277px;
    padding: 0;
    z-index: 12;
    height: 50px;
    margin: 15px 0 22px;
  }

  #logo-2014 .logo {
    display: block;
    margin-top: 2px;
    width: 134px;
    height: 65px;
    background: url('../assets/SC.png') no-repeat 0 0;
    background-size: 134px 90px;
    text-indent: -20000px;
    color: #666;
    text-decoration: none;
    cursor: pointer;
  }

  #logo-2014 .link2 {
    overflow: hidden;
    display: block;
    position: absolute;
    width: 100px;
    height: 40px;
    line-height: 99em;
    top: 14px;
    right: 38px;
    background: #fff;
    color: #666;
    text-decoration: none;
  }

  #logo-2014 .link2 b {
    display: block;
    position: absolute;
    width: 100px;
    height: 40px;
    line-height: 99em;
    top: 0;
    right: 0;
    background: url(//misc.360buyimg.com/user/cart/widget/header-2017/i/cart-icon.png) #fff no-repeat;
  }

  .cart-search {
    float: left;
    border: 2px solid #c91623;
    height: 24px;
    margin-top: 30px;
    overflow: hidden;
  }

  .cart-search .itxt {
    border: 0;
    height: 18px;
    line-height: 18px;
    width: 260px;
    padding: 3px 5px;
    outline: 0;
    float: none;
    color: rgb(153, 153, 153);
  }

  .cart-search .button {
    display: inline-block;
    vertical-align: top;
    width: 48px;
    height: 24px;
    background: #c91623;
    text-align: center;
    color: #fff;
    font-weight: 700;
    -webkit-appearance: none;
    cursor: pointer;
    margin: 0;
    padding: 0;
    border: 0;
  }

  .clearfix:after {
    content: "";
    display: block;
    clear: both;
  }

  .user {
    position: absolute;
    right: 0;
    top: 50%;
    margin-top: -25px;
    width: 50px;
    height: 50px;
  }

  .user:after {
    content: "";
    display: block;
    clear: both;
  }

  .user_avatar {
    position: absolute;
    width: 50px;
    height: 50px;
  }

  .user_avatar_lk {
    border: 5px solid #e3e1df;
    border-radius: 50%;
    overflow: hidden;
    -webkit-box-shadow: 3px 6px 25px #c3c3c3;
    box-shadow: 3px 6px 25px #c3c3c3;
    display: block;
    width: 40px;
    height: 40px;
    color: #666;
    text-decoration: none;
    text-align: center;
  }

  .user_avatar_lk img {
    display: block;
    width: 40px;
    height: 40px;
    border: 0;
    vertical-align: middle;
  }

  .name {
    position: absolute;
    right: 70px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 12px;
    color: #c91623;
  }

  .user {
    cursor: pointer;
  }

  .bdImg {
    background-image: url('http://shopping.dangdang.com/shoppingcart/images/shopping_total.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
  }

  #hd {
    font: 12px 'Hiragino Sans GB',"simsun","Arial";
    color: #646464;
    min-width: 960px;
    background-color: #fff;
  }

  #hd .tools {
    width: 100%;
    background-color: #f9f9f9;
    border-bottom: 1px solid #f2f2f2;
    height: 50px;
    line-height: 50px;
    z-index: 10010;
    position: relative;
  }

  .tools .ddnewhead_operate {
    width: 960px;
    margin: 0 auto;
    background-color: #f9f9f9;
    height: 50px;
  }

  .tools .ddnewhead_welcome {
    padding: 5px 0 0 10px;
    padding-top: 0;
    height: 24px;
    line-height: 24px;
    position: relative;
    float: left;
    z-index: 50;
  }

  .tools .ddnewhead_welcome a.login_link {
    color: #ff2832!important;
  }

  #nickname {
    display: block;
    height: 50px;
    font-size: 14px;
  }

  .userImg {
    height: 50px;
    border: 1px solid #f9f9f9;
    border-radius: 50%;
  }

  .shoppingcart_wrapper {
    width: 960px;
    margin: 0 auto;
    padding: 17px 0 0;
  }

  .logo_line {
    width: 100%;
    border-bottom: 4px solid #ff2832;
    height: 100px;
    background-color: #fff;
  }

  .w960 {
    width: 960px;
    margin: 0 auto;
  }

  .shopping_procedure {
    float: right;
    width: 634px;
    height: 36px;
    background: url(http://shopping.dangdang.com/shoppingcart/images/procedure_bg.png) 0 0 no-repeat;
    font: bold 14px/36px "Microsoft Yahei";
    color: #646464;
    margin: 30px 0 0;
  }

  .shopping_procedure span.current {
    color: #fff;
    width: 206px;
  }

  .shopping_procedure span {
    width: 211px;
    display: inline-block;
    text-align: center;
  }

  .logo_line .logo {
    padding: 20px 0 0 15px;
  }

  a.checknow {
    display: inline-block;
    width: 12px;
    height: 12px;
    border: 1px solid #bcbcbc;
    background-color: #fff;
    text-decoration: none;
    border-radius: 3px;
    font-size: 0;
    font-size: 0;
    line-height: 0;
    overflow: hidden;
    margin: 0 10px 0 0;
    vertical-align: text-bottom;
    cursor: pointer;
  }

  a.checknow:hover {
    border-color: #ff2832;
  }

  .itemCheck {
    position: absolute;
    margin-right: 0px;
    top: 50%;
    transform: translateY(-50%);
    left: 15px;
  }

  a.check_on {
    border-color: #ff2832;
    background: #ff2832 url(http://shopping.dangdang.com/shoppingcart/images/icon_sprite.png) no-repeat -65px -1px;
  }

  a.check_on1 {
    border-color: #ff;
  }

  .choose {
    position: absolute;
    left: -350px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 12px;
    color: #999;
  }
</style>
