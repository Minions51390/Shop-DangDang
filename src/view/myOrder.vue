<template>
  <div class="wrapper">
    <common-title></common-title>
    <div id="hd">
      <div class="sub"></div>
    </div>
    <div class="mydang">
      <div class="my_left">
        <div class="my_menu">
          <h3 class="my_menu_title"><a id="J_myhomeBtn">我的信息</a></h3>
          <dl>
            <dt style="cursor: pointer;" @click="changeTab('trade')" :class="{'listColor': owner.trade}">我的交易</dt>
            <dt style="cursor: pointer;" @click="changeTab('user')" :class="{'listColor': owner.user}">修改个人信息</dt>
            <dt style="cursor: pointer;" @click="changeTab('pass')" :class="{'listColor': owner.pass}">修改密码</dt>
            <dt style="cursor: pointer;" @click="changeTab('adr')" :class="{'listColor': owner.adr}">管理收货地址</dt>
          </dl>
        </div>
      </div>
      <div v-if="owner.trade" id="my_order_page" class="my_order_page">
        <div id="head">
          <div class="order_head_info">
            <div class="order_menu">
              <ul class="menu_list">
                <li class="j_menu current">
                  <a>
                    <span class="j_menu_text">全部订单</span>
                  </a>
                </li>
                <!--<li class="j_menu">-->
                  <!--<a>-->
                    <!--<span class="j_menu_text">待付款</span>-->
                  <!--</a>-->
                <!--</li>-->
                <!--<li class="j_menu">-->
                  <!--<a>-->
                    <!--<span class="j_menu_text">待发货</span>-->
                  <!--</a>-->
                <!--</li>-->
                <!--<li class="j_menu">-->
                  <!--<a>-->
                    <!--<span class="j_menu_text">待收货</span>-->
                  <!--</a>-->
                <!--</li>-->
                <!--<li class="j_menu">-->
                  <!--<a>-->
                    <!--<span class="j_menu_text">待评价</span>-->
                  <!--</a>-->
                <!--</li>-->
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
                        <li v-for="it in value.items" class="on" @click="newJumpTo('/item', it.bookId)">
                          <a class="j_productImg">
                            <img :src="it.book.imagesUrl">
                          </a>
                          <span class="introduce_detail j_product_detail" style="left: 98px;">
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
                      <p v-if="value.orderStatus === 0">待支付</p>
                      <p v-if="value.orderStatus === 1">待发货</p>
                      <p v-if="value.orderStatus === 2">待评价</p>
                      <p v-if="value.orderStatus === 3">已评价</p>
                    </div>
                    <div class="check_order">
                      <ul>
                        <li>
                          <a v-if="value.orderStatus === 0" class="pay1">待付款</a>
                          <a v-if="value.orderStatus === 1" @click="newJumpTo('/judgeOrder', value.id)" style="cursor: pointer;" class="pay1">评价商品</a>
                          <a v-if="value.orderStatus === 2" @click="newJumpTo('/judgeOrder', value.id)" style="cursor: pointer;" class="pay1">评价商品</a>
                          <a v-if="value.orderStatus === 3" class="pay1">已评价</a>
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
      <div v-if="owner.user" id="my_order_page" class="my_order_page">
        <div class="user-set userset-lcol">
          <div class="form1">
            <div class="item">
              <span style="margin-top: 13px" class="label">当前用户：</span>
              <div class="fl">
                <span id="nickname">
                <img :src="userInfo.img" class="userImg">
                <span class="hi">
                  <a class="login_link">
                    <b>{{userInfo.name}}</b>
                  </a>
                </span>
              </span>
              </div>
            </div>
            <div class="item">
              <span class="label">邮箱：</span>
              <div class="fl">
                <div><strong>{{userInfo.email}}</strong></div>
              </div>
            </div>
            <div class="item">
              <span class="label">用户名：</span>
              <div class="fl">
                <input @blur="checkName()" type="text" :class="{'itxt-succ': setUser.canUse}" class="itxt" maxlength="20" id="nickName" v-model="setUser.userName">
              </div>
            </div>
            <div class="item">
              <span class="label">昵称：</span>
              <div class="fl">
                <input type="text" class="itxt" maxlength="20" id="nickName" v-model="setUser.nickName">
              </div>
            </div>
            <div class="item">
              <span class="label">性别：</span>
              <div class="fl">
                <input type="radio" name="sex" class="jdradio" v-model="setUser.sex" value="0"><label class="mr10">男</label>
                <input type="radio" name="sex" class="jdradio" v-model="setUser.sex" value="1"><label class="mr10">女</label>
                <input type="radio" name="sex" class="jdradio" v-model="setUser.sex" value="2"><label class="mr10">保密</label>
              </div>
            </div>
            <div class="item">
              <span class="label">生日：</span>
              <div class="fl birthday-info">
                <select name="" class="selt selt1" id="birthdayYear" v-model="birth.yearVal">
                  <option v-for="value in year" :value="value">{{value}}</option>
                </select>
                <label class="ml5 mr5">年</label>
                <select name="" class="selt selt1" id="birthdayMonth" v-model="birth.mouthVal">
                  <option v-for="value in mouth" :value="value">{{value}}</option>
                </select>
                <label class="ml5 mr5">月</label>
                <select @click="getDay" name="" class="selt selt1" id="birthdayDay" v-model="birth.dayVal">
                  <option v-for="value in day" :value="value">{{value}}</option>
                </select>
                <label class="ml5 mr5">日</label>
              </div>
            </div>
            <div class="item">
              <span class="label">手机号：</span>
              <div class="fl">
                <input type="text" class="itxt" maxlength="20" id="nickName" v-model="setUser.phone">
              </div>
            </div>
            <div class="item">
              <span style="margin-top: 69px" class="label">上传头像：</span>
              <div style="width: 170px" class="user-set userset-lcol fl">
                <div class="form1">
                  <div class="item upup">
                    <uploader url="http://127.0.0.1:8080/indiv-web/user/updateUserImage"></uploader>
                  </div>
                </div>
              </div>
            </div>
            <div class="item">
              <!--<span class="label">&nbsp;</span>-->
              <span class="errmsg">{{setUser.errMsg}}</span>
            </div>
            <div class="item">
              <span class="label">&nbsp;</span>
              <div class="fl">
                <a @click="submitUser()" class="btn-5">提交</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="owner.pass" id="my_order_page" class="my_order_page">
        <div v-if="checkSelf.first" class="form2">
          <div class="item" style="padding-top: 30px">
            <span class="label">已验证邮箱：</span>
            <div class="fl">
              <strong id="mobileSpan" class="ftx-un">{{userInfo.email}}</strong>
              <div class="clr"></div>
            </div>
            <div class="clr"></div>
          </div>
          <div class="item">
            <span class="label">请填写邮箱校验码：</span>
            <div class="fl">
              <input class="itxt" name="code" tabindex="1" id="code" type="text" v-model="setPass.mailCode">
              <a v-if="!doCount" @click="sendNum" id="sendMobileCode" class="btn-10 ml10" style="cursor: pointer;">获取邮箱校验码</a>
              <a v-if="doCount" id="sendMobileCode" class="btn-10 ml10">在{{count}}秒后重试</a>
              <div class="clr"></div>
            </div>
            <div class="clr"></div>
          </div>
          <div class="item">
            <span class="label">验证码：</span>
            <div class="fl">
              <input class="itxt" tabindex="2" name="authCode" id="authCode" type="text" v-model="setPass.imgCode">
              <label><img @click="getCaptcha()" style="cursor: pointer; width: 100px; height: 26px; vertical-align: middle;" id="JD_Verification1" class="ml10" :src="setPass.img" alt="验证码">看不清？<a @click="getCaptcha()" style="cursor: pointer" class="ftx-05">换一张</a></label>
              <div class="clr"></div>
            </div>
            <div class="clr"></div>
          </div>
          <div class="item">
            <span class="label">&nbsp;</span>
            <div class="fl">
              <p>{{errMsgF}}</p>
            </div>
            <div class="clr"></div>
          </div>
          <div class="item">
            <span class="label">&nbsp;</span>
            <div class="fl">
              <a @click="nextStep('second')" id="submitCode" class="btn-7">提交</a>
            </div>
            <div class="clr"></div>
          </div>
        </div>
        <div v-if="checkSelf.second" class="form2">
          <div class="item" style="padding-top: 30px">
            <span class="label">新的登陆密码：</span>
            <div class="fl">
              <input class="itxt" tabindex="2" name="authCode" id="authCode1" type="password" v-model="setPass.password">
              <div class="clr"></div>
            </div>
            <div class="clr"></div>
          </div>
          <div class="item">
            <span class="label">请再输入一次密码：</span>
            <div class="fl">
              <input class="itxt" tabindex="2" name="authCode" id="authCode2" type="password" v-model="setPass.checkPass">
              <div class="clr"></div>
            </div>
            <div class="clr"></div>
          </div>
          <div class="item">
            <span class="label">验证码：</span>
            <div class="fl">
              <input class="itxt" tabindex="2" name="authCode" id="authCode3" type="text" v-model="setPass.imgCode2">
              <label><img @click="getCaptcha()" style="cursor: pointer; width: 100px; height: 26px; vertical-align: middle;" id="JD_Verification1" class="ml10" :src="setPass.img" alt="验证码">看不清？<a @click="getCaptcha()" style="cursor: pointer" class="ftx-05">换一张</a></label>
              <div class="clr"></div>
            </div>
            <div class="clr"></div>
          </div>
          <div class="item">
            <span class="label">&nbsp;</span>
            <div class="fl">
              <p>{{errMsgS}}</p>
            </div>
            <div class="clr"></div>
          </div>
          <div class="item">
            <span class="label">&nbsp;</span>
            <div class="fl">
              <a @click="nextStep('third')" id="submitCode" class="btn-7">提交</a>
            </div>
            <div class="clr"></div>
          </div>
        </div>
        <div v-if="checkSelf.third" class="safe-icon-box">
          <s class="icon-succ02 m-icon"></s>
          <div class="fore">
            <h3 class="ftx-02">恭喜您，修改密码成功！</h3>
            <div class="u-safe">
              最新安全评级：
              <i class="safe-rank04" id="cla"></i><strong class="rank-text ftx-04">低级</strong>
            </div>
          </div>
        </div>
      </div>
      <div v-if="owner.adr" id="my_order_page" class="my_order_page">
        <div class="mt" style="margin-bottom: 20px;">
          <a @click="setFix()" id="edit-add-dialog" class="e-btn add-btn btn-5">新增收货地址</a>
        </div>
        <div v-if="goodsAdr[0]" v-for="(value, index) in goodsAdr" class="mc1" style="background-color: #fff;">
          <div class="sm easebuy-m " id="addresssDiv-138310195">
            <div class="smt">
              <h3>
                {{value.receiveName}}
                <span v-if="value.isUsed" class="ftx-04 ml10">默认地址</span>
              </h3>
              <div class="extra">
                <a @click="delAdr(value, index)" class="del-btn">删除</a>
              </div>
            </div>
            <div class="smc">
              <div class="items new-items">
                <div class="item-lcol">
                  <div class="item">
                    <span class="label">收货人：</span>
                    <div class="fl">
                      {{value.receiveName}}
                    </div>
                    <div class="clr"></div>
                  </div>
                  <div class="item">
                    <span class="label">所在地区：</span>
                    <div class="fl">
                      {{value.receiveArea}}
                    </div>
                    <div class="clr"></div>
                  </div>
                  <div class="item">
                    <span class="label">地址：</span>
                    <div class="fl">
                      {{value.address}}
                    </div>
                    <div class="clr"></div>
                  </div>
                  <div class="item">
                    <span class="label">手机：</span>
                    <div class="fl">
                      {{value.mobile}}
                    </div>
                    <div class="clr"></div>
                  </div>
                </div>
                <div v-if="!value.isUsed" class="item-rcol">
                  <div class="extra">
                    <a @click="setPlace(value, index)" class="ml10 ftx-05" style="cursor: pointer;">设为默认</a>
                  </div>
                </div>
                <div class="clr"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="newFix" class="thickdiv"></div>
    <div v-if="newFix" class="thickbox">
      <div class="thickwrap">
        <div class="thicktitle">
          <span>添加收货地址</span>
        </div>
        <div class="thickcon">
          <div id="addressDiagDiv">
            <div class="m" id="edit-cont">
              <div class="mc">
                <div class="form">
                  <div class="item">
                    <span class="label"><em>*</em>收货人：</span>
                    <div class="fl">
                      <input id="consigneeName" type="text" class="text" v-model="formAdr.name">
                    </div>
                    <div class="clr"></div>
                  </div>
                  <div class="item">
                    <span class="label"><em>*</em>所在地区：</span>
                    <div class="fl birthday-info">
                      <select @change="getPlace2()" style="width: 135px; text-align: center;" name="" class="selt selt1" id="place1" v-model="formAdr.place1">
                        <option>请选择</option>
                        <option v-for="value in place1" :value="value.areaName">{{value.areaName}}</option>
                      </select>
                      <label class="ml5 mr5">省</label>
                      <select @change="getPlace3()" name="" class="selt selt1" id="place2" v-model="formAdr.place2">
                        <option>请选择</option>
                        <option v-for="value in place2" :value="value.areaName">{{value.areaName}}</option>
                      </select>
                      <label class="ml5 mr5">市</label>
                      <select name="" class="selt selt1" id="place2" v-model="formAdr.place3">
                        <option>请选择</option>
                        <option v-for="value in place3" :value="value.areaName">{{value.areaName}}</option>
                      </select>
                      <label class="ml5 mr5">区</label>
                    </div>
                    <div class="clr"></div>
                  </div>
                  <div class="item">
                    <span class="label"><em>*</em>详细地址：</span>
                    <div class="fl">
                      <input id="consigneeAddress" type="text" class="text text1" v-model="formAdr.adr">
                    </div>
                    <div class="clr"></div>
                  </div>
                  <div class="item">
                    <span class="label"><em>*</em>手机号码：</span>
                    <div class="fl">
                      <input id="consigneeAddress" type="text" class="text text1" v-model="formAdr.phone">
                    </div>
                    <div class="clr"></div>
                  </div>
                  <div class="btns">
                    <a @click="saveAdr()" class="e-btn btn-9 save-btn">保存收货地址</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a @click="setFix()" class="thickclose" id="">×</a>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Qs from 'qs'
  import commonTitle from '../components/commonTitle'
  export default {
    name: 'item',
    components:{commonTitle},
    data(){
      return {
        orderGoods: [],
        owner: {
          trade: true,
          user: false,
          pass: false,
          adr: false
        },
        setUser: {
          userName: "",
          canUse: false,
          sex: "",
          phone: "",
          nickName: "",
          errMsg: ""
        },
        userInfo: {
          img: "",
          name: "",
          email: ""
        },
        year: [],
        mouth: [],
        day: [],
        place1: [],
        place2: [],
        place3: [],
        birth: {
          yearVal: "2018",
          mouthVal: "1",
          dayVal: "1"
        },
        imgs: [],
        count: 121,
        doCount: false,
        checkSelf: {
          first: true,
          second: false,
          third: false
        },
        setPass: {
          mailCode: "",
          imgCode: "",
          img: "",
          password: "",
          checkPass: "",
          imgCode2: ""
        },
        errMsgF: "",
        errMsgS: "",
        newFix: false,
        goodsAdr: [],
        formAdr: {
          name: "",
          place1: "请选择",
          place2: "北京",
          place3: "海淀",
          adr: "",
          phone: ""
        },
      }
    },
    mounted() {
      this.getPlace1();
      this.getCaptcha();
      this.getOrder();
      this.getYearMouth();
      this.getDay();
      this.getUserInfo();
      this.getAdr();
    },
    computed: {
      ...mapState({
        imgStatus: state => state.imgstore.img_status,
        imgPaths: state => state.imgstore.img_paths
      })
    },
    methods:{
      getPlace3 () {
        let _self = this;
        console.log(123);
        let id = 0;
        this.place2.forEach(function(value) {
          if (value.areaName === _self.formAdr.place2) {
            id = value.id
          }
        });
        this.$http({
          method: 'get',
          url: 'http://127.0.0.1:8080/indiv-web/area/getAreaByParentId',
          params: {
            parentId: id
          }
        }).then(function(response){
          _self.place3 = [];
          _self.place3 = _self.place3.concat(response.data.data);
          _self.formAdr.place3 = _self.place3[0].areaName;
          console.log(response.data);
        }).catch(function (response){
          console.log(response);
        });
      },
      getPlace2 () {
        let _self = this;
        console.log(123);
        let id = 0;
        this.place1.forEach(function(value) {
          if (value.areaName === _self.formAdr.place1) {
            id = value.id
          }
        });
        this.$http({
          method: 'get',
          url: 'http://127.0.0.1:8080/indiv-web/area/getAreaByParentId',
          params: {
            parentId: id
          }
        }).then(function(response){
          _self.place2 = [];
          _self.place2 = _self.place2.concat(response.data.data);
          _self.formAdr.place2 = _self.place2[0].areaName;
          _self.getPlace3();
          console.log(response.data);
        }).catch(function (response){
          console.log(response);
        });
      },
      getPlace1 () {
        let _self = this;
        this.$http({
          method: 'get',
          url: 'http://127.0.0.1:8080/indiv-web/area/getAreaByLevel',
        }).then(function(response){
          _self.place1 = [];
          _self.place1 = _self.place1.concat(response.data.data);
          console.log(response.data);
        }).catch(function (response){
          console.log(response);
        });
      },
      getAdr () {
        let _self = this;
        this.$http({
          method: 'get',
          url: 'http://127.0.0.1:8080/indiv-web/receiceAddress/getAddressList',
          params: {
            userId: sessionStorage.getItem("userId")
          }
        }).then(function(response){
          _self.goodsAdr = _self.goodsAdr.concat(response.data.data);
          console.log(response.data);
          console.log(_self.goodsAdr);
        }).catch(function (response){
          console.log(response);
        });
      },
      delAdr (val, index) {
        this.goodsAdr.splice(index, 1);
        let _self = this;
        this.$http({
          method: 'post',
          url: 'http://127.0.0.1:8080/indiv-web/receiceAddress//delAddress',
          data: Qs.stringify({
            userId: sessionStorage.getItem("userId"),
            id: val.id
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }).then(function (response) {
          console.log(response);
          _self.setUser.canUse = response.data.data;
        }).catch(function (error) {
          console.log(error);
        });
      },
      setPlace (value, index) {
        this.goodsAdr.forEach(function(val) {
          val.isUsed = 0;
        });
        this.goodsAdr[index].isUsed = 1;
        for (let i = 0 ; i < this.goodsAdr.length; i++) {
          if (this.goodsAdr[i].isUsed === 1) {
            this.goodsAdr = this.goodsAdr.splice(i, 1).concat(this.goodsAdr);
            console.log(this.goodsAdr);
            break;
          }
        }
        let _self = this;
        this.$http({
          method: 'post',
          url: 'http://127.0.0.1:8080/indiv-web/receiceAddress/modifyUsedAddress',
          data: Qs.stringify({
            userId: sessionStorage.getItem("userId"),
            id: value.id
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
      setFix () {
        this.newFix = !this.newFix;
        console.log(this.newFix);
      },
      saveAdr () {
        let place = this.formAdr.place1 + this.formAdr.place2 + this.formAdr.place3;
        let obj = Object.assign({}, {
          receiveName: this.formAdr.name,
          receiveArea: place,
          address: this.formAdr.adr,
          mobile: this.formAdr.phone,
          isUsed: 0
        });
        this.goodsAdr.splice(1, 0, obj);
        this.setFix();
        this.uploadAdr();
      },
      uploadAdr () {
        let place = this.formAdr.place1 + this.formAdr.place2 + this.formAdr.place3;
        let _self = this;
        this.$http({
          method: 'post',
          url: 'http://127.0.0.1:8080/indiv-web/receiceAddress//createAddress',
          data: Qs.stringify({
            userId: sessionStorage.getItem("userId"),
            receiverName: _self.formAdr.name,
            receiveArea: place,
            address: _self.formAdr.adr,
            mobile: _self.formAdr.phone
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }).then(function (response) {
          _self.$router.go(0);
          console.log(response);
        }).catch(function (error) {
          console.log(error);
        });
      },
      submitPass () {
        let _self = this;
        this.$http({
          method: 'post',
          url: 'http://127.0.0.1:8080/indiv-web/user/modifyPasswordBefore',
          data: Qs.stringify({
            email: _self.userInfo.email,
            emailCode: _self.setPass.mailCode,
            captchaCode: _self.setPass.imgCode
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }).then(function (response) {
          _self.errMsgF = response.data.message;
          if (response.data.data) {
            _self.checkSelf.second = true;
            _self.getCaptcha();
          } else {
            _self.checkSelf.first = true;
          }
          console.log(response);
        }).catch(function (error) {
          console.log(error);
        });
      },
      submitPassSenond () {
        let _self = this;
        this.$http({
          method: 'post',
          url: 'http://127.0.0.1:8080/indiv-web/user/modifyPassword',
          data: Qs.stringify({
            userId: sessionStorage.getItem("userId"),
            password: _self.setPass.password,
            captchaCode: _self.setPass.imgCode2
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }).then(function (response) {
          _self.errMsgS = response.data.message;
          if (response.data.data) {
            _self.checkSelf.third = true;
            setTimeout(function() {
              _self.checkSelf.third = false;
              _self.checkSelf.first = true;
            }, 10000);
          } else {
            _self.checkSelf.second = true;
          }
          console.log(response);
        }).catch(function (error) {
          console.log(error);
        });
      },
      getCaptcha () {
        let _self = this;
        this.$http({
          method: 'get',
          responseType: 'arraybuffer',
          url: 'http://127.0.0.1:8080/indiv-web/captcha/captcha.form'
        }).then(function(response){
          console.log(response.data);
          _self.setPass.img =  'data:image/png;base64,' + btoa(
            new Uint8Array(response.data)
              .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        }).catch(function (response){
          console.log(response);
        });
      },
      sendNum () {
        this.count = 121;
        this.doCount = true;
        this.cutDown();
        let _self = this;
        this.$http({
          method: 'post',
          url: 'http://127.0.0.1:8080/indiv-web/user/sendEmailCode',
          data: Qs.stringify({
            email: _self.userInfo.email
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
      cutDown () {
        let _self = this;
        this.count--;
        if (this.count !== 0) {
          setTimeout(function() {
            _self.cutDown()
          }, 1000)
        } else {
          this.doCount = false;
          return false;
        }
      },
      nextStep (val) {
        let _self = this;
        if(val === 'second') {
          if (!this.setPass.mailCode) {
            this.errMsgF = "邮箱验证码不能为空";
            return
          } else if (!this.setPass.imgCode) {
            this.errMsgF = "图片验证码不能为空";
            return
          }
        } else if (val === 'third') {
          if (!this.setPass.password) {
            this.errMsgS = "密码不能为空";
            return
          } else if (!this.setPass.checkPass) {
            this.errMsgS = "确认密码不能为空";
            return
          } else if (this.setPass.password !== this.setPass.checkPass) {
            this.errMsgS = "两次输入密码不一致";
            return
          } else if (!this.setPass.imgCode2) {
            this.errMsgS = "图片验证码不能为空";
            return
          }
        }
        for(let prop in this.checkSelf) {
          this.checkSelf[prop] = false;
        }
        if (val === 'second') {
          this.submitPass();
        } else if (val === 'third') {
          this.submitPassSenond();
        }
      },
      submit () {
        let values = []
        for (let key of this.imgPaths) {
          values.push(key)
        }
        this.imgs = values;
        console.log(this.imgs)
      },
      upload () {
        this.$store.commit('set_img_status', 'uploading')
      },
      submitUser () {
        if (!this.setUser.userName) {
          this.setUser.errMsg = "用户名不能为空";
          return
        } else if (!this.setUser.nickName) {
          this.setUser.errMsg = "昵称不能为空";
          return
        } else if (!this.setUser.sex) {
          this.setUser.errMsg = "性别不能为空";
          return
        } else if (!this.setUser.nickName) {
          this.setUser.errMsg = "生日不能为空";
          return
        } else if (!this.setUser.phone) {
          this.setUser.errMsg = "手机号不能为空";
          return
        }
        this.upload();
        let _self = this;
        this.$http({
          method: 'post',
          url: 'http://127.0.0.1:8080/indiv-web/user//updateUserInfo',
          data: Qs.stringify({
            userId: sessionStorage.getItem("userId"),
            username: _self.setUser.userName,
            nickname: _self.setUser.nickName,
            birthday: _self.birth.yearVal + '年' + _self.birth.mouthVal + '月' + _self.birth.dayVal,
            gender: _self.setUser.sex,
            tel: _self.setUser.phone
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }).then(function (response) {
          _self.setUser.errMsg = response.data.message;
          console.log(response);
        }).catch(function (error) {
          console.log(error);
        });
      },
      getUserInfo () {
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
          _self.userInfo.email = response.data.data.email;
        }).catch(function (response){
          console.log(response);
        });
      },
      checkName () {
        let _self = this;
        this.$http({
          method: 'post',
          url: 'http://127.0.0.1:8080/indiv-web/user/checkUsernameIsOnly',
          data: Qs.stringify({
            username: _self.setUser.userName
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }).then(function (response) {
          console.log(response);
          _self.setUser.canUse = response.data.data;
        }).catch(function (error) {
          console.log(error);
        });
      },
      getYearMouth: function() {
        for (let i = 2018; i >= 1900; i--) {
          this.year.push(i);
        }
        for (let i = 1; i <= 12; i++) {
          this.mouth.push(i);
        }
      },
      getDay: function() {
        let arr = [];
        var temp = new Date(this.birth.yearVal, this.birth.mouthVal, 0);
        for (let i = 1; i <= temp.getDate(); i++) {
          arr.push(i);
        }
        this.day = arr;
      },
      changeTab: function(val) {
        for (let prop in this.owner) {
          this.owner[prop] = false;
        }
        this.owner[val] = true;
      },
      newJumpTo: function (url ,value) {
        this.$router.push({
          path: url,
          query: {
            id: value
          }
        })
      },
      jumpTo: function(url) {
        this.$router.push({path: url})
      },
      getOrder: function() {
        let _self = this;
        this.$http({
          method: 'post',
          url: 'http://127.0.0.1:8080/indiv-web/order/getOrdersList',
          data: Qs.stringify({
            userId: sessionStorage.getItem("userId"),
            orderStatus: 5
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }).then(function (response) {
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
      },
    },
    watch: {
      imgStatus () {
        if (this.imgStatus === 'finished') {
          this.submit()
        }
      }
    },
    destoryed () {
      this.imgs = []
    }
  }
</script>

<style scoped>
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
    width: 988px;
    zoom: 1;
    position: relative;
  }

  .order_show_area:after {
    content: "";
    display: block;
    clear: both;
  }

  .order_show .pic_show_area .info_introduce {
    height: 45px;
    width: auto;
    line-height: 20px;
    overflow: hidden;
    margin-top: 5px;
    color: #646464;
  }

  .order_show .pic_show_area {
    width: 660px;
    height: 78px;
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
    float: left;
    margin: 5px;
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
    top: 25px;
    left: 97px;
    border: 2px solid #ffb8bb;
    z-index: 10000;
    width: 153px;
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
    width: 990px;
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
    height: 50px;
    width: 50px;
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
