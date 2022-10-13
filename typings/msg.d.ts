/**
 * 返回消息的可能值
 */
type MsgValue = User | undefined

/**
 * 返回消息的抽象接口
 * 当 errMsg 为 undefined 说明没有查询错误
 * value 为返回值
 */
interface Msg<V extends MsgValue> {
    errMsg?: string
    value?: V
}

/**
 * 查询用户个人资料的返回消息
 * 查询成功则value 直接为用户个人资料
 */
interface UserInfoMsg extends Msg<User>{

}

interface errMsg extends Msg<undefined> {}

/**
 * 没有 Openid 的调用云函数的情况
 */
interface Unlogined extends errMsg {
    errMsg: "Unlogined!"
}

/**
 * 没有查询到记录的情况
 */
interface UnfoundDoc extends errMsg {
    errMsg: "UnfoundDoc!"
}