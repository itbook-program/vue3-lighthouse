export const setToken = (state:any, token:any) => {
  state.token = token
}
export const setLogin = (state:any, value:any) => {
  state.isLogin = value
}
export const setRegister = (state:any, value:any) => {
  state.isRegister = value
}
export const setForget = (state:any, value:any) => {
  state.isForget = value
}
// 保存用户个人信息
export const setUserInfo = (state:any, info:any) => {
  state.userInfo = info
}
// 保存用户购物车信息
export const setShoppingData = (state:any, data:any) => {
  state.shoppingDatas = data
}
// 保存用户购物车商品数量
export const setShoppingCount = (state:any, count:any) => {
  state.shoppingCount = count
}
