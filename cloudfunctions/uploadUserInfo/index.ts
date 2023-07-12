import cloud from "wx-server-sdk"

cloud.init()

exports.main = async (event: User) => {
    const wxContext = cloud.getWXContext()
    const db = cloud.database()
    const __ = db.command
    if (wxContext.OPENID) {
        if (event.student_num)
        await cloud.database().collection('user')
            .doc(wxContext.OPENID)
            .update({
                data: event
            })
        return {
            errMsg: 'OK'
        } as OKMsg
    } else {
        return {
            errMsg: 'Unlogined!'
        } as Unlogined
    }
}