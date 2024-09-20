import React, {useRef} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {View, SafeAreaView, RefreshControl, Keyboard} from 'react-native';

import Banner from '@components/Admob/Banner';
import {useGetNotes} from '@hooks/useGetNotes';
import HeaderHome from '@components/Home/HeaderHome';
import SearchInput from '@components/Home/SearchInput';
import {WalletCard} from '@components/Home/RenderItem';
import {homeStyle as styles} from '@styles/home.style';

export default function HomeScreen() {
  const swipeableRef = useRef(null);
  const scrollRef = useRef<any>(null);
  const searchRef = useRef<any>(null);
  const refreshControl = useRef(false);
  const loadMore = useRef<boolean>(false);

  const {data, updateParamsRef, onRefresh: refreshData} = useGetNotes();

  const onRefresh = async () => {
    Keyboard.dismiss();
    searchRef.current.clearValue();
    await refreshData();
  };

  const onEndReached = async () => {
    loadMore.current = true;
    loadMore.current = false;
  };

  const onSearch = async (e: any) => {
    updateParamsRef(e);
  };

  const listEmpty = () => {
    return (
      <View style={styles.viewEmpty}>
        <></>
      </View>
    );
  };


  return (
    <SafeAreaView style={styles.container}>
      <HeaderHome />
      <SearchInput
        ref={searchRef}
        onRefresh={onRefresh}
        onSubmitEditing={(e: any) => onSearch({title: e})}
      />
      <FlatList
        data={data}
        ref={scrollRef}
        scrollEnabled={true}
        scrollEventThrottle={16}
        onEndReached={onEndReached}
        ListEmptyComponent={listEmpty}
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={refreshControl.current}
          />
        }
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => `${index}`}
        renderItem={({index, item}) => (
          <WalletCard {...{index, item, scrollRef, swipeableRef}} />
        )}
      />
      <Banner />
    </SafeAreaView>
  );
}
