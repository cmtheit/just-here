import cloud from "wx-server-sdk"
import {userInfo} from "os";

cloud.init()

exports.main = async (e: {
    userId: string
}) => {
    const wxContext = cloud.getWXContext()
    const db = cloud.database()
    const __ = db.command
    if (wxContext.OPENID) {
        // 用户已登录，获取用户信息
        try {
            return await db.collection('user').doc(e.userId).get()
        } catch (e) {
            return  {
                errMsg: 'UnfoundDoc!'
            } as UnfoundDoc
        }
    } else {
        return {
            errMsg: 'Unlogined!'
        } as Unlogined
    }
}