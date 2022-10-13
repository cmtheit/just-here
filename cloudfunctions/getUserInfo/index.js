"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const wx_server_sdk_1 = __importDefault(require("wx-server-sdk"));
wx_server_sdk_1.default.init();
exports.main = async () => {
    const wxContext = wx_server_sdk_1.default.getWXContext();
    const db = wx_server_sdk_1.default.database();
    const __ = db.command;
    if (wxContext.OPENID) {
        // 用户已登录，获取用户信息
        try {
            return await db.collection('user').doc(wxContext.OPENID).get();
        }
        catch (e) {
            console.log('err', e);
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
