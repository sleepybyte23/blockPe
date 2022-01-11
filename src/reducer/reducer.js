export const reducer = (state, action) => {
    if (action.type === "ADD_ITEM") {
        if (!state.checkOut.find(o => o.cartId === action.payload.cartId)) {
            state.checkOut.push(action.payload);
            state.totalAmmuont = parseInt(state.totalAmmuont) + parseInt(action.payload.totalPrice);
            return {
                ...state,
                totalItems: state.totalItems + action.payload.itemQuant
            }
        } else {
            const objIndex = state.checkOut.findIndex((obj => obj.cartId === action.payload.cartId));
            state.checkOut[objIndex].itemQuant = parseInt(state.checkOut[objIndex].itemQuant) + parseInt(action.payload.itemQuant);
            state.checkOut[objIndex].totalPrice = parseInt(state.checkOut[objIndex].totalPrice) + parseInt(action.payload.totalPrice);
            state.totalAmmuont = parseInt(state.totalAmmuont) + parseInt(action.payload.totalPrice);
            return {
                ...state,
                totalItems: state.totalItems + action.payload.itemQuant
            }
        }
    }
    if (action.type === "REMOVE_CART") {
        const removeByAttr = function (arr, attr, value) {
            let i = arr.length;
            while (i--) {
                if (arr[i]
                    && arr[i].hasOwnProperty(attr)
                    && (arguments.length > 2 && arr[i][attr] === value)) {
                    state.totalAmmuont = parseInt(state.totalAmmuont) - parseInt(arr[i].totalPrice);
                    state.totalItems = parseInt(state.totalItems) - parseInt(arr[i].itemQuant)
                    arr.splice(i, 1);
                }
            }
        }

        removeByAttr(state.checkOut, 'cartId', action.payload);

        return {
            ...state,
        };
    }
    if (action.type === "CLEAR_CART") {

        state.checkOut = [];
        state.totalAmmuont = 0;
        state.totalItems = 0;
        localStorage.removeItem("checkOut");
        localStorage.removeItem("totalAmmuont");

        return {
            ...state,
        };
    }

    if (action.type === "UPDATE_CART") {
        const objIndex = state.checkOut.findIndex((obj => obj.cartId === action.payload.oldCartProductId));
        const obj = state.checkOut[objIndex];
        state.totalAmmuont = parseInt(state.totalAmmuont) - parseInt(obj.totalPrice);
        state.totalItems = parseInt(state.totalItems) - parseInt(obj.itemQuant);
        state.checkOut.splice(objIndex, 1, action.payload);
        state.totalAmmuont = parseInt(state.totalAmmuont) + parseInt(action.payload.totalPrice);
        state.totalItems = parseInt(state.totalItems) + parseInt(action.payload.itemQuant);
        return {
            ...state,
        };
    }

    return state;
}