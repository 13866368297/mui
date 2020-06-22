import { fetchAsync } from './http-client';
import { musicUserSignStatUrl, musicSignUrl, musicUserTaskStatUrl } from './urls';

const statUserSign = (taskId) => {
  return fetchAsync(musicUserSignStatUrl, 'post', {
    taskId: taskId
  }).then(data => {
    return data && data.userSignList;
  });
};

const signTask = (taskId) => {
  return fetchAsync(musicSignUrl, 'post', {
    taskId: taskId
  }).then(data => !data.failed);
};

const statUserTask = (taskId) => {
  return fetchAsync(musicUserTaskStatUrl, 'post', {
    taskIds: [taskId]
  }).then(data => {
    return (data && data.userTaskList && data.userTaskList[0] && data.userTaskList[0].eventInfos) || [];
  });
};


export {
  statUserSign,
  signTask,
  statUserTask
};
