import React from 'react';
import {View, Text, Image, Button, StyleSheet} from 'react-native';

const ProductDetailScreen = ({route}) => {
  const {product} = route.params;

  const handleAddToCart = () => {
    // Implement your add to cart logic here
    console.log('Product added to cart:', product.title);
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: product.thumbnail}} style={styles.thumbnail} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.price}>Price: ${product.price.toFixed(2)}</Text>
      <Button title="Add to Cart" onPress={handleAddToCart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  thumbnail: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default ProductDetailScreen;
