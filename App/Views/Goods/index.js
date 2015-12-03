'use strict';
/* component */
var React = require('react-native');
var { Image, Text, View, TouchableOpacity, ScrollView, TextInput, WebView, Platform, Dimensions} = React;
var MyWebView = (Platform.OS === 'ios') ? WebView : require("../../Lib/Web");
var windowSize = Dimensions.get('window');
var { Icon } = require('react-native-icons');
var ViewPager = require('react-native-viewpager');
var NavToolbar = require('../../Lib/NavToolbar/index.js');

/* module */
var Styles = require('./style.js');
var Sku = require('./Sku');

/* config */
var api = require("../../Network/Apis.js");

var goods = [];

/* main */
var Goods = React.createClass({
    getInitialState: function() {
        return {
            loaded : false,
            goodsUrl : '',
            goodsCommentUrl : '',
            goodsPic : '',
            goods : [],
            skus : "",
            currentSku : [],
            page : 1,
            select : 'info'
        };
    },
    componentDidMount: function() {
        var id = this.props.route.id;
        this.state.goodsUrl = api.REQUEST_URL + 'goods/' + id;
        this.state.goodsCommentUrl = api.REQUEST_URL + 'comment/' + id + '?page=' + this.state.page;
        this.fetchData();
    },
    fetchData: function() {
        fetch(this.state.goodsUrl).then((response) => response.json()).then((responseData) => {
            goods = responseData;
            this.setState({
                goods: goods,
                goodsPic: new ViewPager.DataSource({pageHasChanged: (p1, p2) => p1 !== p2}).cloneWithPages(goods.photos),
                loaded: true,
                skus : goods.sku,
                currentSku: goods.skumap['0:0']
            });
            if (goods.product.is_promote == 1) {
                this.setState({
                    addCardWord : '立即购买'
                })
            } else {
                this.setState({
                    addCardWord : '加入购物车'
                })
            }
            //this.fetchComment();
        }).done();
    },
    fetchComment: function(){
        fetch(this.state.goodsCommentUrl).then((response) => response.json()).then((responseData) => {
            var comment = responseData;
        }).done();
    },
    render: function() {
        if (!this.state.loaded) {
            return (
                <View style={Styles.loadingContainer}>
                    <Text> 加载中.... </Text> 
                </View>
            )
        } else {
            var _nav = this.props.navigator;
            var _title = this.state.title;
            return (
                <View style={{flex: 1}}>
                    <NavToolbar navigator={_nav} title={'商品详情'} back={true}/>
                    <View style={Styles.goodsBody}>
                        <View style={Styles.goods}>
                            <ScrollView >
                                {this.renderGoodsInfo(this.state.goods)}
                                {this.renderGoodsSkuInfo(this.state.currentSku)}
                                {this.renderBrand()}
                                {this.renderGoodsInfoNav()}
                            </ScrollView>
                        </View>
                        <View style={Styles.addcart}>
                            {this.renderAddCart(this.state.goods)}
                        </View>
                    </View>
                </View>
            );
        }
    },
    renderGoodsInfo: function(goods){
        return (
            <View>
                <ViewPager
                    dataSource={this.state.goodsPic}
                    renderPage={this.renderImg}
                    isLoop={true}
                    style={Styles.viewpager}
                    autoPlay={true} />
                {this.renderName(goods)}
            </View>
        )
    },
    renderGoodsSkuInfo: function(sku){
        return(
            <Sku
                skus={this.state.skus}
                skumap={this.state.goods.skumap}
                warehouse={this.state.goods.warehouse}
                volumes={this.state.goods.volumes}/>
        )
    },
    //图片资源 (固定)
    renderImg: function( data: Object, pageID: number | string,) {
        return (
            <Image
                source={{uri: 'http://img.axmall.com.au/' + data.img_url + '!t'}} 
                style={Styles.img}/>
        )
    },
    //商品描述 (固定)
    renderName: function(goods){
        return(
            <View style={[Styles.Container,{flexDirection: 'row'}]}>
                <View style={Styles.goodsName}>
                    <Text style={{fontSize: 16}}>{goods.goods_name}</Text>
                    <Text>{goods.goods_brief}</Text>
                </View>
                <View style={{width: 50, borderColor: '#eee', borderLeftWidth: 1, paddingLeft: 10}}>
                    <Icon
                        name = 'axfont|cart'
                        size = {20}
                        style = {{width: 20, height: 20}} />
                    <Text style={{alignItems: 'center',fontSize:12}}>收藏</Text>
                </View>
            </View>
        )
    },
    //加入购物车 ( limit  通过state 判断)
    renderAddCart: function(goods){
        return (
            <View style={Styles.addcart}>
                <TouchableOpacity style={{padding: 10}}>
                    <Icon
                        name = 'axfont|cart'
                        size = {30}
                        style = {{width: 30, height: 30, color: '#E4434B'}}
                    />
                </TouchableOpacity>
                <View style={{flex:1 ,flexDirection: 'row', height: 50, alignItems: 'center'}}>
                    <View style={{flex:1, flexDirection: 'row',height: 50, justifyContent: 'flex-end'}}>
                        <TouchableOpacity style={Styles.changenum}>
                            <Text style={{fontSize: 20}}>-</Text>
                        </TouchableOpacity>
                        <TextInput
                            style={Styles.input}
                            keyboardType = {'numeric'}
                            textAlign = {'center'}
                            placeholder = {'1'} />
                        <TouchableOpacity style={Styles.changenum}>
                            <Text style={{fontSize: 20}}>+</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <TouchableOpacity style={Styles.button}>
                        <Text style={{color: '#fff', fontSize: 16}}>{this.state.addCardWord}</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        )
    },
    //商品品牌
    renderBrand: function(){
        if(this.state.goods.brand){
            return(
                <View style={[Styles.Container,{flexDirection: 'column'}]}>
                    <TouchableOpacity style={{borderBottomWidth: 1, borderColor: '#eee', flexDirection: 'row', paddingBottom: 10}}>
                        <Image
                            source={{uri: 'http://img.axmall.com.au/' + this.state.goods.brand.brand_logo}} 
                            style={{width: 80, height: 40}}/>
                        <View style={{marginLeft: 10}}>
                            <Text style={{fontSize: 16, fontWeight: 'bold'}}>{ this.state.goods.brand.brand_name }</Text>
                            <Text>{ this.state.goods.brand.brand_brief }</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <Icon
                                name = 'axfont|cart'
                                size = {30}
                                style = {{width: 30, height: 30, color: '#FF8586', marginTop: 5}} />
                            <Text style={{color: '#FF8586'}}>正品采购</Text>
                        </View>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <Icon
                                name = 'axfont|cart'
                                size = {30}
                                style = {{width: 30, height: 30, color: '#FC9132',marginTop: 5}} />
                            <Text style={{color: '#FC9132'}}>O2O体验</Text>
                        </View>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <Icon
                                name = 'axfont|cart'
                                size = {30}
                                style = {{width: 30, height: 30, color:'#1FBDB8',marginTop: 5}} />
                            <Text style={{color:'#1FBDB8'}}>保税清关</Text>
                        </View>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <Icon
                                name = 'axfont|cart'
                                size = {30}
                                style = {{width: 30, height: 30,color:'#6CBF66' ,marginTop: 5}} />
                            <Text style={{color:'#6CBF66'}}>闪电发货</Text>
                        </View>
                    </View>
                </View>
            )
        }else{
            return (
                <View></View>
            )
        }
        
    },
    //商品详情
    renderGoodsInfoNav : function(){
        return(
            <View>
                <View style={{flexDirection: 'row',backgroundColor: '#fff', height:40}}>
                    <TouchableOpacity style={{flex:1,alignItems: 'center',height: 40, justifyContent: 'center'}}>
                        <Text>商品详情</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1,alignItems: 'center',height: 40,justifyContent: 'center'}} onPress={() => this._goToComment(this.state.goods.goods_id)} >
                        <Text>商品评价</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1,alignItems: 'center',height: 40,justifyContent: 'center'}}>
                        <Text>常见问题</Text>
                    </TouchableOpacity>
                </View>
                {this.renderInfo()}
            </View>
        )
    },
    _goToComment: function(id){
        this.props.navigator.push({
            'name': 'goodscomment',
            'id' : id,
            'back' : true
        });
    },
    renderInfo : function(){
        if(this.state.select == 'info'){
            return (
                <MyWebView
                  style={{ flex: 1, width: windowSize.width,height: 3500}}
                  html={this.state.goods.goods_desc}
                  css={'http://static.axmall.com.au/topic/reactnative/index.css'}/>
            )
        }
        // if(this.state.select == 'comment'){
        //     return (
        //         <MyWebView
        //           style={{ flex: 1, width: windowSize.width,height: 3500}}
        //           html={this.state.goods.goods_desc}
        //           css={'http://static.axmall.com.au/topic/reactnative/index.css'}/>
                
        //     )
        // }
    }
});

module.exports = Goods;
