'use strict';
var React = require('react-native');
var {
    StyleSheet,
    Dimensions
} = React;
module.exports = StyleSheet.create({
    loadingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eee',
        flex: 1
    },
    navFlexContainer: {
        flexDirection: 'row',
        padding: 10
    },
    nav: {
        flex: 1,
        alignItems: 'center'
    },
    rowFlexContainer: {
        flexDirection: 'row',
        backgroundColor: '#f5f5f5',
        paddingTop: 10,
        paddingLeft: 10
    }
});