import {
  filterPricingRulesHasOfferOnThisDay,
  secondsIsLeftToStartNewDate,
} from "@utils";
import * as React from "react";
import format from "number-format.js";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { arrToHashMap, isUserLoggedIn, onSyncData } from "@utils";
import { context } from "./AppContext";
import { FormatNumber } from "../FixedOptions";

const AppProvider = ({ children }) => {
  const dispatch = useDispatch();
  const {
    tempData: { network },
    auth: { userData },
  } = useSelector((state) => state);
  const ref = React.useRef();
  useEffect(() => {
    if (1 || network) {
      if (isUserLoggedIn()) {
        clearTimeout(ref.current);
        ref.current = setTimeout(() => {
          onSyncData(dispatch);
        }, 1000);
      }
    }
  }, [network, userData]);
  // TODO: thing
  const { Provider } = context;
  return <Provider value={{}}>{children}</Provider>;
};

//TODO : fetch Accounts when build page for Accounts

export default AppProvider;
