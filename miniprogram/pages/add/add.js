"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("../../helper");
Page({
    data: {
        app: getApp(),
        add: false,
        graph: [],
        loc: [],
        cabnets: [{
                text: "丁香14号楼 储物柜",
                value: "丁香14号楼 储物柜"
            }, {
                text: "海棠10号楼 储物柜",
                value: "海棠10号楼 储物柜"
            }, {
                text: "竹园4号楼 储物柜",
                value: "竹园4号楼 储物柜"
            }, {
                text: "家属区 储物柜",
                value: "家属区 储物柜"
            }],
        // 操作记录
        logs: [],
    },
    additem() {
        if (!getApp().user) {
            wx.showToast({
                title: "请先登录",
                icon: "none"
            });
            return;
        }
        this.setData({
            add: true
        });
    },
    addimgs(e) {
        this.setData({
            graph: e.detail.value
        });
    },
    addloc() {
        wx.getLocation({})
            .then(value => {
            this.setData({
                loc: [value.longitude, value.latitude]
            });
        });
    },
    unadditem() {
        this.setData({
            add: false
        });
        this.setData({
            loc: [],
            graph: [],
        });
    },
    submit(e) {
        wx.showLoading({
            title: "上传中"
        });
        const db = wx.cloud.database();
        for (const item in e.detail.value) {
            // @ts-ignore
            if (!e.detail.value[item]) {
                wx.showToast({
                    title: "请完善所有字段",
                    icon: "none"
                });
                return;
            }
        }
        wx.cloud.callFunction({
            name: 'addItem',
            data: {
                name: e.detail.value.name,
                description: e.detail.value.description,
                cabinet: e.detail.value.cabinet,
                // @ts-ignore
                loc: this.data.loc.length && new db.Geo.Point(...this.data.loc) || null,
            }
        })
            .then(async (value) => {
            (0, helper_1.helper)(value.result);
            const graphicIds = [];
            if (value.result.errMsg === 'OK') {
                const id = value.result.value.id;
                for (let index = 0; index < this.data.graph.length; ++index) {
                    const graphicId = {
                        idtumb: null,
                        id: null
                    };
                    const value = this.data.graph[index];
                    if (value.srctumb) {
                        const v = await wx.cloud.uploadFile({
                            cloudPath: `${id}/${index}_tumb.${value.srctumb.split('.')[value.srctumb.split('.').length - 1]}`,
                            filePath: value.srctumb
                        });
                        graphicId.idtumb = v.fileID;
                    }
                    if (value.src) {
                        const v = await wx.cloud.uploadFile({
                            cloudPath: `${id}/${index}.${value.src.split('.')[value.src.split('.').length - 1]}`,
                            filePath: value.src
                        });
                        graphicId.id = v.fileID;
                        graphicIds.push(graphicId);
                    }
                }
                const db = wx.cloud.database();
                await db.collection('oplogs')
                    .add({
                    data: {
                        type: 'pick',
                        itemid: id,
                        time: db.serverDate()
                    }
                });
                await db.collection('items')
                    .doc(id)
                    .update({
                    data: {
                        graphicIds: graphicIds
                    }
                });
                await wx.hideLoading();
                await wx.showToast({
                    title: "添加成功！",
                    icon: "success"
                });
                this.onShow();
            }
            else if (value.result.errMsg === 'UnfoundDoc!') {
                await wx.hideLoading();
                await wx.showToast({
                    title: "储物柜不存在！",
                    icon: "error"
                });
                throw 'error';
            }
            else {
                await wx.hideLoading();
                await wx.showToast({
                    title: "添加失败",
                    icon: "error"
                });
                throw 'error';
            }
        });
    },
    onShow() {
        this.setData({
            app: getApp()
        });
        wx.cloud.callFunction({
            name: 'getAddOplogs'
        }).then(value => {
            (0, helper_1.helper)(value);
            if (value.result.errMsg === 'Unlogined!') {
                wx.showToast({
                    title: "您未成功登入",
                    icon: "error"
                });
            }
            else if (value.result.errMsg === 'UnfoundDoc!') {
                wx.showToast({
                    title: "数据库中没有您的信息",
                    icon: "error"
                });
            }
            else {
                this.setData({
                    logs: value.result.data
                });
            }
        });
    },
});
