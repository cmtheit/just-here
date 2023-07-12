import cloud from "wx-server-sdk"

cloud.init()

exports.main = async () => {
    const wxContext = cloud.getWXContext()
    const db = cloud.database()
    const __ = db.command
    if (wxContext.OPENID) {
        // 用户已登录，获取用户信息
        // @ts-ignore
        const oplogs: oplogs = []
        try {
            return await db.collection('oplogs')
                .where({
                    _openid: __.eq(wxContext.OPENID),
                    type: __.eq('pick')
                })
                .get()
        } catch (e) {
            return {
                errMsg: 'UnfoundDoc!'
            } as UnfoundDoc
        }
    } else {
        return {
            errMsg: 'Unlogined!'
        } as Unlogined
    }
}