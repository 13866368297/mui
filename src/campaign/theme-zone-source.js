import { fetchAsync } from './http-client';
import { getThemeUrl, getResourceUrl } from './urls';
import {userInfo} from './user-info';

const getThemeZoneSource = (option) => {
  const body = {
    sign: userInfo.sign || '060010064111CN@B2A80A01C72638CB5FC271B33A7EAC0A464309C2D3C5140557027952257D112A',
    categoryId: option.categoryId,
    screen: userInfo.screen || '1080*1920',
    themeVersion: userInfo.themeVersion || '8.0',
    filetype: option.filetype || 'hwt',
    begin: option.begin || 1,
    length: option.length || 200,
    sort: option.sort || 'recommend', // sort 字段默认值 最热hottest,最新latest，默认值latest,爬升最快climbfastest、编辑推荐recommend、最新推荐latestrec排序方式
    supportType: option.supportType || 1,
    chargeflag: option.chargeflag || '-1',// chargeFlag字段默认值  是否收费主题（-1表示不区分收费与不收费）
    ver: option.ver || '1.7', // ver字段默认值  接口版本
    versionCode: userInfo.appVersionCode || '820382'
  }
  ;
  return fetchAsync(getThemeUrl, 'get', body, false).then(data => {
    return data;
  });
};
const getResourceZone = (option) => {
  let body = {
    sign: userInfo.sign || '060010064111CN@B2A80A01C72638CB5FC271B33A7EAC0A464309C2D3C5140557027952257D112A',
    type: option.zoneType || 2, //0：静态壁纸 1：铃声  2：在线字体  3：动态壁纸
    categoryId: option.categoryId,
    begin: option.begin || 1,
    length: option.length || 200,
    sort: option.sort || 'recommend',
    ver: option.ver || '1.7', // ver字段默认值  接口版本
    versionCode: userInfo.appVersionCode || '820382'
  };
  switch (option.sourceType) {
    case 'fontType': //字体
      body.chargeflag = option.chargeflag || '-1';
      body.fontversion = option.fontversion || '3.0';
      body.packageType = option.packageType || 2;
      break;
    case 'dynamicWallPaperType': //动态壁纸
      body.chargeflag = option.chargeflag || '-1';
      body.liveCharge = option.liveCharge || true;
      break;
    case 'wallPaperType': //壁纸
      body.paperChargeFlag = option.paperChargeFlag || '-1';
      break;
  }
  return fetchAsync(getResourceUrl, 'get', body, false).then(data => {
    return data;
  });
};
export {
  getThemeZoneSource,
  getResourceZone,
};
