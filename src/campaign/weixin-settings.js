import { getWeChatArgsUrl } from './urls';
import { fetchAsync } from './http-client';
import { CampaignManager } from './campaign-manager';
import { getQueryParams } from './search-params';
import device from './device';
const _getWeixinArgs = (url) => {
  return fetchAsync(getWeChatArgsUrl, 'post', {
    url: url || window.location.href.split('#')[0]
  }, false);
};

const setWeixinArgs = (url) => {
  return _getWeixinArgs(url).then(weixinArgvs => {
    if (!window.wx || typeof window.wx.config !== 'function') {
      return;
    }

    window.wx.config({
      debug: false,
      appId: 'wx5e2d72f2d2e448ee',
      timestamp: weixinArgvs.timestamp,
      nonceStr: weixinArgvs.noncestr,
      signature: weixinArgvs.signature,
      jsApiList: [
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ'
      ]
    });
  });
};

/**
 * 设置微信微博分享
 * @param {String} wxShareImage 微信分享小图标连接
 * @param {String} [wxTitle] 微信分享主标题
 * @param {String} [wxDescription] 微信分享副标题
 */
const shareSettings = (wxShareImage, wxTitle, wxDescription) => {
  let _subTitle = wxDescription || CampaignManager.subTitle;

  // 第一次分享
  const setFirstShare = () => {
    let shareParams;
    if (CampaignManager.isShareVersionOK) {
      const originUrl = window.location.href.split('#')[0];
      let url = originUrl;
      const queryParams = getQueryParams(window.location.href.split('#')[0]);
      if (queryParams.share !== 'true') {
        url = originUrl + originUrl.indexOf('?') > -1 ? '&share=true' : '?share=true';
      }

      shareParams = JSON.stringify({
        subtitle: wxDescription || _subTitle,
        changeurl: url
      });
    } else {
      shareParams = wxDescription || _subTitle;
    }

    try {
      window.JsInterface.setshareparam(shareParams);
      //如果是主题app，自定义分享的图片
      if(CampaignManager.sdkType==='theme'){
        window.JsInterface.setShareImageUrl(wxShareImage);
      }
    } catch (err) {
      console.log('setshareparam ERROR:', err.message);
    }
  };

  // 微信二次分享部分
  const setSecondShare = () => {
    console.log('start to set weixin second share');
    if (!window.wx || typeof window.wx.ready !== 'function') {
      console.log('ERROR: Weixin SDK is not added!');
      return;
    }

    const title = wxTitle || CampaignManager.title || document.title;
    const desc = wxDescription || _subTitle;
    const link = window.location.href.split('#')[0];
    const imgUrl = wxShareImage;

    console.log('weixin title, desc, link, imgUrl', title, desc, link, imgUrl);

    window.wx.ready(() => {
      const shareData = {
        title,
        desc,
        link,
        imgUrl
      };

      console.log('weixin second share', shareData);

      window.wx.onMenuShareAppMessage(shareData);
      window.wx.onMenuShareTimeline(shareData);
      window.wx.onMenuShareQZone(shareData);
    });
  };

  const setAllShares = () => {
    setFirstShare();
    const locationUrl = window.location.href.split('#')[0];
    //只有在微信中才调用微信分享的接口
    if(device.isWeixin){
      setWeixinArgs(locationUrl).then(setSecondShare);
    }
  };

  if (!_subTitle && CampaignManager.useCampaignServer && typeof CampaignManager.campHisPromise === 'object') {
    CampaignManager.campHisPromise.then(data => {
      _subTitle = data.subTitle;
      setAllShares();
    });
  } else {
    setAllShares();
  }
};

export {
  setWeixinArgs,
  shareSettings,
};
