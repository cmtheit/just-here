import {helper} from "../../../helper";

Page({
    data: {
        oplogs: [] as oplogs
    },
    onLoad() {
        wx.cloud.callFunction({
            name: 'getOplogs'
        }).then(value => {
            // @ts-ignore
            if (value.result.errMsg === 'UnfoundDoc!') {
                wx.showToast({
                    icon: 'error',
                    title: '用户未注册'
                })
                // @ts-ignore
            } else if (value.result.errMsg === 'Unlogined'){
                wx.showToast({
                    icon: 'error',
                    title: '请先登录'
                })
            } else {
                helper<{
                    result: {
                        data: oplogs
                    }
                }>(value)
                this.setData({
                    oplogs: value.result.data
                })
            }
        })
    }
})