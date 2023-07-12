"use strict";
Component({
    properties: {
        // 每个图片的宽度
        width: {
            type: String,
            value: '128rpx'
        },
        // 初始化图片
        graphUrls: {
            type: Array,
            value: []
        },
        // 最大包含图片数量，大于等于0
        maxlength: {
            type: Number,
            value: 9
        },
        // 每行显示的图片数量
        perline: {
            type: Number,
            value: 3
        },
        changeable: {
            type: Boolean,
            value: true
        }
    },
    lifetimes: {
        created() {
            this.setData({
                length: this.data.graphUrls.length > this.data.maxlength ? this.data.maxlength : this.data.graphUrls.length
            });
        }
    },
    data: {
        length: 0
    },
    methods: {
        addimg() {
            if (this.data.length < this.data.maxlength) {
                wx.chooseMedia({
                    sourceType: ['album', 'camera'],
                    mediaType: ['image'],
                    count: this.data.maxlength - this.data.length
                }).then(value => {
                    value.tempFiles.forEach(img => {
                        this.data.graphUrls.push({
                            srctumb: img.thumbTempFilePath || null,
                            src: img.tempFilePath
                        });
                    });
                    this.setData({
                        graphUrls: this.data.graphUrls || null,
                        length: this.data.length + value.tempFiles.length
                    });
                    // 曝光自身的urls
                    this.triggerEvent('addimgs', {
                        value: this.data.graphUrls
                    }, {
                        composed: true,
                        capturePhase: true,
                        bubbles: true
                    });
                }).catch();
            }
        }
    }
});
