'use strict';
var React = require('react-native');
var { AppRegistry, Text, View } = React;
var Tabbar = require('./App/Components/TabBar/index.js');
var Item = Tabbar.Item;

var { Icon } = require('react-native-icons');
//var QRCodeScreen = require('./App/Components/QRCodeScreen');
//var SortsNav = "";
//var IndexView = "";
var Index = require('./App/Navigation/Index');
var Sorts = require('./App/Navigation/Sorts');
var CardView = "";
var GiftView = "";

var Axmall = React.createClass({
    getInitialState: function() {
        return {selected: 'index'};
    },
    onTabItemPress: function(name) {
        this.setState({
            selected: name
        });
    },
    render: function() {
        var state = this.state;
        return (
            <View style={{flex: 1}}>
                <Tabbar selected = {state.selected} onTabItemPress = {this.onTabItemPress} tabHeight={55} >
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
                            <Text> 首页 </Text>
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
                            <CardView/>
                        </Item.Content>
                        <Item.Icon>
                            <Icon
                                name = 'axfont|cart'
                                size = {25}
                                style = {{width: 25, height: 25}}
                            />
                            <Text> 礼金卡 </Text> 
                        </Item.Icon>
                    </Item>
                    <Item name="gift">
                        <Item.Content>
                            <GiftView/>
                        </Item.Content>
                        <Item.Icon>
                            <Icon
                                name = 'axfont|cart'
                                size = {25}
                                style = {{width: 25, height: 25}}
                            />
                            <Text> 优惠券 </Text>
                        </Item.Icon>
                    </Item>
                </Tabbar>
            </View>
        );
    }
});
AppRegistry.registerComponent('Axmall', () => Axmall);
/*<Tabbar selected = {state.selected} onTabItemPress = {this.onTabItemPress} tabHeight={55} >
                    <Item name="index">
                        <Item.Content>
                            <IndexView/>
                        </Item.Content>
                        <Item.Icon>
                            <Icon
                                name = 'axfont|cart'
                                size = {25}
                                style = {{width: 25, height: 25}}
                            />
                            <Text> 首页 </Text>
                        </Item.Icon>
                    </Item>
                    <Item name="sorts">
                        <Item.Content> 
                            <SortsNav />
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
                            <CardView/>
                        </Item.Content>
                        <Item.Icon>
                            <Icon
                                name = 'axfont|cart'
                                size = {25}
                                style = {{width: 25, height: 25}}
                            />
                            <Text> 礼金卡 </Text> 
                        </Item.Icon>
                    </Item>
                    <Item name="gift">
                        <Item.Content>
                            <GiftView/>
                        </Item.Content>
                        <Item.Icon>
                            <Icon
                                name = 'axfont|cart'
                                size = {25}
                                style = {{width: 25, height: 25}}
                            />
                            <Text> 优惠券 </Text>
                        </Item.Icon>
                    </Item>
                </Tabbar>*/