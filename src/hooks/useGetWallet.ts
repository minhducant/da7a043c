import {useTranslation} from 'react-i18next';
import {useEffect, useCallback, useState} from 'react';

import {ToolApi} from '@api/ToolApi';

const useGetWallet = () => {
  const {i18n} = useTranslation();
  const [wallet, setWallet] = useState([]);
  const [VNBanks, setVNBanks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const res = await ToolApi.getListWallet();
      setWallet(res.data.result);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    wallet,
    VNBanks,
    loading,
    fetchData,
  };
};

export default useGetWallet;
