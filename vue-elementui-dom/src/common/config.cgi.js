const baseUrl = window.baseUrl || '/';

export const CGI = {
    /** 广告审核 */
    adList: baseUrl + 'xoa/ztexp/ads/querylist',                    // 广告列表
    adExport: baseUrl + 'xoa/ztexp/ads/exportad',                   // 导出广告列表
    adSkuImg: baseUrl + 'php/exp/ad/cgi/expad_getskuimg.php',       // 根据SKU ID获取图片
    adFrozen: baseUrl + 'xoa/ztexp/ads/frozenad',                   // 解冻或者冻结广告

    /** 行情数据管理 */
    mdList: baseUrl + 'xoa/ztexp/adspec/querylist',                 // 列表
    mdAdd: baseUrl + 'xoa/ztexp/adspecmarket/addbatchtask',         // 新增(上传行情Excel)
    mdUpdate: baseUrl + 'xoa/ztexp/adspecmarket/update',            // 编辑
    mdDownload: '//x.360buyimg.com/files/boss/yizhitou/yzt_marketdata_upload_template.csv',  // 下载规格模板

    /** 规格 */
    // blackWorldList: baseUrl + 'xoa/blackword/blackword/list',    // 黑词列表
    specList: baseUrl + 'xoa/ztexp/adspec/querylist',               // 查询规格列表
    specAdd: baseUrl + 'xoa/ztexp/adspec/add',                      // 新增规格
    specEdit: baseUrl + 'xoa/ztexp/adspec/update',                  // 修改规格
    // specInfo: baseUrl + 'php/exp/adpos/cgi/exp_adspec_check.php',// 查询规格详情信息
    specDelete: baseUrl + 'xoa/ztexp/adspec/delete',                // 删除规格
    // specNameCheck: baseUrl + 'php/exp/adpos/cgi/exp_adspec_check.php', // 检查规格名称是否重复
    uploadImg: baseUrl + 'xoa/ztexp/image/upload',                  // 素材示例图上传
    uploadLayer: baseUrl + 'xoa/ztexp/image/upload',                // 水印/提示图层
    uploadShareImg: baseUrl + 'xoa/ztexp/image/upload',             // 分享图层

    /** 用户管理 */
    userList: baseUrl + 'xoa/ztexp/user/queryuserlist',             // 过滤用户列表
    userUpdate: baseUrl + 'xoa/ztexp/user/update',                  // 编辑用户
    userTotalcrowd: baseUrl + 'xoa/ztexp/user/totalcrowd',          // 获取用户人群总配额
    userDelete: baseUrl + 'xoa/ztexp/user/del',                     // 删除用户
    userExport: baseUrl + 'xoa/ztexp/user/exportlist',              // 导出用户列表

    /** 计划 */
    planList: baseUrl + 'xoa/ztexp/plan/querylist',                 // 计划列表

    /** 用户群 */
    profileList: baseUrl + 'xoa/ztexp/profile/querylist',           // 用户群列表

    /** 服务商账户 */
    accountList: baseUrl + 'xoa/ztexp/user/medialist',              // 查询服务商信息
    accountInfo: baseUrl + 'xoa/ztexp/gdtacc/mediainfo',            // 资金账户信息
    recordList: baseUrl + 'xoa/ztexp/gdtacc/detail',                // 账户流水记录列表
    recordListExport: baseUrl + 'xoa/ztexp/gdtacc/exportdetail',    // 导出账户流水记录

    /** 广告主账号 */
    advertiserList: baseUrl + 'xoa/ztexp/gdtacc/queryacc',                  // 查询广告主账号信息
    advertiserTemplet: '//x.360buyimg.com/files/boss/yizhitou/yzt_getaccinfo_template.csv',   // 下载批量查询模板
    advertiserSearchUpload: baseUrl + 'xoa/ztexp/gdtacc/uploadbatch',       // 广告主批量上传
    advertiserSearchExport: baseUrl + 'xoa/ztexp/gdtacc/batchinfo',         // 批量获取广告主信息

    /** 免登录查询 */
    queryUserUin: baseUrl + 'xoa/ztexp/user/queryuserlist',                 // 依据pin查uin
    bossQueryUrl: '//xoa.pp.jd.com/php/observer/boss_query.php'             // erp登录的token输出

};