import {currencies} from '@configs/AppData';

const formatYen = (number: number): string => {
  const formatter = new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
  });

  return formatter.format(number);
};

const formatVietnamDong = (number: number): string => {
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  return formatter.format(number);
};

const formatDollar = (number: number): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return formatter.format(number);
};

const formatMoney = (number: number, type: number | undefined): string => {
  const currencyItem = type
    ? currencies.find((item: any) => item.id === type)
    : null;
  let currencyCode = '';
  if (currencyItem) {
    currencyCode = currencyItem?.currencyCode;
  }
  const formatter = new Intl.NumberFormat(
    currencyItem ? currencyItem.code : undefined,
    {
      style: currencyItem ? 'currency' : 'decimal',
      currency: currencyCode || 'USD',
    },
  );
  return formatter.format(number || 0);
};

export {formatYen, formatVietnamDong, formatDollar, formatMoney};
