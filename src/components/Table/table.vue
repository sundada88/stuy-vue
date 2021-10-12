<!--<template>
  <div class="table">
    <table>
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.label">
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rows" :key="index">
          <td v-for="(value, key) in row" :key="key">{{ value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template> -->

<script>
/* eslint-disable */
export default {
  name: 's-table',
  data () {
    return {
      orderBy: 'desc',
      orderFiled: ''
    }
  },
  props: {
    data: {
      type: Array,
      require: true
    }
  },
  computed: {
    columns () {
      // return this.$slots.default.map(({ data }) => {
      //   return {
      //     prop: data.attrs.prop,
      //     label: data.attrs.label
      //   }
      // })
      return this.$slots.default.map(({ data: { attrs, scopedSlots } }) => {
        const column = { ...attrs }
        if (scopedSlots) {
          column.renderCell = (row, i) => (
            <div>{scopedSlots.default({ row, $index: i })}</div>
          )
        } else {
          column.renderCell = row => <div>{row[column.prop]}</div>
        }
        return column
      })
    }
    // rows () {
    //   return this.data.map(item => {
    //     const res = {}
    //     this.columns.forEach(({ prop }) => {
    //       res[prop] = item[prop]
    //     })
    //     // console.log(res)
    //     return res
    //   })
    // }
  },
  methods: {
    toggleSort (field) {
      const by = this.orderBy === 'desc' ? 'asc' : 'desc'
      this.sort(field, by)
    },
    sort (field, by) {
      this.orderFiled = field
      this.orderBy = by
      this.data.sort((a, b) => {
        const v1 = a[this.orderFiled]
        const v2 = b[this.orderFiled]
        console.log(v1, v2)
        if (typeof v1 === 'number') {
          return this.orderBy === 'desc' ? v2 - v1 : v1 - v2
        } else {
          return this.orderBy === 'desc'
            ? v2.localeCompare(v1)
            : v1.localeCompare(v2)
        }
      })
    }
  },
  mounted () {
    console.log(
      'this.$slots.default =========>',
      this.$slots.default[0],
      this.$slots.default[0].data.attrs
    )
  },
  created () {
    this.columns.forEach(column => {
      if (column.hasOwnProperty('sortable')) {
        if (column.prop && !this.orderFiled) {
          this.sort(column.prop, this.orderBy)
        }
      }
    })
  },
  render () {
    return (
      <div class='table'>
        <table>
          <thead>
            <tr>
              {this.columns.map(column => {
                console.log('column ================>', column)
                if (column.hasOwnProperty('sortable') && column.prop) {
                  let orderArrow = '↑↓'
                  if (this.orderFiled === column.prop) {
                    orderArrow = this.orderBy === 'desc' ? '↓' : '↑'
                  }
                  return (
                    <th key={column.label}>
                      {column.label}
                      <span onClick={() => this.toggleSort(column.prop)}>
                        {orderArrow}
                      </span>
                    </th>
                  )
                } else {
                  return <th key={column.label}>{column.label}</th>
                }
              })}
            </tr>
          </thead>
          <tbody>
            {
              //   this.rows.map((row, index) => {
              //   const tds = Object.keys(row).map(key => (
              //     <td key={key}>{row[key]}</td>
              //   ))
              //   return <tr key={index}>{tds}</tr>
              // })
            }
            {this.data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {this.columns.map((column, columnIndex) => (
                  <td key={columnIndex}>{column.renderCell(row, rowIndex)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
.table {
  display: flex;
  tr {
    flex: 1;
  }
}
</style>
