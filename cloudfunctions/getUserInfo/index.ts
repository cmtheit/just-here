import cloud from "wx-server-sdk"

cloud.init()

exports.main = async () => {
    const wxContext = cloud.getWXContext()
    const db = cloud.database()
    const __ = db.command
    if (wxContext.OPENID) {
        // 用户已登录，获取用户信息
        try {
            return await db.collection('user').doc(wxContext.OPENID).get()
        } catch (e) {
            console.log('err', e)
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