"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const wx_server_sdk_1 = __importDefault(require("wx-server-sdk"));
wx_server_sdk_1.default.init();
exports.main = async (event) => {
    const wxContext = wx_server_sdk_1.default.getWXContext();
    const db = wx_server_sdk_1.default.database();
    const __ = db.command;
    if (wxContext.OPENID) {
        // 用户已登录，获取用户信息
        // 向数据库添加信息
        const id = (await db.collection('items').add({
            data: {
                name: event.name,
                description: event.description,
                picker: wxContext.OPENID,
                pickerTime: db.serverDate(),
                claimTime: null,
                cabinet: event.cabinet,
                claimed: false,
                claimer: '',
                loc: event.loc
            }
            // @ts-ignore
        }))._id;
        /**
         * 客户端在成功调用本函数后需要更新graphicIds
         */
        try {
            await db.collection('cabinet')
                .doc(event.cabinet)
                .update({
                data: {
                    items: __.push({
                        each: [id]
                    })
                }
            });
            return {
                errMsg: 'OK',
                value: {
                    id: id
                }
            };
        }
        catch (e) {
            await db.collection('items')
                // @ts-ignore
                .doc(id)
                .remove();
            return {
                errMsg: 'UnfoundDoc!'
            };
        }
    }
    else {
        return {
            errMsg: 'Unlogined!'
        };
    }
};
