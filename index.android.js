'use strict';
var React = require('react-native');
var { AppRegistry, Text, View } = React;
var { Icon } = require('react-native-icons');
var Tabbar = require('./App/Lib/TabBar/index.js');
var Item = Tabbar.Item;


//var QRCodeScreen = require('./App/Components/QRCodeScreen');
var Index = require('./App/Navigation/Index');
var Activity = require('./App/Navigation/Activity');
var Sorts = require('./App/Navigation/Sorts');
var Cart = "";
var User = "";

var Axmall = React.createClass({
    getInitialState: function() {
        return {
            selected: 'activity',
            tabHeight: 55
        };
    },
    onTabItemPress: function(name) {
        this.setState({
            selected: name
        });
    },
    setTabHeight: function(height){
        this.setState({
            selected: height
        });
    },
    render: function() {
        var state = this.state;
        return (
            <View style={{flex: 1}}>
                <Tabbar selected = {state.selected} onTabItemPress = {this.onTabItemPress} tabHeight={this.setTabHeight(55)} >
                    <Item name="index">
                        <Item.Content>
                            <Index/>
                        </Item.Content>
                        <Item.Icon>
                            <Icon
                                name = 'axfont|cart'
                                size = {25}
                                style = {{width: 25, height: 25}}
                            />
                            <Text> 特卖 </Text>
                        </Item.Icon>
                    </Item>
                    <Item name="activity">
                        <Item.Content>
                            <Activity/>
                        </Item.Content>
                        <Item.Icon>
                            <Icon
                                name = 'axfont|cart'
                                size = {25}
                                style = {{width: 25, height: 25}}
                            />
                            <Text> 活动 </Text>
                        </Item.Icon>
                    </Item>
                    <Item name="sorts">
                        <Item.Content> 
                            <Sorts />
                        </Item.Content>
                        <Item.Icon>
                            <Icon
                                name = 'axfont|cart'
                                size = {25}
                                style = {{width: 25, height: 25}}
                            />
                            <Text> 分类 </Text>
                        </Item.Icon>
                    </Item>
                    <Item name="card">
                        <Item.Content>
                            <Cart/>
                        </Item.Content>
                        <Item.Icon>
                            <Icon
                                name = 'axfont|cart'
                                size = {25}
                                style = {{width: 25, height: 25}}
                            />
                            <Text> 购物车 </Text> 
                        </Item.Icon>
                    </Item>
                    <Item name="gift">
                        <Item.Content>
                            <User/>
                        </Item.Content>
                        <Item.Icon>
                            <Icon
                                name = 'axfont|cart'
                                size = {25}
                                style = {{width: 25, height: 25}}
                            />
                            <Text> 用户 </Text>
                        </Item.Icon>
                    </Item>
                </Tabbar>
            </View>
        );
    }
});
AppRegistry.registerComponent('Axmall', () => Axmall);