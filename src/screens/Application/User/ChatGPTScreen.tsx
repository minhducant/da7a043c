/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useRef, useEffect, useState} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';

import {t} from '@i18n/index';
import {Chatbot, IconMic} from '@assets/icons/index';
import {userScreenStyle as styles} from '@styles/user.style';
import HeaderWithTitle from '@components/Header/HeaderWithTitle';

export default function ChatGPTScreen() {
  const scrollViewRef = useRef();

  const startRecording = async () => {};

  return (
    <View style={styles.container}>
      <HeaderWithTitle title={t('chat_gpt')} />
      <View style={styles.containerChatbot}>
        <Chatbot />
        <Text style={styles.txtTitleChatbot}>Assistant</Text>
        <View style={styles.viewChatbot} />
        <SafeAreaView style={styles.viewChatbotButton}>
          <TouchableOpacity style={styles.micButton} onPress={startRecording}>
            <View style={styles.mic}>
              <IconMic />
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </View>
  );
}
