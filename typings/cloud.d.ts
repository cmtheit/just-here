/**
 * 返回消息的可能值
 */
type MsgValue = User | undefined | User[keyof User] | {id: string}


/**
 * 返回消息的抽象接口
 * 当 errMsg 为 undefined 说明没有查询错误
 * value 为返回值
 */
interface Msg<V extends MsgValue> {
    errMsg?: string
    value?: V
}

interface OKMsg extends Msg<undefined> {
    errMsg: 'OK'
}

/**
 * 查询用户个人资料的返回消息
 * 查询成功则value 直接为用户个人资料
 */
interface UserInfoMsg extends Msg<User>{

}

interface errMsg<T extends MsgValue> extends Msg<T> {}

/**
 * 没有 Openid 的调用云函数的情况
 */
interface Unlogined extends errMsg<undefined> {
    errMsg: "Unlogined!"
}

/**
 * 没有查询到记录的情况
 */
interface UnfoundDoc extends errMsg<undefined> {
    errMsg: "UnfoundDoc!"
}

/**
 * 描述不合法字段
 */
interface IllegalFiled extends errMsg<User[keyof User]> {
    errMsg: "IllegalField!"
}

/**
 * 不合法的姓名
 */
interface IllegalName extends IllegalFiled {
    value: string
}

/**
 * 不合法的性别
 */
interface IllegalSex extends IllegalFiled {
    value: string
}

interface IllegalPhone extends IllegalFiled {
    value: string
}

interface IllegalStudentNum extends IllegalFiled {
    value: number
}

interface IllegalGrade extends IllegalFiled {
    value: number
}