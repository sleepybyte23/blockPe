import React, { useState, useEffect, createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import { useToast, Grid, GridItem, Stack, Flex } from "@chakra-ui/react";
import { useMoralis, useMoralisCloudFunction } from "react-moralis";
//import { IoCallSharp } from "react-icons/io5";
import { useMediaQuery } from "@chakra-ui/media-query";
import Variables from "../../helpers/Variables";
// import ProductList from "../components/ProductList";
// import Cart from "../components/Cart";
// import "../styles/Restaurant.css";
// import Menu from "../components/MenuHorizontal";
// import Loader from "../components/shared/Loader";
// import DataContext from '../context/MainContext';

export const CartData = createContext();

const Restaurant = (props) => {
  //   const data = useContext(DataContext);

  //   let { storeUrl } = useParams();
  //   const [store] = useState(storeUrl ? storeUrl : "");
  //   const [storeInfo, setStoreInfo] = useState();
  //   const toast = useToast();
  //   const storeTiming = data.storeTiming();

  //   const getToast = (title, desc, status) => {
  //     toast.closeAll();
  //     const toastMsg = {
  //       title: title,
  //       description: desc,
  //       status: status,
  //       duration: 3000,
  //       isClosable: true,
  //     };
  //     toast(toastMsg);
  //   };

  //   const { isAuthUndefined, isAuthenticated, isWeb3Enabled, enableWeb3 } =
  //     useMoralis();

  //   useEffect(() => {
  //     if (!isAuthUndefined) {
  //       if (isAuthenticated && !isWeb3Enabled) {
  //         enableWeb3();
  //         // console.log("isWeb3Enabled ", isWeb3Enabled);
  //         // console.log("isAuthenticated ", isAuthenticated);
  //       } else {
  //         // console.log("isWeb3Enabled ", isWeb3Enabled);
  //         // console.log("isAuthenticated ", isAuthenticated);
  //       }
  //     }
  //   }, [enableWeb3, isAuthUndefined, isAuthenticated, isWeb3Enabled]);

  //   // const priceInCurrency = (price) => {
  //   //   return web3.utils.fromWei(price, "ether");
  //   // };

  //   // Load Store Info
  //   const {
  //     data: storeInfoResp,
  //     error: errLoadingStoreInfo,
  //     isLoading: isLoadingStoreInfo,
  //   } = useMoralisCloudFunction(Variables.GET_STORE_INFO, {
  //     store,
  //   });

  //   useEffect(() => {
  //     if (storeInfoResp) {
  //       // console.log("storeInfoResp --> ", storeInfoResp);
  //       setStoreInfo(storeInfoResp);
  //     } else {
  //       // console.log("Store dont exist", isLoadingStoreInfo);
  //     }
  //   }, [storeInfoResp, isLoadingStoreInfo]);

  //   const [isNotSmallerScreen] = useMediaQuery("(min-width:1024px)");

  //   return (
  //     <>
  //       {isLoadingStoreInfo ? (
  //         <Loader />
  //       ) : (
  //         <>
  //           {errLoadingStoreInfo
  //             ? getToast(errLoadingStoreInfo.message, "", "error")
  //             : ""}
  //           {storeInfo && !isLoadingStoreInfo ? (
  //             <>
  //               <div>
  //                 <div
  //                   style={{
  //                     backgroundImage:
  //                       "url(https://t4.ftcdn.net/jpg/02/34/63/07/360_F_234630793_eHKQucxaXftnWrecTJFITmD4cr3TlUgG.jpg)",
  //                     backgroundPosition: "center",
  //                     backgroundSize: "cover",
  //                   }}
  //                 >
  //                   <div className="p-5 d-flex restaurantHeader">
  //                     <div className="restaurantDetails restaurantCard d-flex py-4 align-items-center">
  //                       <img
  //                         className="restaurantHeaderImg"
  //                         src={storeInfo.logo}
  //                         alt={storeInfo.logo}
  //                         style={{ height: 150 }}
  //                       />
  //                       <div className="ml-4 sm-ml-0">
  //                         <h5 style={{ fontSize: 22, fontWeight: "700" }}>
  //                           {storeInfo.name}
  //                         </h5>
  //                         <div
  //                           className="d-flex align-items-center my-2"
  //                           style={{ color: "#585858" }}
  //                         >
  //                           <IoCallSharp />
  //                           <p className="ml-2"> {storeInfo.phone}</p>
  //                         </div>
  //                         <h5
  //                           style={{
  //                             fontSize: 12,
  //                             fontWeight: "400",
  //                             marginBottom: 10,
  //                           }}
  //                         >
  //                           {storeInfo.address}
  //                         </h5>
  //                         {storeTiming.isOpen ? (
  //                           <>
  //                             <h5
  //                               style={{
  //                                 fontSize: 14,
  //                                 fontWeight: "700",
  //                                 color: "#10b61d",
  //                               }}
  //                             >
  //                               Open ({storeTiming.start} to {storeTiming.end})
  //                             </h5>
  //                           </>
  //                         ) : (
  //                           <>
  //                             <h5
  //                               style={{
  //                                 fontSize: 14,
  //                                 fontWeight: "700",
  //                                 color: "red",
  //                               }}
  //                             >
  //                               Restaurant Closed
  //                             </h5>
  //                           </>
  //                         )}
  //                       </div>
  //                     </div>
  //                   </div>
  //                 </div>
  //                 <div
  //                   className="mb-5 mt-2 border-bottom"
  //                   style={{
  //                     position: "sticky",
  //                     top: 0,
  //                     zIndex: 99,
  //                     background: "#fff",
  //                   }}
  //                 >
  //                   <Flex justifyContent="center">
  //                     <Menu />
  //                   </Flex>
  //                 </div>
  //                 <Grid templateColumns="repeat(6, 1fr)" gap={4}>
  //                   <GridItem colSpan={isNotSmallerScreen ? 4 : 6}>
  //                     <ProductList />
  //                   </GridItem>
  //                   <GridItem
  //                     colSpan={isNotSmallerScreen ? 2 : 6}
  //                     bg={isNotSmallerScreen ? "" : "tomato"}
  //                     className="cartSmallScreen mt-3"
  //                   >
  //                     <Cart />
  //                   </GridItem>
  //                 </Grid>
  //               </div>
  //               <Stack direction={["column", "row"]} spacing="2px"></Stack>
  //             </>
  //           ) : (
  //             <div>Store Dont exist</div>
  //           )}
  //         </>
  //       )}
  //     </>
  //   );

  return <>Hi</>;
};

export default Restaurant;
