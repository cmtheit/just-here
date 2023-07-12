import {DB} from "wx-server-sdk";
import GeoPoint = DB.GeoPoint;
import {cabinet} from "./cabinet";

interface additem {
    // item 的 id 由系统自动生成
    // 名称
    name: string,
    // 描述
    description: string
    // picker 的 id，服务端自动获取
    // pickerid: string,
    // 操作时间，服务端计算
    // time: Date,
    // 所在储物柜
    cabinet: cabinet
    // 操作地址
    loc: GeoPoint | null
    // 图片的url
    graphicIds: { idtumb: string | null, id: string | null }[]
}

interface item extends additem {
    // itemid
    _id: string,
    // pickerid
    picker: string,
    // time
    pickerTime: Date,
    claimTime: Date,
}
