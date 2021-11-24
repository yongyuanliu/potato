class OXLVideoVolume{
  constructor(oxlVideoContainer, video){
    this.oxlVideoVolumeUp = oxlVideoContainer.querySelector('.oxl-video-volume-up');
    this.oxlVideoVolumeDown = oxlVideoContainer.querySelector('.oxl-video-volume-down');
    this.oxlVideoVolumeMute = oxlVideoContainer.querySelector('.oxl-video-volume-mute');
    this.video = video;

    this.downBtnEvent(this.oxlVideoVolumeDown, video);
    this.upBtnEvent(this.oxlVideoVolumeUp, video);
    this.muteBtnEvent(this.oxlVideoVolumeMute, video);
  }

  /**
   * 音量 -
   */
  downBtnEvent(oxlVideoVolumeDown, video = this.video){
    if(oxlVideoVolumeDown){
      oxlVideoVolumeDown.onclick = (event, volume = video.volume) => {
        if(volume >= 0.1){
          video.volume = parseFloat(Number(volume - 0.1).toFixed(1));
        }	
      }
    }
  }

  /**
   * 音量 +
   */
  upBtnEvent(oxlVideoVolumeUp, video = this.video){
    if(oxlVideoVolumeUp){
      oxlVideoVolumeUp.onclick = (event, volume = video.volume) => {
        if(volume < 1){
          video.volume = parseFloat(Number(volume + 0.1).toFixed(1));
        }
      }
    }
  }

  /**
   * 静音按钮
   */
  muteBtnEvent(oxlVideoVolumeMute, video = this.video){
    if(oxlVideoVolumeMute){
      oxlVideoVolumeMute.onclick = (event) => {
        //toggle class
        oxlVideoVolumeMute.classList.toggle('active');
        //根据 toggle class 来设置是否静音
        video.muted = oxlVideoVolumeMute.classList.contains('active');
      }
    }
  }
}

class OXLVideoProgress{
  constructor(oxlVideoContainer, video){
    this.oxlVideoContainer = oxlVideoContainer;
    this.video = video;
    this.oxlVideoProgress = this.oxlVideoContainer.querySelector('.oxl-video-progress');
    this.oxlVideoProgressBar = this.oxlVideoContainer.querySelector('.oxl-video-progress-bar');
    this.oxlVideoProgressPoint = this.oxlVideoContainer.querySelector('.oxl-video-progress-point');
    this.progressEvent();
  }
  /**
   * 进度控制
   */
  progressEvent(oxlVideoProgress = this.oxlVideoProgress, video = this.video){
    if(oxlVideoProgress){
      this.oxlVideoProgress.onclick = (event) => {
        //计算偏移量
        let position =  (event.pageX  - event.target.offsetLeft) / event.target.offsetWidth;
        let newCurrentTime = Math.floor(position * video.duration);
        //设置偏移量
        video.currentTime = newCurrentTime;
      }
    }
  }
  /**
   * 更新视频进度
   */
  progressChange(oxlVideoProgressBar = this.oxlVideoProgressBar, oxlVideoProgressPoint = this.oxlVideoProgressPoint, currentTime = this.video.currentTime, duration = this.video.duration){
    if(!(oxlVideoProgressBar)){
      return;
    }
    let width = Math.floor((currentTime / duration) * 100);
    oxlVideoProgressBar.style.width = `${width}%`;
    oxlVideoProgressPoint.style.left = `${width}%`;
    if(width >= 97){
      oxlVideoProgressPoint.classList.add('oxl-video-progress-point__end');
    }else{
      oxlVideoProgressPoint.classList.remove('oxl-video-progress-point__end');
    }
  }
}

class OXLVideoPlay{
  constructor(oxlVideoContainer, video, playEventCallback){
    this.oxlVideoContainer = oxlVideoContainer;
    this.video = video;
    this.oxlVideoPlay = this.oxlVideoContainer.querySelector('.oxl-video-play');
    this.playEventCallback = playEventCallback;
    this.playEvent();
  }
  /**
   * 播放事件
   */
  playEvent(oxlVideoPlay = this.oxlVideoPlay || null, callback = this.playEventCallback){
    if(oxlVideoPlay){
      //视频播放控制
      oxlVideoPlay.onclick = (event) => {
        this.play();
        //切换后触发回调
        if(callback){
          callback();
        }
      }
    }
  }

  play(){
    //视频播放 || 暂停
    this.playOrPause();
    //动态视频的播放/暂停切换
    this.togglePlayBtn();
  }

  /**
   * 切换视频播放/暂停状态
   */
   playOrPause(){
    if(this.video.paused){
      this.video.play(); //播放
    }else{
      this.video.pause(); //暂停播放
    }
  }
  /**
   * 更新视频播放按钮
   */
  togglePlayBtn(){
    this.toggleSkipend();
    this.togglePause();
  }

  /**
   *  启用/关闭 暂停按钮
   */
  togglePause(pause = this.oxlVideoPlay){
      pause.classList.toggle('oxl-video-pause');
    }

  /** 
   * 启用/关闭 播放按钮
   */
  toggleSkipend(skip = this.oxlVideoPlay){
    skip.classList.toggle('oxl-video-skip-end');
  }
}

class OXLVideoDuration{
  constructor(oxlVideoContainer, video){
    this.oxlVideoContainer = oxlVideoContainer;
    this.video = video;
    this.oxlVideoDuration = this.oxlVideoContainer.querySelector('.oxl-video-duration');
  }
  /**
   * 更新界面视频信息
   */
  setOxlVideoDuration(oxlVideoDuration = this.oxlVideoDuration, currentTime = this.video.currentTime, duration = this.video.duration){
    oxlVideoDuration.textContent = `${this.explainDuration(currentTime)} / ${this.explainDuration(duration)}`;
  }
  /**
   * 解析视频时长
   */
  explainDuration(second = 0){
    if(isNaN(second) || second === 0){
        return '0:00';
      }
      //相比起手动计算，使用日期 api 更加面向对象
      let temp = new Date(Date.parse(`2021-06-17 00:00:00`));
      temp.setSeconds(second);//设置的秒数会影响 秒数，分钟数，小时数，天数
      const [hours, minutes, seconds] = [temp.getHours(), temp.getMinutes(), this.padSecond(temp.getSeconds())];
      if(hours != 0){
        return `${hours}:${minutes}:${seconds}`;
      }
      return `${minutes}:${seconds}`;
  }
  /**
   * 对小于2位数的秒进行补 0 
   */
  padSecond(second){
    return new String(second).padStart(2, '0');
  }
}

class OXLVideoControls{
  constructor(oxlVideoContainer, video){
    this.oxlVideoContainer = oxlVideoContainer;
    this.video = video;
    this.oxlVideoControls = this.oxlVideoContainer.querySelector('.oxl-video-controls');
    this.controlEvent();
  }
  controlEvent(){
    this.oxlVideoControls.onclick = (event) => {
      //阻止冒泡，保留控制权利
      event.stopPropagation();
      //阻止默认事件
      event.preventDefault();
    }
  }
  toggleControls(oxlVideoControls = this.oxlVideoControls, paused = this.video.paused){
    if(paused){
      oxlVideoControls.classList.remove('hide');
    }else{
      oxlVideoControls.classList.add('hide');
    }
  }
}

class OXLVideo{
  constructor(oxlVideoContainer){
    this.oxlVideoContainer = oxlVideoContainer;
    this.initDOM();
    this.initDOMEvent();
  }
  //加载相关 DOM
  initDOM(){
    this.video = this.oxlVideoContainer.querySelector('.oxl-video');
    //控制面板
    this.videoControls = new OXLVideoControls(this.oxlVideoContainer, this.video);
    //duration init
    this.videoDuration = new OXLVideoDuration(this.oxlVideoContainer, this.video);
    //play btn
    this.videoPlay = new OXLVideoPlay(this.oxlVideoContainer, this.video, () => {
      //切换控制台
      this.videoControls.toggleControls();
    });
    //video volume
    this.volume = new OXLVideoVolume(this.oxlVideoContainer, this.video);
    //progress
    this.progress = new OXLVideoProgress(this.oxlVideoContainer, this.video);
  }
  //加载 DOM 相关的事件
  initDOMEvent(){
    this.video.onloadeddata = () => {
      this.updateBase();
    }
    this.video.onloadedmetadata = () => {
      this.updateBase();
    }
    //视频播放完毕
    this.video.onended = () => {
      //切换播放按钮
      this.videoPlay.togglePlayBtn();
      //切换
      this.videoControls.toggleControls();
    }

    //视频加载完毕，duration 变更时更新界面对视频播放信息
    this.video.ondurationchange = () => {
      this.updateBase();
    }

    //每当进度变化时更新界面对视频播放信息
    this.video.ontimeupdate = () => {
      this.updateBase();
    }

    //每当点击视频时，暂停||播放
    this.oxlVideoContainer.onclick = () => {
      this.videoPlay.play();
      //切换
      this.videoControls.toggleControls();
    }
  }

  updateBase(){
    //更新播放信息
    this.videoDuration.setOxlVideoDuration();
    //更新进度条
    this.progress.progressChange();
  }
}

export default OXLVideo;