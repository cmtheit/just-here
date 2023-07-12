import {helper} from "../../../helper";

Page({
    data: {
        app: getApp(),
        resume: null as unknown as {
            [k in keyof User]: string
        },
        sexlist: [
            {value: '男', text: '男'},
            {value: '女', text: '女'}
        ],
        saved: false
    },
    // 加载用户简历
    async onLoad(){
        const thisPage = this;
        wx.showLoading({
            title: ''
        })
        const gradelist = []
        const nowyear = new Date(Date.now()).getFullYear()
        for (let i = 0; i < 10; ++i) {
            gradelist.push({
                text: nowyear - i,
                value: nowyear - i
            })
        }
        this.setData({
            gradelist
        })
        this.setData({
            app: getApp()
        })
        if (this.data.app.user) {
            wx.enableAlertBeforeUnload({
                message: '简历尚未保存，若退出更新内容将丢失，是否确认退出简历填写页面',
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
                if (value.result.errMsg == 'UnfoundDoc!') {
                    wx.showToast({
                        title: "用户未找到！",
                        icon: "error"
                    }).then(() => {
                        setTimeout(() => {
                            wx.navigateBack()
                        }, 1500)
                    })
                    // @ts-ignore
                } else if (value.result.errMsg == 'Unlogined!') {
                    wx.hideLoading().then(() => {
                        wx.showToast({
                            icon: 'error',
                            title: "用户登录态错误"
                        }).then(() => {
                            setTimeout(() => {
                                wx.navigateBack()
                            }, 1500)
                        })
                    })
                } else {
                    wx.hideLoading()
                    helper<{data: User}>(value.result)
                    if (value.result.data.grade) {
                        thisPage.setData({
                            resume: {
                                name: value.result.data.name,
                                sex: value.result.data.sex,
                                grade: String(value.result.data.grade),
                                student_num: String(value.result.data.student_num),
                                phone_num: value.result.data.phone_num
                            }
                        })
                    }

                }
            })
        } else {
            wx.hideLoading().then(() => {
                wx.showToast({
                    title: '请先登录',
                    icon: 'error'
                }).then(() => {
                    setTimeout(() => {
                        wx.navigateBack()
                    }, 1500)
                })
            })
        }
    },
    submit(e: {
        detail: {
            value: {
                [P in keyof User]: string | undefined
            }
        }
    }){
        for (const i in e.detail.value){
            // @ts-ignore
            if(!e.detail.value[i]){
                wx.showToast({
                    title: '请完善简历后保存',
                    icon: "error"
                })
                return
            }
        }
        wx.cloud.callFunction({
            name: 'uploadUserInfo',
            data: {
                name: e.detail.value.name,
                sex: e.detail.value.sex,
                grade: Number(e.detail.value.grade),
                student_num: Number(e.detail.value.student_num),
                phone_num: e.detail.value.phone_num
            } as User
        }).then(() => {
            wx.disableAlertBeforeUnload()
            wx.showToast({
                title: '保存成功',
                icon: 'success'
            })
        })
    }
})