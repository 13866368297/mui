import { fetchAsync } from './http-client';
import {
  queryCommentListUrl,
  createCommentUrl,
  praiseCommentUrl,
  deleteCommentUrl,
  reportCommentUrl,
  queryCommentCountUrl
} from './urls';

const extraParam = {
  snsFlag: true,
  inAppbutNotUseToken: false,
};

/**
 * @description 查询评论列表
 * @param {Object} queryCommentReq
 * @param queryCommentCountReq.contentID 内容ID 可传活动ID
 * @param queryCommentCountReq.contentType 内容类型 1：单曲 4：歌单 6：电台 10：杂志
 * @param queryCommentCountReq.queryType 查询评论类型 0：首页 1：最新评论 2：精彩评论
 * @param queryCommentCountReq.limit 记录数 最大值100
 * @return {Promise}
 * ******
 * {
   "result":{"resultCode":"000000","resultMessage":"Success!"},
    "latestCommentInfos": {
      "commentInfos":[{
        "commentID":"M3Fh6YjjiHUy38Thh",
        "comment":"hahahhaha",
        "createTime":"20200325075958",
        "nickName":"136******01",
        "isPraised":"0",
        "praiseTimes":"0",
        "isVIP":"0",
        "parentCommentInfo":{"isPraised":"0"},
        "extendinfo":"{\"nickname\":\"136******01\"}",
        "snsUserID":"SNSM-no4oCcbdUPTFu23"
      }]
    }
 * }
 * ******
 */
const queryCommentList = (queryCommentReq) => {
  return fetchAsync(queryCommentListUrl, 'post', queryCommentReq, false, {}, 'global', extraParam);
};

/**
 * @description 添加评论
 * @param {Object} createCommentReq
 * @param createCommentReq.contentID 内容ID 可传活动ID、歌曲ID、歌单ID
 * @param createCommentReq.contentName 内容名称 可传活动名称（别名）
 * @param createCommentReq.contentType 内容类型 1：单曲 4：歌单 6：电台 10：杂志
 * @param createCommentReq.comment 评论内容
 * @returns {Promise}
 * ******
 * {
      "result":{
        "resultCode":"000000",
        "resultMessage":"Success!"
      },
      "commentID":"M3FuwD8nD59clhmGD"
    }
 * ******
 */
const createComment = (createCommentReq) => {
  return fetchAsync(createCommentUrl, 'post',createCommentReq, false, {}, 'global', extraParam);
};

/**
 * @description 点赞取消点赞
 * @param {OBject} praiseCommentReq
 * @param praiseCommentReq.contentID // 内容ID 可传活动ID、歌曲ID、歌单ID
 * @param praiseCommentReq.contentType // 内容类型 1:单曲 4：歌单 6：电台 10 杂志
 * @param praiseCommentReq.commentID
 * @param praiseCommentReq.command // 1：点赞  0：取消点赞
 * @returns {Promise}
 * ******
 * {
      "result":{
      "resultCode":"000000",
      "resultMessage":"Success!"
      }
    }
 * ******
 */
const praiseComment = (praiseCommentReq) => {
  return fetchAsync(praiseCommentUrl,'post', praiseCommentReq,false, {}, 'global', extraParam);
};

/**
 * @description 删除评论
 * @param {Object} deleteCommentReq
 * @param deleteCommentReq.contentID // 内容ID
 * @param deleteCommentReq.contentType // 内容类型 1：单曲 4：歌单 6：电台 10：杂志
 * @param deleteCommentReq.commentID //评论ID
 * @returns {Promise}
 * ******
 * {
      "result":{
      "resultCode":"000000",
      "resultMessage":"Success!"
      }
    }
 * ******
 */
const deleteComment = (deleteCommentReq) => {
  return fetchAsync(deleteCommentUrl, 'post', deleteCommentReq, false, {}, 'global', extraParam);
};

/**
 *
 * @param {Object} reportCommentReq TODO
 */
const reportComment = (reportCommentReq) => {
  return fetchAsync(reportCommentUrl, 'post', reportCommentReq, false, {}, 'global', extraParam);
};
/**
 * @description 查询评论数量
 * @param {Object} queryCommentCountReq
 * @param queryCommentCountReq.contentID 内容ID
 * @param queryCommentCountReq.contentType 内容类型 1：单曲类 4：系统歌单类 6：电台类 10：杂志类
 * @returns {Promise}
 * ******
 * {
    "result":
      {
        "resultCode":"000000",
        "resultMessage":"Success!"
        },
    "commentCount":"6"
    }
 * ******
 */
const getMusicCommentsCount = (queryCommentCountReq) => {
  const url = queryCommentCountUrl + '?contentID=' + queryCommentCountReq.contentID + '&contentType='+ queryCommentCountReq.contentType;
  return fetchAsync(url, 'get', null, false, {}, 'global', extraParam);
};
export {
  queryCommentList,
  createComment,
  praiseComment,
  deleteComment,
  reportComment,
  getMusicCommentsCount
};