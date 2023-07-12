/**
 * 操作记录
 */
import {DB} from "wx-server-sdk";

interface oplog {
    /**
     * 操作id
     */
    _id: string,
    /**
     * 操作者的 ID
     */
    _openid: string
    /**
     * 操作类型
     * claim 为认领，pick为拾取
     */
    type: 'claim' | 'pick',
    /**
     * 操作时间
     */
    time: Date,
    /**
     * 操作对象的 id
     */
    itemid: string,
}

type oplogs = oplog[]

type imgblksrc = {src: string | null, srctumb: string | null}