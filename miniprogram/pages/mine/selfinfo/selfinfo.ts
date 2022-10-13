Page({
    data: {
        app: getApp(),
        info: null
    },
    // 加载用户简历
    onLoad(){
        wx.showLoading({
            title: "获取个人资料",
        })
    },
    getUserInfo(){
        wx.cloud.callFunction({
            name: 'getUserInfo'
        }).then(value => {

        })

    },
    leave(){
        this.setData({
            leave: true
        })
    },
    back(){
        this.setData({
            leave: false
        })
    },
})