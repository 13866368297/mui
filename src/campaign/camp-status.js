import { getCurrentSystemTime, CampaignManager } from './campaign-manager';

const CampStatusType = {
  OverThreeDays: 'OverThreeDays',
  Over: 'Over',
  NotStart: 'NotStart',
  InProgress: 'InProgress'
};

const THREE_DAYS = 3 * 24 * 60 * 60 * 1000;

const _getCampStatus = (currentTime) => {
  let campStatus;

  if (!currentTime) {
    campStatus = undefined;
  } else if (currentTime < CampaignManager.startTime) {
    campStatus = CampStatusType.NotStart;
  } else if (currentTime > CampaignManager.endTime + THREE_DAYS) {
    campStatus = CampStatusType.OverThreeDays;
  } else if (currentTime > CampaignManager.endTime) {
    campStatus = CampStatusType.Over;
  } else if (currentTime >= CampaignManager.startTime && currentTime <= CampaignManager.endTime) {
    campStatus = CampStatusType.InProgress;
  } else {
    // Default to over three days when start/end time exist error
    campStatus = CampStatusType.OverThreeDays;
  }

  return {
    campStatus,
    currentTime
  };
};

const getCampStatus = () => {
  const TWO_MINIUES = 2 * 60 * 1000;

  const {campStatus, currentTime} = _getCampStatus(CampaignManager.currentTime);

  let notStartInterval = TWO_MINIUES;
  let inProgressInterval = TWO_MINIUES;
  let overInterval = TWO_MINIUES;
  if (campStatus === CampStatusType.NotStart) {
    notStartInterval = CampaignManager.startTime - currentTime;
  } else if (campStatus === CampStatusType.InProgress) {
    notStartInterval = currentTime - CampaignManager.startTime;
    inProgressInterval = CampaignManager.endTime - currentTime;
  } else if (campStatus === CampStatusType.Over) {
    inProgressInterval = currentTime - CampaignManager.endTime;
    overInterval = CampaignManager.endTime + THREE_DAYS - currentTime;
  }

  // Do not get time from server in the last 2 mins
  if (campStatus === CampStatusType.OverThreeDays ||
    notStartInterval < TWO_MINIUES ||
    inProgressInterval < TWO_MINIUES ||
    overInterval < TWO_MINIUES) {
    return Promise.resolve({
      campStatus,
      currentTime
    });
  }

  return getCurrentSystemTime().then((data) => {
    console.log(data.time);
    return _getCampStatus(data.time);
  });
};

export {
  CampStatusType,
  getCampStatus
};
