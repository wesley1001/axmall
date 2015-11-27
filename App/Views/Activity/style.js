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
    bg: {
        backgroundColor: '#eee',
    },
    item: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom: 10
    },
    text: {
        alignItems: 'center',
        fontSize: 16,
        justifyContent: 'center',
        marginBottom: 10,
        flex: 1
    },
    nav: {
        flex: 1,
        alignItems: 'center'
    },
    img: {
        width: windowSize.width,
        height: 120,
        marginBottom: 5
    },
});