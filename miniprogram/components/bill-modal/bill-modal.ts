// components/bill-modal.ts
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        isVisible: {
            type: Boolean,
            value: false
        },
        title:{
            type: String,
            value: ''
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onCancel() {
            this.setData({
                isVisible: false
            });
            this.triggerEvent('cancel');
        },
        onFinish() {
            this.setData({
                isVisible: false
            });
            this.triggerEvent('finish');
        }
    }
})
