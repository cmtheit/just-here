import cloud from "wx-server-sdk"

cloud.init()

exports.main = async () => {
    const wxContext = cloud.getWXContext()
    const db = cloud.database()
    const __ = db.command
    if (wxContext.OPENID) {
        await db.collection('user').add({
            data: {
                _id: wxContext.OPENID,
                name: "",
                sex: "男",
                grade: 0,
                student_num: 0,
                phone_num: '',
            } as nullUser
        })
    } else {
        throw {
            errMsg: "Unlogined!"
        } as Unlogined
    }
}