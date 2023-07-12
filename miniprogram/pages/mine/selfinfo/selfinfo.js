"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("../../../helper");
Page({
    data: {
        app: getApp(),
        info: null,
        noInfoAnmGen: wx.createAnimation({
            timingFunction: 'ease-in'
        }),
        fillAnmGen: wx.createAnimation({})
    },
    // 加载用户简历
    onLoad() {
        const thisPage = this;
        wx.showLoading({
            title: "获取个人资料",
        });
        // 获取要获取的用户的 id
        this.getOpenerEventChannel().on('userId', (value) => {
            console.log(value);
            wx.cloud.callFunction({
                name: 'getUserDetail',
                data: {
                    userId: value.userId.userId
                }
            }).then(value => {
                wx.hideLoading();
                // @ts-ignore
                (0, helper_1.helper)(value);
                if (value.result.data.grade) {
                    thisPage.setData({
                        info: value.result.data
                    });
                }
                else {
                    thisPage.data.noInfoAnmGen.top('80vh');
                    thisPage.data.noInfoAnmGen.step({
                        timingFunction: 'ease-out',
                        duration: 200
                    });
                    thisPage.data.noInfoAnmGen.top('40vh');
                    thisPage.data.noInfoAnmGen.step({
                        timingFunction: 'ease-in',
                        duration: 200
                    });
                    thisPage.data.noInfoAnmGen.top('50vh');
                    thisPage.data.noInfoAnmGen.step();
                    thisPage.data.noInfoAnmGen.height('100vh');
                    thisPage.data.noInfoAnmGen.top('0');
                    thisPage.data.noInfoAnmGen.step({
                        timingFunction: 'ease-out',
                        duration: 1000
                    });
                    thisPage.setData({
                        noInfoAnimation: thisPage.data.noInfoAnmGen.export()
                    });
                }
            });
        });
    },
    leave() {
        this.setData({
            leave: true
        });
    },
    back() {
        this.setData({
            leave: false
        });
    },
});
