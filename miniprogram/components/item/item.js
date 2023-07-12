"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Component({
    ready() {
    },
    properties: {
        // 物件id
        _id: {
            type: String
        }
    },
    data: {
        name: '请稍等',
        description: '请稍等',
        graphPathes: [],
        time: new Date(Date.now()),
        pickerId: '' // 拾取者的id
    },
    methods: {
        // 发送物件被拾取的事件
        getPickerInfo() {
            this.triggerEvent('getPickerInfo', {
                pickerId: this.data.pickerId
            }, {
                bubbles: true,
                capturePhase: true,
                composed: true
            });
        },
        claim() {
            this.triggerEvent('claimItem', {
                itemId: this.data._id
            }, {
                bubbles: true,
                capturePhase: true,
                composed: true
            });
        }
    },
    lifetimes: {
        async attached() {
            const info = (await wx.cloud.database()
                .collection('items')
                .doc(this.data._id)
                .get()).data;
            this.setData({
                name: info.name,
                description: info.description,
                time: info.pickerTime,
                pickerId: info.picker
            });
            // 获取所有图片
            for (const graphicId of info.graphicIds) {
                const graphicUrl = { src: null, srctumb: null };
                if (graphicId.id) {
                    graphicUrl.src = (await wx.cloud.downloadFile({
                        fileID: graphicId.id
                    })).tempFilePath;
                }
                if (graphicId.idtumb) {
                    graphicUrl.srctumb = (await wx.cloud.downloadFile({
                        fileID: graphicId.idtumb
                    })).tempFilePath;
                }
                this.data.graphPathes.push(graphicUrl);
            }
            this.setData({
                graphPathes: this.data.graphPathes
            });
        }
    }
});
