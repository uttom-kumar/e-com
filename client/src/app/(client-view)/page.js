'use client'
import AllProductList from "@/component/client/Home/all-product-list";
import {useEffect} from "react";
import axios from "axios";
import {CategoryReadRequest, ProductListRead} from "@/component/Request-Api/AllRequest";
import {ReadCartRequest} from "@/component/Request-Api/CartRequest";
import {ReadWishRequest} from "@/component/Request-Api/WishRequest";


export default function Home() {
    useEffect(() => {
        (async () => {
            await CategoryReadRequest();
            await ProductListRead()
            await ReadCartRequest()
            await ReadWishRequest()
        })()
    }, []);

  return (
      <div className={'container mx-auto'}>
          <AllProductList />
      </div>
  );
}
