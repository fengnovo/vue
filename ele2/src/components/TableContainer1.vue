<template>
    <div class="table-area">
        <el-table
            size="mini"
            border
            ref="multipleTable"
            :data="tableData3"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
            type="selection"
            width="30">
            </el-table-column>
            <el-table-column
            label="广告信息"
            width="300">
                <template slot-scope="scope">
                    <div>
                        <div class="table-img">
                            <img src="http://img30.360buyimg.com/test/jfs/t7/296/583352032/2371/7f90541d/5ae2cbbcNa2ad45d1.jpg"/>
                        </div>
                        <div class="table-text">
                            标题:<span v-html="'测试一下-wqh{{UCITY}}'"></span><br />
                            <span>描述：的的的的</span><br />
                            <span>到期时间：不限制</span><br />
                            <span>创意ID：178535</span><br />
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
            prop="name"
            label="OCR审核">
            </el-table-column>
            <el-table-column
            prop="address"
            label="主推SKU"
            show-overflow-tooltip
            width="80">
            </el-table-column>
            <el-table-column
            label="规格信息">
            <template slot-scope="scope">只有图片+视频元素的规格</template>
            </el-table-column>
            <el-table-column
            prop="name"
            label="推广链接"
            width="70">
            <template slot-scope="scope">[<a type="text" target="blank" href="https://www.jd.com" size="mini">查看</a>]</template>
            </el-table-column>
            <el-table-column
            prop="address"
            label="用户服务类型">
            <template slot-scope="scope">
                <div>
                    <span>卖家QQ：23412342312</span><br />
                    <span>京东ID：dev_pop_1</span><br />
                    <span>卖家等级：C级</span><br />
                </div>
            </template>
            </el-table-column>
            <el-table-column
            prop="name"
            label="创建时间"
            sortable>
            <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column
            prop="address"
            label="修改时间"
            sortable>
            <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column
            prop="address"
            label="状态">
            <template slot-scope="scope">
                <div>
                    <el-tooltip placement="top">
                        <div slot="content">创意审核通过/审核不通过后，用户再次编辑创意，<br/>创意将处于“需要重新审核”的状态</div>
                        <span>内部：审核不通过</span>
                    </el-tooltip>
                </div>
            </template>
            </el-table-column>
            <el-table-column
            label="操作"
            width="120">
            <template slot-scope="scope">
              <div>
                  <el-button size="mini" class="table-btn">审核通过</el-button> <br/>
                  <el-button size="mini" class="table-btn">审核不通过</el-button>
              </div>
            </template>
            </el-table-column>
        </el-table>
        <el-pagination
            class="page-foot-fixed"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            size="mini"
            :total="400">
        </el-pagination>
    </div>
</template>

<script>
  export default {
      name: 'TableContainer',
      data() {
          return {
              currentPage: 1,
              tableData3: [{
                  date: '2016-05-03 09:03:42',
                  name: '图片包含【黑词1、黑词2】违禁词',
                  address: '123123'
              }, {
                  date: '2016-05-02',
                  name: '无黑词',
                  address: '123123'
              }, {
                  date: '2016-05-04',
                  name: '无黑词',
                  address: '123123'
              }, {
                  date: '2016-05-01',
                  name: '无黑词',
                  address: '123123'
              }, {
                  date: '2016-05-08',
                  name: '无黑词',
                  address: '123123'
              }, {
                  date: '2016-05-06',
                  name: '无黑词',
                  address: '123123'
              }, {
                  date: '2016-05-07',
                  name: '无黑词',
                  address: '123123'
              },{
                  date: '2016-05-03 09:03:42',
                  name: '无黑词',
                  address: '123123'
              }, {
                  date: '2016-05-02',
                  name: '无黑词',
                  address: '123123'
              }, {
                  date: '2016-05-04',
                  name: '无黑词',
                  address: '123123'
              }, {
                  date: '2016-05-01',
                  name: '无黑词',
                  address: '123123'
              }, {
                  date: '2016-05-08',
                  name: '无黑词',
                  address: '123123'
              }, {
                  date: '2016-05-06',
                  name: '无黑词',
                  address: '123123'
              }, {
                  date: '2016-05-07',
                  name: '无黑词',
                  address: '123123'
              },{
                  date: '2016-05-03 09:03:42',
                  name: '无黑词',
                  address: '123123'
              }, {
                  date: '2016-05-02',
                  name: '无黑词',
                  address: '123123'
              }, {
                  date: '2016-05-04',
                  name: '无黑词',
                  address: '123123'
              }, {
                  date: '2016-05-01',
                  name: '无黑词',
                  address: '123123'
              }, {
                  date: '2016-05-08',
                  name: '无黑词',
                  address: '123123'
              }, {
                  date: '2016-05-06',
                  name: '无黑词',
                  address: '123123'
              }, {
                  date: '2016-05-07',
                  name: '无黑词',
                  address: '123123'
              }],
              multipleSelection: []
          }
      },

      methods: {
          toggleSelection(rows) {
              if (rows) {
                rows.forEach(row => {
                  this.$refs.multipleTable.toggleRowSelection(row);
                });
              } else {
                this.$refs.multipleTable.clearSelection();
              }
          },
          handleSelectionChange(val) {
              this.multipleSelection = val;
          },
          handleSizeChange(val) {
              console.log(`每页 ${val} 条`);
          },
          handleCurrentChange(val) {
              console.log(`当前页: ${val}`);
          }
      }
  }
</script>

<style lang="scss" scoped>
.page-foot-fixed{
    position: fixed;
    background: #f2f6fc;
    padding-bottom: 10px;
    padding-right: 30px;
    margin-top: 10px;
    width: 100%;
    text-align: right;
    bottom: 0px;
    right: 0;
    z-index: 2;
}
.table-area {
    .table-img {
        float: left;
        border: 1px solid #ccc;
    }
    .table-img img{
        max-width: 100px;
    }
    .table-text {
        float: right;
        width: 170px;
    }

    .table-btn {
        width: 90px;
        margin-bottom: 10px;
    }
}

</style>
