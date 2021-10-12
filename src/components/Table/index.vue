<template>
  <div>
    <s-table :data="tableData">
      <s-table-colum prop="date" label="日期"></s-table-colum>
      <s-table-colum prop="name" label="姓名"></s-table-colum>
      <s-table-colum prop="address" label="住址"></s-table-colum>
    </s-table>
    <s-table :data="tableData">
      <s-table-colum sortable prop="date" label="日期"></s-table-colum>
      <s-table-colum sortable prop="name" label="姓名"></s-table-colum>
      <s-table-colum sortable prop="address" label="住址"></s-table-colum>
      <s-table-colum label="操作">
        <template v-slot:default="scope">
          <button @click="handleEdit(scope.$index, scope.row)">编辑</button>
          <button @click="handleDelete(scope.$index, scope.row)">删除</button>
        </template>
      </s-table-colum>
    </s-table>
  </div>
</template>

<script>
import STable from './table.vue'
import STableColum from './table-colum.vue'
export default {
  components: {
    STable,
    STableColum
  },
  data () {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎-05-02',
          address: '上海市普陀区金沙江路 1518 弄-05-02'
        },
        {
          date: '2016-05-04',
          name: '王小虎-05-04',
          address: '上海市普陀区金沙江路 1517 弄-05-04'
        },
        {
          date: '2016-05-01',
          name: '王小虎05-01',
          address: '上海市普陀区金沙江路 1519 弄05-01'
        },
        {
          date: '2016-05-03',
          name: '王小虎05-03',
          address: '上海市普陀区金沙江路 1516 弄05-03'
        }
      ]
    }
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    }
  }
}
</script>

<style lang="scss" scoped></style>
