'use strict';
/* component */
var React = require('react-native');
var { Text, View, ListView, TouchableHighlight, Image } = React;
var { Icon } = require('react-native-icons');
var NavToolbar = require('../../Lib/NavToolbar/index.js');
var GridView =  require("../../Lib/Grid");

/* module */
var Styles = require("./style.js");

/* config */
var api = require("../../Network/Apis.js");

/* data */
var dataUrl = api.REQUEST_URL + 'category/health?page=1';
var data = [
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
var Activity = React.createClass({
    getInitialState: function() {
        return {
            list: [],
            loaded: true,
            title: '特价活动',
            dataSource: [],
        };
    },
    componentDidMount: function() {
        //this.fetchData();
    },
    fetchData: function() {
        fetch(dataUrl).then((response) => response.json()).then((responseData) => {
            this.setState({
                //list: responseData.goods_list,
                list: data,
                loaded: true
            });
        }).done();
    },
    render: function(){
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
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
                <View style={{flex:1}}>
                    <NavToolbar navigator={_nav} title={_title}/>
                    <ListView
                        dataSource={ds.cloneWithRows(data)}
                        renderRow={this.renderItem}
                        style={Styles.bg}
                        />
                </View>
            )
            this.state.loaded = false;
        }
    },
    // _onEndReached : function(){
    //     this.fetchData();
    // },
    
    renderItem: function(activity) {
        return (
            <TouchableHighlight onPress={()=>{this._goToWebView(activity.url,activity.name)}} style={{flex: 1}} activeOpacity={0.4}>
                <View style={Styles.item}>
                    <Image
                      style={Styles.img}
                      source={{uri: activity.img}} />
                    <Text style={Styles.text}>{ activity.name }</Text>
                </View>
            </TouchableHighlight>
        );
    },
    _goToWebView: function(url,name){
        this.props.navigator.push({
            'name': 'webview',
            'id' : url,
            'title' : name,
            'back' : true,
        });
    },
})
module.exports = Activity;