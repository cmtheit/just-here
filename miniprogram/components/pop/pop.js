// pop 组件，一个弹窗
Component({
	observers:{
		switch(){
			if(this.data.switch) {
                if (this.in) {
                    this.live()
                    this.in()
                }
			}else{
                if(this.out) {
                    this.die()
                    this.out()
                }
            }
		}
	},
    properties: {
        switch:{
            type: Boolean,
            value: false
        },
        // 若 switch 为 true, 则首次是否展示动画
        no_anime_first:{
            type: Boolean,
            value: false
        },
        // 滑块pop出现和离开的方向，有效值为["top", "left", "right", "bottom"]
        direction: {
            type: String,
            value: "top"
        },
        delay: {
            type: Number,
            value: 300
		},
		duration: {
			type: Number,
			value: 300
		},
        // 设置 timing-functioon
        timing_function: {
            type: String,
            value: "ease-in"
        },
        // pop 块的高度
        top: {
            type: String,
            value: "0"
        },
        // pop 块的宽度
        width: {
            type: String,
            value: "90%"
        },
        // pop 环境背景颜色
        background: {
            type: String,
            value: "rgba(0, 0, 0, 0.21)"
        },
        // pop 块 背景颜色
        ctn_background: {
            type: String,
            value: "#ffffff"
        },
        // pop 块圆角半径
        border_radius: {
            type: String,
            value: "24rpx"
        },
        // pop 环境z-index值
        z_index: {
            type: Number,
            value: 100
        }
    },
    data: {
        hide: false,
        transparent: "rgba(0, 0, 0, 0)",
        Z_INDEX: -1
    },
    methods: {
        ontransitionend(){
            if (this.data.hide){
                this.setData({
                    Z_INDEX: -1
                })
            }
        },
        live(){
            this.setData({
                background: this.data.origin_background,
                Z_INDEX: this.data.z_index,
                hide: false
            })
        },
        die(){
            this.setData({
                background: 'rgba(0, 0, 0, 0)',
                hide: true
            })
        },
	},
	lifetimes: {
		attached() {
            this.animation = wx.createAnimation({
				delay: this.data.delay,
				duration: this.data.duration,
				timingFunction: this.data.timing_function,
            })
            this.bganime = wx.createAnimation({
				delay: this.data.delay,
				duration: this.data.duration,
                timingFunction: this.data.timing_function
            })
            // 设置 pop 块的初始位置
			switch (this.data.direction) {
				case "left":
					this.setData({
						origin_pos: `right: 100%; top:${this.data.top};`,
					})
					this.in = () => {
						this.setData({
							animation: this.animation.right(0).step().export(),
                            bganime: this.bganime.backgroundColor(this.data.background).step().export()
						})
					}
					this.out = () => {
						this.setData({
							animation: this.animation.right("100%").step().export(),
                            bganime: this.bganime.backgroundColor(this.data.transparent).step().export()
						})
					}
					break
				case "bottom":
					this.setData({
						origin_pos: "top: 100%",
					})
                    this.in = () => {
                        this.setData({
                            animation: this.animation.top(this.data.top).step().export(),
                            bganime: this.bganime.backgroundColor(this.data.background).step().export()
                        })
                    }
                    this.out = () => {
                        this.setData({
                            animation: this.animation.top("100%").step().export(),
                            bganime: this.bganime.backgroundColor(this.data.transparent).step().export()
                        })
                    }
					break
				case "right":
					this.setData({
						origin_pos: `left: 100%; top:${this.data.top};`,
					})
                    this.in = () => {
                        this.setData({
                            animation: this.animation.left(0).step().export(),
                            bganime: this.bganime.backgroundColor(this.data.background).step().export()
                        })
                    }
                    this.out = () => {
                        this.setData({
                            animation: this.animation.left('100%').step().export(),
                            bganime: this.bganime.backgroundColor(this.data.transparent).step().export()
                        })
                    }
					break
				default:
					this.setData({
						origin_pos: "bottom: 100%",
					})
                    this.in = () => {
                        this.setData({
                            animation: this.animation.bottom('-' + this.data.top).step().export(),
                            bganime: this.bganime.backgroundColor(this.data.background).step().export()
                        })
                    }
                    this.out = () => {
                        this.setData({
                            animation: this.animation.bottom("100%").step().export(),
                            bganime: this.bganime.backgroundColor(this.data.transparent).step().export()
                        })
                    }
			}
            this.setData({
                origin_background: this.data.background
            })
            this.setData({
                background: "rgba(0,0,0,0)"
            })
            if(this.data.switch){
                if (this.data.no_anime_first){
                    this.live()
                    this.in()
                }else {
                    wx.nextTick(() => {
                        this.live()
                        this.in()
                    })
                }
            }
        }
	}
})
