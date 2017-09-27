import Mock from 'mockjs';
import { param2Obj } from '../common/util';

const List = [];
const count = 100;

for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
        material: {
            'Uin|10000-90000': 1,    // 卖家资料
            'JDID|1': ['京东世杰手表专营店', '京东服饰专营店'],
            'GdtUid|1000-9000': 1
        },
        contact: {
            'phoneNumber|13000000000-18000000000': 1,
            email: Mock.mock('@EMAIL()')
        },
        quota: '@float(0, 0.999, 2, 2)',
        utilization: '@float(0, 100, 2, 2)',
        'delivery|1': ['启用中', '未启用'],
        'verify|1': ['已通过', '未通过']
    // 'uin|10000-90000': 1, // 用户唯一标识
    // 'nickname|1': ['xiaohong','xiaoming','xiaobai'], // 用户别名
    // 'state': 1, // 用户状态
    // 'property': 23, // 用户属性
    // 'auditflag': 0, // 审核状态
    // 'auditmsg':'Can not pass', // 审核消息
    // 'audittime': +Mock.Random.date('T'), // 审核时间(s)
    // 'usertype': 1, // 用户类型
    // 'inserttimems': +Mock.Random.date('T'), // 插入时间(ms)
    // 'field|1':['服饰','装饰','家电'], // 所属领域
    // 'promote|1':['服饰','装饰','家电'], // 促销内容
    // 'name':['京东世杰手表公司','XX公司','京东世杰公司'], // 公司名称
    // 'jdshopid|1':['12345','12346','12348'], // 店铺ID
    // 'jdshopname|1':['京东世杰手表专营店','京东服饰专营店','京东XX专营店'], // 店铺名称
    // 'jdshopurl':'https://www.baidu.com', // 店铺地址
    // 'username': 'kettas', // 用户名称
    // 'usergender': 'male', // 性别
    // 'qqnumber': '12234522', // QQ
    // 'phonenumber': '23424343', // 手机
    // 'email': Mock.mock('@EMAIL()'), // 邮箱
    // 'agreetime': +Mock.Random.date('T'), // 同意协议时间
    // 'closebyop': 1, // 关闭权限时间
    // 'guideflag': 1, // 新手指引标志位
    // 'media':[
    //   {'Id':10010,'Type':1, 'SubId':122} // 媒体类型/媒体ID
    // ],
    // 'crowdquota': 100, // 人群配额
    // 'crowdlimit': 150, // 人群限制
    }));
}

let UserManageData = {
    getList: config => {
        let param2Obj = url => {
            const search = url.split('?')[1];
            if (!search) {
                return {};
            }
            return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
        };
        const { delivery, verify, gdtuid, page, limit } = param2Obj(config.url);
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


export default UserManageData;