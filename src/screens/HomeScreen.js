// HomeScreen.js
import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';

const HomeScreen = ({navigation}) => {
  const [productList, setProductList] = useState([]);

  const getData = async () => {
    let results = await fetch('https://dummyjson.com/products?limit=10');
    results = await results.json();
    console.log('-----',results.products);
    setProductList(results.products);
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
        <View
          style={{
            paddingVertical: 16,
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            marginHorizontal: '5%',
            flexDirection:'row',
            alignItems:'center'
          }}>
            <Image source={{uri:item.thumbnail}} style={{height:50,width:50,borderRadius:5}} resizeMode='contain'/>
          <Text style={{paddingLeft:'5%',color:'#000',fontWeight:'bold'}}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        data={productList}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <RenderProductItem item={item} />}
      />
    </View>
  );
};

export default HomeScreen;
