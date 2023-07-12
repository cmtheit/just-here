import {stat} from "fs";
import {imgblksrc, oplog} from "../../../typings/oplog";
import {additem, item} from "../../../typings/additem";
import {DB, downloadFile} from "wx-server-sdk";
import GeoPoint = DB.GeoPoint;
import {it} from "node:test";

Component({
    properties: {
        // 是否显示操作者
        showoperator: {
            type: Boolean,
            value: true
        },
        // 操作记录在数据库中的 id
        _id: {
            type: String,
            value: "UNKNOWN"
        }
    },
    relations: {
        imgblkgroup: {
            type: 'child'
        }
    },
    data: {
        type: '请稍等' as unknown as oplog['type'],    // 操作类型
        time: '请稍等' as string,                             // 操作时间
        graphicUrls: [] as imgblksrc[],                 // 物品图片
        operatorName: '请稍等' as string,              // 操作者姓名
        loc: null as DB.GeoPoint | null,
        itemName: '请稍等' as string,
        description: '请稍等' as string,
        open: false as boolean
    },
    options: {
        styleIsolation: "apply-shared"
    },
    lifetimes: {
        async attached() {
            const db = wx.cloud.database()
            // 要求调用此组件必须传入正确的 id
            const oplog = (await db.collection('oplogs')
                .doc(this.data._id)
                .get()).data as oplog
            this.setData({
                type: oplog.type,   // 操作类型
                time: `${oplog.time.getFullYear()}年${oplog.time.getMonth() + 1}月${oplog.time.getDate()}日 ${oplog.time.getHours()}:${oplog.time.getMinutes()}`,   // 操作时间
            })
            if (this.data.showoperator) {
                const operator = (await db.collection('user')
                    .doc(oplog._openid)
                    .get()).data
                this.setData({
                    operatorName: operator.name // 操作者姓名
                })
            }
            const item = (await db.collection('items')
                .doc(oplog.itemid)
                .get()).data as item
            this.setData({
                itemName: item.name,
                loc: item.loc,
                description: item.description,
                cabinet: item.cabinet
            })
            for (const g of item.graphicIds) {
                const graphic = {srctumb: null, src: null} as imgblksrc
                if (g.idtumb) {
                    graphic.srctumb = (await wx.cloud.downloadFile({
                        fileID: g.idtumb
                    })).tempFilePath
                }
                if (g.id) {
                    graphic.src = (await wx.cloud.downloadFile({
                        fileID: g.id
                    })).tempFilePath
                }
                this.data.graphicUrls.push(graphic)
            }
            this.setData({
                graphicUrls: this.data.graphicUrls
            })
        }
    },
    methods: {
        stretch() {
            this.setData({
                open: !this.data.open
            })
        }
    }
})