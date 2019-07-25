import { message } from 'antd';
import {Component} from 'react';

let commonInfo = {
  /**
   * 成功提示
   * @param msg 提示信息
   * @author 张斌
   */
  success: function(msg, timer, callback) {
    message.destroy();
    message.success(msg, timer, callback)
  },

  /**
   * 错误提示
   * @param msg 提示信息
   * @author 张斌
   */
  error: function(msg, timer, callback) {
    message.destroy();
    message.error(msg, timer, callback);
  },

  /**
   * 警告提示
   * @param msg 提示信息
   * @author 张斌
   */
  warning: function(msg, timer, callback) {
    message.destroy();
    message.warning(msg, timer, callback);
  },

  /**
   * 普通提示
   * @param msg 提示信息
   * @author 张斌
   */
  info: function(msg, timer, callback) {
    message.destroy();
    message.info(msg, timer, callback);
  },
}

Component.prototype.commonInfo = commonInfo;
