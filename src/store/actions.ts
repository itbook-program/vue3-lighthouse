// 获取用户个人信息
export const getUserInfo = (context:any, data:any) => {
  context.commit('setUserInfo', data)
}
// 获取用户购物车信息
export const getShopping = ({ commit, state }:any, data:any) => {
  const count = data && data.commodity ? data.commodity.length : 0
  if (data) {
    commit('setShoppingData', data.commodity)
    commit('setShoppingCount', count)
  }
}
