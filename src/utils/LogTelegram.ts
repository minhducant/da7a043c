import axios from 'axios';

const chatId = '-1002146975231';
const telegramBotToken = '6380191156:AAEevp_arLDk874xSYfrfjymCZsXee5xEwo';

async function LogTelegram(message: string) {
  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${telegramBotToken}/sendMessage?chat_id=${chatId}&text=${message}`,
    );
    return response;
  } catch (error) {
    console.error('Error sending log message to Telegram:', error);
  }
}

export {LogTelegram};
