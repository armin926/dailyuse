/**
 * Message 消息提示 Hook
 */

import { ElMessage, ElMessageBox, ElMessageBoxOptions } from 'element-plus'

// 消息提示配置项
interface MessageOptions {
  // 消息文字
  message: string
  // 显示时间，默认 3 秒
  duration?: number
  // 是否显示关闭按钮，默认关闭
  showClose?: boolean
  // 其他属性
  [key: string]: any
}

interface MessageImplements {
  info(options: MessageOptions): void
  warning(options: MessageOptions): void
  success(options: MessageOptions): void
  error(options: MessageOptions): void
}

let hasMessage = 0

/**
 * 消息提示
 */
export function useMessage() {
  class MessageClass implements MessageImplements {
    private removeMessage() {
      if (hasMessage) {
        ElMessage.closeAll()
        hasMessage = 0
      }
      hasMessage += 1
    }
    /**
     * 普通提示
     */
    public info({ message = '', duration = 3000, showClose = false, ...options }) {
      this.removeMessage()
      ElMessage.info({ message, duration, showClose, ...options })
    }

    /**
     * 警告提示
     */
    public warning({ message = '', duration = 3000, showClose = false, ...options }) {
      this.removeMessage()
      ElMessage.warning({ message, duration, showClose, ...options })
    }

    /**
     * 成功提示
     */
    public success({ message = '', duration = 3000, showClose = false, ...options }) {
      this.removeMessage()
      ElMessage.success({ message, duration, showClose, ...options })
    }

    /**
     * 错误提示
     */
    public error({ message = '', duration = 3000, showClose = false, ...options }) {
      this.removeMessage()
      ElMessage.error({ message, duration, showClose, ...options })
    }
  }
  return new MessageClass()
}

/**
 * 消息弹框
 */
export function useMessageBox() {
  class MessageBoxClass {
    public confirm(options: ElMessageBoxOptions) {
      return ElMessageBox.confirm(options.message, options.title || '提示', {
        ...options,
        cancelButtonText: options.cancelButtonText || '取消',
        confirmButtonText: options.confirmButtonText || '确定',
        type: options.type,
        closeOnClickModal: false,
        closeOnPressEscape: false
      })
    }
  }
  return new MessageBoxClass()
}
