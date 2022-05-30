import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, useColorScheme } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
interface OrderProps {
    order: any;
}
const OrderCard = ({ order }: OrderProps) => {
    const colorScheme = useColorScheme();
    const orderStatus=()=>{
        const status = order.status.toLowerCase();
        let statusIcon;
        let statusMessage = status;
        if(status ==='IN_PROGRESS'){
            statusMessage="in progress"
            statusIcon= "progress_clock"
        }else if(status ==="COMPLETED"){
            statusMessage="delivered"
            statusIcon= "done-all"
        }else if(status ==="CANCELLED"){
            statusMessage="cancelled"
            statusIcon= "cancel"
        }
        return (
            <View style={styles.image_container}>
                <MaterialCommunityIcons name= "progress-clock" size={40} color="black"/>
            <Text style={{fontSize:12,color:'#1C1C1C'}}>{statusMessage.toUpperCase()}</Text>
            </View>
    )
    }
return (
<TouchableOpacity style={styles.container}>
    <View style={styles.details_container}>
        <View style={styles.infos}> 
            <Text style={{fontSize:22,fontWeight: 'bold'}}>Order ID # {order.id}</Text>
              <Text style={{fontSize:16,fontWeight:'600',color:'#1C1C1C'}}>{new Date(order.createdAt).toLocaleDateString("en-US")}</Text>   
            <Text style={{fontSize:24,fontWeight:'700',color:'orange'}}>{order.total} TND</Text>
         </View> 
        {orderStatus()}
    </View>
</TouchableOpacity>
);
}

const styles = StyleSheet.create({
image_container: {
    display: "flex",
    flex:3,
    padding:5,
    alignItems: 'center',
    justifyContent: 'center'
},
container: {     
    display: 'flex',
    flex: 1, 
    width: Dimensions.get('screen').width - 20,
    margin: 10,
    borderRadius: 20,
    backgroundColor: '#DCDCDC',
    height: 100,
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: 'grey',
    flexDirection: 'row'
},
details_container: {
display: "flex", 
flex:1,
flexDirection:"row",
justifyContent: "space-around"
},
infos:{
display:"flex",
flex:8,
padding:5,
marginTop:5,
paddingLeft:20,
justifyContent:"space-around",
}
})

export { OrderCard }