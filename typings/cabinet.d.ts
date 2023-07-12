import {item} from "./additem";

interface cabinet {
    _id: "丁香14号楼 储物柜" | "家属区 储物柜" | "海棠10号楼 储物柜" | "竹园4号楼 储物柜",
    pos: DB.GeoPoint
    items: string[] // 存放 item ID
}

interface cloudCabinet extends Pick<cabinet, '_id' | 'pos'>{
    items: string[]
}

type iconPathes = "/images/posicon/jiashu.png" | "/images/posicon/zhuyuan.png" | "/images/posicon/haitang.png" | "/images/posicon/dingxiang.png"

interface marker {
    id: number,
    longitude: number,
    latitude: number,
    title: cabinet['_id'],
    iconPath: iconPathes,
}