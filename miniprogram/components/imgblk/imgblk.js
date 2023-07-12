"use strict";
Component({
    properties: {
        width: {
            type: String,
            value: "64rpx"
        },
        srctumb: {
            type: String,
            value: ""
        },
        src: {
            type: String,
            value: ""
        },
        // 当为空时，点击是否添加图片
        emptychoose: {
            type: Boolean,
            value: true
        }
    },
    data: {},
    methods: {
        ontap() {
            if (!(this.data.srctumb || this.data.src)) {
                if (this.data.emptychoose) {
                    wx.chooseMedia({
                        count: 1,
                        sourceType: ['album', 'camera'],
                        mediaType: ['image']
                    }).then(value => {
                        this.setData({
                            srctumb: value.tempFiles[0].thumbTempFilePath,
                            src: value.tempFiles[0].tempFilePath
                        });
                        this.triggerEvent("addimg", {
                            value: null
                        }, {
                            bubbles: true,
                            composed: true,
                            capturePhase: true
                        });
                    }).catch();
                }
                else {
                    this.triggerEvent("addimg", {
                        value: null
                    }, {
                        bubbles: true,
                        composed: true,
                        capturePhase: true
                    });
                }
            }
            else {
                wx.previewMedia({
                    sources: [{
                            url: this.data.src || this.data.srctumb,
                            type: "image"
                        }]
                });
            }
        }
    }
});
