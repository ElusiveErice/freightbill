// pages/city-select/city-select.ts
interface City {
    id: string;
    name: string;
    fullname: string;
    pinyin: string[];
    location: {
        lat: number;
        lng: number;
    }
}
interface ListItem {
    alpha: string;
    subItems: [];
}
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        const sortCity = (cityList: []) => {
            const map = new Map()
            cityList.forEach((city: City) => {
                const alpha = city.pinyin[0].charAt(0).toUpperCase()
                if (!map.has(alpha)) map.set(alpha, [])
                map.get(alpha).push({ name: city.name })
            })

            const keys = []
            for (const key of map.keys()) {
                keys.push(key)
            }
            keys.sort()

            const list = []
            for (const key of keys) {
                list.push({
                    alpha: key,
                    subItems: map.get(key)
                })
            }
            this.setData({ list })
        };
        wx.getStorage({
            key: 'city_list',
            success(res) {
                sortCity(res.data);
            }
        });
    },

    onChoose(e: any) {
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.emit('acceptDataFromOpenedPage', {name: e.detail.item.name});
        wx.navigateBack()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})