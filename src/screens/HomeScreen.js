// HomeScreen.js
import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import axios from 'axios';

const HomeScreen = ({navigation}) => {
  const [productList, setProductList] = useState([]);

  const getData = async () => {
    let results = await fetch('https://dummyjson.com/products?limit=10');
    results = await results.json();
    // eslint-disable-next-line prettier/prettier
   setProductList(results.products)
  };
  useEffect(() => {
    getData();
  }, []);

  const handleProductClick = product => {
    navigation.navigate('ProductDetail', {product});
  };

  const RenderProductItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => handleProductClick(item)}>
      <View style={{padding: 16,borderBottomColor:'black',borderBottomWidth:1, marginHorizontal:'5%'}}>
        <Text>{item.title}</Text>
      </View>
    </TouchableOpacity>
    )
   
  };

  return (
    <View>
      <FlatList
        data={productList}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <RenderProductItem item = {item}/> }
      />
    </View>
  );
};

export default HomeScreen;
