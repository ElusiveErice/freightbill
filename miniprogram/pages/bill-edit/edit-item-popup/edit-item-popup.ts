// pages/bill-edit/edit-item-popup/edit-item-popup.ts
Component({
    options: {
        styleIsolation: 'apply-shared'
    },
    /**
     * 组件的属性列表
     */
    properties: {
        isShowEditItemPopup: {
            type: Boolean,
            value: false
        },
        accountItem: {
            type: Object,
            value: {
                name: '',
                date: '',
                departure: '',
                destination: '',
                price: 0,
                weight: 0,
                totalPrice: 0
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        name: '',
        date: '',
        departure: '',
        destination: '',
        price: 0,
        weight: 0,
        totalPrice: 0,
        index: 0
    },

    observers: {
        'accountItem': function (value) {
            if (value === null) {
                this.setData({
                    name: '',
                    date: '',
                    departure: '',
                    destination: '',
                    price: 0,
                    weight: 0,
                    totalPrice: 0
                })
                return;
            }
            this.setData({
                name: value.name,
                date: value.date,
                departure: value.departure,
                destination: value.destination,
                price: value.price,
                weight: value.weight,
                totalPrice: value.totalPrice
            })
        }
    },

    pageLifetimes: {
        show() {
            this.setData({cityList:[]})
            const callback = (cityList: []) => {
                this.setData({cityList})
            };
            wx.getStorage({
                key: 'city_list',
                success(res) {
                    callback(res.data);
                }
            });
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        onFinishItemEdit() {
            const newAccounItem = {
                name: this.data.name,
                date: this.data.date,
                departure: this.data.departure,
                destination: this.data.destination
            }
            this.triggerEvent("finish", newAccounItem);
        },

        onInputName(event: any) {
            this.setData({
                name: event.detail.value
            })
        },

        onChangeDate(event: any) {
            this.setData({
                date: event.detail.value
            })
        },

        onDelete() {
            const _deleteAccountItem = () => {
                this.setData({
                    isShowEditItemPopup: false
                });
                this.triggerEvent("delete");
            };
            wx.showModal({
                title:'注意',
                content:'确定删除该条账单',
                showCancel: true,
                success(res) {
                    if(res.confirm){
                        _deleteAccountItem();
                    }
                }
            });
        },

        onSelectDeparture() {
            const _this = this
            wx.navigateTo({
                url: '../city-select/city-select',
                events: {
                    // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
                    acceptDataFromOpenedPage: function(data: { name: string}) {
                      data && data.name && _this.setData({
                          departure: data.name
                      })
                    },
                  },
              })
        },
        
        onSelectDestination() {
            const _this = this
            wx.navigateTo({
                url: '../city-select/city-select',
                events: {
                    // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
                    acceptDataFromOpenedPage: function(data: { name: string}) {
                      data && data.name && _this.setData({
                          destination: data.name
                      })
                    },
                  },
              })
        }
    }
})
