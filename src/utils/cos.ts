import { postCosAuth } from '@/api/index';

export const cosParams = function(user: string, uploadType: string) {
  return  {
    getAuthorization: async function(options: any, callback: any) {
      const {
        data: {
          expiredTime,
          startTime,
          credentials: 
            {
              sessionToken,
              tmpSecretId,
              tmpSecretKey
            }
          }
        } = await postCosAuth(user, uploadType)|| {}
        callback({
          SecurityToken: sessionToken,
          TmpSecretId: tmpSecretId,
          TmpSecretKey: tmpSecretKey,
          ExpiredTime: expiredTime,
          StartTime: startTime,
          ScopeLimit: true,
        })
    }
  }
}
