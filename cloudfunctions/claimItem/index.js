"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const wx_server_sdk_1 = __importDefault(require("wx-server-sdk"));
wx_server_sdk_1.default.init();
exports.main = async (e) => {
    // 假设物品 id 都存在
    const wxContext = wx_server_sdk_1.default.getWXContext();
    const db = wx_server_sdk_1.default.database();
    const __ = db.command;
    if (wxContext.OPENID) {
        // 第一步，从储物柜中删除
        // 获取所在的储物柜
        let theCabinet = null;
        const cabinets = (await db.collection('cabinet')
            //@ts-ignore
            .get()).data;
        for (const cabinet of cabinets) {
            if (cabinet.items.includes(e.itemId)) {
                theCabinet = cabinet;
                break;
            }
        }
        theCabinet.items.splice(theCabinet.items.findIndex(value => value === e.itemId), 1);
        await db.collection('cabinet')
            .doc(theCabinet._id)
            .update({
            data: {
                items: theCabinet.items,
            }
        });
        // 第二步，将该 item 设置为 claimed 状态
        await db.collection('items')
            .doc(e.itemId)
            .update({
            data: {
                claimed: true,
                claimer: wxContext.OPENID,
                claimTime: db.serverDate()
            }
        });
        // 第三步，为用户添加操作记录
        await db.collection('oplogs')
            .add({
            data: {
                _openid: wxContext.OPENID,
                itemid: e.itemId,
                time: db.serverDate(),
                type: 'claim'
            }
        });
        return {
            errMsg: "OK"
        };
    }
    else {
        return {
            errMsg: 'Unlogined!'
        };
    }
};
