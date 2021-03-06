'use strict';
var React = require('react-native');
var { Image, Text, View, TouchableHighlight } = React;
var Goods = require('../Goods');
var styles = require('./style.js');
var GoodsCell = React.createClass({
    render: function() {
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