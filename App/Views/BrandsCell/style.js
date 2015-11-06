'use strict';
var React = require('react-native');
var {
    StyleSheet,
    Dimensions,
} = React;
var windowSize = Dimensions.get('window');
module.exports = StyleSheet.create({
    goods_item: {
        width: (windowSize.width - 30) / 3,
        height: (windowSize.width) / 4 + 5,
        // borderWidth: 1,
        // borderColor: '#ddd',
        margin: 5,
        backgroundColor: '#fff',
        alignItems: 'center',
        flex: 1,
    },
    img: {
        width: (windowSize.width - 60) / 3,
        height: (windowSize.width) / 6,
    },
    text: {
        fontSize: 14,
        height: 36,
        margin: 5,
        //marginBottom: 10,
    }
});