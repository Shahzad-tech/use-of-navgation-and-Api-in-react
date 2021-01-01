/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {
  
  StyleSheet,
  View,
  Text,
  ActivityIndicator,


} from 'react-native';

import { useEffect } from 'react';
import { useState } from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import  Ionicons from 'react-native-vector-icons/Ionicons';

const UserName=({navigation})=>{

  const [data, setdata] = useState([])
  const [username, setUsernames]= useState([])
  const [Load, setLoad] = useState(true)
useEffect(()=>{

  fetch("https://jsonplaceholder.typicode.com/users", {
    "method": "GET",

  })
  .then((response)=>response.json())
  .then(resJson => {
      setdata(resJson)
      setLoad(false)
    
  })
  .catch(err => {
    console.error(err);
  });

 


},[])



if (Load ) {
  return (
    <View style={{ flex: 1, padding: 20 }}>
    <ActivityIndicator size="large" color="red" />
    <Text style={{textAlign:"center", marginTop:"5%"}}>Loading Data from Fetch API ...</Text>
  </View>
  );
}
  return(
    <View>
    <View style={{marginTop:10}}>

    </View>
    <FlatList
    keyExtractor={(item,ind)=>"Key" + ind }
    data = {data}
    renderItem = {({item})=>(
    <TouchableOpacity onPress={()=> navigation.navigate("User Details", { named:(item.name),Phone:(item.phone), Website:(item.website),Company:(item.company)})}>
      <View style={{flexDirection:"row", justifyContent:"center"}}>
        <Text style={styles.item} >{JSON.stringify(item.name).slice(1,-1)}</Text>
      </View>

    </TouchableOpacity>
    )}
    />
    </View>
  )
    }

const UserDetails=({route})=>{
  const name = route.params.named
 
  const Phone = route.params.Phone
  const Website = route.params.Website
  const Company = route.params.Company


  return (
    <View>
      <View>
      <Text style={styles.head}>
       Phone: </Text><Text style={styles.textt}>{Phone}{'\n'}
      </Text>
      </View>
      <View>
      <Text style={styles.head}>
        Website: </Text><Text  style={styles.textt}> {Website}{'\n'}
      </Text>
      </View>
      <View>
      <Text style={styles.head}>
        Company Name: </Text><Text  style={styles.textt}>{Company.name}{'\n'}
      </Text>
      </View>
      <View>
      <Text style={styles.head}>
        Company catchphrase:  </Text><Text  style={styles.textt}>{Company.catchPhrase}{'\n'}
      </Text>
      </View>
      <View>
      <Text style={styles.head}>
        Company bs:  </Text><Text  style={styles.textt}>{Company.bs}{'\n'}
      </Text>
      </View>
    </View>
  )

}

const Stack = createStackNavigator();

const Users=()=>{
  
  return(
  <Stack.Navigator screenOptions={({navigation})=>({

    headerTitleAlign:"center",
    headerRight:()=><Entypo style={{marginRight:3}}  name="users" size={25} color="wheat"></Entypo>,
    headerTintColor:"wheat",
    headerStyle:{
      backgroundColor:"orangered"
    }

  })}>
    <Stack.Screen name="User Names" component={UserName}/>
    <Stack.Screen name="User Details" component={UserDetails}
    options={{
      headerRight:()=><Entypo style={{marginRight:3}}  name="flow-cascade" size={25} color="wheat"></Entypo>
    }}
    />
   
  </Stack.Navigator>
  )

}

const Tasks=()=>{

  return(
    <View>
      <Text style={styles.head}>
        The Following is the Task Screen
      </Text>
    </View>
  )
  
}

const Albums=()=>{
  return(
    <View>
      <Text style={styles.head}>
       The following is the Album Screen
      </Text>
    </View>
  )
  


}


const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home"
      drawerType="slide"
      drawerStyle={{
        backgroundColor:"pink",
        
      }}
      drawerContentOptions={{
        activeTintColor: 'midnightblue',
        inactiveTintColor:"olive"
      }}
    
      
      >
        <Drawer.Screen 
        options={{
          drawerIcon:()=><Entypo style={{marginRight:3}}  name="users" size={25} color="wheat"></Entypo>
        }}
        name="Users" component={Users} />
        <Drawer.Screen name="Tasks" component={Tasks} options={{
          drawerIcon:()=><FontAwesome  name="tasks" size={25} color="grey"></FontAwesome>,
          drawerLabel:"Task"}}/>
        <Drawer.Screen name="Albums" component={Albums} options={{
          drawerIcon:()=><Ionicons name="albums" size={25} color="red"></Ionicons>,
          drawerLabel:"Albums"}}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
 
  item: {
    backgroundColor: 'seashell',
    fontWeight:"bold",
    color:"saddlebrown",
    padding: 20,
    borderBottomWidth:1,
    borderBottomColor:"grey",
    fontFamily:"sans-serif-light",
    width:370,
    marginLeft:5
  },
  head:{
    marginTop:15,
    fontSize:18,
    color:"darkslategrey",
    fontFamily:"sans-serif-light",
    fontWeight:"bold",
    marginLeft:4
  },
  textt:{
    marginTop:14,
    fontFamily:"sans-serif-condensed",
    color:"dimgrey",
    borderBottomWidth:1,
    borderBottomColor:"crimson",
    marginLeft:4
    
  }
})