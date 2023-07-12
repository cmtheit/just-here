"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("../../../helper");
Page({
    data: {
        oplogs: []
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
                });
                // @ts-ignore
            }
            else if (value.result.errMsg === 'Unlogined') {
                wx.showToast({
                    icon: 'error',
                    title: '请先登录'
                });
            }
            else {
                (0, helper_1.helper)(value);
                this.setData({
                    oplogs: value.result.data
                });
            }
        });
    }
});
