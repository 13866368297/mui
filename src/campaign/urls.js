// Common API
// 查询奖品列表
export const getAwardListUrl = '/music-campaign-service/v1/service/awardList/get';
// 查询活动中奖记录
export const getCampHisUrl = '/rest.root/campaign/getCampHis';
// 查询活动基本信息
export const getCampBasicInfoUrl = '/music-campaign-service/v2/service/campBasicInfo/get';
//查询当前活动参与、中奖记录，支持单个/多个活动的查询
export const getLatestCampHisUrl = '/music-campaign-service/v2/service/latestCampHis/get';
// （国内）微信浏览器二次分享（H5使用）
export const getWeChatArgsUrl = '/rest.root/campaign/share/getWeixinArgs';
// 根据用户查询中奖记录
export const getUserAwardInfoUrl = '/rest.root/campaign/getUserCampHis';
// 根据用户查询中奖纪录 支持活动别名列表
export const getUserCampHisUrl = '/music-campaign-service/v2/service/userCampHis/get';
// 查询当前系统时间
export const getCurrentSystemTimeUrl = '/rest.root/app/getTime';
// 话单上报
export const reportCdrUrl = '/rest.root/app/reportCdr';
// 中奖用户信息补全
export const updateLotteryUserInfoUrl = '/rest.root/campaign/updateLotteryUserInfo';
// 查询人工抽奖中奖纪录
export const getLotteryAwardInfoUrl = '/rest.root/campaign/getFlashLottery';
// 查询评论列表
export const queryCommentListUrl = '/music-sns-service/v1/service/comment/query';
// 查询评论总数
export const queryCommentCountUrl = '/music-sns-service/v1/service/comment/querycount';
// 添加评论
export const createCommentUrl = '/music-sns-service/v1/service/comment/create';
// 删除评论
export const deleteCommentUrl = '/music-sns-service/v1/service/comment/delete';
// 点赞评论或取消
export const praiseCommentUrl = '/music-sns-service/v1/service/comment/praise';
// 举报评论
export const reportCommentUrl = '/music-sns-service/v1/service/comment/report';
//活动达标用户领奖接口
export const getAwardCollectUrl = '/music-campaign-service/v2/service/award/collect';
//活动投票接口
export const reportVoteUrl = '/rest.root/vote/report';
//查询我的投票记录
export const getUserVoteInfoUrl = '/music-campaign-service/v1/service/userVoteInfo/get';
//查询活动投票记录
export const getVoteStatInfoUrl = '/music-campaign-service/v1/service/voteStatInfo/get';
//查询活动列表
export const getCampaignList = '/rest.root/campaign/getCampaignList';
//查询活力点余额
export const getVitalityAmountUrl = '/music-campaign-service/v2/service/userVitalityAmount/get';
//查询活力点明细
export const getVitalityDetailUrl = '/music-campaign-service/v2/service/userVitalityDetail/get';
//活力点兑换
export const redeemVitalityGift = '/music-campaign-service/v2/service/vitalityGift/redeem';
//查询下载记录
export const getDownloadRecord = '/music-mcs-service/v1/service/userPpsAdRecord/get';
//查询下载进度
export const getDownloadProcess = '/music-campaign-service/v2/service/userPpsRights/get';
//查询活动动态配置项
export const getdynamicConfig = '/music-campaign-service/v2/service/dynamicConfig/get';
// 查询手机昵称
export const queryDevicesignatureUrl = '/music-sns-service/v1/service/devicesignature/detail';

// Music API
// 参与音乐抽奖活动
export const musicCampJoinUrl = '/rest.root/campaign/joinCamp';
// 音乐用户抽奖次数
export const musicLotteryTimesUrl = '/rest.root/campaign/getLotteryTimes';
// 音乐用户登录认证
export const musicUserAuthUrl = '/rest.root/user/auth';
// 音乐签到查询
export const musicUserSignStatUrl = '/music-mcs-service/v1/service/userSignStat/get';
// 音乐签到
export const musicSignUrl = '/music-mcs-service/v1/service/sign';
// 音乐做任务完成情况查询
export const musicUserTaskStatUrl = '/music-mcs-service/v1/service/userTaskStat/get';
// 音乐获取勋章信息（微服务）
export const musicMedalUrl = '/music-user-service/v1/service/medal/simple';
// 音乐获取会员信息（微服务）
export const musicSubscriptionUrl = '/v1/ttmusic/order/subscription/detail/all';
// 查询用户会员信息(含割接逻辑)
export const musicSubscriptionDetailUrl = '/music-order-service/v1/service/subscription/detail';
// 查询用户订单信息
export const queryUserOrderInfoUrl = '/music-order-service/v1/service/orderinfo/get';
// 查询栏目下内容信息
export const musicColumnDetailUrl = '/music-operation-service/v1/service/column/detail/bycolumnid';
// 第三方登录获取token
export const thirdPartyTokenUrl = '/music-user-service/v1/service/token/sp';
// 查询物流信息
export const trackingProcessInfoUrl = '/music-campaign-service/v2/service/trackingProcessInfo/get';


//查询用户内容是否收藏
export const queryIsCollectedUrl = '/music-userbehavior-service/v1/service/favorite/simple/exist';
//添加收藏
export const addCollectionUrl = '/music-userbehavior-service/v1/service/favorite/create';
//删除收藏
export const deleteCollectionUrl = '/music-userbehavior-service/v1/service/favorite/delete';

// 歌单歌曲
//查询歌单简要信息
export const queryMusiclistSimpleUrl = '/music-operation-service/v1/service/musiclist/simple/bymusiclistids';
// 查询歌曲元信息
export const querySongSimpleUrl = '/music-metacontent-service/v1/service/song/appsimple/bysongcode';
// 获取歌曲播放地址信息
export const musicSongInfoUrl = '/music-play-service/v2/service/file/bycontentcode';

// 话题圈
// 查询话题圈
export const musicTopicQueryUrl = '/music-search-service/v1/service/topic/query';
// 发布话题圈
export const musicTopicCreateUrl = '/music-topic-service/v1/service/topic/create';
// 话题圈点赞
export const musicTopicPraiseUrl = '/music-topic-service/v1/service/interact/praise';


// Theme API
// 参与主题抽奖活动
export const themeCampJoinUrl = '/music-campaign-service/v1/service/theme/camp/join';
// 主题用户抽奖次数
export const themeLotteryTimesUrl = '/music-campaign-service/v1/service/theme/lotterytimes/get';
// 主题用户登录认证
export const themeUserAuthUrl = '/music-campaign-service/v1/service/themeuser/auth';
//获取用户购买付费主题列表
export const themeUserBuySourceList = '/servicesupport/api/getBuySourceByIds';
// 查询主题专区资源
export const getThemeUrl = '/servicesupport/market/gettheme.do';
// 查询字体/静态壁纸/动态壁纸专区资源
export const getResourceUrl = '/servicesupport/market/getResourceInfo.do';
// 主题查询是否是会员
export const checkIfThemeVipUrl = '/servicesupport/theme/ttdservice/service/v1/subscription/queryall';
// 主题查询套餐订购记录
export const checkAllThemeOrderUrl = '/servicesupport/theme/ttdservice/service/v1/subscription/order/queryall';



// External URLs
export const hitopidUrl = '/servicesupport/market/getPortalShareInfo.do';
//获取消费榜单
export const getConsumeRankInfo = '/servicesupport/market/getConsumeRankInfo.do';
export const musicDrawbackUrl = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.android.mediacenter';

export const goAppCommentPageUrl = 'hwmediacenter://com.android.mediacenter/comment';
export const huaCoinUrl = 'wallet://com.huawei.wallet/openwallet?action=com.huawei.pay.intent.action.HCOINRECEIVE';
export const goMusicCardUrl = 'hwmediacenter://com.android.mediacenter/mycard?pver=121100000&portal=ut&from=com.huawei.musicplatform.campainh5&channelid=1&needback=1';
export const goThemeCard = 'hwt://www.huawei.com/theme?id=6&type=7&from=com.huawei.themeplatform.campainh5';
export const musicDrawbackSchemaUrl = 'hwmediacenter://com.android.mediacenter/showH5?pver=121000000&portal=hwmusic&from=com.huawei.musicplatform.campaignh5&needback=0&channelid=1';
export const themeDrawbackSchemaUrl = 'hwt://www.huawei.com/theme?type=6';
export const goThemeCardUrl = 'hwt://www.huawei.com/theme?type=7&id=6&from=com.huawei.themeplatform.campainh5';
export const radioUrlDrawbackSchemaUrl = 'hwfmradio://com.huawei.android.FMRadio/showcampaign?portal=ut&from=com.huawei.musicplatform&appsafearguments=true&nolandscapte=true&activity=true&transparentstatusbar=true&hideactionbar=true&share=true&campaignid=';
export const musicUserProtocolUrl = 'https://consumer.huawei.com/minisite/cloudservice/music/terms.htm?country=CN&language=zh-cn';
export const themeUserProtocolUrl = 'https://consumer.huawei.com/minisite/cloudservice/themes/terms.htm?country=CN&language=zh_CN&branchid=0';
export const musicPrivacyUrl = 'https://consumer.huawei.com/minisite/cloudservice/music/privacy-statement.htm?country=CN&language=zh_CN';
export const themePrivacyUrl = 'https://consumer.huawei.com/minisite/cloudservice/themes/privacy-statement.htm?country=CN&language=zh_CN&branchid=0';
export const musicUpdateAppUrl = 'hiapp://com.huawei.appmarket?activityName=activityUri|appdetail.activity&params={"params":[{"name":"uri","type":"String","value":"package|com.android.mediacenter"}]}&channelId=123412';
export const musicCheckmeUrl = 'hwmediacenter://com.android.mediacenter/starthwmediacenter?jumpTarget=local&pver=8000300&portal=ut&from=com.huawei.musicplatform.campaignh5&needback=1';

//跳转专辑详情
export const goMusicAlbumDetailUrl = 'hwmediacenter://com.android.mediacenter/showdetail?catalogtype=qt_radio_info&isbanner=1&pver=800020310&portal=qtfm&from=com.huawei.musicplatform.campaignh5&needback=1';
export const radioHomeUrl = 'hwmediacenter://com.android.mediacenter/starthwmediacenter?jumpTarget=radio&pver=8000300&portal=ut&from=com.huawei.musicplatform.campaignh5&needback=1';
export const insentiveAdUrl = 'https://campaign-music.hicloud.com/camp/150297863463673856/000111.html?appsafearguments=true&nolandscapte=true&activity=true&operator=51';
