<template>
  <book-avatar checkPersonnel />
  <book-list :list="menuList" defaultActive="article" />
</template>
<script lang="ts" setup>
import BookAvatar from 'components/avatar/index.vue'
import BookList from './list.vue'
const menuList = [
  [
    {
      key: 'artPub',
      name: '发布文章'
    },
    {
      key: 'article',
      name: '我的文章'
    },
    {
      key: 'subscribe',
      name: '订阅管理'
    },
    {
      key: 'subSetting',
      name: '订阅设置'
    },
    {
      key: 'money',
      name: '资金流水'
    }
  ],
  [
    {
      key: 'profile',
      name: '我的资料'
    },
    {
      key: 'account',
      name: '账号安全'
    }
  ]
]
</script>