<template>
  <div>
    <Form ref="form" :model="model" :rules="rules">
      <FormItem label="姓名" prop="username">
        <Input v-model="model.username" />
      </FormItem>
      <FormItem label="密码" prop="password">
        <Input type="password" v-model="model.password" />
      </FormItem>
    </Form>
    {{ model }}
    <div @click="handleClick">这是一个按钮</div>
    <!-- <Form
      :model="model"
      :rules="rules"
      ref="form"
    >
      <FormItem
        label="姓名"
        prop="username"
      >
        <Father>
          <Father>
            <Father>
              <Input v-model="model.username" />
            </Father>
          </Father>
        </Father>
      </FormItem>
      <FormItem
        label="密码"
        prop="password"
      >
        <Input
          type="password"
          v-model="model.password"
        />
      </FormItem>
    </Form> -->
    <Father></Father>
  </div>
</template>

<script>
import Form from './Form'
import FormItem from './FormItem'
import Input from './Input'
import Father from './Father'
export default {
  data () {
    return {
      model: {
        username: 'sundada',
        password: '11111'
      },
      rules: {
        username: [
          {
            required: true,
            message: '姓名不能为空'
          }
        ],
        password: [
          {
            required: true,
            message: '密码不为空'
          }
        ]
      }
    }
  },
  components: {
    Form,
    FormItem,
    Input,
    Father
  },
  methods: {
    handleClick () {
      this.$refs.form.validate(validate => {
        console.log(validate)
        if (validate) {
          console.log('successs========>')
        } else {
          console.log('failed==============>>>')
        }
      })
    }
  }
}
</script>

<style scoped></style>
