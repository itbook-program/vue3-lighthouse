import CryptoJS from "crypto-js"
const key = CryptoJS.enc.Utf8.parse("1lovecdsrsoft202")
/**
 * 请求数据加密
 *
 * @param {any} plaintext 数据明文
 * @returns {string} ciphertext 数据密文
 */
export const encryptData = (word: string) => {
  return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(word), key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  }).toString()
};