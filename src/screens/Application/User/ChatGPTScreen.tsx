/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useRef, useEffect, useState} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';

import {t} from '@i18n/index';
import {hasHomeButton} from '@utils/DeviceInfo';
import {Chatbot, IconMic} from '@assets/icons/index';
import {userScreenStyle as styles} from '@styles/user.style';
import HeaderWithTitle from '@components/Header/HeaderWithTitle';

export default function ChatGPTScreen() {
  const scrollViewRef = useRef();
  const audioRef = useRef<any>(null);

  const startRecording = async () => {};

  const playSound = async () => {
    console.log(audioRef.current)
    try {
      if (!audioRef.current) {
        // Tải âm thanh từ tệp âm thanh (ví dụ: 'sound.mp3')
        await audioRef.current.loadAsync(require('../../../assets/sounds/yay-6120.mp3'));
        // Phát âm thanh
        await audioRef.current.playAsync();
      }
    } catch (error) {
      console.error('Lỗi khi phát âm thanh:', error);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderWithTitle title={t('chat_gpt')} />
      <View style={styles.containerChatbot}>
        <Chatbot />
        <Text style={styles.txtTitleChatbot}>Assistant</Text>
        <View style={styles.viewChatbot} />
        <SafeAreaView style={styles.viewChatbotButton}>
          <TouchableOpacity style={styles.micButton} onPress={playSound}>
            <View style={styles.mic}>
              <IconMic />
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </View>
  );
}
