import Toast from '../../common/toast/toast';
import Alert from '../../common/alert/alert';
import { t } from '../../locale';

import device from '../device';
const TIPS = {
  // toast
  global: {
    9010130004: 'common.activityNotExist', // 全局
    9010499999: 'common.currentLimiting', // 全局
    9010140001: 'common.serverError', // 全局
    9010199999: 'common.serverError', // 全局
    9010200017: 'common.serverError', // 全局
    9010199998: 'common.refreshPage', // 全局
    9010120001: 'common.refreshPage', // 全局
    9010120003: 'common.refreshPage', // 全局
    9010400007: 'common.noPartChance', // 全局
  },
  pps: {
    9010410007: 'common.deviceTodayMax', // pps激励广告领取接口
    9010410009: 'common.accountTodayMax', // pps激励广告领取接口
    9010410008: 'common.deviceChanceMax', // pps激励广告领取接口
    9010410010: 'common.accountChanceMax', // pps激励广告领取接口
  },
  // alert
  globalAlert: {
    // 9010110002: t('common.areaSupport'), // 全局
    9010410005: 'common.onlyDevice', // 全局
    9010410006: 'common.unknownDevice', // 全局
    9010410011: 'common.unknownDevice', // 全局
  },
  sign: {
    9010200001: 'common.todayClockIn', // 打卡接口
  },
  convertWithoutLottery: {
    // '9010400001': '奖品已领完。',  // 领奖/活力点兑换
  },
  convert: {
    9010410012: 'common.noQualification', // 抽奖/领奖/活力点兑换
    9010130003: 'common.noLotteryTimes', // 抽奖/领奖/活力点兑换
    9010200008: 'common.joinCorrectTime', // 抽奖/领奖/活力点兑换
    9010400001: 'common.noPrizes',
    9010410001: 'common.noPartChance', // 抽奖/领奖/活力点兑换
    9010410002: 'common.noPartChance', // 抽奖/领奖/活力点兑换
    9010410003: 'common.noPartChance', // 抽奖/领奖/活力点兑换
    9010410004: 'common.noPartChance', // 抽奖/领奖/活力点兑换
    9010410028: 'common.usedLotteryTimes',
  },
  vote: {
    9010130008: 'common.voted', // 投票接口
    9010200004: 'common.todayVoteMax', // 投票接口
    9010200003: 'common.voteMax', // 投票接口
  },
  boost: {
    9010400008: 'common.cannotHelpself', // 投票助力接口
    9010400009: 'common.helpMaxTimes', // 投票助力接口
  }
};

const retCodeHandle = (retcode, interfaceType, alertOptions, selfTips, selfType) => {
  let flag, tipOfToastOrAlert, isToast;
  tipOfToastOrAlert = TIPS[interfaceType] && TIPS[interfaceType][retcode];
  if(!tipOfToastOrAlert) return;
  tipOfToastOrAlert = t(tipOfToastOrAlert);
  flag = tipOfToastOrAlert ? true : false;
  isToast = interfaceType === 'global' || interfaceType === 'pps';

  if (!flag) return;

  let showTip = selfTips ? selfTips : tipOfToastOrAlert;
  let pageDirectionClass = device.getPageDirection();
  const defaultOptions = {
    className: `commonDialog ${pageDirectionClass}`,
    title: t('common.reminder'),
    buttons: {
      rightTop: {
        type: 'close'
      }
    }
  };
  let options = alertOptions ? alertOptions : defaultOptions;

  const useToast = () => {
    Toast(showTip, {className: 'comment-toast'});
  };
  const useAlert = () => {
    Alert(showTip, options);
  };
  if (selfType) {
    if (selfType === 'toast') {
      useToast();
    } else {
      useAlert();
    }
  } else {
    if (isToast) {
      useToast();
    } else {
      useAlert();
    }
  }
};
export default retCodeHandle;