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
    goodsBody: {
        backgroundColor:'#ddd',
        width : windowSize.width,
        height: windowSize.height - 65,
    },
    goods: {
        height: windowSize.height - 115,
        flexDirection: 'column',
        width: windowSize.width,
    },
    addcart: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        width: windowSize.width,
        height: 50,
        borderTopWidth: 1,
        borderTopColor: '#eee'
    },
    changenum: {
        borderColor: '#eee',
        borderWidth: 1,
        alignItems: 'center',
        width: 30,
        height:30,
        marginTop: 10,
    },
    input: {
        justifyContent: 'center',
        width: 50,
        lineHeight: 30,
        height: 30,
        backgroundColor: '#eee',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#DF3900',
        borderRadius: 4,
        marginLeft: 20,
        marginRight: 10,
        paddingLeft: 20,
        paddingRight: 20, 
        alignItems: 'center',
        justifyContent: 'center',
        height: 40
    },
    viewpager: {
        width: windowSize.width,
        height: windowSize.width + 100,
        flex: 1,
        backgroundColor:'#fff'
    },
    img: {
        width: windowSize.width,
        height: windowSize.width,
    },
    Container: {
        flex: 1,
        backgroundColor:'#fff',
        padding: 5,
        paddingTop: 8,
        paddingBottom: 8,
        marginBottom: 10
    },
    goodsName: {
        flex: 1,
    },
    goodsCollect: {
        width: 10
    },
    sku: {
        borderWidth: 1,
        borderColor: '#eee',
        padding: 15,
        paddingTop: 5,
        paddingBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        marginBottom: 8
    }
});