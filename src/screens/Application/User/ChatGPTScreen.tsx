/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useRef, useEffect, useState} from 'react';
// import Tts from 'react-native-tts';
// import Voice from '@react-native-community/voice';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';

import {t} from '@i18n/index';
import {Chatbot, IconMic} from '@assets/icons/index';
import {userScreenStyle as styles} from '@styles/user.style';
import HeaderWithTitle from '@components/Header/HeaderWithTitle';

export default function ChatGPTScreen() {
  const scrollViewRef = useRef();
  const [result, setResult] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [recording, setRecording] = useState(false);

  // useEffect(() => {
  //   // voice handler events
  //   Voice.onSpeechEnd = speechEndHandler;
  //   Voice.onSpeechError = speechErrorHandler;
  //   Voice.onSpeechStart = speechStartHandler;
  //   Voice.onSpeechResults = speechResultsHandler;
  //   Tts.setDefaultLanguage('en-IE');
  //   Tts.addEventListener('tts-start', event => console.log('start', event));
  //   Tts.addEventListener('tts-finish', event => {
  //     console.log('finish', event);
  //     setSpeaking(false);
  //   });
  //   Tts.addEventListener('tts-cancel', event => console.log('cancel', event));
  //   return () => {
  //     Voice.destroy().then(Voice.removeAllListeners);
  //   };
  // }, []);

  // const speechStartHandler = (e: any) => {
  //   console.log('speech start event', e);
  // };

  // const speechEndHandler = (e: any) => {
  //   setRecording(false);
  //   console.log('speech stop event', e);
  // };
  // const speechResultsHandler = (e: any) => {
  //   console.log('speech event: ', e);
  //   const text = e.value[0];
  //   setResult(text);
  // };

  // const speechErrorHandler = (e: any) => {
  //   console.log('speech error: ', e);
  // };

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
