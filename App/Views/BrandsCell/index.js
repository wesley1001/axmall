'use strict';

var React = require('react-native');

var {
  Image,
  Text,
  View,
  TouchableHighlight,
} = React;

var styles = require('./style.js');
var BrandsCell = React.createClass({
    render: function() {
        return (
          <TouchableHighlight onPress={this.props._onPress} style={styles.goods_item} activeOpacity={0.4}>
            <View style={styles.goods_item}>
              <Image
                style={styles.img}
                source={{uri: 'http://img.axmall.com.au/' + this.props.brand.brand_logo}}
              />
              <Text style={styles.text}>{this.props.brand.brand_name}</Text>
            </View>
          </TouchableHighlight>
        );
    }
});
module.exports = BrandsCell;
