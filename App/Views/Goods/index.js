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

/* config */
var api = require("../../Network/Apis.js");

var goods = [];
var GoodsInfo = function(goods_id, goods_sn, warehouse_id, showel, tplel, vipel, shopel, marketel, cartel) {
    this.goods_id = goods_id;
    this.goods_sn = goods_sn;
    this.warehouse_id = warehouse_id;

    this.showel = showel;
    this.tplel = tplel;
    this.vipel = vipel;
    this.shopel = shopel;
    this.marketel = marketel;
    this.cartel = cartel;

    this.index = '';
    this.skus = {};
    this.warehouses = {};

    this.product = {};
    this.products = {};

    this.addWarehouse  = function(warehouse_id, name, shipping) {
        this.warehouses[warehouse_id] = {
            'name' : name,
            'shipping' : shipping
        }
    }

    this.addSku = function(name, index, val) {
        if (typeof(this.skus[name]) == 'undefined')
        {
            this.skus[name] = {};
        }
        this.skus[name][index] = val;

    }

    this.addProduct = function(index, product_id, goods_sn, attr1, attr2, warehouse_id, market_price, vip_price, shop_price, shipping_price, goods_perlimit, goods_number, unit, is_promote) {
        this.products[index] = {
            'attr1' : attr1,
            'attr2' : attr2,
            'product_id' : product_id,
            'goods_sn' : goods_sn,
            'market_price' : market_price,
            'shop_price' : shop_price,
            'vip_price' : vip_price,
            'shipping_price' : shipping_price,
            'goods_perlimit' : goods_perlimit,
            'goods_number' : goods_number,
            'warehouse_id' : warehouse_id,
            'warehouse' : [],
            'unit' : unit,
            'is_promote' : is_promote,
            'stock' : {

            },
            'volumes' : 0,
            'unit_number' : 1,
            'volume' : {
                '1' : {
                    'vip_price' : vip_price,
                    'shop_price' : shop_price
                }
            }
        }

        if (goods_sn == this.goods_sn)
        {
            this.product = this.products[index];
            this.index = index;
        }
    }

    this.addStock = function(index, warehouse_id, market_price, vip_price, shop_price, shipping_price, goods_number, goods_perlimit) {
        if (typeof(this.products[index]) != 'undefined')
        {
            this.products[index].warehouse.push(warehouse_id);
            this.products[index].stock[warehouse_id] = {
                'market_price' : market_price,
                'vip_price' : vip_price,
                'shop_price' : shop_price,
                'shipping_price' : shipping_price,
                'goods_number' : goods_number,
                'goods_perlimit' : goods_perlimit
            }
        }
    }

    this.addVolume = function(product_id, goods_number, vip_price, shop_price) {

        for (var index in this.products) {
            if (this.products[index].product_id == product_id)
            {
                this.products[index].volumes++;
                this.products[index].volume[goods_number] = {
                    'vip_price' : vip_price,
                    'shop_price' : shop_price
                }
                break;
            }
        }
    }
}

var Sku = React.createClass({
    render:function(){
        var items = this.props.items;
        var skuElement = items.map(this.renderSkuName);
        return (
            <View >
                {skuElement}
            </View>
        )
    },
    renderSkuName: function(sku){
        var skuItemElement = sku.values.map(this.renderSku);
        return(
            <View style={{flexDirection: 'column', marginBottom: 8}}>
                <Text style={{marginTop:6, marginBottom: 5}}>{sku.name}: </Text>
                <View style={{flexDirection: 'row',flex: 1}}>
                    {skuItemElement}
                </View>
            </View>
        )
    },
    renderSku: function(item){
        if(item == this.props.currentItem.attr1_value || item == this.props.currentItem.attr2_value){
            return(
                <View style={[Styles.sku,{backgroundColor: '#7ABE31'}]}>
                    <Text style={{color: '#fff'}}>{item}</Text>
                </View>
            )
        }else{
            return(
                <TouchableOpacity style={Styles.sku}>
                    <Text>{item}</Text>
                </TouchableOpacity>
            )
        }
    }
})
/* main */
var Goods = React.createClass({
    getInitialState: function() {
        var dataSource = new ViewPager.DataSource({
            pageHasChanged: (p1, p2) => p1 !== p2,
        });
        return {
            loaded : false,
            dataUrl: '',
            dataSource: '',
            goods: '',
            addCardWord: '加入购物车',
            skus : "",
            currentSku : [],
            num: 1,
            page : 1,
            select : 'info'
        };
    },
    componentDidMount: function() {
        var id = this.props.route.id;
        this.state.goodsApiUrl = api.REQUEST_URL + 'goods/' + id;
        this.state.goodsCommentUrl = api.REQUEST_URL + 'comment/' + id + '?page=' + this.state.page;
        this.fetchData();
    },
    fetchData: function() {
        fetch(this.state.goodsApiUrl).then((response) => response.json()).then((responseData) => {
            goods = responseData;
            this.setState({
                goods: goods,
                dataSource: new ViewPager.DataSource({pageHasChanged: (p1, p2) => p1 !== p2}).cloneWithPages(goods.photos),
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
            this.fetchComment();
        }).done();
    },
    fetchComment: function(){
        fetch(this.state.goodsCommentUrl).then((response) => response.json()).then((responseData) => {
            var comment = responseData;
            console.log(comment);
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
                    dataSource={this.state.dataSource}
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
            <View>
                {this.renderPrice(sku)}
                {this.renderSku(sku)}
            </View>
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
                            onChangeText={(text) => this.setState({text})}
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

    //商品价格 (通过state sku change 改变)
    renderPrice: function(sku){
        return (
            <View style={[Styles.Container,{flexDirection: 'column'}]}>
                <Text style={{marginBottom: 5}}>VIP 价：<Text style={{color: '#DF3900'}}>￥<Text style={{fontSize:20,fontWeight:'800'}}>{sku.vip_price}.00</Text></Text></Text>
                <Text style={{marginBottom: 5}}>零售价：<Text>￥{sku.shop_price}.00</Text>  / 市场价：<Text>￥{sku.market_price}.00</Text></Text>
                <Text>关  税：<Text style={{fontSize: 12,color:'#999'}}>本商品适用税率为10%，保税仓单笔订单关税 ≤ 50元则免征</Text></Text>
            </View>
        )
    },
    //商品SKU (通过state sku change 改变)
    renderSku: function(sku){
        return(
            <View style={[Styles.Container,{flexDirection: 'row'}]}>
                <Sku items={this.state.skus} currentItem={sku}/>
            </View>
        )
    },
    //商品品牌
    renderBrand: function(){
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
    },
    //商品详情
    renderGoodsInfoNav : function(){
        return(
            <View>
                <View style={{flexDirection: 'row',backgroundColor: '#fff', height:40}}>
                    <TouchableOpacity style={{flex:1,alignItems: 'center',height: 40, justifyContent: 'center'}}>
                        <Text>商品详情</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1,alignItems: 'center',height: 40,justifyContent: 'center'}}>
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
    renderInfo : function(){
        if(this.state.select == 'info'){
            return (
                <MyWebView
                  style={{ flex: 1, width: windowSize.width,height: 3500}}
                  html={this.state.goods.goods_desc}
                  css={'http://static.axmall.com.au/topic/reactnative/index.css'}/>
            )
        }
        if(this.state.select == 'comment'){
            return (
                <ListView
                  dataSource={this.state.commentSource}
                  renderRow={(rowData) => <Text>{rowData}</Text>} />
                
            )
        }
    }
});

module.exports = Goods;
