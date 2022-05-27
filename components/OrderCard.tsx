import React, { useState, useEffect} from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, useColorScheme } from 'react-native'
//import moment from 'moment'
interface OrderProps {
    order: any;
    onPress: () => void;
}
const OrderCard = ({ order, onPress }: OrderProps) => {
    const colorScheme = useColorScheme();
    const orderStatus=()=>{
        const status = order.orderStatus.toLowerCase();
        //let statusIcon= require('../images/orders.png')
        let statusMessage = status;
        if(status ==='IN_PROGRESS'){
            statusMessage="delivered"
        }else if(status ==="COMPLETED"){
            statusMessage="delivered"
        }else if(status ==="CANCELLED"){
            statusMessage="cancelled"
        }
        return (
            <View style={{ display: "flex",flex:3,padding:5,alignItems: 'center',justifyContent: 'center'}}>
            {/* <Image source={statusIcon} style={{width:60,height:60}}/> */}
            <Text style={{fontSize:12,color:'#1C1C1C'}}>{statusMessage.toUpperCase()}</Text>
            </View>
    )
    }
return (
<TouchableOpacity style={styles.container}>
    <View style={{display: "flex", flex:1,flexDirection:"row",justifyContent: "space-around"}}>
       {/* <View style={{display:"flex",flex:8,padding:5,marginTop:5,paddingLeft:20,justifyContent:"space-around",alignItems: "flex"}}> */}
            <Text style={{fontSize:22,fontWeight:'500'}}>Order ID: {order.OrderId}</Text>
            <Text style={{fontSize:16,fontWeight:'600'}}>{(order.OrderDate).format('Dd MM YY, h:m:s')}</Text>
            <Text style={{fontSize:20,fontWeight:'500'}}>{order.total}</Text>
        {/* </View> */}
        {orderStatus()}
    </View>
</TouchableOpacity>
);
}

const styles = StyleSheet.create({
container: {     
    display: 'flex',
    flex: 1, 
    width: Dimensions.get('screen').width - 20,
    margin: 10,
    borderRadius: 20,
    backgroundColor: '#FFF',
    height: 100,
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    flexDirection: 'row'
},
navigation: { flex: 2, backgroundColor: 'red'},
body: { flex: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: 'yellow' },
footer: { flex: 1, backgroundColor: 'cyan'}
})

export { OrderCard }

