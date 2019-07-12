import {classicBeh} from "../classic-beh"

const mMgr = wx.getBackgroundAudioManager()

Component({
    /**
     * 组件的属性列表
     */
    behaviors:[classicBeh],
    properties: {
        src:String
    },

    /**
     * 组件的初始数据
     * 播放音乐API 老版 新版
     */
    data: {
        playing:false,
        pauseSrc:'images/player@pause.png',
        playSrc:'images/player@play.png',
    },

    attached:function(){
        this._recoverStatus()
        this._moniterSwitch()
    },

    detached:function(event){
        // mMgr.stop()
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onPlay:function (event) {
            //图片切换
            if(!this.data.playing){
                this.setData({
                    playing:true
                })
                // console.log(this.properties.src)
                mMgr.src = this.properties.src
                mMgr.title = '666'
                mMgr.play()
            }
            else {
                this.setData({
                    playing:false
                })
                mMgr.pause()
            }
        },

        _recoverStatus:function () {
            if (mMgr.paused){
                this.setData({
                    playing:false
                })
                return
            }
            if (mMgr.src == this.properties.src){
                this.setData({
                    playing:true
                })
            }
        },

        _moniterSwitch:function () {
            mMgr.onPlay(()=>{
                this._recoverStatus()
            })
            mMgr.onPause(()=>{
                this._recoverStatus()
            })
            mMgr.onStop(()=>{
                this._recoverStatus()
            })
            mMgr.onEnded(()=>{
                this._recoverStatus()
            })
        }
    }

})
