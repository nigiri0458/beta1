const DEFAULT_API = "http://127.0.0.1:3000/api"

export const adminPage = `${DEFAULT_API}/admin`;

export const userAuth = `${DEFAULT_API}/userAuthentication`;
export const signupAuth = `${DEFAULT_API}/signupAuth`;
export const setCurrentUser = `${DEFAULT_API}/setCurrentUser`;
export const usersShow = `${DEFAULT_API}/users/mypage`;
export const usersEdit = `${DEFAULT_API}/users/edit`;
export const usersUpdate = `${DEFAULT_API}/users/update`;
export const loginAuth = `${DEFAULT_API}/loginAuth`;
export const logout = `${DEFAULT_API}/logout`;

export const eventsIndex = `${DEFAULT_API}/events`;
export const eventsShow = (eventId) => `${DEFAULT_API}/events/${eventId}`;
export const eventCreate = `${DEFAULT_API}/events/create`;

export const cartsIndex = (userId) => `${DEFAULT_API}/users/${userId}/cart`;

export const cartItemsCreate = (eventId) => `${DEFAULT_API}/events/${eventId}/create`;
export const cartItemsChangeQuantity = (cartItemId) => `${DEFAULT_API}/cart_items/${cartItemId}/changeQuantity`;
export const cartItemsDelete = `${DEFAULT_API}/cart_items/delete`;
export const cartItemsPurchase = `${DEFAULT_API}/cart_items/purchase`;
export const cartItemShow = `${DEFAULT_API}/cart_items_show`;

export const orderHistoriesIndex = `${DEFAULT_API}/order_histories`;
export const orderHistoriesShow = (orderId) => `${DEFAULT_API}/order_histories/${orderId}`;
export const ordersIsPurchased = (orderId) => `${DEFAULT_API}/order_histories/${orderId}/isPurchased`;
export const ordersCreate = `${DEFAULT_API}/orders/create`;