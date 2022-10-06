import moment from 'moment';

export function getQueryVariable(name: any) {
  let str = ''
  const search = window.location.search
  if (search) {
    const queryStr = search.split('?')[1]
    const queryArr = queryStr.split('&')
    for (let i = 0; i < queryArr.length; i++) {
      const element = queryArr[i].split('=')
      if (element[0] === name) {
        str = element[1]
      }
    }
  }
  return str
}

function S4() {
  return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}
export const guid = () => {
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

export const formatDate = (date: Date) => {
  if(date) return moment(date).format("YYYY-MM-DD HH:mm:ss")|| ''
  return '';
}

export const formImageUrl = (url:string) => {
  if (!url) return ''
  if (url.indexOf('http://') > -1 || url.indexOf('https://') > -1) {
    return url
  } else {
    return `https://${url}`
  }
}

export const checkFormData = (refItem: any) => {
  console.log(refItem)
  return new Promise((resolve) => {
    refItem.value.validate()
    .then(() => {
      resolve(true)
    })
    .catch(() => {
      resolve(false)
    });
  })
}