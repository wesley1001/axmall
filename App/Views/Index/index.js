'use strict';
/* component */
var React = require('react-native');
var { Text, View, ScrollView, TouchableHighlight, Image } = React;
var { Icon } = require('react-native-icons');
var ViewPager = require('react-native-viewpager');
var NavToolbar = require('../../Lib/NavToolbar/index.js');
var GridView =  require("../../Lib/Grid");

/* module */
var Styles = require("./style.js");
var GoodsCell = require("../GoodsCell");

/* config */
var GOODS_PER_ROW = 2;
var api = require("../../Network/Apis.js");

/* data */
var dataUrl = api.REQUEST_URL + 'category/health?page=1';
var slider = [
    {
        "img" : "http://img.axmall.com.au/9/531391447829739.jpg!l",
        "url" : "http://www.axmall.com.au/m/act/honey.html",
        "name" : "澳洲蜂蜜"
    },
    {
        "img" : "http://img.axmall.com.au/9/367191444892229.jpg!l",
        "url" : "http://www.axmall.com.au/m/act/healthbaby2015.html",
        "name" : "健康宝宝"
    },
    {
        "img" : "http://img.axmall.com.au/0/744021444462060.jpg!l",
        "url" : "http://www.axmall.com.au/m/act/motherselect2015.html",
        "name" : "妈咪优选"
    },
]

/* main */
var Index = React.createClass({
    getInitialState: function() {
        return {
            goodsList: [],
            loaded: false,
            title: '澳新优选',
            slider: new ViewPager.DataSource({pageHasChanged: (p1, p2) => p1 !== p2}).cloneWithPages(slider),
        };
    },
    componentDidMount: function() {
        this.fetchData();
    },
    fetchData: function() {
        fetch(dataUrl).then((response) => response.json()).then((responseData) => {
            this.setState({
                goodsList: responseData.goods_list,
                loaded: true,
            });
        }).done();
    },
    render: function() {
        if (!this.state.loaded) {
            return (
                <View style={{flex: 1}}>
                    <NavToolbar navigator = {this.state.title} title={'澳新优选'} />
                    <View style={Styles.loadingContainer}>
                        <Text> 加载中.... </Text> 
                    </View>
                </View>
            )
        } else {
            return (
                <View style={{flex: 1}}>
                    <NavToolbar navigator = {this.state.title}  title={'澳新优选'} />
                    <ScrollView>
                        <ViewPager
                            dataSource = { this.state.slider }
                            renderPage = { this.renderSlider }
                            isLoop = { true }
                            style = { Styles.viewpager }
                            autoPlay = { true } />
                        <View style={Styles.navFlexContainer}>
                            <View style={Styles.nav}>
                                <Icon
                                    name = 'axfont|cart'
                                    size = {30}
                                    style = {{width: 30, height: 30}}
                                />
                                <Text>购物车</Text>
                            </View>
                            <View style={Styles.nav}>
                                <Icon
                                    name = 'axfont|cart'
                                    size = {30}
                                    style = {{width: 30, height: 30}}
                                />
                                <Text>购物车</Text>
                            </View>
                            <View style={Styles.nav}>
                                <Icon
                                    name = 'axfont|cart'
                                    size = {30}
                                    style = {{width: 30, height: 30}}
                                />
                                <Text>购物车</Text>
                            </View>
                            <View style={Styles.nav}>
                                <Icon
                                    name = 'axfont|cart'
                                    size = {30}
                                    style = {{width: 30, height: 30}}
                                />
                                <Text>购物车</Text>
                            </View>
                        </View>
                        {this.renderGoods()}
                    </ScrollView>
                </View>
            )
        }
    },
    renderSlider: function( data: Object,pageID: number | string,) {
        return (
            <TouchableHighlight onPress={()=>{this._onSelectSlider(data.url,data.name)}} style={{flex: 1}} activeOpacity={0.4}>
                <View>
                    <Image
                        source={{uri: data.img}} 
                        style={Styles.img}/>
                </View>
            </TouchableHighlight>
        )
    },
    renderGoods: function() {
        return (
            <GridView
                items={this.state.goodsList}
                itemsPerRow={GOODS_PER_ROW}
                renderItem = {this.renderGoodsCell} />
        )
    },
    renderGoodsCell: function(goods) {
        return (
            <View>
                <GoodsCell 
                    goods={goods} 
                    onSelect={() => this._goToGoods(goods)}/>
            </View>
        );
    },
    _onSelectSlider: function(url,name){
        this.props.navigator.push({
            'name': 'webview',
            'id' : url,
            'title' : name,
            'back' : true,
        });
    },
    _goToGoods: function(goods){
        this.props.navigator.push({
            'name': 'goods',
            'id' : goods.goods_id,
            'back' : true
        });
    }
})
module.exports = Index;