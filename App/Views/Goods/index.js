'use strict';
/* component */
var React = require('react-native');
var { Image, Text, View, TouchableOpacity, ScrollView } = React;
var { Icon } = require('react-native-icons');
var ViewPager = require('react-native-viewpager');
var NavToolbar = require('../../Lib/NavToolbar/index.js');

/* module */
var Styles = require('./style.js');

/* config */
var api = require("../../Network/Apis.js");

/* main */
var Goods = React.createClass({
    getInitialState: function() {
        var dataSource = new ViewPager.DataSource({
            pageHasChanged: (p1, p2) => p1 !== p2,
        });
        return {
            loaded : false,
            title : '商品详情',
            dataUrl: '',
            dataSource: '',
            goods: ''
        };
    },
    componentDidMount: function() {
        var id = this.props.route.id;
        this.state.dataUrl = api.REQUEST_URL + 'goods/' + id;
        this.fetchData();
    },
    fetchData: function() {
        fetch(this.state.dataUrl).then((response) => response.json()).then((responseData) => {
            var goods = responseData;
            this.setState({
                goods: goods,
                dataSource: new ViewPager.DataSource({pageHasChanged: (p1, p2) => p1 !== p2}).cloneWithPages(goods.photos),
                loaded: true,
            });
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
                    <NavToolbar navigator={_nav} title={_title} back={true}/>
                    <ScrollView style={Styles.goods}>
                        <ViewPager
                            dataSource={this.state.dataSource}
                            renderPage={this.renderImg}
                            isLoop={true}
                            style={Styles.viewpager}
                            autoPlay={true} />
                        {this.renderGoods(this.state.goods)}
                    </ScrollView>
                </View>
                
            );
        }
    },
    renderImg: function( data: Object, pageID: number | string,) {
        return (
            <Image
                source={{uri: 'http://img.axmall.com.au/' + data.img_url + '!t'}} 
                style={Styles.img}/>
        )
    },
    renderGoods: function(goods){
        return(
            <View style={Styles.goodsNameContainer}>
                <View style={Styles.goodsName}>
                    <Text style={{fontSize: 16}}>{goods.goods_name}</Text>
                    <Text>{goods.goods_brief}</Text>
                </View>
                <Icon
                    name = 'axfont|cart'
                    size = {30}
                    style = {{width: 30, height: 30 , margin: 10, marginLeft: 20}}
                />
            </View>
        )
    }
});

module.exports = Goods;
