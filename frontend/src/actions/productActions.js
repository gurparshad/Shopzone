const { default: Axios } = require("axios");
const { PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL } = require("../constants/productConstants");

const listProducts = () => async (dispatch) => {

try{
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const {data} = await Axios.get("/api/products");
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
}catch(error){
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
}

}

const detailsProduct = (productId) => async (dispatch) => {
try {
    // console.log('inside try');
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    // console.log('before request');
    const { data } = await Axios.get("/api/products/" + productId);
    // console.log(data);
    // console.log('after request');
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    // console.log('sucess request');
}catch(error){
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
}
}

export { listProducts, detailsProduct }