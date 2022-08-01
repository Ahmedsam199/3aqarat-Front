import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
const status = {
  false: 'offline',
  true: 'online',
  2: 'sync',
};

const messages = {
  false:
    'Please check your internet connection. some features of the application may not work probably',
  true: 'Back online.',
  2: 'Sync data...',
};

function ConnectionStatus() {
  const { t } = useTranslation()
  const { network } = useSelector(state => state.tempData)
  const [active, setActive] = useState(false);
  const [prevState, setPrevState] = useState(true);

  useEffect(() => {
    if (prevState != network) setActive(true);
    setPrevState(network);
    let timeout = undefined;
    if (network == true) {
      timeout = setTimeout(() => {
        setActive(false);
      }, 1000);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [network]);
  return (
    <div
      className={`connection-contanier
      ${status[network]}
      ${active ? 'active' : ''}`}
    >
      <span>
        {t(messages[network])}
      </span>
    </div>
  );
}

export default ConnectionStatus;
