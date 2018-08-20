<template>
  <div class="wrapper">
    <common-title></common-title>
    <div id="hd">
      <div class="sub"></div>
    </div>
    <div id="bd">
      <div class="con ">
        <div class="con search_wrap clearfix">
          <div class="col search_left">
            <div>
              <div class="con shoplist">
                <div id="search_nature_rg">
                  <ul class="bigimg">
                    <li v-if="!pagePic[0]" style="text-align: center; line-height: 242px;">
                      抱歉不存在该关键字相关书籍!
                    </li>
                    <li v-if="pagePic[0]" v-for="value in pagePic" class="line1">
                      <a class="pic">
                        <img @click="newJumpTo('/item', value.id)" :src="value.imagesUrl">
                      </a>
                      <p class="name">{{value.bookName}}</p>
                      <p class="price">价格：￥{{value.defaultPrice.toFixed(2)}}</p>
                      <p class="detail1">商品库存：{{value.bookCount}}</p>
                      <p class="detail2">商品编号：{{value.id}}</p>
                      <p class="detail3">商家: {{value.sellerName}}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div v-if="!ifSearch" class="fenYeIt">
              <ul class="pagination" >
                <li v-show="current != 1" @click="current-- && goto(current--)" ><a>上一页</a></li>
                <li v-for="index in pages" @click="goto(index)" :class="{'active':current == index}" :key="index">
                  <a>{{index}}</a>
                </li>
                <li v-show="allpage != current && allpage != 0 " @click="current++ && goto(current++)"><a>下一页</a></li>
              </ul>
            </div>
          </div>
          <div class="col good_right">
            <div class="con ">
              <div class="abox ad_product">
                <h3>搜索推荐</h3>
                <ul class="list2">
                  <li v-for="value in tPic">
                    <a class="pic">
                      <img @click="newJumpTo('/item', value.id)" :src="value.imagesUrl">
                    </a>
                    <p class="data">
                      {{value.bookName}}
                    </p>
                    <p class="price_p"><span class="d_price">¥{{value.defaultPrice.toFixed(2)}}</span></p>
                  </li>
                </ul>
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
  export default {
    name: 'searchItem',
    components:{commonTitle},
    data(){
      return {
        tPic: [],
        pagePic: [],
        tradeId: 1,
        current:1,
        showItem:5,
        allMsg: 65,
        ifSearch: ""
      }
    },
    mounted() {
      this.getGoods1();
      if (sessionStorage.getItem("search")) {
        this.ifSearch = sessionStorage.getItem("search");
        this.searchItem();
      } else {
        this.tradeId = this.$route.query.id;
        console.log(this.tradeId);
        this.getTrade();
      }
    },
    computed:{
      allpage: function() {
        return Math.ceil(this.allMsg / this.showItem);
      },
      pages:function(){
        var pag = [];
        if( this.current < this.showItem ){ //如果当前的激活的项 小于要显示的条数
          //总页数和要显示的条数那个大就显示多少条
          var i = Math.min(this.showItem,this.allpage);
          while(i){
            pag.unshift(i--);
          }
        }else{ //当前页数大于显示页数了
          var middle = this.current - Math.floor(this.showItem / 2 ),//从哪里开始
            i = this.showItem;
          if( middle >  (this.allpage - this.showItem)  ){
            middle = (this.allpage - this.showItem) + 1
          }
          while(i--){
            pag.push( middle++ );
          }
        }
        return pag
      }
    },
    methods:{
      searchItem: function() {
        let _self = this;
        let word = sessionStorage.getItem("search");
        this.$http({
          method: 'post',
          url: 'http://127.0.0.1:8080/indiv-web/keyword/search',
          data: Qs.stringify({
            keyword: word
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }).then(function (response) {
          _self.pagePic = [];
          _self.pagePic = _self.pagePic.concat(response.data.data);
          console.log(response.data);
          console.log(_self.pagePic);
          console.log(response);
        }).catch(function (error) {
          console.log(error);
        });
        sessionStorage.removeItem('search');
      },
      newJumpTo: function (url ,value) {
        if (this.$route.name === 'item') {
          this.$router.go(0);
        }
        this.$router.push({
          path: url,
          query: {
            id: value
          }
        })
      },
      goto: function (index){
        if(index === this.current) return;
        this.current = index;
        console.log(this.current);
        this.getTrade();
      },
      getGoods1: function() {
        let _self = this;
        this.$http({
          method: 'get',
          url: 'http://127.0.0.1:8080/indiv-web/book/getBookOfSalesMost1'
        }).then(function(response){
          _self.tPic = _self.tPic.concat(response.data.data).slice(0, 5);
          console.log(response);
        }).catch(function (response){
          console.log(response);
        });
      },
      getTrade: function() {
        let _self = this;
        this.$http({
          method: 'get',
          url: 'http://127.0.0.1:8080/indiv-web/book/getBookByTradeIdAndPage',
          params: {
            tradeId: _self.tradeId,
            pageId: _self.current,
            pageSize: _self.showItem
          }
        }).then(function(response){
          _self.pagePic = [];
          _self.pagePic = _self.pagePic.concat(response.data.data);
          _self.allMsg = response.data.total;
          console.log(1111111);
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

  #bd {
    width: 1200px;
    margin: 0 auto;
    background: #fff;
  }

  .con {
    clear: both;
    zoom: 1;
  }

  .clearfix {
    zoom: 1;
  }

  .search_wrap {
    width: 1200px;
    margin: 0 auto;
  }

  .con .col {
    float: left;
  }

  .search_wrap:after {
    content: '';
    display: block;
    clear: both;
  }

  .search_left {
    float: left;
    width: 960px;
    overflow: hidden;
    position: relative;
  }

  .search_wrap .good_right {
    width: 222px;
    float: right;
    overflow: hidden;
  }

  .abox {
    width: 220px;
    float: right;
    border: 1px solid #f2f0f0;
    margin-top: 20px;
    overflow: hidden;
    position: relative;
  }

  .abox h3 {
    height: 36px;
    color: #333;
    font: normal 16px/36px 'Microsoft Yahei';
    padding-left: 14px;
    background-color: #f5f5f5;
    font-weight: bolder;
  }

  .abox .list2 li {
    padding: 12px 10px 5px 10px;
    background: #fff;
    -webkit-transition: all .2s ease-in-out;
    -moz-transition: all .2s ease-in-out;
    -o-transition: all .2s ease-in-out;
    -ms-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out;
  }

  .abox .list2 li .pic {
    width: 198px;
    height: 198px;
    display: block;
    border: 1px solid #ecebeb;
    overflow: hidden;
    cursor: pointer;
  }

  a {
    text-decoration: none;
    outline: none;
  }

  .abox .list2 li .pic img {
    width: 200px;
    height: 200px;
  }

  .abox .data {
    line-height: 18px;
    height: 18px;
    width: 210px;
    overflow: hidden;
    word-break: break-all;
    word-wrap: break-word;
    padding-top: 8px;
    font-size: 12px;
    text-align: center;
  }

  .abox .price_p {
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    text-align: center;
  }

  .d_price {
    font: bold 14px arial,'Hiragino Sans GB',"Simsun";
    color: #fa5000;
    overflow: hidden;
  }

  .pagination {
    position: relative;
    display: inline-block;
    margin: auto;
  }

  .pagination li {
    display: inline-block;
    margin: 0 5px;
  }

  .pagination li a {
    padding: .5rem 1rem;
    display: inline-block;
    border: 1px solid #ddd;
    background: #fff;
    color: #ff2832;
    cursor: pointer;
  }

  .pagination li a:hover {
    background: #eee;
  }

  .pagination li.active a {
    background: #ff2832;
    color: #fff;
    cursor: pointer;
  }

  .fenYeIt {
    margin-top: 30px;
    text-align: center;
  }

  .search_left {
    float: left;
    width: 960px;
    overflow: hidden;
    position: relative;
  }

  .shoplist {
    padding-top: 20px;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    border: 0;
  }

  .shoplist .bigimg li {
    height: 242px;
    width: 960px;
    position: relative;
    background: #fff;
    -webkit-transition: all .2s ease-in-out;
    -moz-transition: all .2s ease-in-out;
    -o-transition: all .2s ease-in-out;
    -ms-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out;
    padding-left: 20px;
  }

  .shoplist .bigimg li:hover {
    background-color: #f8f8f8;
  }

  .shoplist .bigimg li .pic {
    position: absolute;
    left: 20px;
    top: 21px;
    cursor: pointer;
  }

  .shoplist .bigimg li .pic, .shoplist .bigimg li .pic img {
    display: block;
    width: 200px;
    height: 200px;
  }

  .shoplist .bigimg li .pic img {
    display: block;
    width: 200px;
    height: 200px;
  }

  .shoplist .bigimg li .name {
    position: absolute;
    left: 240px;
    top: 21px;
    line-height: 20px;
    height: 20px;
    width: 720px;
    overflow: hidden;
    font-size: 14px;
  }

  .shoplist .bigimg li .detail1 {
    position: absolute;
    left: 240px;
    top: 85px;
    line-height: 20px;
    height: 40px;
    overflow: hidden;
    color: #333;
    width: 720px;
    font-size: 14px;
  }

  .shoplist .bigimg li .detail2 {
    position: absolute;
    left: 240px;
    top: 117px;
    line-height: 20px;
    height: 40px;
    overflow: hidden;
    color: #333;
    width: 720px;
    font-size: 14px;
  }

  .shoplist .bigimg li .detail3 {
    position: absolute;
    left: 240px;
    top: 150px;
    line-height: 20px;
    height: 40px;
    overflow: hidden;
    color: #333;
    width: 720px;
    font-size: 14px;
  }

  .shoplist .bigimg li .price {
    position: absolute;
    left: 240px;
    top: 48px;
    font-family: "arial";
    line-height: 30px;
    width: 720px;
    font-size: 14px;
    font-weight: bolder;
    color: #ff2832;
  }


</style>
