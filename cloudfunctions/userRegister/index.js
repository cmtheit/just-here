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
        await db.collection('user').add({
            data: {
                _id: wxContext.OPENID,
                name: "",
                sex: "男",
                grade: 0,
                student_num: 0,
                phone_num: '',
            }
        });
    }
    else {
        throw {
            errMsg: "Unlogined!"
        };
    }
};
