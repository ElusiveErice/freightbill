// pages/bill-edit/bill-edit.ts

export interface AccountItem {
    name: string;
    date: string;
    departure: string;
    destination: string;
}
Page({

    /**
     * 页面的初始数据
     */
    data: {
        accountList: [
            {
                name: '棉花棉花棉花棉花',
                date: '2022-2-10',
                departure: '马鞍山',
                destination: '长沙'
            },
            {
                name: '酱油',
                date: '2022-2-12',
                departure: '长沙',
                destination: '芜湖芜湖芜湖'
            }
        ],
        isShowEditItemPopup: false,
        selectedItemIndex: -1
    },

    onClickAccountItem(event: any) {
        const index = event.currentTarget.dataset.intemIndex;
        this.setData({
            selectedItemIndex: index,
            isShowEditItemPopup: true
        })
    },

    onHandleFinish(event: any) {
        const newAccountItem = event.detail;
        if (this.data.selectedItemIndex === -1) {
            const newAccountList = Array.from(this.data.accountList);
            newAccountList.push(newAccountItem);
            this.setData({
                accountList: newAccountList
            })
        } else {
            const newAccountList = this.data.accountList.map((value, index) => {
                if (index === this.data.selectedItemIndex) {
                    return newAccountItem;
                }
                return value;
            });
            this.setData({
                selectedItemIndex: -1,
                accountList: newAccountList
            })
        }
    },

    onHandleDelete() {
        const newAccountList = this.data.accountList.filter((_value, index) => index !== this.data.selectedItemIndex);
        this.setData({
            selectedItemIndex: -1,
            accountList: newAccountList
        })
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