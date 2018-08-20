<template>
  <div class="wrapper">
    <common-title></common-title>
    <div id="hd">
      <div class="sub">
        <ul>
          <li v-for="value in firstTrade">
            <a @click="newJumpTo('/itemList', value.id)">{{value.categoryName}}</a>
          </li>
        </ul>
      </div>
    </div>
    <div id="bd_auto">
      <div class="con top_ad_banner">
        <div class="book_1ad ">
          <a class="pic">
            <img src="http://img61.ddimg.cn/upload_img/00678/zsts/1200x65_djj_0518-1526628296.jpg">
          </a>
        </div>
      </div>
      <div class="con storey_one">
        <div class="col storey_one_left">
          <div class="sidemenu ">
            <div class="con flq_head">图书分类</div>
            <div class="con flq_body">
              <div v-for="value in firstTrade" class="level_one">
                <div class="con primary_dl">
                  <div @click="newJumpTo('/itemList', value.id)" class="firstTr">
                    {{value.categoryName}}
                  </div>
                  <div class="secondTr">
                    <span v-for="(it, index) in value.children" @click="newJumpTo('/searchItem', it.id)">
                      <span>{{it.categoryName}}</span>
                      <span v-if="index !== value.children.length - 1">&nbsp;</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col storey_one_center">
          <div class="tab_box_aa">
            <div v-on:mouseenter="stopPlay()" v-on:mouseleave="play()" class="swiper-container gallery-top swiper-container-horizontal">
              <div class="swiper-wrapper">
                <div v-for="value in lbt" class="swiper-slide swiper-slide-next" style="width: 100%; margin-right: 10px;" v-bind:style="{backgroundImage: 'url(' + value.image + ')'}"></div>
              </div>
              <div class="swiper-pagination"></div>
              <div class="swiper-button-next"></div>
              <div class="swiper-button-prev"></div>
            </div>
          </div>
          <div class="book_online ">
            <div class="book_online_title " name="m403754_pid5292_t9125"></div>
            <div class="roll_aa ">
              <div class="over">
                <div class="img-area">
                  <ul class="product_ul ">
                    <li v-for="value in tPic" class="line1">
                      <a @click="newJumpTo('/item', value.id)" class="img" style="cursor: pointer;">
                        <img :src="value.imagesUrl">
                      </a>
                      <p class="name">
                        <a>{{value.bookName}}</a>
                      </p>
                      <p class="price">
                        <span class="rob">
                          <span class="sign">¥</span>
                          <span class="num">{{value.defaultPrice.toFixed(2)}}</span>
                        </span>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col storey_one_right">
          <div class="con">
            <div class="book_new ">
              <div class="con title">
                <a class="hot_link">
                  新书热卖榜
                </a>
              </div>
              <div class="con list">
                <div class="tab_box_aa ">
                  <div class="tab_content_aa tab_content_aa ">
                    <div class="book_top ">
                      <ul class="list_ab">
                        <li v-for="(value, index) in hotBook" class="line1 bar">
                          <span class="num num1">{{index + 1}}</span>
                          <p class="name">
                            <a @click="newJumpTo('/item', value.id)">{{value.bookName}}</a>
                          </p>
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
  import commonTitle from '../components/commonTitle'
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';
  let galleryTop;
  export default {
    name: 'home',
    components:{commonTitle},
    data(){
      return {
        firstTrade: [],
        tPic: [],
        hotBook: [],
        lbt: [
          {
            'image': '"http://img50.ddimg.cn/9002890038543560.jpg"'
          }, {
            'image': '"http://img63.ddimg.cn/upload_img/00726/0906/wenyi750x315-1526626066.jpg"'
          }, {
            'image': '"http://img61.ddimg.cn/upload_img/00716/12313/750x315_lyx_0514-1526374487.jpg"'
          }, {
            'image': '"http://img60.ddimg.cn/ddreader/dangebook/n20y5b750-315.jpg"'
          }, {
            'image': '"http://img61.ddimg.cn/topic_img/gys_0015115/2018.5.21GSH750x315.jpg"'
          }, {
            'image': '"http://img53.ddimg.cn/9003020055395973.jpg"'
          }
        ],
      }
    },
    mounted() {
      this.tradeGet();
      this.swiper();
      this.getGoods1();
      this.getGoods2();
    },
    methods:{
      swiper: function() {
        galleryTop = new Swiper('.gallery-top', {
          pagination: '.swiper-pagination',
          paginationClickable :true,
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          autoplay : 2000,
          initialSlide: 1,
          effect : 'fade',
          loop : true
        });
        Array.from(galleryTop.bullets).forEach(function(value, index) {
          value.style.backgroundColor = "#ff2832";
          value.innerHTML = index + 1;
          value.style.width = "15px";
          value.style.height = "15px";
          value.style.textAlign = "center";
          value.style.lineHeight = "15px";
          value.style.color = "#000";
          value.style.border = "2px solid #fff";
          value.style.fontSize = "12px";
        });
      },
      stopPlay () {
        galleryTop.stopAutoplay();
      },
      play () {
        galleryTop.startAutoplay();
      },
      newJumpTo: function (url ,value) {
        this.$router.push({
          path: url,
          query: {
            id: value
          }
        })
      },
      tradeGet: function() {
        let _self = this;
        this.$http({
          method: 'get',
          url: 'http://127.0.0.1:8080/indiv-web/category/getCategoryFirstAndSecond'
        }).then(function(response){
          if (response.data.data) {
            _self.firstTrade = _self.firstTrade.concat(response.data.data);
          }
          console.log(response.data);
        }).catch(function (response){
          console.log(response);
        });
      },
      getGoods1: function() {
        let _self = this;
        let userId1 = "";
        if (sessionStorage.getItem("userId")) {
          userId1 = sessionStorage.getItem("userId");
        } else {
          userId1 = "";
        }
        this.$http({
          method: 'get',
          url: 'http://127.0.0.1:8080/indiv-web/recommendOnBook/recommendBasedOnBook',
          params: {
            userId: userId1
          }
        }).then(function(response){
          _self.tPic = _self.tPic.concat(response.data.data).slice(0, 8);
          console.log(_self.tPic);
          console.log(response);
        }).catch(function (response){
          console.log(response);
        });
      },
      getGoods2: function() {
        let _self = this;
        this.$http({
          method: 'get',
          url: 'http://127.0.0.1:8080/indiv-web/book/getBookOfSalesMost2'
        }).then(function(response){
          _self.hotBook = _self.hotBook.concat(response.data.data);
          console.log(response);
        }).catch(function (response){
          console.log(response);
        });
      }
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

  #hd .sub ul {
    height: 31px;
    margin: 0 auto;
    overflow: hidden;
    line-height: 30px;
    width: 1200px;
  }

  ul {
    padding: 0;
    list-style-type: none;
    border: 0;
  }

  #hd .sub ul li {
    float: left;
    padding: 0 15px;
    margin-left: -1px;
    white-space: nowrap;
    background: url(http://img4.ddimg.cn/header/header2014/sub_line_bg.png) right center no-repeat;
  }

  #hd .sub ul li a {
    cursor: pointer;
  }

  #hd .sub ul li a:hover {
    color: #ff2832;
    text-decoration: underline;
  }

  li {
    margin: 0;
    padding: 0;
    list-style-type: none;
    border: 0;
  }

  #hd a {
    color: #646464;
    text-decoration: none;
  }

  #bd_auto {
    width: 100%;
    font-family: Arial;
    margin-top: 15px;
    background-color: #fff;
  }

  .top_ad_banner {
    margin-bottom: 10px;
  }

  .top_ad_banner {
    width: 1200px;
    margin: 0 auto;
  }

  .con {
    clear: both;
    zoom: 1;
  }

  div {
    margin: 0;
    padding: 0;
    list-style-type: none;
    border: 0;
  }

  .top_ad_banner .book_1ad .pic, .top_ad_banner .book_1ad .pic img {
    display: block;
    width: 1200px;
    height: 65px;
  }

  .storey_one {
    width: 1200px;
    margin: 0 auto;
  }

  .storey_one .storey_one_left {
    margin-right: 10px;
  }

  .storey_one .storey_one_left, .storey_one .storey_one_center, .storey_one .storey_one_right {
    float: left;
  }

  .storey_one .storey_one_left {
    z-index: 6;
    position: relative;
  }

  .sidemenu {
    width: 190px;
    height: 901px;
    overflow: hidden;
    border-bottom: 1px solid #666;
  }

  .sidemenu .flq_head {
    height: 35px;
    width: 190px;
    text-align: center;
    font-size: 18px;
    background: #ff2832;
    border-radius: 4px 4px 0 0;
    line-height: 34px;
    color: #fff;
    font-family: "Microsoft Yahei";
  }

  .con:after {
    content: '.';
    height: 0;
    display: block;
    clear: both;
    visibility: hidden;
  }

  .sidemenu .flq_body {
    width: 190px;
    border-top: 2px dotted #487a6f;
    border-bottom: 1px solid #487a6f;
    position: relative;
    height: 878px;
  }

  .top_ad_banner {
    margin-bottom: 10px;
  }

  .sidemenu .flq_body .level_one {
    width: 188px;
    border: 1px solid #487a6f;
    border-width: 0 1px;
  }

  .sidemenu .flq_body .level_one .primary_dl {
    width: 170px;
    border-bottom: 1px solid #666;
    margin-left: 9px;
    position: relative;
    overflow: hidden;
    padding-top: 3px;
    padding-bottom: 2px;
  }

  .firstTr {
    font-weight: bolder;
    color: #487a6f;
    font-size: 14px;
    padding-bottom: 5px;
    margin-top: 5px;
    border-bottom: 1px dotted #849555;
    cursor: pointer;
  }

  .secondTr {
    font-size: 14px;
    color: #666;
    margin-bottom: 5px;
    margin-top: 5px;
  }

  .secondTr > span {
    display: inline-block;
    cursor: pointer;
  }

  .secondTr > span :hover {
    color: #849555;
  }

  .storey_one .storey_one_left, .storey_one .storey_one_center {
    margin-right: 10px;
  }

  .storey_one_center .tab_box_aa {
    width: 750px;
    position: relative;
    margin-bottom: 10px;
    overflow: hidden;
  }

  .gallery-top {
    height: 318px;
    width: 100%;
  }

  .gallery-thumbs .swiper-slide {
    width: 30%;
    height: 4rem;
    opacity: 0.3;
  }

  .swiper-slide {
    background-repeat: no-repeat;
    background-position: center;
  }

  .swiper-container-horizontal>.swiper-pagination-bullets {
    text-align: right;
  }

  .book_online {
    width: 750px;
    overflow: hidden;
    position: relative;
    height: 590px;
  }

  .book_online .book_online_title {
    background: url(http://book.dangdang.com/Standard/Book/Extend/hosts/images/home/new_book.png) no-repeat;
    height: 43px;
    width: 750px;
    font-size: 0;
    line-height: 0;
    text-indent: -9999px;
  }

  .book_online .over {
    width: 750px;
    overflow: hidden;
    height: 530px;
    position: relative;
  }

  .img-area {
    width: 750px;
    overflow: hidden;
  }

  .book_online .product_ul {
    width: 800px;
    padding-top: 25px;
  }

  .book_online .product_ul li {
    width: 150px;
    margin-right: 47px;
    margin-bottom: 16px;
    height: 250px;
    position: relative;
    overflow: visible;
    float: left;
  }

  .book_online .product_ul a.img, .book_online .product_ul li img {
    width: 150px;
    display: block;
    height: 150px;
  }

  .book_online .product_ul a {
    text-decoration: none;
  }

  .book_online .product_ul li .name {
    padding: 7px 20px 0;
    height: 18px;
    line-height: 18px;
    overflow: hidden;
    text-align: center;
    text-overflow:ellipsis;
    white-space:nowrap
  }

  .book_online .product_ul li .name a, .book_online .product_ul li .name a:hover {
    color: #000;
    font-size: 12px;
    display: inline-block;
  }

  .book_online .product_ul li .price {
    padding-left: 20px;
    padding-right: 20px;
    line-height: 16px;
    overflow: hidden;
    font-family: "Arial";
    font-size: 14px;
    position: relative;
    height: 36px;
    text-align: center;
    margin-top: 10px;
  }

  .book_online .product_ul li .price .rob {
    color: #c30;
    overflow: hidden;
    font-weight: bold;
    margin-right: 12px;
  }

  .book_new {
    width: 240px;
  }

  .book_new .title {
    height: 40px;
    line-height: 40px;
    padding-left: 34px;
    font-size: 16px;
    color: #000;
    font-weight: bold;
    background: url(http://book.dangdang.com/Standard/Book/Extend/hosts/images/home/sprite.png) 5px 4px no-repeat;
    font-family: "Microsoft Yahei";
    position: relative;
    overflow: hidden;
  }

  .book_new .title a {
    color: #d72832;
  }

  .book_new .tab_content_aa {
    border: 1px solid #eaeaea;
    border-top: 0;
    padding-top: 3px;
  }

  .book_new .tab_content_aa .book_top {
    position: relative;
    height: 739px;
    padding-top: 5px;
  }

  .book_new .tab_content_aa .book_top .list_ab {
    position: relative;
    height: 739px;
    overflow: hidden;
  }

  ul, li {
    margin: 0;
    padding: 0;
    list-style-type: none;
    border: 0;
  }

  .book_new .tab_content_aa .list_ab li.bar {
    height: 36px;
    line-height: 36px;
    border-bottom: 1px dotted #d8d8d8;
    width: 220px;
    margin-left: 9px;
    vertical-align: top;
    font-size: 12px;
  }

  .book_new .tab_content_aa .list_ab li.line1 span.num1 {
    color: #d10000;
  }

  .book_new .tab_content_aa .list_ab li.bar span.num {
    width: 29px;
    padding-left: 8px;
    float: left;
    font-size: 16px;
  }

  .book_new .tab_content_aa .list_ab li.bar .name {
    float: left;
    height: 36px;
    position: relative;
    overflow: hidden;
    width: 182px;
  }

  .book_new .tab_content_aa .list_ab li.bar .name a {
    color: #000;
    word-break: break-all;
    word-wrap: break-word;
    cursor: pointer;
  }

  .book_new .tab_content_aa .list_ab li.bar .name a:hover {
    color: #ec7814;
  }
</style>
