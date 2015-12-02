'use strict';
/* component */
var React = require('react-native');
var { Text, View, ScrollView, ListView } = React;
var { Icon } = require('react-native-icons');
var NavToolbar = require('../../Lib/NavToolbar/index.js');
var GiftedSpinner = require('react-native-gifted-spinner');

/* modules */
var Styles = require('./style.js');

/* config */
var GOODS_PER_ROW = 2;
var api = require("../../Network/Apis.js");

/* data*/
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

/* main */
var Comment = React.createClass({
    getInitialState: function() {
        return {
            page : 0,
            loaded : false,
            CommentsList : []
        };
    },
    componentDidMount: function() {
        this.fetchData();
    },
    fetchData: function() {
        console.log(this.props.goodsid);
        var id = this.props.goodsid;
        this.state.page = this.state.page + 1;
        var dataUrl = api.REQUEST_URL + 'comment/' + id + '?page=' + this.state.page;
        fetch(dataUrl).then((response) => response.json()).then((responseData) => {
            if(responseData.comment.length > 0){
                var ary_commentlist = responseData.comment;
                Array.prototype.push.apply(ary_commentlist, responseData.comment);
                this.setState({
                    CommentsList: ary_commentlist,
                    loaded: true,
                });
            }
        }).done();
    },
    render: function(){
        if (!this.state.loaded) {
            return (
                <View style={Styles.loadingContainer}>
                    <Text> 加载中.... </Text> 
                </View>
            )
        } else {
            var _nav = this.props.navigator;
            return (
                <View style={{flex:1}}>
                    <NavToolbar navigator={_nav} title={'商品评价'} back={true}/>
                    <ListView
                      style={}
                      dataSource={this.state.CommentsList}
                      renderRow={this.renderComment}
                      onEndReached = { this._onEndReached } />
                </View>
            )
        }
    },
    renderComment: function(comment) {
        return (
            <View>
                <View>
                    <Text>comment.user_name</Text>
                    <Text>comment.add_time</Text>
                </View>
                {this.renderStar(comment.comment_rank)}
            </View>
        );
    },
    renderStar:function(rank){
        var star = this.renderIcon()
        console.log(star);
    },
    renderIcon: function(){
        return(
            <Icon
                name = 'axfont|cart'
                size = {10}
                style = {{width: 10, height: 10}}
            />
        )
    }
    _onEndReached : function(){
        this.fetchData();
    },
})
module.exports = Category;