import {auth} from "@cloudbase/node-sdk/src/auth";

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
        const thispage = this
        wx.getUserProfile({
            desc: "用于确定物件认领者和上传者",
            async success(profile) {
                getApp().user = profile.userInfo
                thispage.setData({
                    app: getApp()
                })
                thispage.data.portraitureBackgroundAnimationGenerator.top('0')
                thispage.data.portraitureBackgroundAnimationGenerator.left('0')
                thispage.data.portraitureBackgroundAnimationGenerator.step()
                thispage.data.portraitureAnimationGenerator.opacity(1)
                thispage.data.portraitureAnimationGenerator.step()
                thispage.setData({
                    portraitureBackgroundAnimation: thispage.data.portraitureBackgroundAnimationGenerator.export(),
                    portraitureAnimation: thispage.data.portraitureAnimationGenerator.export()
                })
                wx.cloud.callFunction({
                    name: 'getUserDetail',
                    data: {
                        userId: (await wx.cloud.callFunction({
                            name: "getOpenid"
                            // @ts-ignore
                        })).result!.openid
                    }
                }).then(value => {
                    // @ts-ignore
                    if (value.result.errMsg === 'UnfoundDoc!') {
                        wx.cloud.callFunction({
                            name: 'userRegister'
                        })
                    }
                }).catch()
            }
        })
    },
    async selfInfo(){
        wx.navigateTo({
            url: "./selfinfo/selfinfo",
        }).then(async res => {
            res.eventChannel.emit('userId', {
                'userId': {
                    userId: (await wx.cloud.callFunction({
                        name: "getOpenid"
                        // @ts-ignore
                    })).result!.openid
                }
            })
        })
    },
    fillinfo() {
        wx.navigateTo({
            url: './fillinfo/fillinfo'
        })
    },
    opLog() {
        wx.navigateTo({
            url: './oplog/oplog'
        })
    },
    onLoad() {
        this.setData({
            portraitureBackgroundAnimation: this.data.portraitureBackgroundAnimationGenerator.export(),
            portraitureAnimation: this.data.portraitureAnimationGenerator.export()
        })
    }
})
