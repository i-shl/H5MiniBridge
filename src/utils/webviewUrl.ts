/**
 * 小程序端统一构建webview URL的工具
 * 统一管理传递给H5的参数
 */
import { stringifyQuery } from '@/http/tools/queryString'

/**
 * 人员类型
 */
export type UserType = 'sales' | 'agent' | 'staff'

/**
 * 环境类型
 */
export type EnvType = 'h5' | 'mp-weixin' | 'mp-qiwei' | 'mp-lark'

/**
 * Webview URL参数接口
 */
export interface WebviewUrlParams {
  env: EnvType
  token?: string
  route?: string
  userType?: UserType
}

/**
 * H5基础URL（根据实际环境修改）
 */
export const H5_BASE_URL = 'https://test.ishl.top'
// export const H5_BASE_URL = 'https://mid-h5.bqdev.work'

/**
 * 构建webview URL
 * @param params URL参数
 * @returns 完整的webview URL
 */
export function buildWebviewUrl(params: WebviewUrlParams): string {
  const urlParams: Record<string, string> = {
    env: params.env,
  }

  // 添加token（如果有）
  if (params.token) {
    urlParams.token = params.token
  }

  // 添加route（如果有）
  if (params.route) {
    urlParams.route = params.route
  }

  // 添加userType（如果有）
  if (params.userType) {
    urlParams.userType = params.userType
  }

  const queryString = stringifyQuery(urlParams)
  return `${H5_BASE_URL}${queryString ? `?${queryString}` : ''}`
}
