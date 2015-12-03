/* component */
var React = require('react-native');
var { Image, Text, View, TouchableOpacity, TouchableHighlight, ScrollView, TextInput, WebView, Platform, Dimensions} = React;

var Styles = require('./style.js');
var sku_index_key= 0;
var sku_index_v = 0;
var Sku = React.createClass({
    getInitialState: function() {
        return {
            num : 1,
            addCardWord: '加入购物车',
            skus : [],
            currentSkukey_attr1 : "0",
            currentSkukey_attr2 : "0",
            currentSku : [],
            shop_price: '0.00',
            vip_price: '0.00',
            market_price : '0.00',
            unit_number: 1,
        };
    },
    componentWillMount: function() {

    },
    render:function(){
        sku_index_key = 0;
        sku_index_v = 0;
        var skus = this.props.skus;
        var currentSku = [];
        this.state.currentSku = this.props.skumap[this.state.currentSkukey_attr1 + ':' + this.state.currentSkukey_attr2];
        currentSku = this.state.currentSku;
        var warehousejson = this.props.warehouse;
        var volumesjson = this.props.volumes;
        var unit_number = this.state.unit_number;
        var productid = currentSku.product_id;

        var warehouse = [];
        var volumes = [];
        for (var key in warehousejson){
            warehouse.push({'id': key , 'name': warehousejson[key]});
        }
        var volumesElement;
        if(volumesjson.length && volumesjson[productid].length > 0){
            volumes.push({'id': 1, 'prices':{'shop_price': this.state.currentSku.shop_price + '.00', 'vip_price': this.state.currentSku.vip_price + '.00'}});
            for (var key in volumesjson[productid]){
                volumes.push({'id': key, 'prices':volumesjson[productid][key]});
            }
            volume = volumesjson[productid][unit_number];
            volumesElement = this.renderVolumes(volumes);
        }

        var stock = currentSku.stock[currentSku.warehouse_id];
        
        
        var shipping_price = parseFloat(stock.shipping_price * unit_number);
        var vip_price = parseFloat(stock.vip_price);
        if (unit_number > 1) {
            vip_price = parseFloat(volume.vip_price) + shipping_price;
        }
        var shop_price = parseFloat(stock.shop_price);
        if (unit_number > 1) {
            shop_price = parseFloat(volume.shop_price) + shipping_price;
        }
        var market_price = parseFloat(stock.market_price * unit_number);

        var skuElement = skus.map(this.renderSkuName);
        return (
            <View >
                {this.renderPrice(vip_price.toFixed(2),shop_price.toFixed(2),market_price.toFixed(2))}
                <View style={[Styles.Container,{flexDirection: 'column'}]}>
                    {volumesElement}
                    {skuElement}
                    {this.renderWarehouse(warehouse)}
                </View>
            </View>
        )
    },
    _setVolume: function(id){
        this.setState({
            unit_number : id
        })
    },
    renderVolumes: function(volumes){
        var that = this;
        var stateVolume = this.state.unit_number;
        var currentSku = this.state.currentSku;
        if(volumes.length > 0){
            var volumesElement = volumes.map(function(volume){
                if(volume.id == stateVolume){
                    return(
                        <View style={[Styles.sku,{backgroundColor: '#7ABE31', marginBottom: 8}]}>
                            <Text style={{color: '#fff'}}>{volume.id}{currentSku.unit}</Text>
                        </View>
                    )
                }else{
                    return(
                        <TouchableOpacity style={Styles.sku}
                            onPress={()=>{that._setVolume(volume.id)}}>
                            <Text>{volume.id}{currentSku.unit}</Text>
                        </TouchableOpacity>
                    )
                }
            });
            return (
                <View style={{flexDirection: 'column'}}>
                    <Text style={{marginTop:6, marginBottom: 5}}>套餐: </Text>
                    <View style={{flexDirection: 'row',flex: 1 ,flexWrap: 'wrap'}}>
                        {volumesElement}
                    </View>
                </View>
            )    
        }else{
            return(<View></View>);
        }   
    },
    renderSkuName: function(skus){
        sku_index_key++;
        sku_index_v = 0;
        var skuItemElement = skus.values.map(this.renderSku);
        return(
            <View style={{flexDirection: 'column'}}>
                <Text style={{marginTop:6, marginBottom: 5}}>{skus.name}: </Text>
                <View style={{flexDirection: 'row',flex: 1, flexWrap: 'wrap'}}>
                    {skuItemElement}
                </View>
            </View>
        )
    },
    _setSku: function(line_key){
        var key = line_key.split(":");
        if(key[0] == 1){
            this.setState({
                'currentSkukey_attr1' : key[1]
            })
        }else if(key[0] == 2){
            this.setState({
                'currentSkukey_attr2' : key[1]
            })
        }
    },
    renderSku: function(sku){
        var thatkey = sku_index_key + ":" + sku_index_v;
        var that = this;
        if((sku_index_key == 1 && sku_index_v == this.state.currentSkukey_attr1) || (sku_index_key == 2 && sku_index_v == this.state.currentSkukey_attr2)){
            sku_index_v ++;
            return(
                <View style={[Styles.sku,{backgroundColor: '#7ABE31',marginBottom:8}]}>
                    <Text style={{color: '#fff'}}>{sku}</Text>
                </View>
            )
        }else{
            sku_index_v ++;
            return(
                <TouchableOpacity style={Styles.sku}
                    onPress={()=>{that._setSku(thatkey)}}>
                    <Text>{sku}</Text>
                </TouchableOpacity>
            )
        }
    },
    renderWarehouse: function(warehouses){
        var currentSku = this.state.currentSku;
        if(warehouses.length > 0){
            var warehouseElement = warehouses.map(function(warehouse){
                if(warehouse.id == currentSku.warehouse_id){
                    return(
                        <View style={[Styles.sku,{backgroundColor: '#7ABE31'}]}>
                            <Text style={{color: '#fff'}}>{warehouse.name[0]}</Text>
                        </View>
                    )
                }else{
                    return(
                        <TouchableOpacity style={Styles.sku}>
                            <Text>{warehouse.name[0]}</Text>
                        </TouchableOpacity>
                    )
                }
            });
            return(
                <View style={{flexDirection: 'column', marginBottom: 8}}>
                    <Text style={{marginTop:6, marginBottom: 5}}>仓库: </Text>
                    <View style={{flexDirection: 'row',flex: 1}}>
                        {warehouseElement}
                    </View>
                </View>
            )
        }else{
            return(<View></View>);
        }
    },
    renderPrice: function(vip_price, shop_price, market_price){
        return (
            <View style={[Styles.Container,{flexDirection: 'column'}]}>
                <Text style={{marginBottom: 5}}>VIP 价：<Text style={{color: '#DF3900'}}>￥<Text style={{fontSize:20,fontWeight:'800'}}>{vip_price}</Text></Text></Text>
                <Text style={{marginBottom: 5}}>零售价：<Text>￥{shop_price}</Text>  / 市场价：<Text>￥{market_price}</Text></Text>
                <Text>关  税：<Text style={{fontSize: 12,color:'#999'}}>本商品适用税率为10%，保税仓单笔订单关税 ≤ 50元则免征</Text></Text>
            </View>
        )
    }
})

module.exports = Sku;