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
                destination: ''
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
        destination: ''
    },

    observers: {
        'accountItem': function (value) {
            if (value === null) {
                return;
            }
            this.setData({
                name: value.name,
                date: value.date,
                departure: value.departure,
                destination: value.destination
            })
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

        onInputDate(event: any) {
            this.setData({
                date: event.detail.value
            })
        },

        onInputDeparture(event: any) {
            this.setData({
                departure: event.detail.value
            })
        },

        onInputDestination(event: any) {
            this.setData({
                destination: event.detail.value
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
        }
    }
})
