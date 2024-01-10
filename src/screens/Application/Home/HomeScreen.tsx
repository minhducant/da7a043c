import React, {useRef} from 'react';
import {
  View,
  FlatList,
  Animated,
  SafeAreaView,
  RefreshControl,
} from 'react-native';

import {useGetNotes} from '@hooks/useGetNotes';
import HeaderHome from '@components/Home/HeaderHome';
import {WalletCard} from '@components/Home/RenderItem';
import {homeStyle as styles} from '@styles/home.style';
import SearchInput from '@components/Home/SearchInput';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default function HomeScreen() {
  const scrollRef = useRef<any>(null);
  const searchRef = useRef<any>(null);
  const refreshControl = useRef(false);
  const loadMore = useRef<boolean>(false);
  const y = new Animated.Value(0);

  const onScroll = Animated.event([{nativeEvent: {contentOffset: {y}}}], {
    useNativeDriver: true,
  });

  const {data, updateParamsRef, onRefresh: refreshData} = useGetNotes();

  const onRefresh = async () => {
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
      <AnimatedFlatList
        data={data}
        // data={[...data, ...data, ...data]}
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
        renderItem={({index, item}) => <WalletCard {...{index, y, item}} />}
        {...{onScroll}}
      />
    </SafeAreaView>
  );
}
