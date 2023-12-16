import React, {useRef} from 'react';
import {
  Text,
  View,
  FlatList,
  Animated,
  SafeAreaView,
  RefreshControl,
} from 'react-native';

import {useGetNotes} from '@hooks/useGetNotes';
import HeaderHome from '@components/Home/HeaderHome';
import {RenderNote} from '@components/Home/RenderItem';
import {homeStyle as styles} from '@styles/home.style';
import SearchInput from '@components/Home/SearchInput';

export default function HomeScreen() {
  const scrollRef = useRef(null);
  const loadMore = useRef(false);
  const searchRef = useRef<any>(null);
  const refreshControl = useRef(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const {
    data,
    // onLoadMore,
    updateParamsRef,
    onRefresh: refreshData,
  } = useGetNotes();

  const onRefresh = async () => {
    await refreshData();
  };

  const onEndReached = async () => {
    loadMore.current = true;
    // await onLoadMore();
    loadMore.current = false;
  };

  const onSearch = async (e: any) => {
    updateParamsRef(e);
  };

  const renderNote = ({item, index}: any) => (
    <RenderNote item={item} index={index} />
  );

  const listEmpty = () => {
    return (
      <View style={styles.viewEmpty}>
        <Text>Đức</Text>
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
        renderItem={renderNote}
        scrollEventThrottle={16}
        onEndReached={onEndReached}
        ListEmptyComponent={listEmpty}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={refreshControl.current}
          />
        }
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => `${index}`}
      />
    </SafeAreaView>
  );
}
