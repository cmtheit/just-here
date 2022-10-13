interface User {
    /**
     * 姓名
     */
    name: string
    /**
     * 性别
     */
    sex: '男' | '女'
    /**
     * 年级
     */
    grade: number,
    /**
     * 学号
     */
    student_num: number
    /**
     * 电话号码
     */
    phone_num: string
}

interface nullUser extends User{
    /**
     * 姓名
     */
    name: ''
    /**
     * 性别
     */
    sex: '男'
    /**
     * 年级
     */
    grade: 0,
    /**
     * 学号
     */
    student_num: 0
    /**
     * 电话号码
     */
    phone_num: ''
}
