import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {Title, Appbar} from 'react-native-paper';
import {BakeryMenuList} from '../../components/BakeryMenu'

const Overview = props => {
  return (
      <>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <Appbar style={styles.bottom}>
   <Appbar.Action
     icon="archive"
     onPress={() => console.log('Pressed archive')}
    />
    <Appbar.Action icon="mail" onPress={() => console.log('Pressed mail')} />
    <Appbar.Action icon="label" onPress={() => console.log('Pressed label')} />
    <Appbar.Action
      icon="delete"
      onPress={() => console.log('Pressed delete')}
    />
  </Appbar>
      <Title style={styles.title}>Menu</Title>
      <BakeryMenuList  />
      </>
  );
};

const styles = StyleSheet.create({ 
    
    title: {
        textAlign: 'center',
        marginTop: 50
    },
    bottom: {
        //position: 'absolute',
        marginTop: 0,
        paddingTop: 70,
        paddingBottom: 20
      },
});

export default Overview;