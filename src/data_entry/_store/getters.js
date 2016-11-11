// 这个 getter 函数会返回 count 的值
// 在 ES6 里你可以写成：
// export const getCount = state => state.count
// export function getCount (state) {
//   return state.count
// }
export const getSalesNativeData = state => state.sales_native.items
export const getSalesAbroadData = state => state.sales_abroad.items
export const getElectronicSalesData = state => state.electronic_sales.items
export const getPower = state => state.userInfo.power
export const getUsername = state => state.userInfo.username
