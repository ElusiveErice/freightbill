import QQMapWX from './libs/qqmap-wx-jssdk.js';
// app.ts

interface City {
  id: string;
  name: string;
  fullname: string;
  location: {
    lat: number,
    lng: number
  },
  pinyin: string[]
}
App<IAppOption>({
  globalData: {},
  onLaunch() {
    const qqmapsdk = new QQMapWX({
      key: 'ZLZBZ-JJX6J-T4IFV-KEV42-JWKST-LRFG4'
    });
    qqmapsdk.getCityList({
      success: function (res: { result: any[]; }) {
        const cityList: City[] = res.result[1];
        const cityNameList: City[] = cityList.sort(compareCity).map((city) => {
          city.toString = function() {
            return city.name
          }
          return city;
        })
        wx.setStorage({
          key: 'city_list',
          data: cityNameList
        })
      }
    });

    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
  },
})

function compareCity(cityA: City, cityB: City) {
  const cityPinyinA = cityA.pinyin
  const cityPinyinB = cityB.pinyin
  for (let i = 0; i < cityPinyinA.length && cityPinyinB.length; i++) {
    if (cityPinyinA[i] < cityPinyinB[i]) {
      return -1
    } else if (cityPinyinA[i] > cityPinyinB[i]) {
      return 1
    }
  }
  if (cityPinyinA.length < cityPinyinB.length) {
    return -1
  } else if (cityPinyinA.length > cityPinyinB.length) {
    return 1
  } else {
    return 0
  }
}