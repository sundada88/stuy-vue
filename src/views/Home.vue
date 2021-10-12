<template>
  <div class="home">
    <!-- <Test v-model="name"></Test> -->
    {{ name }}
    <One></One>
    <div class="box">
      <div class="container">
        xsundada
      </div>
    </div>
    <!-- <Parent msg="sundadaniubi"
            @test="handleTest"></Parent>
    <h1>{{test}}</h1> -->
    <Sform :model="model" ref="form" :rules="rules">
      <Sformitem label="名字" prop="username">
        <div>
          <div>
            <div>
              <Sinput
                placeholder="请填写名字"
                v-model="model.username"
              ></Sinput>
            </div>
          </div>
        </div>
      </Sformitem>
      <Sformitem label="密码" prop="password">
        <Sinput
          type="password"
          placeholder="请填写密码"
          v-model="model.password"
        ></Sinput>
      </Sformitem>
      <Sformitem>
        <button @click="handleClick">提交</button>
      </Sformitem>
    </Sform>
    <h1>{{ model }}</h1>
  </div>
</template>

<script>
// @ is an alias to /src
// import Parent from '@/components/Parent.vue'
import { create } from '../utils/create'
import Notice from '@/components/Notice.vue'
import Sform from '@/components/Sform.vue'
import Sinput from '@/components/Sinput.vue'
import Sformitem from '@/components/Sformitem.vue'
import One from '@/components/One'
// import Test from '@/components/FunctionalInput'

export default {
  name: 'Home',
  data () {
    return {
      test: '',
      name: '',
      model: {
        username: 'sundada',
        password: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码'
          }
        ]
      }
    }
  },
  components: {
    // Parent
    Sform,
    Sinput,
    Sformitem,
    // Test,
    One
  },
  methods: {
    handleTest (val) {
      this.test = val
    },
    handleClick () {
      this.$refs.form.validate(isValidate => {
        const notice = create(Notice, {
          title: '提示信息A',
          message: isValidate ? '成功A ' : '失败'
        })
        notice.show()
        // if (isValidate) {
        //   console.log('成功')
        // } else {
        //   console.log('失败')
        // }
      })
    }
  },
  mounted () {}
}
</script>
<style>
.box {
  font-size: 16px;
}
.container {
  font-size: 2em;
  border: 0.1em solid black;
}
</style>
