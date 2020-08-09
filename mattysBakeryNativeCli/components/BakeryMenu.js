import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Text,
  IconButton,
  ActivityIndicator,
  Button,
  Portal,
  Dialog,
  Paragraph,
  TextInput,
  HelperText,
  Divider,
} from 'react-native-paper';
import {FlatList} from 'react-native-gesture-handler';
import {store} from '../redux/Store'
import BakeryMenuView from '../app/views/BakeryMenuView';
/**
 * the footer also acts as the load more
 * indicator.
 */
export const BakeryMenuFooter = props => {
    return (
      <>
        {props.shouldLoadMore ? (
          <View style={styles.loaderView}>
            <ActivityIndicator animating />
          </View>
        ) : null}
      </>
    );
};

export const BakeryMenuList = props => {
    const [data, setData] = React.useState([]);
    const [limit] = React.useState(10);
    const [start, setStart] = React.useState(0);
    const [loading, setLoading] = React.useState(true);
    const [loadingMore, setLoadingMore] = React.useState(true);
    const [shouldLoadMore, setShouldLoadMore] = React.useState(true);
  
    /**
     * get the data from the server in a paginated manner
     *
     * 1. should no data be present start the normal loading
     * animation.
     *
     * 2. should data be present start the loading more
     * animation.
     */
    const getBakeryMenu = React.useCallback(async () => {
      if (!shouldLoadMore) {
        return;
      }
  
      if (!loading && data.length === 0) {
        setLoading(true);
      }
  
      if (!loadingMore && data.length > 0) {
        setLoadingMore(true);
      }
  
      const url = `http://155.138.161.250:1337/menus`;
      const jwt = store.getState().jwt;
      const response = await fetch(url, {
        headers: {Authorization: `Bearer ${jwt}`},
      });
      const json = await response.json();
  
      if (json.length < 10) {
        setShouldLoadMore(false);
      } else {
        setStart(start + limit);
      }
  
      setData([...data, ...json]);
      setLoading(false);
      setLoadingMore(false);
    }, [data, limit, loading, loadingMore, shouldLoadMore, start]);
  
    
  
   
  
    useEffect(() => {
        getBakeryMenu();
    }, [getBakeryMenu]);
  
    if (loading) {
      return (
        <View style={styles.loaderBase}>
          <ActivityIndicator animating size="large" />
        </View>
      );
    }
  
   
  
    return (
      <>
        <FlatList
          style={styles.base}
          data={data}
          ItemSeparatorComponent={() => <Divider />}
          ListFooterComponent={() => (
            <BakeryMenuFooter shouldLoadMore={shouldLoadMore} />
          )}
          onEndReachedThreshold={0.5}
          onEndReached={() => getBakeryMenu()}
          renderItem={({item, index}) => (
            <BakeryMenuView  item={item} index={index} />
          )}
        />
      </>
    );
  };
  
  const styles = StyleSheet.create({
    base: {
      flex: 1,
      backgroundColor: '#fff',
      marginTop: 10
    },
    emptyBase: {
      flex: 1,
      backgroundColor: '#fff',
    },
    text: {
      fontSize: 35,
      lineHeight: 35,
      fontWeight: '700',
      padding: 32,
      paddingLeft: 16,
    },
    header: {
      flexDirection: 'row',
      alignContent: 'center',
    },
    btn: {
      height: 50,
      paddingTop: 6,
      marginLeft: 16,
      marginRight: 16,
    },
    loaderBase: {
      padding: 16,
      alignContent: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    divider: {
      height: 16,
    },
    buttonFrame: {
      justifyContent: 'center',
    },
  });