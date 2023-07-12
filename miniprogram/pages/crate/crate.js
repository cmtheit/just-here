"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("../../helper");
Page({
    data: {
        markers: [],
        mapSetting: {
            showLocation: true,
            rotate: 0,
            skew: 0,
            enable3D: true,
            showCompass: false,
            showScale: true,
            minScale: 15,
            maxScale: 20,
            enableRotate: false,
            enableSatellite: false,
        },
        longitude: 0,
        latitude: 0,
        // 展示的 item，值为一个marker的id
        showItem: null
    },
    async onLoad(query) {
        const cabinets = (await wx.cloud.database()
            .collection('cabinet')
            .get()).data;
        this.setData({
            // @ts-ignore
            markers: cabinets.map((ele, idx) => {
                return {
                    id: idx,
                    latitude: ele.pos.latitude,
                    longitude: ele.pos.longitude,
                    title: ele._id,
                    iconPath: ele._id === '丁香14号楼 储物柜'
                        ? "/images/posicon/dingxiang.png"
                        : ele._id === '海棠10号楼 储物柜'
                            ? "/images/posicon/haitang.png"
                            : ele._id === '家属区 储物柜'
                                ? "/images/posicon/jiashu.png"
                                : '/images/posicon/zhuyuan.png',
                    items: ele.items,
                    width: 40,
                    height: 60,
                    callout: {
                        display: "ALWAYS",
                        content: ele._id,
                        color: "#000000",
                        bgColor: "#69DAFF84",
                        anchorX: 0,
                        anchorY: 0,
                    }
                };
            })
        });
        console.log(this.data.markers);
        this.setData({
            latitude: this.data.markers[0].latitude,
            longitude: this.data.markers[0].longitude
        });
    },
    onCalloutTap(e) {
        const marker = this.data.markers.find(value => value.id === e.detail.markerId);
        this.setData({
            longitude: marker.longitude,
            latitude: marker.latitude,
            showItem: e.detail.markerId
        });
    },
    onGetPickerInfo(e) {
        console.log(e);
        wx.navigateTo({
            url: "/pages/mine/selfinfo/selfinfo"
        }).then(async (res) => {
            res.eventChannel.emit('userId', {
                'userId': e.detail.pickerId
            });
        });
    },
    onClaimItem(e) {
        if (!getApp().user) {
            wx.showToast({
                title: "请先登录！",
                icon: "error"
            });
        }
        else {
            // 调用云函数
            wx.showLoading({
                title: "认领中"
            });
            wx.cloud.callFunction({
                name: 'claimItem',
                data: {
                    itemId: e.detail.itemId
                }
            }).then(value => {
                (0, helper_1.helper)(value);
                if (value.result.errMsg === 'OK') {
                    wx.hideLoading();
                    wx.showToast({
                        title: "认领成功",
                        icon: "success"
                    });
                    const theMarker = this.data.markers.find(value => value.items.includes(e.detail.itemId));
                    theMarker.items.splice(theMarker.items.findIndex(value => value === e.detail.itemId), 1);
                    this.setData({
                        markers: this.data.markers
                    });
                }
            });
        }
    },
    back() {
        this.setData({
            showItem: null
        });
    }
});
