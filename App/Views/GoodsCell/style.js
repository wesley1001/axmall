'use strict';
var React = require('react-native');
var {
    StyleSheet,
    Dimensions,
} = React;
var windowSize = Dimensions.get('window');
module.exports = StyleSheet.create({
    goods_item: {
        width: (windowSize.width - 15) / 2,
        height: (windowSize.width) / 2 + 30,
        marginRight: 5,
        marginTop: 5,
        paddingBottom: 5,
        backgroundColor: '#fff',
        justifyContent: 'center',
        flex: 1
    },
    img: {
        width: (windowSize.width - 35) / 2,
        height: (windowSize.width - 35) / 2,
        margin: 5,
        marginBottom: 0
    },
    text: {
        fontSize: 13,
        height: 30,
        margin: 5,
        //marginBottom: 10,
    }
});