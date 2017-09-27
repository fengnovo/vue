import Mock from 'mockjs';
import { param2Obj } from '../common/util';

const List = [];
const count = 100;

for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
        jdid: '@integer(10000-90000)',
        adid: '@integer(100000-900000)',
        'desc|1': ['cdctest-两图两文', 'cdctest-一文一图'],
        'standardInfo|1': ['151*162大小图片', '128*102大小图片'],
        publishTime: +Mock.Random.date('T'),
        changeTime: +Mock.Random.date('T'),
        'image|1': [ 'http://img1.360buyimg.com/n1/jfs/t3115/213/3311046953/215277/8debdd3c/57ef249eNd8723187.jpg',
            'http://img1.360buyimg.com/n1/jfs/t3115/213/3311046953/215277/8debdd3c/57ef249eNd8723187.jpg'],
        'state|1': ['启用', '未启用'],
        'keyword|1': ['-', '广告'],
        'isPass|1': [0, 1]
    }));
}

let AdsVerifyData = {
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

export default AdsVerifyData;