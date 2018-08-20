<template>
  <div class="wrapper">
    <div class="logo_line">
      <div class="w960">
        <div class="shopping_procedure"><span>我的购物车</span><span class="current">填写订单</span><span>完成订单</span></div>
        <div class="logo"><a><img @click="jumpTo('/home')" src="http://shopping.dangdang.com/shoppingcart/images/dd_logo.jpg?v=20171226" alt=""></a></div>
      </div>
    </div>
    <div id="container">
      <div id="container" class="w">
        <div class="checkout-tit">
          <span class="tit-txt">核对订单信息</span>
        </div>
        <div class="checkout-steps">
          <div class="step-tit">
            <h3>收货人信息</h3>
          </div>
          <div class="step-cont">
            <ul v-if="noAdr" id="consignee-list">
              <li style="display: list-item;">
                <div class="consignee-item item-selected" style="width: 150px;">
                  <span>请去设置页面填写收货地址</span>
                </div>
              </li>
            </ul>
            <ul v-if="!noAdr" id="consignee-list">
              <li v-for="(value, index) in localAdd" style="display: list-item;">
                <div @click="chooseAdr(index)" :class="{'item-selected': value.isUsed}" class="consignee-item">
                  <span>{{value.receiveName}}</span><b></b>
                </div>
                <div class="addr-detail">
                  <span class="addr-name">{{value.receiveName}}</span>
                  <span class="addr-info">{{value.receiveArea}} {{value.address}}</span>
                  <span class="addr-tel">{{value.mobile}}</span>
                </div>
              </li>
            </ul>
          </div>
          <div class="hr"></div>
          <div id="shipAndSkuInfo">
            <div id="payShipAndSkuInfo">
              <div class="step-tit">
                <h3>支付方式</h3>
              </div>
              <div class="step-cont">
                <div class="payment-list">
                  <div class="list-cont">
                    <ul id="payment-list">
                      <li style="cursor: pointer;">
                        <div class=" payment-item item-selected online-payment " >
                          <b></b>
                          在线支付
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="hr"></div>
              <div class="step-tit">
                <h3>送货清单</h3>
              </div>
              <div class="step-cont">
                <div class="shopping-lists">
                  <div v-for="value in goodsList" class="shopping-list ABTest">
                    <div class="goods-list">
                      <div class="goods-item goods-item-extra">
                        <div class="p-img">
                          <a><img :src="value.book.imagesUrl"></a>
                        </div>
                        <div class="goods-msg">
                          <div class="goods-msg-gel">
                            <div class="p-name">
                              <a>
                                {{value.book.bookName}}
                              </a>
                            </div>
                            <div class="p-price">
                              <strong class="jd-price">
                                {{value.book.defaultPrice}}
                              </strong>
                              <span class="p-num">x{{value.bookCount}}</span>
                            </div>
                          </div>
                        </div>
                        <div class="clr"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="trade-foot">
          <div class="trade-foot-detail-com">
            <div class="fc-price-info">
              <span class="price-tit">应付总额：</span>
              <span class="price-num" id="sumPayPriceId">￥{{sumPrice}}</span>
            </div>
            <div v-if="!noAdr" class="fc-consignee-info">
              <span class="mr20" id="sendAddr">寄送至：{{finAdr.adr}}</span>
              <span id="sendMobile">收货人：{{finAdr.name}} {{finAdr.phone}}</span>
            </div>
          </div>
          <div id="checkout-floatbar">
            <div class="ui-ceilinglamp checkout-buttons">
              <div class="sticky-wrap">
                <div class="inner">
                  <button @click="createOrder()" type="submit" class="checkout-submit" id="order-submit">
                    提交订单<b></b>
                  </button>
                </div>
              </div>
            </div>
            <div class="errMsg">
              {{errMes}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="alipay"></div>
  </div>
</template>

<script>
  import Qs from 'qs'
  export default {
    name: 'newOrder',
    data () {
      return {
        localAdd: [],
        goodsList: [],
        sumPrice: "0",
        finAdr: {
          name: "",
          phone: "",
          adr: "",
          id: ""
        },
        errMes: "",
        noAdr: false
      }
    },
    mounted(){
      this.getAdr();
      this.goodsList = JSON.parse(sessionStorage.getItem('order'));
      this.sumPri();
    },
    methods: {
      chooseAdr: function(index) {
        this.localAdd.forEach(function(val) {
          val.isUsed = 0;
        });
        this.localAdd[index].isUsed = 1;
        this.findFinAdr();
      },
      sumPri: function() {
        let _self = this;
        this.sumPrice = 0;
        this.goodsList.forEach(function(val) {
          _self.sumPrice = parseFloat(val.finPrice.slice(1, val.finPrice.length)) +  _self.sumPrice
        });
        this.sumPrice = this.sumPrice + '.00';
      },
      findFinAdr: function() {
        let _self = this;
        this.localAdd.forEach(function(val) {
          if (val.isUsed === 1) {
            _self.finAdr.name = val.receiveName;
            _self.finAdr.phone = val.mobile;
            _self.finAdr.adr = val.receiveArea + " " + val.address;
            _self.finAdr.id = val.id;
          }
        })
      },
      jumpTo: function(url) {
        this.$router.push({path: url})
      },
      getAdr: function() {
        let _self = this;
        this.$http({
          method: 'get',
          url: 'http://127.0.0.1:8080/indiv-web/receiceAddress/getAddressList',
          params: {
            userId: sessionStorage.getItem("userId")
          }
        }).then(function(response){
          console.log(response.data);
          if (response.data.data) {
            _self.localAdd = _self.localAdd.concat(response.data.data);
            _self.findFinAdr();
          } else {
            _self.noAdr = true;
          }
        }).catch(function (response){
          console.log(response);
        });
      },
      createOrder: function(url) {
        let arr = [];
        this.goodsList.forEach(function(val) {
          arr.push(Object.assign({}, {
            bookId: val.bookId,
            bookCount: val.bookCount
          }));
        });
        let _self = this;
        this.$http({
          method: 'post',
          url: 'http://127.0.0.1:8080/indiv-web/order/createOrder',
          data: Qs.stringify({
            userId: sessionStorage.getItem("userId"),
            receiveId: _self.finAdr.id,
            orderPay: parseInt(_self.sumPrice),
            items: JSON.stringify(arr)
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }).then(function (response) {
          console.log(response);
          _self.errMes = response.data.message;
          if (response.data.status === 0) {
            _self.$http({
              method: 'get',
              url: 'http://127.0.0.1:8080/indiv-web/alipay/alipayTrade',
              params: {
                orderId: response.data.data
              },
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
              }
            }).then(function (response) {
              console.log(response);
              document.getElementsByClassName('alipay')[0].innerHTML = response.data;
              document.forms[0].submit();
            }).catch(function (error) {
              console.log(error);
            });
          }
        }).catch(function (error) {
          console.log(error);
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

  .header {
    padding: 20px 0 10px;
  }

  #logo-2014 {
    position: relative;
    z-index: 12;
    float: left;
    width: 276px;
    height: 50px;
    margin: 15px 0 22px;
    padding-left: 5px;
  }

  #logo-2014 .logo {
    display: block;
    margin-top: 2px;
    width: 134px;
    height: 65px;
    background-image: url(../assets/SC.png);
    background-repeat: no-repeat;
    background-size: 134px 90px;
    text-indent: -20000px;
  }

  a {
    color: #666;
    text-decoration: none;
  }

  #logo-2014 .link2 {
    overflow: hidden;
    display: block;
    position: absolute;
    width: 100px;
    height: 40px;
    line-height: 99em;
    top: 8px;
    right: 28px;
    background: #fff;
  }

  #logo-2014 .link2 b {
    display: block;
    position: absolute;
    width: 100px;
    height: 40px;
    line-height: 99em;
    top: 0;
    right: 0;
    background: url(//misc.360buyimg.com/user/purchase/2.0.0/widget/header-2017/i/purchase-icon.png) #fff no-repeat;
  }

  .clearfix:after {
    content: '';
    display: block;
    clear: both;
  }

  #container {
    padding-bottom: 20px;
  }

  .checkout-tit {
    height: 42px;
    line-height: 42px;
    font-size: 16px;
    font-family: "Microsoft YaHei";
    overflow: hidden;
  }

  .checkout-tit:after {
    content: "";
    display: block;
    clear: both;
  }

  .checkout-tit .tit-txt {
    float: left;
    color: #666;
  }

  .checkout-steps {
    background-color: #fff;
    padding: 0 20px;
    border: 1px solid #f0f0f0;
  }

  .checkout-steps .step-tit {
    line-height: 40px;
    height: 40px;
    color: #333;
  }

  .checkout-steps .step-tit h3 {
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    float: left;
  }

  .checkout-steps .step-cont {
    margin-bottom: 10px;
  }

  #consignee-list {
    width: 99.8%;
    list-style: none;
    margin: 0 10px 0 20px;
  }

  #consignee-list:after {
    content: '';
    display: block;
    clear: both;
  }

  #consignee-list li {
    list-style: none;
    height: 30px;
    margin: 6px 0;
    float: left;
    width: 99.8%;
  }

  .consignee-item:hover {
    border: 2px solid #e4393c;
    padding: 4px 10px;
  }

  .consignee-item.item-selected {
    border: 2px solid #e4393c;
    padding: 4px 10px;
  }

  .consignee-item {
    float: left;
    list-style: none;
    position: relative;
    height: 18px;
    border: 1px solid #ddd;
    line-height: 18px;
    padding: 5px 10px;
    width: 120px;
    text-align: center;
    cursor: pointer;
    background-color: #fff;
    font-size: 12px;
  }

  .consignee-item.item-selected b {
    display: block;
    position: absolute;
    right: 0;
    bottom: 0;
    width: 12px;
    height: 12px;
    overflow: hidden;
    background: url(//misc.360buyimg.com/user/purchase/2.0.0/css/i/selected-icon.png) no-repeat;
  }

  .addr-detail {
    float: left;
    height: 30px;
    line-height: 30px;
  }

  .addr-detail span {
    display: inline-block;
    margin-left: 10px;
    font-size: 12px;
    color: #666;
  }

  .checkout-steps .step-tit {
    line-height: 40px;
    height: 40px;
    color: #333;
  }

  .checkout-steps .step-tit h3 {
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    float: left;
  }

  .checkout-steps .step-cont {
    margin-bottom: 10px;
  }

  .payment-list {
    padding: 0 20px 10px;
  }

  ul {
    list-style: none;
  }

  .payment-list .list-cont li {
    float: left;
    margin-right: 9px;
  }

  .payment-list .list-cont .payment-item.item-selected {
    border: 2px solid #e4393c;
    padding: 4px 23px;
  }

  .payment-list .list-cont .payment-item {
    float: left;
    position: relative;
    border: 1px solid #ddd;
    height: 18px;
    line-height: 18px;
    padding: 5px 24px;
    cursor: pointer;
    font-size: 12px;
  }

  .payment-list .list-cont .payment-item.item-selected b {
    display: block;
    position: absolute;
    right: 0;
    bottom: 0;
    width: 12px;
    height: 12px;
    overflow: hidden;
    background: url(//misc.360buyimg.com/user/purchase/2.0.0/css/i/selected-icon.png) no-repeat;
  }

  .step-cont:after {
    content: '';
    display: block;
    clear: both;
  }

  .hr {
    border-bottom: 1px solid #e6e6e6;
    height: 0;
    margin-bottom: 10px;
  }

  .shopping-list {
    position: relative;
    float: left;
    width: 100%;
    background: url(//misc.360buyimg.com/user/purchase/2.0.0/widget/shopping-list/i/shopping-list-bg.jpg) 0 0 repeat-y;
    margin-bottom: 10px;
  }

  .shopping-list.ABTest .goods-list {
    float: left;
    width: 616px;
    background-color: #f3fbfe;
    padding: 10px 20px;
  }

  .shopping-list .goods-list .goods-item-extra {
    border: none;
    margin-bottom: 0;
    padding: 0 20px;
  }

  .shopping-list .goods-list .goods-item {
    border-bottom: 1px solid #fff;
    padding: 10px 0;
    margin-bottom: 10px;
    color: #666;
  }

  .shopping-list .goods-list .goods-item .p-img {
    float: left;
    width: 80px;
    height: 80px;
    border: 1px solid #ddd;
    margin-right: 10px;
    background-color: #fff;
    overflow: hidden;
  }

  .shopping-list .goods-list .goods-item .p-img  img {
    width: 80px;
    height: 80px;
  }

  a {
    color: #666;
    text-decoration: none;
    cursor: pointer;
  }

  .shopping-list .goods-list .goods-item .goods-msg {
    float: left;
    width: 484px;
  }

  .shopping-list .goods-list .goods-item .goods-msg-gel {
    float: left;
    width: 484px;
  }

  .shopping-list .goods-list .goods-item .p-name {
    float: left;
    width: 49.8%;
    height: 3em;
    line-height: 1.5em;
    overflow: hidden;
    margin-bottom: 10px;
  }

  .shopping-list .goods-list .goods-item .p-name a {
    color: #666;
    font-size: 12px;
  }

  .shopping-list .goods-list .goods-item .p-price {
    float: right;
    width: 48.8%;
    margin: 0 0 5px;
  }

  .shopping-list .goods-list .goods-item .p-price .jd-price {
    width: 100px;
    text-align: right;
  }

  .shopping-list .goods-list .goods-item .p-price strong {
    font-family: verdana;
    color: #e4393c;
    display: inline-block;
    vertical-align: middle;
    font-size: 12px;
  }

  .shopping-list .goods-list .goods-item .p-price .p-num {
    width: 70px;
    text-align: right;
  }

  .shopping-list .goods-list .goods-item .p-price span {
    display: inline-block;
    vertical-align: middle;
    font-size: 12px;
  }

  .trade-foot {
    font-family: "Microsoft YaHei",SimSun,verdana;
    font-size: 12px;
    margin-top: 20px;
  }

  .trade-foot-detail-com {
    padding: 15px 10px 15px 0;
    line-height: 20px;
    text-align: right;
    border-top: 1px solid #e6e6e6;
    width: 980px;
    color: #999;
    background-color: #f4f4f4;
  }

  .trade-foot-detail-com .fc-price-info {
    margin-right: 10px;
    line-height: 25px;
  }

  .trade-foot-detail-com .fc-price-info .price-tit {
    color: #666;
  }

  .trade-foot-detail-com .fc-price-info .price-num {
    color: #e4393c;
    font-family: Verdana;
    font-weight: 700;
    font-size: 18px;
    min-width: 122px;
    float: right;
    text-align: right;
  }

  .trade-foot-detail-com .fc-consignee-info {
    margin-right: 10px;
    line-height: 25px;
  }

  .mr20 {
    margin-right: 20px;
  }

  #checkout-floatbar {
    clear: both;
    width: 990px;
    margin-bottom: 20px;
  }

  .checkout-buttons {
    position: relative;
    width: 990px;
    height: 50px;
  }

  .checkout-buttons .sticky-wrap {
    position: relative;
  }

  .checkout-buttons .sticky-wrap .inner {
    padding: 0 10px;
  }

  .checkout-buttons .checkout-submit {
    float: right;
    position: relative;
    width: 135px;
    height: 36px;
    line-height: 36px;
    margin: 8px 10px 0 0;
    padding: 0;
    background-color: #e00;
    overflow: hidden;
    color: #fff;
    font-weight: 700;
    font-size: 16px;
    font-family: arial,"Microsoft YaHei";
    display: inline-block;
    border-radius: 3px;
    cursor: pointer;
    border: 0;
  }

  .checkout-buttons .checkout-submit b {
    position: absolute;
    left: 0;
    top: 0;
    width: 135px;
    height: 36px;
    background: url(//misc.360buyimg.com/user/purchase/2.0.0/css/i/btn-submit.jpg) no-repeat;
    cursor: pointer;
    overflow: hidden;
  }

  .errMsg {
    text-align: right;
    padding-right: 20px;
    font-size: 14px;
    font-weight: bolder;
    color: #e4393c;
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
    background: url(http://pcheckout.ddimg.cn/resources/images/procedure_bg.png) 0 0 no-repeat;
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
</style>
