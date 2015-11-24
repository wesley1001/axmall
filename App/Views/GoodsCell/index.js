'use strict';
var React = require('react-native');
var {
    Image,
    Text,
    View,
    TouchableHighlight,
} = React;
var styles = require('./style.js');
var Goods = require('../Goods');
var GoodsCell = React.createClass({
    render: function() {
        //console.log('http://img.axmall.com.au/' + this.props.goods.goods_img + '!m');
        return (
            <TouchableHighlight onPress={this.props.onSelect} style={styles.goods_item} activeOpacity={0.4}>
                <View style={styles.goods_item}>
                    <Image
                      style={styles.img}
                      source={{uri: 'http://img.axmall.com.au/' + this.props.goods.goods_img + '!m'}} />
                    <Text style={styles.text}>{this.props.goods.goods_name}</Text>
                </View>
            </TouchableHighlight>
        );
    }
});
module.exports = GoodsCell;