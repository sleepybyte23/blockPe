import React, { useReducer, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CoustomContext from "./MainContext";
import { reducer } from "../reducer/reducer";
import { useMoralisCloudFunction } from "react-moralis";
import Variables from "../helper/Variables";
import Data from "../data/menu.json";
//import storeInfoTiming from "../data/storeInfo.json";

const ContextProvider = (props) => {
  let { storeUrl } = useParams();
  const [store] = useState(storeUrl ? storeUrl : "");
  const [storeInfo, setStoreInfo] = useState();
  const [storeMenu, setStoreMenu] = useState([]);
  const [currencyExchangeRate, setCurrencyExchangeRate] = useState();

  const {
    data: storeMenuResp,
    // error: errLoadingStoreMenu,
    isLoading: isLoadingStoreMenu,
  } = useMoralisCloudFunction(Variables.GET_STORE_MENU, {
    store,
  });

  /* const {
          data: storeMenuResp,
          error: errLoadingStoreMenu,
          isLoading: isLoadingStoreMenu,
      } = useMoralisCloudFunction(Variables.GET_ORDER_HISTORY, {
          store,
      }); */

  const {
    data: storeInfoResp,
    // error: errLoadingStoreInfo,
    isLoading: isLoadingStoreInfo,
  } = useMoralisCloudFunction(Variables.GET_STORE_INFO, {
    store,
  });

  useEffect(() => {
    if (storeInfoResp) {
      console.log("storeInfoResp --> ", storeInfoResp);
      setStoreInfo(storeInfoResp);
      setCurrencyExchangeRate(storeInfoResp.currencyRate);
    } else {
      // console.log("Store dont exist", isLoadingStoreInfo);
    }
  }, [storeInfoResp, isLoadingStoreInfo]);

  useEffect(() => {
    if (storeMenuResp && storeMenuResp.length > 0) {
      setStoreMenu(storeMenuResp[0].attributes);
    } else {
      // console.log("Store menu dont exist", isLoadingStoreMenu);
    }
  }, [storeMenuResp, isLoadingStoreMenu]);

  const CartItem = {
    checkOut: localStorage.getItem("checkOut")
      ? JSON.parse(localStorage.getItem("checkOut"))
      : [],
    totalAmmuont: localStorage.getItem("totalAmmuont")
      ? localStorage.getItem("totalAmmuont")
      : "0",
    totalItems: localStorage.getItem("checkOut")
      ? JSON.parse(localStorage.getItem("checkOut")).length
      : 0,
    clearCartItems: () => clearCart(),
  };

  const getTime = () => {
    const date = new Date();
    const date24 = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    });
    const options = { weekday: "long", timeZone: "America/New_York" };
    return {
      // time: date.toLocaleTimeString([], { hour: '2-digit', hour12: true, timeZone: 'America/New_York' }).replace(/ /g,''),
      time: new Date(date24).getHours(),
      day: date.toLocaleDateString("en-US", options).toLowerCase(),
    };
  };

  const isStoreOpen = (currentDateTime, fetchStoreTiming) => {
    let timing = {
      isOpen: false,
      timing: {
        start: "00",
        end: "00",
      },
    };
    fetchStoreTiming.time.forEach((i) => {
      if (i.start <= currentDateTime.time && i.end >= currentDateTime.time) {
        timing = {
          isOpen: true,
          timing: i,
        };
      }
    });
    return timing;
  };

  const storeTiming = () => {
    const currentDateTime = getTime();
    // const fetchStoreTiming =
    //   storeInfoTiming.result.timings[currentDateTime.day];
    // const timing = isStoreOpen(currentDateTime, fetchStoreTiming);
    // return {
    //   isOpen: timing.isOpen,
    //   timingData: timing.timing,
    //   start: convertTo24(timing.timing.start),
    //   end: convertTo24(timing.timing.end),
    //   isHoliday: fetchStoreTiming.isHoliday,
    // };
  };

  const convertTo24 = (time) => {
    var timeString = time + ":00";
    var H = +timeString.substr(0, 2);
    var h = H % 12 || 12;
    var ampm = H < 12 || H === 24 ? "AM" : "PM";
    return (timeString = h + timeString.substr(2, 3) + ampm);
  };

  const addToCart = (payload) => {
    return dispatch({
      type: "ADD_ITEM",
      payload,
    });
  };

  const updateCartItem = (payload) => {
    return dispatch({
      type: "UPDATE_CART",
      payload,
    });
  };

  const removeFromCart = (payload) => {
    return dispatch({
      type: "REMOVE_CART",
      payload,
    });
  };

  const clearCart = () => {
    return dispatch({
      type: "CLEAR_CART",
    });
  };

  const [UserCartData, dispatch] = useReducer(reducer, CartItem);

  return (
    <CoustomContext.Provider
      value={{
        ...UserCartData,
        ...storeMenu,
        storeInfo,
        isLoadingStoreInfo,
        storeUrl,
        currencyExchangeRate,
        addToCart,
        removeFromCart,
        updateCartItem,
        storeTiming,
        currentDateTime: getTime(),
      }}
    >
      {props.children}
    </CoustomContext.Provider>
  );
};

export default ContextProvider;
