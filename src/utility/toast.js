import React from 'react';
import { SuccessToast } from '@Component/toasts/SuccessToast';
import { ErrorToast } from '@Component/toasts/ErrorToast';
import { InfoToast } from '@Component/toasts/InfoToast';
import { WarningToast } from '@Component/toasts/WarningToast';
import { toast, Slide } from 'react-toastify';

export const toasty = ({ type, msg,autoClose=2000, ...rest }) => {
  switch (type.toLowerCase()) {
    case 'error': {
      return toast.error(<ErrorToast msg={msg} {...rest} />, { icon: false, transition: Slide, hideProgressBar: true, autoClose });
    }
    case 'success': {
      return toast.success(<SuccessToast msg={msg} {...rest} />, { icon: false, transition: Slide, hideProgressBar: true, autoClose });
    }
    case 'info': {
      return toast.info(<InfoToast msg={msg} {...rest} />, { icon: false, transition: Slide, hideProgressBar: true, autoClose });
    }
    case 'warning': {
      return toast.warning(<WarningToast msg={msg} {...rest} />, { icon: false, transition: Slide, hideProgressBar: true, autoClose });
    }
    default: ;
  }
};
