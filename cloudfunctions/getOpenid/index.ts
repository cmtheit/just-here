import cloud from "wx-server-sdk"

cloud.init()

exports.main = async () => {
    const wxContext = cloud.getWXContext()
    const db = cloud.database()
    const __ = db.command
    if (wxContext.OPENID) {
        // 用户已登录，获取用户信息
        return {
            openid: wxContext.OPENID
        }
    } else {
        return {
            errMsg: 'Unlogined!'
        } as Unlogined
    }
}