"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Page({
    data: {
        app: getApp(),
        portraitureBackgroundAnimationGenerator: wx.createAnimation({
            timingFunction: 'ease-in'
        }),
        portraitureAnimationGenerator: wx.createAnimation({
            timingFunction: 'ease-in'
        })
    },
    login() {
        const thispage = this;
        wx.getUserProfile({
            desc: "用于确定物件认领者和上传者",
            success(profile) {
                thispage.data.app.user = profile.userInfo;
                thispage.setData({
                    app: thispage.data.app
                });
                thispage.data.portraitureBackgroundAnimationGenerator.top('0');
                thispage.data.portraitureBackgroundAnimationGenerator.left('0');
                thispage.data.portraitureBackgroundAnimationGenerator.step();
                thispage.data.portraitureAnimationGenerator.opacity(1);
                thispage.data.portraitureAnimationGenerator.step();
                thispage.setData({
                    portraitureBackgroundAnimation: thispage.data.portraitureBackgroundAnimationGenerator.export(),
                    portraitureAnimation: thispage.data.portraitureAnimationGenerator.export()
                });
                wx.cloud.callFunction({
                    name: 'getUserInfo'
                }).then(value => {
                    // @ts-ignore
                    if (value.result.errMsg === 'UnfoundDoc!') {
                        wx.cloud.callFunction({
                            name: 'userRegister'
                        });
                    }
                    else {
                        console.log('欢迎回来');
                    }
                    console.log(value);
                }).catch();
            }
        });
    },
    selfInfo() {
        wx.navigateTo({
            url: "./selfinfo/selfinfo"
        });
    },
    opLog() {
        wx.navigateTo({
            url: './oplog/oplog'
        });
    },
    onLoad() {
        this.setData({
            portraitureBackgroundAnimation: this.data.portraitureBackgroundAnimationGenerator.export(),
            portraitureAnimation: this.data.portraitureAnimationGenerator.export()
        });
    }
});
