<template>
  <div class="wrapper">
    <div id="bd">
      <div class="shadow_box">
        <div class="register_box">
          <div class="body">
            <div class="form">
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tbody>
                <tr>
                  <td class="t">邮箱</td>
                  <td class="z_index2">
                    <input @blur="checkEmailHave()" v-model="formData.email" name="txt_username1" id="txt_username1" autocomplete="off" maxlength="40" tabindex="1" value="" placeholder="请输入您的邮箱" type="text" class="text">
                  </td>
                </tr>
                <tr>
                  <td class="t">登录密码</td>
                  <td>
                    <input v-model="formData.password" name="txt_password" id="txt_password" tabindex="2" type="password" class="text" maxlength="20">
                    <span id="J_tipPassword" class="cue warn"></span>
                  </td>
                  <td>
                    <div @click="bindCode" style="cursor: pointer;border: 1px solid #e6e6e6; text-align: center;height: 36px; line-height: 36px;padding: 0 10px; font-size: 12px;">绑定</div>
                  </td>
                </tr>
                <tr>
                  <td class="t">&nbsp;</td>
                  <td>
                    <div class="mailCodeWrap">
                      {{errMsg}}
                    </div>
                  </td>
                </tr>
                <tr v-if="bindMail">
                  <td class="t j-vcode">邮箱验证码</td>
                  <td class="j-vcode">
                    <div class="mailCodeWrap">
                      <input v-model="formData.emailCode" class="text pin" type="text" id="txt_vcode" autocomplete="off" placeholder="请输入邮箱验证码" maxlength="6" tabindex="5">
                      <span v-if="!doCount" @click="sendNum()" class="cutDown">点击发送邮箱验证码</span>
                      <span v-if="doCount" class="cutDown">请在{{count}}秒后再次发送</span>
                    </div>
                  </td>
                </tr>
                <tr v-if="bindMail">
                  <td class="t">&nbsp;</td>
                  <td>
                    <a @click="logBtn()" id="J_submitRegister" class="btn_login" tabindex="10">提交</a>
                  </td>
                </tr>
                <tr v-if="showMove">
                  <td class="t">动态验证码</td>
                  <td>
                    <input v-model="formData.Moveword" name="txt_password" id="txt_password" tabindex="2" type="text" class="text" maxlength="20">
                    <span id="J_tipPassword" class="cue warn"></span>
                  </td>
                </tr>
                <tr v-if="showMove">
                  <td class="t">&nbsp;</td>
                  <td>
                    <a @click="adLogin()" id="J_submitRegister" class="btn_login" tabindex="10">登录</a>
                  </td>
                </tr>
                </tbody>
              </table>
              <div :class="{'dnone': !showQr}" class="home-container">
                <div class="banner-box">
                  <canvas id="qrccode-canvas"></canvas>
                </div>
                <div @click="jumpLocal" class="banner-box" style="left: 448px">
                  点击登陆
                </div>
                <div class="btn-wrap" style="display: none;">
                  <textarea type="textarea" v-model="bannerUrl" placeholder="输入链接"></textarea>
                  <button @click="createQrc">点击生成二维码</button>
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
  var QRCode = require('qrcode');
  var canvas = '';
  export default {
    name: 'adminLog',
    data(){
      return {
        formData: {
          email: "",
          password: "",
          Moveword: "",
          emailCode: ""
        },
        count: 121,
        doCount: false,
        errMsg: "",
        showLogin: false,
        showMove: false,
        bindMail: false,
        showQr: false,
        bannerUrl: 'otpauth://totp/DIP:1660197411@qq.com?secret=BMR6K5K6SDKL47VQ'
      }
    },
    mounted() {
      this.$nextTick(function () {
        // DOM操作
        canvas = document.getElementById('qrccode-canvas')
      });
    },
    methods:{
      jumpLocal: function() {
        this.$router.go(0);
      },
      createQrc: function () {
        if (!this.bannerUrl) {
          window.alert('链接不能为空');
          return false
        }
        QRCode.toCanvas(canvas, this.bannerUrl, (error) => {
          if (error) {
            console.log(error)
          } else {
            console.log('success')
          }
        })
      },
      bindCode: function() {
        if (!this.checkEmail()) {
          this.errMsg = "请输入正确的邮箱";
          return
        } else if (!this.formData.password) {
          this.errMsg = "请输入密码";
          return
        }
        let _self = this;
        this.$http({
          method: 'post',
          url: 'http://127.0.0.1:8080/indiv-web/admin/checkAdmin',
          data: Qs.stringify({
            username: _self.formData.email,
            password: _self.formData.password
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }).then(function (response) {
          _self.bindMail = response.data.data;
          _self.errMsg = response.data.message;
        }).catch(function (error) {
          console.log(error);
        });
      },
      jumpTo: function(url) {
        this.$router.push({path: url})
      },
      checkEmail: function() {
        var myemail = this.formData.email;
        var myReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
        if( myReg.test(myemail) ){
          return true;
        }else{
          this.errMsg = "邮箱格式不正确";
          return false;
        }
      },
      checkEmailHave: function() {
        if (!this.checkEmail()) {
          this.errMsg = "请输入正确的邮箱";
          return
        }
        let _self = this;
        this.$http({
          method: 'get',
          url: 'http://127.0.0.1:8080/indiv-web/admin/checkAdminIsBinded',
          params: {
            email: _self.formData.email
          }
        }).then(function(response){
          console.log(response.data);
          if (response.data.status === 0) {
            _self.showMove = true
          }
          _self.errMsg = response.data.message;
        }).catch(function (response){
          console.log(response);
        });
      },
      sendNum: function() {
        if (!this.checkEmail()) {
          this.errMsg = "请输入正确的邮箱";
          return
        } else if (!this.formData.password) {
          this.errMsg = "请输入密码";
          return
        }
        this.count = 121;
        this.doCount = true;
        this.cutDown();
        let _self = this;
        this.$http({
          method: 'post',
          url: 'http://127.0.0.1:8080/indiv-web/user/sendEmailCode',
          data: Qs.stringify({
            email: _self.formData.email
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
      cutDown: function() {
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
      logBtn: function() {
        if (!this.checkEmail()) {
          this.errMsg = "请输入正确的邮箱";
          return
        } else if (!this.formData.password) {
          this.errMsg = "请输入密码";
          return
        } else if (!this.formData.emailCode) {
          this.errMsg = "请输入邮箱验证码";
          return
        }
        console.log(123);
        let _self = this;
        this.$http({
          method: 'post',
          url: 'http://127.0.0.1:8080/indiv-web/admin/binding',
          data: Qs.stringify({
            username: _self.formData.email,
            emailCode: _self.formData.emailCode
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }).then(function (response) {
          console.log(response);
          _self.errMsg = response.data.message;
          _self.bannerUrl = response.data.data;
          _self.createQrc();
          _self.showQr = true;
        }).catch(function (error) {
          console.log(error);
        });
      },
      adLogin: function() {
        if (!this.checkEmail()) {
          this.errMsg = "请输入正确的邮箱";
          return
        } else if (!this.formData.password) {
          this.errMsg = "请输入密码";
          return
        } else if (!this.formData.Moveword) {
          this.errMsg = "请填写动态验证码";
          return
        }
        let _self = this;
        this.$http({
          method: 'post',
          url: 'http://127.0.0.1:8080/indiv-web/admin/login',
          data: Qs.stringify({
            username: _self.formData.email,
            password: _self.formData.password,
            dyCode: _self.formData.Moveword
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }).then(function (response) {
          _self.errMsg = response.data.message;
          if (response.data.data) {
            _self.jumpTo('/adminOrder')
          }
          console.log(response);
        }).catch(function (error) {
          console.log(error);
        });
      }
    }
  }
</script>

<style scoped>
  .dnone {
    display: none;
  }

  .banner-box {
    position: relative;
    left: 400px;
  }

  .home-container {
    width: 100%;
  }
  .btn-wrap {
    width: 260px;
    height: 260px;
    margin: 0 auto;
  }
  .btn-wrap textarea{
    width: 260px;
    height: 260px;
  }
  #bd {
    margin: 0 auto;
    width: 1190px;
    padding-top: 40px;
  }

  .shadow_box {
    background-color: #ebeeef;
    width: 1180px;
    margin-bottom: 40px;
    position: relative;
  }

  .register_box {
    background: #fff;
    position: relative;
    top: -10px;
    right: -10px;
    width: 1180px;
    font-family: 'Microsoft YaHei';
    box-shadow: -1px 1px 1px rgb(232,235,236);
  }

  .register_box .body {
    padding: 45px 0 25px;
    position: relative;
  }

  .register_box .body:after {
    content: '';
    display: block;
    clear: both;
  }

  .register_box table {
    color: #9e9e9e;
  }

  tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
  }

  table {
    display: table;
    border-collapse: separate;
    border-top-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 0px;
    border-left-width: 0px;
    -webkit-border-horizontal-spacing: 0px;
    -webkit-border-vertical-spacing: 0px;
    width: 100%;
    border-color: grey;
  }

  tr {
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
  }

  .register_box table .t {
    font-size: 14px;
    width: 338px;
    padding-right: 10px;
    text-align: right;
    vertical-align: top;
    color: #646464;
    padding-top: 8px;
    font-family: 'Microsoft YaHei';
  }

  .register_box table td {
    padding: 0 0 30px;
    position: relative;
  }

  .register_box .z_index2 {
    z-index: 2;
  }

  .register_box .text {
    border: 1px solid #e6e6e6;
    font-family: 'Microsoft YaHei';
    height: 18px;
    float: left;
    width: 290px;
    margin-right: 10px;
    padding: 9px 10px;
    line-height: 18px;
    outline: 0 none;
    border-radius: 2px;
    color: #333;
  }

  .register_box .btn_login {
    display: inline-block;
    font-size: 20px;
    border: 0;
    width: 178px;
    height: 44px;
    line-height: 44px;
    cursor: pointer;
    text-align: center;
    background-color: #ff2832;
    color: #fff;
    border-radius: 22px;
    margin-left: 50px;
    text-decoration: none;
  }

  input, textarea, select, button {
    text-rendering: auto;
    color: initial;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    margin: 0em;
    font: 400 13.3333px Arial;
  }

  input {
    -webkit-appearance: textfield;
    background-color: white;
    -webkit-rtl-ordering: logical;
    cursor: text;
    padding: 1px;
    border-width: 2px;
    border-style: inset;
    border-color: initial;
    border-image: initial;
  }

  input:-moz-placeholder,
  textarea:-moz-placeholder {
    color: #999999;
  }

  input:-ms-input-placeholder,
  textarea:-ms-input-placeholder {
    color: #999999;
  }

  input::-webkit-input-placeholder,
  textarea::-webkit-input-placeholder {
    color: #999999;
  }

  .cutDown {
    font-size: 12px;
    position: absolute;
    right: 0;
    height: 36px;
    line-height: 36px;
    cursor: pointer;
    border: 1px solid #e6e6e6;
    padding-left: 10px;
    padding-right: 10px;
    display: inline-block;
    color: #333;
  }

  .mailCodeWrap {
    position: relative;
    width: 312px;
    text-align: right;
    font-size: 12px;
    color: #ff2832;
  }

  .mailCodeWrap:after {
    content: '';
    display: block;
    clear: both;
  }

  .form {
    position: relative;
    width: 65%;
    padding-left: 10%;
    float: left;
  }

  .form-right {
    position: relative;
    width: 40%;
    float: left;
    height: 471px;
  }

  .form-right > img {
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  .bd {
    margin: 0 auto;
    width: 1190px;
  }

  .title {
    background-color: #fff;
  }

  .bd:after {
    content: '';
    display: block;
    clear: both;
  }

  .bd-img {
    height: 100px;
    float: left;
  }

  .bd-img > img {
    height: 100px;
  }

  .bd-log {
    float: right;
    width: 400px;
    height: 100px;
    line-height: 100px;
  }

  .bd-log:after {
    content: '';
    display: block;
    clear: both;
  }

  .bd-log > .img-right {
    border: 0;
    width: 100px;
    background-image: url('../assets/right.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 40%;
    background-color: #fff;
  }

  .bd-log > div {
    float: right;
    height: 50px;
    width: 140px;
    border: 1px solid #ebeeef;
    text-align: center;
    line-height: 50px;
    margin-top: 48px;
    border-radius: 5px;
    font-size: 14px;
    background-color: #f6f9fb;
  }

  .goLogin {
    cursor: pointer;
    font-weight: bolder;
  }

  .goLogin:hover {
    background-color: #ff2832;
    color: #fff;
  }
</style>
