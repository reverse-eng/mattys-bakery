import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import { Avatar, Text, Button, Card, Title, Paragraph, Icon } from 'react-native-paper';


//import TodoModel from '../models/TodoModel';
import {store} from '../../redux/Store';

export const BakeryMenuView = props => {
  const {
    item: passedPropsItem,
    Description: passedPropsDesc,
    price: passedPropsPrice,
    available: passedPropsAvailable,
    featured_image:passedPropsFeaturedImage, 
    id,
  } = props.item;
  console.log(props.item)
  const [passedItem, setPassedItem] = useState(passedPropsItem);
  const [passedDesc, setPassedDesc] = useState(passedPropsDesc);
  const [passedPrice, setPassedPrice] = useState(
    passedPropsPrice,
  );
  const [passedFeaturedImage, setFeaturedImage] = useState(passedPropsFeaturedImage)
  const [error, setError] = useState('');
  const [item, setItem] = useState(passedItem);
  const [visible, setVisible] = useState(false);
  const [description, setDescription] = useState(passedDesc);
  const [price, setPrice] = useState(passedPrice);


  //const LeftContent = props => <Icon {...props} icon="folder" />


const baseUrl = 'http://155.138.161.250:1337'
  return (
    
    //   <List.Item
    //      onPress={() => {
    //       setVisible(true);
    //      }}
    //     title={passedItem}
    //     description={passedDesc}
    //   />
    <Card stlye={styles.cardContainer}>
    <Card.Title title={passedItem} subtitle={passedPrice}  />
    <Card.Content>
  <Paragraph>{passedDesc}</Paragraph>
    </Card.Content>
    <Card.Cover source={{ uri: baseUrl + passedFeaturedImage.url}} />
    <Card.Actions>
      <Button>Add To Cart</Button>
    </Card.Actions>
  </Card>
  );
};

const styles = StyleSheet.create({
  divider: {
    height: 16,
  },
  cardContainer: {
      padding: 20
  }
});

export default BakeryMenuView;