import axios from 'axios';

// 请求管理器
class RequestManager {
  constructor() {
    this.controllers = new Map(); // 存储 AbortController
  }

  // 生成请求键
  static generateKey(config) {
    const { method, url, params, data, cancelKey } = config;
    if (cancelKey) {
      return cancelKey;
    }
    // 忽略时间戳参数，避免重复请求误判
    const filteredParams = { ...params };
    delete filteredParams._t;
    return [method, url, JSON.stringify(filteredParams), JSON.stringify(data)].join('&');
  }

  // 添加请求
  addRequest(config) {
    const key = RequestManager.generateKey(config);

    // 如果已存在相同请求，先取消
    if (this.controllers.has(key)) {
      const controller = this.controllers.get(key);
      controller.abort();
      this.controllers.delete(key);
    }

    // 创建新的 AbortController
    const controller = new AbortController();
    config.signal = controller.signal;
    this.controllers.set(key, controller);

    return key;
  }

  // 移除请求
  removeRequest(key) {
    this.controllers.delete(key);
  }

  // 取消单个请求
  cancelRequest(key) {
    if (this.controllers.has(key)) {
      const controller = this.controllers.get(key);
      controller.abort();
      this.controllers.delete(key);
      return true;
    }
    return false;
  }

  // 取消所有请求
  cancelAll() {
    this.controllers.forEach((controller) => {
      controller.abort();
    });
    this.controllers.clear();
  }

  // 获取请求键
  getRequestKey(config) {
    return RequestManager.generateKey(config);
  }
}

const defaultConfig = {
  baseURL: process.env.VUE_APP_BASE_API || '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
};

class HttpClient {
  constructor(options = {}) {
    this.options = options;
    this.requestManager = new RequestManager();
    this.requestCount = 0; // 用于 loading 计数
    this.instance = axios.create({ defaultConfig, ...options });

    this.setupInterceptors();
  }

  setupInterceptors() {
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 处理请求取消
        if (config.cancelFlag !== false) {
          // 添加到请求管理器
          this.requestManager.addRequest(config);
          // 保存请求键到 config，用于后续移除
          config._requestKey = this.requestManager.getRequestKey(config);
        }

        // 添加 token
        const token = localStorage.getItem('token');
        if (token && config.withToken !== false) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // 添加时间戳防止缓存
        if (config.noCache) {
          config.params = {
            ...config.params,
            _t: Date.now(),
          };
        }

        // 显示 loading
        if (config.showLoading) {
          this.showLoading();
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response) => {
        // 请求完成，从管理器中移除
        if (response.config.cancelFlag !== false && response.config._requestKey) {
          this.requestManager.removeRequest(response.config._requestKey);
        }

        // 隐藏 loading
        if (response.config.showLoading) {
          this.hideLoading();
        }

        // 处理业务状态码
        const res = response.data;

        // 根据实际后端返回调整
        if (res.code !== undefined && res.code !== 200) {
          // 处理特定状态码
          this.handleBusinessError(res.code, res.message, response.config);

          if (response.config.showError) {
            this.showError(res.message || '请求失败');
          }
          return Promise.reject(new Error(res.message || 'Error'));
        }

        return res;
      },
      (error) => {
        // 处理取消的请求
        if (error.name === 'CanceledError' || error.code === 'ERR_CANCELED') {
          return Promise.reject({
            message: '请求已被取消',
            isCanceled: true,
            config: error.config,
          });
        }

        // 请求完成，从管理器中移除
        if (error.config && error.config.cancelFlag !== false && error.config._requestKey) {
          this.requestManager.removeRequest(error.config._requestKey);
        }

        // 隐藏 loading
        if (error.config && error.config.showLoading) {
          this.hideLoading();
        }

        // 处理错误
        this.handleError(error);

        return Promise.reject(error);
      },
    );
  }

  // 显示 loading
  showLoading() {
    if (this.requestCount === 0) {
      // 使用第三方库的 loading 组件
      // Toast.loading({ message: '加载中...', forbidClick: true });
      console.log('显示全局 loading');
    }
    this.requestCount++;
  }

  // 隐藏 loading
  hideLoading() {
    this.requestCount--;
    if (this.requestCount === 0) {
      // Toast.clear();
      console.log('隐藏全局 loading');
    }
  }

  // 显示错误提示
  showError(message) {
    // Toast.fail(message);
    console.error(message);
  }

  // 处理业务错误
  handleBusinessError(code, message, config) {
    switch (code) {
      case 401:
        // 未授权
        localStorage.removeItem('token');
        // 触发登录事件
        window.dispatchEvent(new CustomEvent('unauthorized'));
        break;
      case 403:
        console.warn('无权限访问:', config.url);
        break;
      case 429:
        console.warn('请求过于频繁');
        break;
      default:
        break;
    }
  }

  // 处理网络错误
  handleError(error) {
    if (error.response) {
      // 服务器返回错误状态码
      const { status, data } = error.response;
      switch (status) {
        case 400:
          console.error('请求参数错误');
          break;
        case 401:
          console.error('未授权，请重新登录');
          localStorage.removeItem('token');
          // window.location.href = '/login';
          break;
        case 403:
          console.error('没有权限访问');
          break;
        case 404:
          console.error('请求的资源不存在');
          break;
        case 408:
          console.error('请求超时');
          break;
        case 500:
          console.error('服务器内部错误');
          break;
        case 502:
          console.error('网关错误');
          break;
        case 503:
          console.error('服务不可用');
          break;
        case 504:
          console.error('网关超时');
          break;
        default:
          console.error(data?.message || `请求失败: ${status}`);
      }
    } else if (error.request) {
      // 请求已发出但没有收到响应
      console.error('网络连接失败，请检查网络设置');
    } else if (error.message) {
      // 请求配置出错
      console.error(error.message);
    }
  }

  // 公共方法
  cancelRequest(config) {
    const key = this.requestManager.getRequestKey(config);
    return this.requestManager.cancelRequest(key);
  }

  cancelAllRequests() {
    this.requestManager.cancelAll();
  }

  cancelByKey(key) {
    return this.requestManager.cancelRequest(key);
  }

  // 请求方法
  request(config) {
    return this.instance.request(config);
  }

  get(url, params, config = {}) {
    return this.instance.get(url, { params, ...config });
  }

  post(url, data, config = {}) {
    return this.instance.post(url, data, config);
  }

  put(url, data, config = {}) {
    return this.instance.put(url, data, config);
  }

  delete(url, config = {}) {
    return this.instance.delete(url, config);
  }

  patch(url, data, config = {}) {
    return this.instance.patch(url, data, config);
  }

  // 上传文件
  upload(url, file, config = {}) {
    const formData = new FormData();
    formData.append('file', file);

    return this.instance.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      ...config,
    });
  }

  // 下载文件
  download(url, params, config = {}) {
    return this.instance.get(url, {
      params,
      responseType: 'blob',
      ...config,
    });
  }
}

// 创建默认实例
const http = new HttpClient({
  showLoading: true,
  showError: true,
});

export default http;
