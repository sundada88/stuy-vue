<!--<template>
  <div class="table">
    <thead>
      <tr>
        <th v-for="column in columns" :key="column.label">
          {{ column.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in rows" :key="index">
        <td v-for="(value, rowIndex) in row" :key="rowIndex">{{ value }}</td>
      </tr>
    </tbody>
  </div>
</template>-->

<script>
/* eslint-disable */
export default {
  props: {
    data: {
      type: Array,
      require: true
    }
  },
  data () {
    return {
      orderField: '',
      orderBy: 'desc'
    }
  },
  computed: {
    columns () {
      // return this.$slots.default.map(({ data: { attrs } }) => {
      //   return {
      //     label: attrs.label,
      //     prop: attrs.prop
      //   }
      // })
      return this.$slots.default.map(({ data: { attrs, scopedSlots } }) => {
        const column = { ...attrs }
        if (scopedSlots) {
          column.renderCell = (row, index) => (
            <div>{scopedSlots.default({ row, $index: index })}</div>
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
    //     this.columns.forEach(column => {
    //       res[column.prop] = item[column.prop]
    //     })
    //     return res
    //   })
    // }
  },
  methods: {
    sort (field, by) {
      this.orderField = field
      this.orderBy = by
      console.log(this.data)
      this.data.sort((a, b) => {
        const v1 = a[this.orderField]
        const v2 = b[this.orderField]
        console.log(v1, v2)
        if (typeof v1 === 'number') {
          return this.orderBy === 'desc' ? v2 - v1 : v1 - v2
        } else {
          return this.orderBy === 'desc'
            ? v2.localeCompare(v1)
            : v1.localeCompare(v2)
        }
      })
    },
    toggleSort (field) {
      console.log('field', field)
      const by = this.orderBy === 'desc' ? 'adc' : 'desc'
      this.sort(field, by)
    }
  },
  mounted () {
    console.log('this.$slots.default 0000000000 ', this.$slots.default)
    console.log('this.$slots.default 0000000000 ', this.$slots)
  },
  created () {
    this.columns.forEach(column => {
      if (column.hasOwnProperty('sortable')) {
        if (column.prop && !this.orderField) {
          this.sort(column.prop, this.orderBy)
        }
      }
    })
  },
  render () {
    return (
      <div class='table'>
        <thead>
          <tr>
            {this.columns.map(column => {
              if (column.hasOwnProperty('sortable') && column.prop) {
                let orderArrow = '↑↓'
                if (column.prop === this.orderField) {
                  orderArrow = this.orderBy === 'desc' ? '↓' : '↑'
                }
                return (
                  <td>
                    {column.label}
                    <span onClick={() => this.toggleSort(column.prop)}>
                      {orderArrow}
                    </span>
                  </td>
                )
              } else {
                return <td>{column.label}</td>
              }
            })}
          </tr>
        </thead>
        <tbody>
          {this.data.map((row, rowIndex) => {
            return (
              <tr key={rowIndex}>
                {this.columns.map((column, columnIndex) => {
                  return (
                    <td key={columnIndex}>
                      {column.renderCell(row, rowIndex)}
                    </td>
                  )
                })}
              </tr>
            )
          })}
          {
            //   this.rows.map((row, rowIndex) => {
            //   const tds = Object.keys(row).map(key => {
            //     return <td key={key}>{row[key]}</td>
            //   })
            //   return <tr key={rowIndex}>{tds}</tr>
            // })
          }
        </tbody>
      </div>
    )
  }
}
</script>

<style lang="less" scoped></style>
