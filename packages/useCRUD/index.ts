import { computed, ref } from 'vue'
import { FormInstance } from 'element-plus'
import { useMessageBox, useMessage } from '../useMessage'

type AnyRecord = Record<string, any>

interface CRUDOptions {
  // 弹窗标题
  name: string
  // 初始表单信息
  initForm?: AnyRecord
  // 新增api
  doCreate: (form: AnyRecord) => Promise<any>
  // 编辑api
  doUpdate: (form: AnyRecord) => Promise<any>
  // 删除api
  doDelete?: (id: number) => Promise<any>
  // 操作成功后的回调
  refresh: () => void
}

type Action = 'view' | 'edit' | 'add'

type ActionsType = Record<Action, string>

// 操作类型
const ACTIONS: ActionsType = {
  view: '查看',
  edit: '编辑',
  add: '新增'
}

export function useCRUD(options: CRUDOptions) {
  // 弹窗显示与隐藏
  const modalVisible = ref(false)
  // 操作属性
  const modalAction = ref<Action>('add')
  // 表单数据
  const modalForm = ref({ ...options.initForm })
  // 表单元素
  const modalFormRef = ref<FormInstance | null>(null)
  // 提交表单时的loading
  const modalLoading = ref(false)
  // 弹窗标题
  const modalTitle = computed(
    () => (ACTIONS[modalAction.value as keyof typeof ACTIONS] || '') + options.name
  )

  /**
   * 新增
   */
  const handleAdd = () => {
    modalAction.value = 'add'
    modalVisible.value = true
    modalForm.value = { ...options.initForm }
  }

  /**
   * 编辑
   * @param row 所选行数据
   */
  const handleEdit = (row: any) => {
    modalAction.value = 'edit'
    modalVisible.value = true
    modalForm.value = { ...row }
  }

  /**
   * 查看
   * @param row 所选行数据
   */
  const handleView = (row: any) => {
    modalAction.value = 'view'
    modalVisible.value = true
    modalForm.value = { ...row }
  }

  /**
   * 提交表单信息
   */
  const handleSave = () => {
    if (!['edit', 'add'].includes(modalAction.value)) {
      modalVisible.value = false
      return
    }
    modalFormRef.value?.validate(async (valid) => {
      if (valid) {
        const actions = {
          add: {
            api: () => options.doCreate(modalForm.value),
            cb: () =>
              useMessage().success({
                message: '新增成功',
                showClose: true
              })
          },
          edit: {
            api: () => options.doUpdate(modalForm.value),
            cb: () =>
              useMessage().success({
                message: '编辑成功',
                showClose: true
              })
          }
        }
        const action = actions[modalAction.value as keyof typeof actions]

        try {
          modalLoading.value = true
          const data = await action.api()
          action.cb()
          modalVisible.value = modalLoading.value = false
          data && options.refresh()
        } catch (err) {
          modalLoading.value = false
        }
      }
    })
  }

  /**
   * 删除
   * @param id 所选项的id
   * @param title 确认框标题
   * @param msg 确认框内容
   */
  const handleDelete = (id: number, title: string = '提示', msg: string = '确定要删除吗？') => {
    useMessageBox()
      .confirm({
        message: msg,
        title
      })
      .then(async () => {
        try {
          await options.doDelete?.(id)
          useMessage().success({ message: '删除成功', showClose: true })
          options.refresh()
        } catch (err) {
          modalLoading.value = false
        }
      })
  }

  return {
    modalVisible,
    modalAction,
    modalTitle,
    modalForm,
    modalFormRef,
    modalLoading,
    handleAdd,
    handleEdit,
    handleSave,
    handleDelete,
    handleView
  }
}
