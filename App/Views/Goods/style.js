'use strict';
var React = require('react-native');
var {
    StyleSheet,
    Dimensions
} = React;
var windowSize = Dimensions.get('window');
module.exports = StyleSheet.create({
    loadingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eee',
        flex: 1
    },
    goods: {
        flex: 1,
        flexDirection: 'column',
    },
    viewpager: {
        width: windowSize.width,
        height: windowSize.width + 100,
        flex: 1
    },
    img: {
        width: windowSize.width - 10,
        height: windowSize.width - 10,
        margin: 5
    },
    goodsNameContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    goodsName:{
        flex: 1,
        margin: 5
    },
    goodsCollect : {
        width: 10
    }
});