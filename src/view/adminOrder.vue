<template>
  <div class="wrapper">
    <div class="mydang">
      <div id="my_order_page" class="my_order_page">
        <div id="head">
          <div class="order_head_info">
            <div class="order_menu">
              <ul class="menu_list">
                <li class="j_menu current">
                  <a>
                    <span @click="getOrder(0)" :class="{'coolloor': orderl[0]}" class="j_menu_text">待付款</span>
                    <span @click="getOrder(1)" :class="{'coolloor': orderl[1]}" class="j_menu_text" style="margin-left: 20px;">待发货</span>
                    <span @click="getOrder(2)" :class="{'coolloor': orderl[2]}" class="j_menu_text" style="margin-left: 20px;">已发货</span>
                    <span @click="getOrder(3)" :class="{'coolloor': orderl[3]}" class="j_menu_text" style="margin-left: 20px;">已完成</span>
                    <span @click="getOrder(4)" :class="{'coolloor': orderl[4]}" class="j_menu_text" style="margin-left: 20px;">全部订单</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="order_show_all">
          <div id="J_order_list">
            <div id="orderList">
              <div class="order_remind">
                <div v-for="value in orderGoods" class="order_show order_show_special">
                  <div class="order_show_head order_show_head1">
                    <span>订单号：</span>
                    <span class="order_number">
                      <a class="pay1">{{value.id}}</a>
                    </span>
                    <span class="time_order">{{value.createTime}}</span>
                    <span class="price">￥&nbsp;{{value.orderPay.toFixed(2)}}<span></span></span>
                    <span class="online_pay">网上支付</span>
                    <span class="pay_person">{{value.receiveAddress.receiveName}}</span>
                  </div>
                  <div class="order_show_area">
                    <div class="pic_show_area">
                      <ul>
                        <li v-for="it in value.items" class="on">
                          <a class="j_productImg">
                            <img :src="it.book.imagesUrl">
                          </a>
                          <span class="introduce_detail j_product_detail" style="left: 74px;">
                            <span class="info">
                              <a class="info_introduce">{{it.book.bookName}}</a>
                              <span class="price_s">
                                <span class="price_num">{{it.book.defaultPrice}}</span>×<span class="number">{{it.bookCount}}</span>
                              </span>
                            </span>
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div class="trace_order">
                      <p></p>
                    </div>
                    <div class="check_order">
                      <ul>
                        <li>
                          <a v-if="value.orderStatus === 0" class="pay1">待付款</a>
                          <a v-if="value.orderStatus === 1" @click="sendGoods(value)" style="cursor: pointer;" class="pay1">发货</a>
                          <a v-if="value.orderStatus === 2" style="cursor: pointer;" class="pay1">已发货</a>
                          <a v-if="value.orderStatus === 3" class="pay1">已完成</a>
                        </li>
                      </ul>
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
    name: 'adminOrder',
    data(){
      return {
        orderGoods: [],
        orderl: [true, false, false, false, false]
      }
    },
    mounted() {
      this.getOrder(0)
    },
    methods:{
      sendGoods: function(value) {
        let _self = this;
        this.$http({
          method: 'post',
          url: 'http://127.0.0.1:8080/indiv-web/admin/updateOrderStatus',
          data: Qs.stringify({
            orderId: value.id,
            orderStatus: value.orderStatus
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
      getOrder: function(status) {
        let _self = this;
        this.orderl.forEach(function(value, index) {
          _self.orderl[index] = false;
        });
        this.orderl.forEach(function(value, index) {
          if (index === status) {
            _self.orderl[index] = true;
          }
        });
        this.$http({
          method: 'post',
          url: 'http://127.0.0.1:8080/indiv-web/admin/getOrdersList',
          data: Qs.stringify({
            orderStatus: status
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }).then(function (response) {
          _self.orderGoods = [];
          console.log(response);
          for (let i = 0; i < response.data.data.length; i++) {
            if (!response.data.data[i].receiveAddress) {
              response.data.data[i].receiveAddress = {};
              response.data.data[i].receiveAddress.receiveName = "123";
            }
          }
          _self.orderGoods = _self.orderGoods.concat(response.data.data);
        }).catch(function (error) {
          console.log(error);
        });
      }
    }
  }
</script>

<style scoped>
  .coolloor {
    color: #ffb8bb;
  }

  #hd {
    font: 12px 'Hiragino Sans GB',"simsun","Arial";
    color: #646464;
    min-width: 1200px;
    background-color: #fff;
  }

  #hd .sub {
    background: #f5f5f5;
    float: none;
    border-top: 3px solid #ff2832;
  }

  .mydang {
    width: 1200px;
    margin: 15px auto 50px;
    overflow: hidden;
  }

  .my_left {
    width: 200px;
    float: left;
  }

  .my_menu {
    background: url(http://myhome.dangdang.com/static/images/my_menu_title_bg.png) 0 63px no-repeat;
  }

  .my_menu .my_menu_title {
    height: 62px;
    line-height: 62px;
    margin-bottom: 6px;
    font-size: 16px;
    background: url(http://myhome.dangdang.com/static/images/icon_menu.png) 42px 24px no-repeat #fafafa;
    border: 1px solid #dcdcdc;
    border-bottom: none 0;
    padding-left: 64px;
    font-weight: normal;
  }

  .my_menu .my_menu_title a {
    color: #323232;
  }

  .my_menu dl {
    border: 1px solid #dcdcdc;
    border-top: none 0;
    width: 148px;
    margin: 0 auto;
    padding: 16px 0 0 42px;
    background-color: #fff;
  }

  .my_menu dt {
    margin: 8px 0;
    line-height: 18px;
    font-size: 16px;
    padding-left: 20px;
    background: url(http://myhome.dangdang.com/static/images/icon_menu.png) 0 -35px no-repeat;
    padding-bottom: 10px;
    color: #969696;
  }

  .order_show {
    border: 1px solid #e6e8ea;
    margin-bottom: 20px;
    padding: 0 0 7px;
  }

  .order_show .order_show_head.order_show_head1 {
    background-color: #eff3ff;
    width: 100%;
  }

  .order_show .order_show_head {
    padding-top: 4px;
    height: 32px;
  }

  .order_show .order_show_head span {
    margin: 0px 0 0 4px;
  }

  .order_show .order_show_head .order_number {
    margin-left: 0;
    color: #4f4f4f;
    width: 86px;
  }

  .order_show .order_show_head .time_order {
    margin-left: 0;
    width: 122px;
  }

  .order_show .order_show_head .price, .deposit_price {
    margin-left: -3px;
    width: 91px;
    font-size: 13px;
    color: #4f4f4f;
    text-align: right;
    padding-right: 6px;
    overflow: hidden;
    height: 16px;
    position: relative;
    top: 2px;
  }

  .order_show .order_show_head .online_pay {
    margin-left: 5px;
    width: 70px;
  }

  .order_show .order_show_head .pay_person {
    margin-left: 4px;
    width: 158px;
    height: 14px;
    overflow: hidden;
    position: relative;
    top: 0px;
  }

  .order_show_area {
    width: 100%;
    zoom: 1;
    position: relative;
  }

  .order_show_area:after {
    content: "";
    display: block;
    clear: both;
  }

  .order_show .pic_show_area .info_introduce {
    width: auto;
    line-height: 20px;
    overflow: hidden;
    color: #646464;
  }

  .order_show .pic_show_area {
    width: 860px;
    overflow: hidden;
    padding: 20px 20px 7px 20px;
    float: left;
  }

  .order_show .pic_show_area li {
    padding: 2px;
  }

  .order_show .pic_show_area li {
    width: 70px;
    height: 70px;
    border: 1px solid #dcdcdc;
    margin: 5px;
    position: relative;
  }

  .order_show .pic_show_area a {
    display: inline-block;
    width: 70px;
    height: 70px;
  }

  .introduce_detail {
    height: 72px;
  }

  .introduce_detail {
    position: absolute;
    top: -2px;
    left: 97px;
    border: 2px solid #ffb8bb;
    z-index: 10000;
    width: 440px;
    height: 70px;
    background-color: white;
    border-left: none;
    padding-left: 8px;
  }

  .order_show .trace_order {
    width: 135px;
    height: 90px;
    float: left;
    text-align: center;
    line-height: 23px;
    margin: 24px 0 0 8px;
    position: relative;
  }

  .order_show .check_order {
    width: 95px;
  }

  .order_show .check_order {
    height: 105px;
    text-align: center;
    line-height: 23px;
    float: left;
    margin: 24px 0 0 32px;
  }

  ul {
    list-style: none;
  }

  .order_show .check_order li {
    list-style: none;
  }

  .order_show .check_order li .pay1 {
    color: #4f4f4f;
  }

  a:link, a:visited {
    text-decoration: none;
    color: #969696;
  }

  .my_order_page {
    width: 1190px;
    padding: 0 0 0 10px;
    float: left;
    font-size: 12px;
  }

  .order_show .order_show_head {
    color: #b2b2b2;
    position: relative;
    z-index: 77;
  }

  .order_show .order_show_head {
    width: 988px;
  }

  .order_show .order_show_head span {
    display: inline-block;
  }

  .order_show .order_number, .order_show .time_order, .order_show .price, .deposit_price, .order_show .online_pay {
    border-right: 1px solid #b2b2b2;
  }

  .order_show .pic_show_area .on {
    border: 2px solid #ffb8bb;
    padding: 1px;
    cursor: pointer;
  }

  .order_show .pic_show_area img {
    display: block;
    width: 70px;
    height: 70px;
  }

  .info {
    display: inline-block;
  }

  .introduce_detail {
    height: 72px;
  }

  .order_head_info .order_menu {
    height: 43px;
    border-bottom: 1px solid;
    position: relative;
    margin-bottom: 20px;
  }

  .order_head_info .menu_list {
    padding-top: 6px;
  }

  .order_head_info .order_menu li {
    float: left;
    margin: 0 22px;
    font-size: 16px;
    color: #323232;
    cursor: pointer;
  }

  a:link, a:visited {
    text-decoration: none;
    color: #969696;
  }

  .listColor {
    color: #ff2832!important;
    font-weight: bolder;
  }

  .user-set {
    background-color: #fff;
    padding: 20px 5px 0 15px;
  }

  .userset-lcol:after {
    content: "";
    display: block;
    clear: both;
  }

  .user-img {
    width: 200px;
    float: left;
  }

  .form1 {
    width: 890px;
    float: left;
  }

  .form1 .item {
    display: block;
    margin-bottom: 20px;
    line-height: 30px;
  }

  .form1 .item:after {
    content: "";
    display: block;
    clear: both;
  }

  .form1 .item span.label {
    float: left;
    height: 18px;
    line-height: 18px;
    padding: 6px 0;
    width: 100px;
    text-align: right;
    font-size: 12px;
  }

  .fl {
    float: left;
    font-size: 12px;
  }

  .form1 .itxt {
    height: 18px;
    width: 127px;
    padding: 5px 23px 5px 5px;
    line-height: 18px;
    border: 1px solid #ccc;
    float: none;
    font-family: "Microsoft YaHei";
    font-size: 12px;
  }

  .form1 .itxt-succ {
    background: url(//misc.360buyimg.com/user/myjd-2015/css/i/succ-ico.png) right center no-repeat;
  }

  .form1 .jdradio {
    float: none;
    vertical-align: -2px;
    _vertical-align: -1px;
    margin: 0 3px 0 0;
    padding: 0;
  }

  .form1 label {
    float: none;
  }

  .mr10 {
    margin-right: 10px;
  }

  .user-set .birthday-info {
    width: 397px;
    overflow: hidden;
  }

  .form .selt1 {
    width: 70px;
  }

  .form1 .selt {
    line-height: 18px;
    border: 1px solid #ccc;
    padding: 5px;
    float: none;
    font-family: "Microsoft YaHei";
    font-size: 12px;
  }

  option {
    font-weight: normal;
    display: block;
    white-space: pre;
    min-height: 1.2em;
    padding: 0px 2px 1px;
  }

  .form1 label {
    float: none;
  }

  .ml5 {
    margin-left: 5px;
  }

  .mr5 {
    margin-right: 5px;
  }

  .btn-5 {
    background-image: linear-gradient(to bottom,#f5fbef 0,#eaf6e2 100%);
    border-radius: 2px;
    display: inline-block;
    height: 18px;
    line-height: 18px;
    border: 1px solid #bfd6af;
    padding: 2px 14px 3px;
    cursor: pointer;
  }

  .mc .mt {
    padding: 10px 30px;
    display: block;
    overflow: hidden;
    zoom: 1;
  }

  a.add-btn {
    display: inline-block;
    vertical-align: middle;
    font-weight: 700;
    padding: 0 14px;
    height: 28px;
    line-height: 28px;
    font-size: 14px;
    margin: 0 10px 0 0;
    cursor: pointer;
  }

  .errmsg {
    display: inline-block;
    font-size: 14px;
    color: #ff6c00;
    margin-left: 100px;
  }

  #nickname {
    display: block;
    height: 50px;
    font-size: 14px;
  }

  .userImg {
    height: 200px;
    width: 200px;
    border: 1px solid #f9f9f9;
    border-radius: 50%;
  }

  .hi {
    position: relative;
    top: -18px;
    margin-left: 10px;
    display: inline-block;
  }

  .form2 {
    background-color: #fff;
  }

  .form2 .item:after {
    content: "";
    display: block;
    clear: both;
  }

  .form2 .item {
    display: block;
    margin-bottom: 20px;
    line-height: 30px;
  }

  .form2 .item span.label {
    width: 150px;
    font-size: 14px;
    color: #999;
    padding: 8px 0;
  }

  .form2 .item span.label {
    float: left;
    height: 18px;
    line-height: 18px;
    text-align: right;
  }

  .ftx-un {
    font-size: 16px;
    line-height: 25px;
    margin-right: 10px;
  }

  .form2 .itxt {
    width: 157px;
  }

  div.form2 .itxt {
    padding: 8px 23px 8px 5px;
    height: 18px;
    line-height: 18px;
    border: 1px solid #ccc;
    float: none;
    font-family: "Microsoft YaHei";
    font-size: 12px;
  }

  .btn-10 {
    padding: 8px 14px;
    font-size: 14px;
  }

  .ml10 {
    margin-left: 10px;
  }

  .btn-10, .btn-9 {
    border-radius: 2px;
    display: inline-block;
    height: 18px;
    line-height: 18px;
    padding: 8px 5px 8px 5px;
    border: 1px solid #ddd;
    font-size: 12px;
  }

  .form2 label {
    float: none;
  }

  .btn-7 {
    background-color: #f5fbef;
    background-image: linear-gradient(to bottom,#f5fbef 0,#eaf6e2 100%);
    border-radius: 2px;
    display: inline-block;
    height: 18px;
    line-height: 18px;
    border: 1px solid #bfd6af;
    padding: 2px 14px 3px;
    cursor: pointer;
  }

  .form2 .item {
    display: block;
    margin-bottom: 20px;
    line-height: 30px;
  }

  .safe-icon-box {
    position: relative;
    margin-left: 315px;
    margin-top: 90px;
    margin-bottom: 30px;
  }

  .safe-icon-box .icon-succ02 {
    background-position: 0 0;
  }

  .safe-icon-box .m-icon {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    width: 48px;
    height: 48px;
    background: url(//misc.360buyimg.com/user/myjd-2015/css/i/icon48.png) no-repeat;
  }

  .safe-icon-box .fore {
    margin-left: 58px;
    line-height: 25px;
  }

  .ftx-02 {
    color: #71b247;
  }

  .u-safe .safe-rank04 {
    background-position: 0 -45px;
    background-image: url("//misc.360buyimg.com/user/myjd-2015/css/i/safe-rank2014.png");
    background-repeat: no-repeat;
    display: inline-block;
    font-size: 0;
    height: 14px;
    line-height: 0;
    margin-right: 10px;
    overflow: hidden;
    vertical-align: middle;
    width: 68px;
    font-style: normal;
  }

  .safe-icon-box .icon-succ02 {
    background-position: 0 0;
  }

  .safe-icon-box .m-icon {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    width: 48px;
    height: 48px;
    background: url(//misc.360buyimg.com/user/myjd-2015/css/i/icon48.png) no-repeat;
  }

  .safe-icon-box .fore {
    margin-left: 58px;
    line-height: 25px;
  }

  .ftx-02 {
    color: #71b247;
  }

  .u-safe .safe-rank04 {
    background-position: 0 -45px;
    background-image: url("//misc.360buyimg.com/user/myjd-2015/css/i/safe-rank2014.png");
    background-repeat: no-repeat;
    display: inline-block;
    font-size: 0;
    height: 14px;
    line-height: 0;
    margin-right: 10px;
    overflow: hidden;
    vertical-align: middle;
    width: 68px;
    font-style: normal;
  }

  .u-safe .rank-text {
    font-weight: 400;
    margin-right: 5px;
  }

  .ftx-04 {
    color: #ff6c00;
  }

  .easebuy-m .smt .extra {
    float: right;
    margin: 0 10px 0 0;
    line-height: 23px;
  }

  .easebuy-m .smt .extra .del-btn {
    margin-top: 10px;
    display: inline-block;
    width: 13px;
    height: 13px;
    text-indent: 2em;
    background: url(//misc.360buyimg.com/user/myjd-2015/css/i/close.png) no-repeat;
    overflow: hidden;
    vertical-align: middle;
  }

  .easebuy-m .smt .extra a {
    color: #005ea7;
    margin: 0 0 0 20px;
    cursor: pointer;
  }

  .listDan {
    font-size: 12px;
    position: absolute;
    right: 220px;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    color: #999;
    cursor: pointer;
  }

  .easebuy-m {
    border: 2px solid #e6e6e6;
    margin: 0 0 10px;
  }

  .easebuy-m .smt {
    padding-left: 32px;
    line-height: 35px;
    position: relative;
    display: block;
    overflow: visible;
  }

  .easebuy-m .smt:after {
    content: "";
    display: block;
    clear: both;
  }

  .easebuy-m .smt h3 {
    float: left;
    color: #666;
  }

  .easebuy-m .smt h3 .ftx-04 {
    margin: 0 0 0 10px;
    font-size: 12px;
    background: #ffaa45;
    padding: 2px;
    color: #fff;
    font-weight: 400;
  }

  .easebuy-m .smc {
    padding: 10px;
    line-height: 22px;
    width: 788px;
    overflow: hidden;
    zoom: 1;
  }

  .easebuy-m .smc .new-items {
    position: relative;
    width: 788px;
  }

  .easebuy-m .smc .new-items:after {
    content: "";
    display: block;
    clear: both;
  }

  .easebuy-m .smc .item-lcol {
    width: 450px;
    float: left;
  }

  .easebuy-m .smc .item span {
    float: left;
    width: 70px;
    color: #999;
    text-align: right;
    font-size: 12px;
  }

  .easebuy-m .smc .item-lcol .fl {
    width: 360px;
    font-size: 12px;
  }

  .fl {
    float: left;
  }

  .clr {
    display: block;
    overflow: hidden;
    clear: both;
    height: 0;
    line-height: 0;
    font-size: 0;
  }

  .easebuy-m .smc .item-rcol {
    width: 320px;
    float: left;
    padding-left: 10px;
    height: 100%;
  }

  .easebuy-m .smc .item-rcol .extra {
    position: absolute;
    right: 30px;
    bottom: 0;
  }

  .thickdiv {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000001;
    width: 100%;
    height: 100%;
    background: #000;
    border: 0;
    opacity: .15;
  }

  .thickbox {
    width: 762px;
    height: 542px;
    position: fixed;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    z-index: 10000002;
    overflow: hidden;
    padding: 0;
    border: 4px solid rgba(0,0,0,.1);
    border-radius: 5px;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
  }

  .thickwrap {
    width: 760px;
  }

  .thicktitle {
    width: 740px;
    height: 27px;
    padding: 0 10px;
    border: solid #C4C4C4;
    border-width: 1px 1px 0;
    background: #F3F3F3;
    line-height: 27px;
    font-family: arial,"\5b8b\4f53";
    font-size: 14px;
    font-weight: 700;
    color: #333;
  }

  .thickcon {
    overflow: auto;
    background: #fff;
    border: solid #C4C4C4;
    border-width: 1px;
    width: 740px;
    height: 490px;
    padding: 10px;
  }

  #edit-cont {
    padding: 20px;
    margin-bottom: 10px;
    overflow: hidden;
    zoom: 1;
  }

  .mc {
    overflow: hidden;
    zoom: 1;
  }

  #edit-cont .item {
    margin: 0 0 5px;
    line-height: 22px;
  }

  #edit-cont .item .label {
    float: none;
    display: block;
    vertical-align: middle;
    color: #999;
    text-align: left;
  }

  .form .item span.label {
    height: 18px;
    line-height: 18px;
    padding: 6px 0;
    width: 100px;
    font-size: 12px;
  }

  .form em {
    color: #e4393c;
    font-style: normal;
  }

  #edit-cont .item .text {
    height: 18px;
    line-height: 18px;
    padding: 6px;
    width: 220px;
    margin-right: 5px;
    vertical-align: middle;
  }

  .form .text {
    border: 1px solid #ccc;
  }

  #edit-cont .item .text1 {
    width: 484px;
  }

  #edit-cont .btns {
    margin: 10px 0 0;
  }

  a.save-btn {
    margin-top: 15px;
    height: 28px;
    line-height: 28px;
    padding: 0 14px;
    font-size: 14px;
    cursor: pointer;
  }

  .btn-9 {
    background-color: #F7F7F7;
    background-image: linear-gradient(to bottom,#F7F7F7 0,#F3F2F2 100%);
    border-radius: 2px;
    display: inline-block;
    border: 1px solid #ddd;
  }

  .thickclose {
    display: block;
    position: absolute;
    z-index: 100000;
    top: 7px;
    right: 12px;
    overflow: hidden;
    width: 15px;
    height: 15px;
    background: url(//misc.360buyimg.com/201007/skin/df/i/bg_thickbox.gif) no-repeat 0 -18px;
    font-size: 0;
    line-height: 100px;
    cursor: pointer;
  }
</style>
