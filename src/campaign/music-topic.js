import {fetchAsync} from './http-client';
import {
  musicTopicCreateUrl
} from './urls';

const extraParam = {
  snsFlag: true,
  inAppbutNotUseToken: false
};
/**
 * 发布话题
 * @param {String} circleId 圈子ID
 * @param {String} topicName 话题名称
 * @param {String} topicContent 话题内容 这是一个JSON对象字符串
 */
const createTopic = (circleId, topicName, topicContent) => {
  console.log('mui 测试发布话题接口', circleId, topicName, topicContent);
  const params = {
    circleId,
    topicName,
    topicContent,
  };
  return fetchAsync(musicTopicCreateUrl, 'post', params, false, {}, 'global', extraParam);
};
export {
  createTopic
};