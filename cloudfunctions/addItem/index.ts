import cloud from "wx-server-sdk"
import {additem} from "../../typings/additem";

cloud.init()

exports.main = async (event: additem) => {
    const wxContext = cloud.getWXContext()
    const db = cloud.database()
    const __ = db.command
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
        }))._id
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
                })
            return {
                errMsg: 'OK',
                value: {
                    id: id
                }
            } as Msg<{
                id: string
            }>
        } catch (e) {
            await db.collection('items')
                // @ts-ignore
                .doc(id)
                .remove()
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