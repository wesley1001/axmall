'use strict';
var React = require('react-native');
var {
    StyleSheet,
    Dimensions,
} = React;
var windowSize = Dimensions.get('window');
module.exports = StyleSheet.create({
    goods_item: {
        width: (windowSize.width - 30) / 2,
        height: (windowSize.width) / 2 + 30,
        // padding: 4,
        // borderWidth: 1,
        // borderColor: '#ddd',
        marginRight: 10,
        backgroundColor: '#fff',
        justifyContent: 'center',
        flex: 1
    },
    img: {
        width: (windowSize.width - 40) / 2,
        height: (windowSize.width - 40) / 2,
        margin: 5
    },
    text: {
        fontSize: 14,
        height: 36,
        margin: 5,
        //marginBottom: 10,
    }
});