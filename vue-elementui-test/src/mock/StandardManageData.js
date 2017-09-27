import Mock from 'mockjs';
import { param2Obj } from '../common/util';

const List = [];
const count = 100;

for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
        sID: '@integer(10000-90000)',
        'sName|1': ['百度-信息流小图百度-信息流小图百度-信息流小图', '阿里-信息流小图阿里-信息流小图阿里-信息流小图'],
        'prodType|1': ['无线广告', '桌面广告'],
        opeaTime: +Mock.Random.date('T'),
        'opeaMan|1': ['xiaoming01', 'xiaohong01', 'xiaogong02'],
        'state|1': ['启用', '未启用']
    }));
}

let StandardManageData = {
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


export default StandardManageData;