<template>
  <a-upload
      :file-list="fileList"
      :limit="1"
      :before-upload="beforeUpload"
      :custom-request="customUpload"
      :on-remove="handleRemove"
      :auto-upload="true"
      :show-file-list="true"
      list-type="picture-card"
      accept="image/*"
  >
    <div v-if="fileList.length === 0" class="upload-placeholder">
      <slot>
        <div class="upload-content">
          <icon-plus />
          <div class="upload-text">点击上传</div>
        </div>
      </slot>
    </div>
  </a-upload>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { IconPlus } from '@arco-design/web-vue/es/icon'
import { Message } from '@arco-design/web-vue'
import axios from 'axios'
import type { FileItem } from '@arco-design/web-vue/es/upload/interfaces'

interface Props {
  value?: string; // 已有文件 URL
  uploadUrl: string; // 上传接口
  accept?: string; // 接受的文件类型
  maxSize?: number; // 最大文件大小 MB
  showMessage?: boolean; // 是否显示消息提示
}

interface UploadResponse {
  url: string;
  message?: string;
  code?: number;
  data?: {
    url: string;
    [key: string]: any;
  };
}

const props = withDefaults(defineProps<Props>(), {
  accept: 'image/*',
  maxSize: 5,
  showMessage: true
})

// 只保留必要的 emit，其他都内部处理
const emit = defineEmits<{
  'update:value': [value: string]
}>()

const fileList = ref<FileItem[]>([])
const uploading = ref(false)

// 计算当前文件URL
const currentValue = computed(() => {
  if (fileList.value.length > 0 && fileList.value[0].url) {
    return fileList.value[0].url
  }
  return props.value || ''
})

// 初始化已有文件
const initializeFile = (url: string) => {
  if (url) {
    const fileName = url.split('/').pop() || 'image'
    fileList.value = [
      {
        uid: Date.now().toString(),
        name: fileName,
        url: url,
        status: 'done'
      } as FileItem
    ]
  } else {
    fileList.value = []
  }
}

// 组件挂载时初始化
onMounted(() => {
  if (props.value) {
    initializeFile(props.value)
  }
})

// 监听外部 value 变化
watch(() => props.value, (newVal) => {
  if (newVal !== currentValue.value) {
    initializeFile(newVal || '')
  }
}, { immediate: false })

// 文件类型检查
const isValidFileType = (file: File): boolean => {
  if (!props.accept || props.accept === '*') return true

  const acceptTypes = props.accept.split(',').map(type => type.trim())
  return acceptTypes.some(type => {
    if (type.includes('/*')) {
      const mainType = type.split('/')[0]
      return file.type.startsWith(mainType)
    }
    return file.type === type
  })
}

// 文件大小检查
const isValidFileSize = (file: File): boolean => {
  return file.size / 1024 / 1024 <= props.maxSize
}

// 显示错误消息
const showError = (message: string) => {
  if (props.showMessage) {
    Message.error(message)
  }
  console.error(message)
}

// 显示成功消息
const showSuccess = (message: string) => {
  if (props.showMessage) {
    Message.success(message)
  }
  console.log(message)
}

// 文件上传前的校验 - 必须返回 true 才会调用 customUpload
const beforeUpload = (file: File): boolean => {
  console.log('=== beforeUpload 调用 ===')
  console.log('beforeUpload - file:', file)
  console.log('beforeUpload - file存在:', !!file)
  console.log('beforeUpload - file类型:', file?.type)
  console.log('beforeUpload - file名称:', file?.name)
  console.log('beforeUpload - file大小:', file?.size)

  // 文件存在性检查
  if (!file) {
    console.error('❌ beforeUpload: 文件为空')
    showError('上传文件为空')
    return false
  }

  // 文件类型校验
  if (!isValidFileType(file)) {
    console.error('❌ beforeUpload: 文件类型不支持')
    showError(`不支持的文件类型，仅支持: ${props.accept}`)
    return false
  }

  // 文件大小校验
  if (!isValidFileSize(file)) {
    console.error('❌ beforeUpload: 文件大小超限')
    showError(`文件大小不能超过 ${props.maxSize}MB`)
    return false
  }

  console.log('✅ beforeUpload: 校验通过，返回 true')
  return true
}

// 自定义上传逻辑
const customUpload = async (option: any) => {
  console.log('=== customUpload 调用 ===')
  console.log('customUpload - option:', option)
  console.log('customUpload - option.file:', option?.file)
  console.log('customUpload - option.fileItem:', option?.fileItem)
  console.log('customUpload - option.data:', option?.data)

  // 尝试从不同的地方获取文件对象
  let file = option?.file || option?.fileItem?.file || option?.fileItem?.originFile

  console.log('customUpload - 解析出的file:', file)
  console.log('customUpload - file类型:', typeof file)

  if (!file) {
    console.error('❌ customUpload: 无法获取文件对象')
    console.log('可用的option属性:', Object.keys(option || {}))
    option?.onError?.(new Error('无法获取文件对象'))
    return
  }

  uploading.value = true

  const formData = new FormData()
  formData.append('file', file)

  console.log('✅ customUpload: FormData创建成功')
  console.log('FormData entries:', Array.from(formData.entries()))

  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent: any) => {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        console.log('上传进度:', percent + '%')
        option?.onProgress?.({ percent })
      },
      timeout: 60000
    }

    console.log('发送请求到:', props.uploadUrl)
    const response = await axios.post<UploadResponse>(props.uploadUrl, formData, config)

    console.log('收到响应:', response.data)

    // 处理响应并获取文件URL
    let fileUrl = ''
    const data = response.data

    if (data.url) {
      fileUrl = data.url
    } else if (data.data?.url) {
      fileUrl = data.data.url
    } else if (typeof data === 'string') {
      fileUrl = data
    } else {
      console.error('无法解析文件URL，响应数据:', data)
      throw new Error('服务器响应中未找到文件URL')
    }

    // 更新文件列表
    const newFileItem: FileItem = {
      uid: option.fileItem?.uid || Date.now().toString(),
      name: file.name,
      url: fileUrl,
      status: 'done',
      response: response.data
    }

    fileList.value = [newFileItem]

    // 更新父组件的值
    emit('update:value', fileUrl)

    // 内部处理成功逻辑
    showSuccess('文件上传成功')
    console.log('✅ 上传成功:', fileUrl)
    option?.onSuccess?.(response.data)

  } catch (error: any) {
    console.error('❌ 上传失败:', error)

    // 更新文件状态为错误
    if (fileList.value.length > 0) {
      fileList.value[0].status = 'error'
    }

    let errorMessage = '上传失败'
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message
    } else if (error.message) {
      errorMessage = error.message
    }

    showError(errorMessage)
    option?.onError?.(error)
  } finally {
    uploading.value = false
  }
}

// 处理文件移除
const handleRemove = (fileItem: FileItem) => {
  console.log('移除文件:', fileItem.name)
  fileList.value = []
  emit('update:value', '')
  showSuccess('文件已移除')
  return true
}

// 暴露一些有用的方法给父组件（如果需要）
defineExpose({
  clearFiles: () => {
    fileList.value = []
    emit('update:value', '')
  },
  getCurrentUrl: () => currentValue.value,
  isUploading: () => uploading.value
})
</script>

<style scoped>
.upload-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 80px;
  border: 2px dashed var(--color-border-2);
  border-radius: 6px;
  background-color: var(--color-fill-1);
  transition: all 0.3s;
}

.upload-placeholder:hover {
  border-color: var(--color-primary-light-4);
  background-color: var(--color-primary-light-5);
}

.upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: var(--color-text-3);
}

.upload-text {
  font-size: 14px;
}

:deep(.arco-upload-list-picture-card .arco-upload-list-item) {
  width: 100%;
  height: 100%;
}

:deep(.arco-upload-picture-card) {
  width: 100%;
  height: auto;
  min-height: 80px;
}

:deep(.arco-upload-progress) {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
