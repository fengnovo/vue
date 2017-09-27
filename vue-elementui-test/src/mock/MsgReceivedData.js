import Mock from 'mockjs';
import { param2Obj } from '../common/util';

const List = [];
const count = 100;

for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
        msgid: '@integer(10000-90000)',
        'title|1': ['【上线通知】京东直投上线了客服系统上线啦！', '【下线通知】京东直投下线了！'],
        publishTime: +Mock.Random.date('T'),
        'msgModle|1': ['公司消息', '外部消息'],
        'msgType|1': ['产品动态', '产品发布'],
        'state|1': ['已发送', '未发送'],
        'expend|1': ['触达全部用户', '触达内部用户'],
        myPin: '@integer(100000-900000)',
        readMount: '@integer(0-90000)',
        opeaTime: +Mock.Random.date('T'),
        'opeaMan|1': ['xiaoming01', 'xiaohong01', 'xiaogong02']
    }));
}

let MsgReceivedData = {
    getList: config => {
        const { delivery, verify, gdtuid, page, limit } = param2Obj(config.url);
        console.log({ delivery, verify, gdtuid, page, limit });
        let mockList = List.filter(item => {
            if (verify && item.verify !== verify) return false;
            if (delivery && item.delivery !== delivery) return false;
            if (gdtuid && item.gdtuid !== +gdtuid) return false;
            return true;
        });

        const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1));
        return {
            total: mockList.length,
            items: pageList
        };
    }
};


export default MsgReceivedData;