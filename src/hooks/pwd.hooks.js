import { onMounted, reactive, ref, toRefs, watch } from 'vue';
import ext from '@xizher/js-ext'
import { cryptoUtils, storageUtils } from '@xizher/js-utils'

export function useCryptoVal () {
  let defaultVal = storageUtils.local.get('cryptoVal')
  defaultVal = (defaultVal && atob(defaultVal)) ?? ''
  const cryptoVal = ref(defaultVal)
  watch(cryptoVal, val => {
    storageUtils.local.set('cryptoVal', btoa(val))
    cryptoUtils.setGlobelIV(val).setGlobelKey(`${val}${val}`)
  }, { immediate: true })
  return cryptoVal
}

export function useCreate () {
  const state = reactive({
    name: '',
    pwd: '',
    comment: '',
  })
  const sumbit = () => {
    const token = storageUtils.local.get('token') ?? ''
    return fetch('/api/pwd/add', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'token': token
      },
      body: JSON.stringify({
        ...state,
        pwd: cryptoUtils.encrypto(state.pwd),
      }),
    })
      .then(res => res.json())
      .then(res => res.data)
  }
  return { ...toRefs(state), sumbit }
}

export function useList () {
  const dataSource = reactive([])
  window.dataS = dataSource
  const columns = [
    { title: '', key: 'actions', slots: { customRender: 'actions' } },
    { title: '账户', dataIndex: 'name', key: 'name' },
    { title: '密码', dataIndex: 'pwd', key: 'pwd', slots: { customRender: 'pwd' } },
    { title: '备注', dataIndex: 'comment', key: 'comment' },
  ]
  function loadDataSource () {
    return fetch('/api/pwd/list', {
      method: 'get'
    })
      .then(res => res.json())
      .then(res => res.data)
      .then(res => {
        ext(dataSource).reset(...res.items.map(item => ({ ...item, visible: false })))
      })
  }
  onMounted(() => loadDataSource())
  return {
    dataSource, loadDataSource, columns
  }
}

export function useModity () {
  const state = reactive({
    id: '', name: '', pwd: '', comment: '',
  })
  const modity = () => {
    const token = storageUtils.local.get('token') ?? ''
    return fetch('/api/pwd/modity', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'token': token
      },
      body: JSON.stringify({
        ...state,
        pwd: cryptoUtils.encrypto(state.pwd),
      }),
    })
      .then(res => res.json())
      .then(res => res.data)
  }
  return { state, modity }
}
