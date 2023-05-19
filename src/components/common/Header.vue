<template>
  <div class="header">
    <div class="header-left">
      <div class="header-user-con">
          <el-tooltip effect="dark" content="图表组件" placement="bottom">
            <i class="el-icon-menu" style="cursor: pointer;" @click="Change_size"></i>
          </el-tooltip>
      </div>
    </div>
    <div class="header-left">
      <div class="header-user-con">
          <el-tooltip effect="dark" content="详情设置" placement="bottom">
            <i class="el-icon-setting" style="cursor: pointer;" @click="Change_Setting_size"></i>
          </el-tooltip>
      </div>
    </div>
    <div class="header-left">
      <div class="header-user-con">
          <el-tooltip effect="dark" content="数据配置" placement="bottom">
            <i class="el-icon-s-data" style="cursor: pointer;" @click="Change_Setting_size"></i>
          </el-tooltip>
      </div>
    </div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 全屏显示 -->
        <div class="btn-fullscreen" @click="handleFullScreen">
          <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import bus from '../common/bus';
export default {
  data () {
    return {
      collapse: false,
      SettingCollapse:false,
      fullscreen: false,
      name: 'linxin',
      message: 2
    };
  },
  computed: {
    username () {
      let username = localStorage.getItem('ms_username');
      return username ? username : this.name;
    }
  },
  // create:{
  //   bus.$on('collapse-content', msg => {
  //     this.collapse = msg;
  //   });
  // },
  methods: {
    // 用户名下拉菜单选择事件
    Change_Setting_size(){
      this.SettingCollapse=!this.SettingCollapse
      bus.$emit('collapse_Setting', this.SettingCollapse);
    },
    Change_size(){
      this.collapse=!this.collapse
      bus.$emit('collapse', this.collapse);
    },
    handleCommand (command) {
      if (command == 'loginout') {
        localStorage.removeItem('ms_username');
        this.$router.push('/login');
      }
    },
    // 侧边栏折叠
    collapseChage () {
      this.collapse = !this.collapse;
      bus.$emit('collapse', this.collapse);
    },
    // 全屏事件
    handleFullScreen () {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    }
  },
  mounted () {
    if (document.body.clientWidth < 1500) {
      this.collapseChage();
    }
  }
};
</script>
<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  font-size: 22px;
  color: #fff;
  /* 颜色 */
  background-color: #272727;
}

.el-icon-s-data:hover {
  color: #ADFEDC;
}

.el-icon-setting:hover {
  color: #ADFEDC;
}


.header-right {
  float: right;
  margin-right: 50px;
  margin-top: 15px;
}

.header-left {
  float: left;
  margin-left: 60px;
  margin-top: 15px;
}

.header-user-con {
  display: flex;
  align-items: center;
}

.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}

.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}

.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}

.btn-bell .el-icon-bell {
  color: #fff;
}

.user-name {
  margin-left: 10px;
}

.user-avator {
  margin-left: 20px;
}

.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}

.el-dropdown-menu__item {
  text-align: center;
}
</style>
