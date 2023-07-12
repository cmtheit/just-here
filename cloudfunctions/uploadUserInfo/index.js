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
        if (event.student_num)
            await wx_server_sdk_1.default.database().collection('user')
                .doc(wxContext.OPENID)
                .update({
                data: event
            });
        return {
            errMsg: 'OK'
        };
    }
    else {
        return {
            errMsg: 'Unlogined!'
        };
    }
};
