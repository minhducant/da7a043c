import {t} from '@i18n/index';
import {MutableRefObject} from 'react';

import {
  IconChess,
  IconCaro,
  IconSnake,
  IconMiner,
  IconDice,
  IconWheel,
  IconRandom,
  IconCoinFlip,
  IconCalculator,
  IconDescending,
  IconPingPong,
} from '@assets/icons';

export const currencies: any = [
  {
    id: 1,
    name: 'Vietnamese Dong',
    country: 'vn',
    symbol: '₫',
    currency: 'đồng',
    code: 'vi-VN',
    currencyCode: 'VND',
  },
  {
    id: 2,
    name: 'United States Dollar',
    country: 'us',
    symbol: '$',
    currency: 'dollar',
    code: 'en-US',
    currencyCode: 'USD',
  },
  {
    id: 3,
    name: 'Japanese Yen',
    country: 'jp',
    symbol: '¥',
    currency: 'yen',
    code: 'ja-JP',
    currencyCode: 'JPY',
  },
  {
    id: 4,
    name: 'South Korean Won',
    country: 'kr',
    symbol: '₩',
    currency: 'won',
    code: 'kr',
    currencyCode: 'KRW',
  },
  // {
  //   id: 5,
  //   name: 'Euro',
  //   country: 'eu',
  //   symbol: '€',
  //   currency: 'euro',
  //   code: 'eu',
  //   currencyCode: 'EUR',
  // },
  // {
  //   id: 6,
  //   name: 'British Pound',
  //   country: 'gb',
  //   symbol: '£',
  //   currency: 'pound',
  //   code: 'gb',
  //   currencyCode: 'GBP',
  // },
  // {
  //   id: 7,
  //   name: 'New Taiwan Dollar',
  //   country: 'tw',
  //   symbol: 'NT$',
  //   currency: 'dollar',
  //   code: 'tw',
  //   currencyCode: 'TWD',
  // },
  // {
  //   id: 8,
  //   name: 'Thai Baht',
  //   country: 'th',
  //   symbol: '฿',
  //   currency: 'baht',
  //   code: 'th',
  //   currencyCode: 'THB',
  // },
  // {
  //   id: 9,
  //   name: 'Lao Kip',
  //   country: 'la',
  //   symbol: '₭',
  //   currency: 'kip',
  //   code: 'la',
  //   currencyCode: 'LAK',
  // },
  // {
  //   id: 10,
  //   name: 'Cambodian Riel',
  //   country: 'kh',
  //   symbol: '៛',
  //   currency: 'riel',
  //   code: 'kh',
  //   currencyCode: 'KHR',
  // },
  // {
  //   id: 11,
  //   name: 'Philippine Peso',
  //   country: 'ph',
  //   symbol: '₱',
  //   currency: 'peso',
  //   code: 'ph',
  //   currencyCode: 'PHP',
  // },
  // {
  //   id: 12,
  //   name: 'Chinese Yuan Renminbi',
  //   country: 'cn',
  //   symbol: '¥',
  //   currency: 'yuan',
  //   code: 'cn',
  //   currencyCode: 'CNY',
  // },
  // {
  //   id: 13,
  //   name: 'Australian Dollar',
  //   country: 'au',
  //   symbol: 'A$',
  //   currency: 'dollar',
  //   code: 'au',
  //   currencyCode: 'AUD',
  // },
  // {
  //   id: 14,
  //   name: 'Indonesian Rupiah',
  //   country: 'id',
  //   symbol: 'Rp',
  //   currency: 'rupiah',
  //   code: 'id',
  //   currencyCode: 'IDR',
  // },
  // {
  //   id: 15,
  //   name: 'Malaysian Ringgit',
  //   country: 'my',
  //   symbol: 'RM',
  //   currency: 'ringgit',
  //   code: 'my',
  //   currencyCode: 'MYR',
  // },
  // {
  //   id: 16,
  //   name: 'Singapore Dollar',
  //   country: 'sg',
  //   symbol: 'S$',
  //   currency: 'dollar',
  //   code: 'sg',
  //   currencyCode: 'SGD',
  // },
  // {
  //   id: 17,
  //   name: 'Canadian Dollar',
  //   country: 'ca',
  //   symbol: 'C$',
  //   currency: 'dollar',
  //   code: 'ca',
  //   currencyCode: 'CAD',
  // },
];

export const colors = [
  '#FF5733', // Đỏ cam
  '#33FF57', // Xanh lá cây
  '#5733FF', // Màu chàm
  '#FF33A6', // Hồng
  '#33A6FF', // Xanh dương
  '#FFD633', // Màu vàng
  '#FF336F', // Đỏ hồng
  '#33FFD6', // Xanh dương nhạt
  '#FF33FF', // Màu đỏ nhạt
  '#33FFA6', // Màu xanh nhạt
  '#336FFF', // Xanh dương đậm
  '#FF5733', // Đỏ cam
  '#33FF57', // Xanh lá cây
  '#5733FF', // Màu chàm
  '#FF33A6', // Hồng
  '#33A6FF', // Xanh dương
  '#FFD633', // Màu vàng
  '#FF336F', // Đỏ hồng
  '#33FFD6', // Xanh dương nhạt
  '#FF33FF', // Màu đỏ nhạt
];

export const getNoteLabel: any = (
  colorSheetRef: MutableRefObject<any>,
  memberSheetRef: MutableRefObject<any>,
  currencySheetRef: MutableRefObject<any>,
) => {
  return {
    title: {
      title: t('title'),
      valueInit: '',
      placeholder: `${t('input')} ${t('title').toLowerCase()}`,
      required: true,
    },
    description: {
      valueInit: '',
      title: t('description'),
      placeholder: `${t('input')} ${t('description').toLowerCase()}`,
      multiline: true,
    },
    color_currency: {
      color: '',
      currency: null,
      colorSheetRef: colorSheetRef,
      currencySheetRef: currencySheetRef,
    },
    members: {
      data: [],
      memberSheetRef: memberSheetRef,
      title: t('who_sharing_the_bill'),
    },
  };
};

export const listSetting = [
  {
    title: t('update_information'),
    screen: '',
    icon: 'user',
    library: 'FontAwesome',
  },
  {
    title: t('language'),
    screen: 'ChangeLanguageScreen',
    icon: 'language',
    library: 'FontAwesome',
  },
  {
    title: t('notifications'),
    screen: '',
    icon: 'notifications',
    library: 'Ionicons',
  },
  {
    title: t('e_wallet'),
    screen: '',
    icon: 'wallet',
    library: 'Entypo',
  },
  {
    title: t('feedback'),
    screen: '',
    icon: 'feedback',
    library: 'MaterialIcons',
  },
  {
    title: t('privacy_policy'),
    screen: '',
    icon: 'verified-user',
    library: 'MaterialIcons',
  },
  {
    title: t('about_spendsync'),
    screen: '',
    icon: 'policy',
    library: 'MaterialIcons',
  },
];

export const listGame: any = [
  {
    title: 'minesweeper',
    screen: '',
    color: '',
    icon: IconMiner,
  },
  {
    title: 'chess',
    screen: '',
    color: '',
    icon: IconChess,
  },
  {
    title: 'caro',
    screen: 'TicTacToeScreen',
    color: '',
    icon: IconCaro,
  },
  {
    title: 'snake',
    screen: '',
    color: '',
    icon: IconSnake,
  },
  {
    title: 'ping_pong',
    screen: '',
    color: '',
    icon: IconPingPong,
  },
];

export const listTool: any = [
  {
    title: 'calculator',
    screen: 'CalculatorScreen',
    color: '',
    icon: IconCalculator,
  },
  {
    title: 'timer',
    screen: 'TimerCountdownScreen',
    color: '',
    icon: IconDescending,
  },
  {
    title: 'coin_flip',
    screen: 'CoinFlipScreen',
    color: '',
    icon: IconCoinFlip,
  },
  {
    title: 'random_number',
    screen: 'RandomNumberScreen',
    color: '',
    icon: IconRandom,
  },
  {
    title: 'roll_dice',
    screen: 'RollDiceScreen',
    color: '',
    icon: IconDice,
  },
  {
    title: 'wheel_decide',
    screen: '',
    color: '',
    icon: IconWheel,
  },
];

export const getExpenseLabel: any = (initData: any) => {
  return {
    expense: {
      title: t('expense'),
      valueInit: '',
      placeholder: `${t('input')} ${t('expense').toLowerCase()}`,
      required: true,
    },
    cost: {
      title: t('cost'),
      valueInit: '',
      placeholder: `${t('input')} ${t('cost').toLowerCase()}`,
      required: true,
    },
    share_with: {
      title: t('share_with'),
      valueInit: '',
      placeholder: `${t('input')} ${t('share_with').toLowerCase()}`,
      required: true,
    },
    topic: {
      title: t('topic'),
      valueInit: '',
      placeholder: `${t('input')} ${t('topic').toLowerCase()}`,
      required: false,
    },
    paid_by: {
      title: t('paid_by'),
      valueInit: '',
      placeholder: `${t('who_paid')}`,
      required: true,
      data: initData?.members,
    },
    time: {
      title: t('time'),
      valueInit: '',
      placeholder: `${t('input')} ${t('time').toLowerCase()}`,
      required: false,
    },
    split_evenly: {
      title: t('split_evenly'),
      valueInit: '',
      required: false,
    },
    image: {
      title: t('image'),
      valueInit: '',
      placeholder: `${t('input')} ${t('image').toLowerCase()}`,
      required: false,
    },
    sharers: {
      data: initData?.members.map((member: any) => ({
        ...member,
        money: 0,
      })),
    },
  };
};
