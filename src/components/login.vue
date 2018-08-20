<template>
  <div v-if="show" class="wrapper">
    <div class="thickdiv"></div>
    <div class="thickbox">
      <div class="thickwrap">
        <div class="thicktitle">
          <div></div>
        </div>
        <div class="thickcon">
          <div id="addressDiagDiv">
            <div class="m" id="edit-cont">
              <div class="mc">
                <div class="form">
                  <div class="item">
                    <div class="label">邮箱名：</div>
                    <div class="fl">
                      <input v-model="formData.userName" id="consigneeName" type="text" class="text" placeholder="请输入用户名">
                    </div>
                    <div class="clr"></div>
                  </div>
                  <div class="item">
                    <div class="label">邮箱密码：</div>
                    <div class="fl">
                      <input v-model="formData.passWord" id="consigneeAddress1" type="password" class="text text1" placeholder="请输入密码">
                    </div>
                    <div class="clr"></div>
                  </div>
                  <div class="item">
                    <div class="label">图片验证码：</div>
                    <div class="fl">
                      <input v-model="formData.imgCode" id="consigneeAddress2" type="text" class="text text1" placeholder="请输入验证码">
                      <img @click="getCaptcha()" :src="formData.img">
                    </div>
                    <div class="clr"></div>
                  </div>
                  <div class="err">
                    <div class="fl">
                      <span class="text">{{errMes}}</span>
                    </div>
                  </div>
                  <div class="btns">
                    <a @click="userLogin()" class="btn_login">登陆</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a @click="delLog()" class="thickclose" id="">×</a>
      </div>
    </div>
  </div>
</template>

<script>
  import Qs from 'qs'
  export default {
    name: 'login',
    props: {
      show: Boolean,
      default: false
    },
    data(){
      return {
        formData: {
          userName: '',
          passWord: '',
          imgCode: '',
          img: ''
        },
        errMes: ""
      }
    },
    mounted() {
      this.getCaptcha();
    },
    methods:{
      delLog: function() {
        this.errMes = "";
        this.$emit('closeIt');
      },
      getCaptcha: function() {
        let _self = this;
        this.$http({
          method: 'get',
          responseType: 'arraybuffer',
          url: 'http://127.0.0.1:8080/indiv-web/captcha/captcha.form'
        }).then(function(response){
          console.log(response.data);
          _self.formData.img =  'data:image/png;base64,' + btoa(
            new Uint8Array(response.data)
              .reduce((data, byte) => data + String.fromCharCode(byte), '')
          );
        }).catch(function (response){
          console.log(response);
        });
      },
      userLogin: function() {
        if (!this.formData.userName) {
          this.errMes = "请输入用户名";
          return
        } else if (!this.formData.passWord) {
          this.errMes = "请输入密码";
          return
        } else if (!this.formData.imgCode) {
          this.errMes = "请输入图片验证码";
          return
        }
        let _self = this;
        this.$http({
          method: 'post',
          url: 'http://127.0.0.1:8080/indiv-web/user/login',
          data: Qs.stringify({
            usernameOrEmail: this.formData.userName,
            password: this.formData.passWord,
            code: this.formData.imgCode
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }).then(function (response) {
          if (response.data.data) {
            sessionStorage.setItem("userId", response.data.data);
            _self.delLog();
            _self.errMes = response.data.message;
            _self.$router.go(0);
          }else {
            _self.errMes = response.data.message;
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
  .thickdiv {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000001;
    width: 100%;
    height: 100%;
    background: #000;
    border: 0;
    opacity: .5;
  }

  .thickbox {
    width: 540px;
    height: 393px;
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
    border-radius: 5px;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
  }

  .thickwrap {
    width: 540px;
  }

  .thicktitle {
    width: 540px;
    height: 60px;
    border: solid #C4C4C4;
    border-width: 1px 1px 0;
    border-radius: 5px;
    background: #F3F3F3;
    line-height: 27px;
    font-family: arial,"\5b8b\4f53";
    font-size: 14px;
    font-weight: 700;
    color: #333;
  }

  .thicktitle >div {
    background-image: url("../assets/huanying.png");
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    height: 60px;
    background-color: #fff;
  }

  .thickcon {
    overflow: auto;
    background: #fff;
    border: solid #C4C4C4;
    border-width: 1px;
    width: 520px;
    height: 310px;
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
    margin: 0 0 25px;
    line-height: 22px;
  }

  #edit-cont .item:after {
    content: '';
    display: block;
    clear: both;
  }

  #edit-cont .item .label {
    display: block;
    vertical-align: middle;
    text-align: left;
    font-size: 14px;
    color: #666;
  }

  #edit-cont .err:after {
    content: '';
    display: block;
    clear: both;
  }

  .fl {
    position: relative;
  }

  #edit-cont .err .label {
    height: 18px;
    line-height: 18px;
    padding: 6px 0;
    width: 100px;
    font-size: 12px;
  }

  .form .err div {
    float: left;
  }

  .form .item div {
    float: left;
  }

  .form .item div.label {
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

  #edit-cont .err .text {
    height: 18px;
    line-height: 18px;
    padding: 6px;
    width: 325px;
    margin-right: 5px;
    vertical-align: middle;
    display: block;
    border: 1px solid #fff;
    text-align: right;
    font-size: 14px;
    color: #e4393c;
  }

  .form .text {
    border: 1px solid #ccc;
  }

  #edit-cont .btns {
    margin: 10px 0 0;
  }

  .thickclose {
    display: block;
    position: absolute;
    z-index: 100000;
    top: 16px;
    right: 12px;
    overflow: hidden;
    width: 30px;
    height: 30px;
    background-image: url("//misc.360buyimg.com/201007/skin/df/i/bg_thickbox.gif");
    background-repeat: no-repeat;
    background-position: 4px -26px;
    background-size: 80%;
    font-size: 0;
    line-height: 100px;
    cursor: pointer;
  }

  .btn_login {
    display: inline-block;
    font-size: 20px;
    border: 0;
    width: 140px;
    height: 44px;
    line-height: 44px;
    cursor: pointer;
    text-align: center;
    background-color: #ff2832;
    color: #fff;
    border-radius: 22px;
    margin-left: 100px;
    text-decoration: none;
  }

  .form {
    padding-left: 70px;
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

  .fl > img {
    position: absolute;
    top: 1px;
    right: 6px;
    cursor: pointer;
  }
</style>
