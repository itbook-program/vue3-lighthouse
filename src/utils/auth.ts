const TokenKey = 'book-lighthouse-Token'
const UserKey:string = 'book-lighthouse-user'
export function getToken () {
  return window.localStorage.getItem(TokenKey)
}

export function setToken (token: string) {
  return window.localStorage.setItem(TokenKey, token)
}

export function removeToken () {
  return window.localStorage.removeItem(TokenKey)
}

export function getUser (): any {
  return window.localStorage.getItem(UserKey)
}

export function setUser (user:string) {
  return window.localStorage.setItem(UserKey, user)
}

export function removeUser () {
  return window.localStorage.removeItem(UserKey)
}