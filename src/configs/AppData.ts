import {t} from '@i18n/index';
import {MutableRefObject} from 'react';

export interface Currency {
  id: number;
  name: string;
  code: string;
  country: string;
  symbol: string;
}

export const currencies: Currency[] = [
  {id: 1, name: 'Vietnamese Dong', code: 'VND', country: 'vn', symbol: '₫'},
  {
    id: 2,
    name: 'United States Dollar',
    code: 'USD',
    country: 'us',
    symbol: '$',
  },
  {id: 3, name: 'Japanese Yen', code: 'JPY', country: 'jp', symbol: '¥'},
  {id: 4, name: 'South Korean Won', code: 'KRW', country: 'kr', symbol: '₩'},
  //   {id: 5, name: 'Euro', code: 'EUR', country: 'eu', symbol: '€'},
  //   {id: 6, name: 'British Pound', code: 'GBP', country: 'gb', symbol: '£'},
  {id: 7, name: 'New Taiwan Dollar', code: 'TWD', country: 'tw', symbol: 'NT$'},
  //   {id: 8, name: 'Thai Baht', code: 'THB', country: 'th', symbol: '฿'},
  //   {id: 9, name: 'Lao Kip', code: 'LAK', country: 'la', symbol: '₭'},
  //   {id: 10, name: 'Cambodian Riel', code: 'KHR', country: 'kh', symbol: '៛'},
  // {id: 11, name: 'Philippine Peso', code: 'PHP', country: 'ph', symbol: '₱'},
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
  currencySheetRef: MutableRefObject<any>,
) => {
  return {
    title: {
      valueInit: '',
      placeholder: `${t('input')} ${t('title').toLowerCase()}`,
      required: true,
    },
    description: {
      valueInit: '',
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
      title: t('who_sharing_the_bill'),
    },
  };
};
