<template>
  <div style="border: 1px transparent solid">
    <el-row>
      <el-col :span="Chart_size" style="height:84vh;">
        <!-- <el-card style="background-color:black;">
          <el-scrollbar style="height:100vh" ref="card">
            <el-card :key="item.i" v-for="(item, index) in ResourceData" shadow="hover"
              style="background-color:#3C3C3C;margin-bottom: 5px;">
              <img :src=item.src class="image" draggable @dragstart="dragStart($event, index)" @dragend="dragEnd" />
            </el-card>
          </el-scrollbar>
        </el-card> -->
        <div style="height:27vh;" class="Boxborder">
          Data Model
          <div style="height:3px;background-color:#0072E3;margin-top: 3px;"></div>

          <el-card style="background-color:white;">
            <el-scrollbar style="height:20vh" ref="card">
              <el-tree ref="selectTree" :data="data" show-checkbox node-key="id" :check-strictly="true"
                :default-checked-keys="[]" :props="defaultProps" highlight-current :check-on-click-node="true"
                @check="nodeCheck">
                <template slot-scope="{ node }">
                  <span :title="node.label">
                    <span>{{ node.label }}</span>
                    <span v-if="node.checked" style="margin-left: 10px;" class="el-icon-check"></span>
                  </span>
                </template>
              </el-tree>
              <div style="display: flex;flex-direction: row;justify-content:center">
                <el-button type="primary" @click="dataChange">选择数据</el-button>
              </div>
            </el-scrollbar>
          </el-card>
        </div>
        <div style="height:71vh;" class="Boxborder">
          Data Description
          <div style="height:3px;background-color:#0072E3;margin-top: 3px;"></div>
          <div style="position:relative;height:30px;width:100%;margin-top: 5px;">
            <el-button type="success" plain size="mini" style="position:absolute;right:2px">连接</el-button>
            <el-button type="success" plain size="mini" style="position:absolute;right:72px"
              @click="combination">组合</el-button>
            <el-button type="success" plain size="mini" style="position:absolute;right:142px"
              @click="Stacking_DataDescription">堆叠</el-button>
            <el-button type="success" plain size="mini" style="position:absolute;right:212px">选择</el-button>
            <el-button type="success" plain size="mini" style="position:absolute;right:282px"
              @click="Draw_component">绘图</el-button>
          </div>
          <!-- Data_nums[0] -->
          <el-row :gutter="2">
            <el-col :span="8">
              <div :class="{ 'col_setting': Data_col[0].isClick }" @click="Data_col0_process">
                <div id="Data_col0">
                  <div
                    style="height:274px;width:100%;background-color:#D2E9FF;margin-top: 5px;position: relative;display: flex;flex-direction: column;justify-content: center;">

                    <div
                      style="height:40px;width:108px;margin:0 auto 0 auto;background-color:white;border:1px solid #84C1FF;display:flex;flex-direction:column;justify-content: center;">
                      <div v-for="i in 4" style="display:flex;flex-direction:row;justify-content: center;">
                        <div v-for="i in 9"
                          style="height:7px;width:9px;background-color:white;border:1px solid #84C1FF;">
                        </div>
                      </div>
                    </div>
                    <div
                      style="height:40px;width:108px;margin:0 auto 0 auto;background-color:white;border:1px solid #84C1FF;display:flex;flex-direction:column;justify-content: center;">
                      <div v-for="i in 3" style="display:flex;flex-direction:row;justify-content: center;">
                        <div v-for="i in 9"
                          style="height:7px;width:9px;background-color:white;border:1px solid #84C1FF;">
                        </div>
                      </div>
                    </div>
                    <div
                      style="height:40px;width:108px;margin:0 auto 0 auto;background-color:white;border:1px solid #84C1FF;display:flex;flex-direction:column;justify-content: center;">
                      <div v-for="i in 2" style="display:flex;flex-direction:row;justify-content: center;">
                        <div v-for="i in 9"
                          style="height:7px;width:9px;background-color:white;border:1px solid #84C1FF;">
                        </div>
                      </div>
                    </div>
                    <div
                      style="height:40px;width:108px;margin:0 auto 0 auto;background-color:white;border:1px solid #84C1FF;display:flex;flex-direction:column;justify-content: center;">
                      <div v-for="i in 4" style="display:flex;flex-direction:row;justify-content: center;">
                        <div v-for="i in 9"
                          style="height:7px;width:9px;background-color:white;border:1px solid #84C1FF;">
                        </div>
                      </div>
                    </div>
                    <div
                      style="height:40px;width:108px;margin:0 auto 0 auto;background-color:white;border:1px solid #84C1FF;display:flex;flex-direction:column;justify-content: center;">
                      <div v-for="i in 1" style="display:flex;flex-direction:row;justify-content: center;">
                        <div v-for="i in 9"
                          style="height:7px;width:9px;background-color:white;border:1px solid #84C1FF;">
                        </div>
                      </div>
                    </div>
                    <div
                      style="height:40px;width:108px;margin:0 auto 0 auto;background-color:white;border:1px solid #84C1FF;display:flex;flex-direction:column;justify-content: center;">
                      <div v-for="i in 4" style="display:flex;flex-direction:row;justify-content: center;">
                        <div v-for="i in 9"
                          style="height:7px;width:9px;background-color:white;border:1px solid #84C1FF;">
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
                <!-- <div v-show="isDescriptions_Col[0]">
                  <div v-show="isDataSymbolShow">
                    <div class="triangle" style="margin:auto;margin-top:5px"></div>
                    <div
                      style="height:90px;width:100%;background-color:#D2E9FF;margin-top: 5px;position: relative;display: flex;flex-direction: column;justify-content: center;">
                      <div v-for="i in 4" style="display:flex;flex-direction:row;justify-content: center;">
                        <div v-for="i in DataStep">
                        </div>
                        <div v-for="i in 9 - DataStep"
                          style="height:10px;width:10px;background-color:white;border:1px solid #84C1FF;">
                        </div>
                      </div>
                    </div>
                    <div class="triangle" style="margin:auto;margin-top:5px"></div>
                    <div
                      style="height:40px;width:100%;background-color:#D2E9FF;margin-top: 5px;position: relative;display: flex;flex-direction: column;justify-content: center;">
                      <div style="margin-left:2px;margin-top: 1px;font-size: 15px;">A</div>
                      <div style="margin-left:2px;margin-top: 1px;font-size: 15px;">B</div>
                      <div style="margin-left:2px;margin-top: 1px;font-size: 15px;">C</div>
                      <div style="margin-left:2px;margin-top: 1px;font-size: 15px;">D</div>
                    </div>
                  </div>
                  <div v-show="!isDataSymbolShow">
                    <div class="triangle" style="margin:auto;margin-top:5px"></div>
                    <div
                      style="height:90px;width:100%;background-color:#D2E9FF;margin-top: 5px;position: relative;display: flex;flex-direction: column;justify-content: center;">
                      <div v-for="i in Data_nums" style="display:flex;flex-direction:row;justify-content: center;">
                        <div v-for="i in 9">
                        </div>
                      </div>
                    </div>
                  </div>
                </div> -->
              </div>
              <!-- <div style="height:40px;width:100%;background-color:#F0F0F0;margin-top: 5px;position: relative;">
                <div style="position: absolute;height:30px;width:30px;background-color:white;border:1px solid #84C1FF;margin: auto;top: 0;
            left: 0;
            right: 0;
            bottom: 0;">
                </div>
              </div>
              <div class="triangle" style="margin:auto;margin-top:5px"></div>
              <div
                style="height:40px;width:100%;background-color:#D2E9FF;margin-top: 5px;;display: flex;flex-direction: row;justify-content: center;">
                <div v-for="i in 4"
                  style="height:20px;width:20px;background-color:white;border:1px solid #84C1FF;margin-left:6px;margin-right: 6px;margin-top: 7px">
                </div>
              </div>
              <div class="triangle" style="margin:auto;margin-top:5px"></div>
              <div
                style="height:40px;width:100%;background-color:#D2E9FF;margin-top: 5px;;display: flex;flex-direction: row;justify-content: center;">
                <div
                  style="height:30px;width:30px;background-color:white;border:1px solid #84C1FF;margin-left:6px;margin-right: 6px;margin-top: 4px">
                </div>
                <div style="margin-left:2px;margin-top: 12px;font-size: 15px;">xStep</div>
              </div>-->


            </el-col>
            <el-col :span="8">
              <div :class="{ 'col1_setting': Data_col[1].isClick }" @click="Data_col1_process">
                <!-- <div style="height:274px;background-color:#D2E9FF;">
                  <Symbol_comp :height="274 + 'px'"></Symbol_comp>
                </div> -->

                <div id="Data_col1">
                  <div
                    style="height:274px;width:100%;background-color:#D2E9FF;margin-top: 5px;position: relative;display: flex;justify-content: center;">
                    <div
                      style="position:absolute;border-radius: 50px;height:50px;width:50px;top:112px;background-color:white;border:1px solid #84C1FF;">
                    </div>
                    <div
                      style="position:absolute;top:40px;left:16px;height:77px;width:2px;background-color:#409EFF;border:1px solid #84C1FF;transform:skew(35deg)">
                    </div>
                  </div>
                </div>
                <!-- <div v-show="isDescriptions_Col[1]">
                  <div class="triangle" style="margin:auto;margin-top:5px"></div>
                  <div
                    style="height:90px;width:100%;background-color:#D2E9FF;margin-top: 5px;position: relative;display: flex;flex-direction: column;justify-content: center;">
                    <div v-for="i in Data_nums[1]" style="display:flex;flex-direction:row;justify-content: center;">
                      <div v-for="i in 9"
                        style="height:10px;width:10px;background-color:white;border:1px solid #84C1FF;">
                      </div>
                    </div>
                  </div>
                </div> -->
              </div>
              <!-- <div style="height:40px;width:100%;background-color:#F0F0F0;margin-top: 5px;position: relative;">
                <div style="position: absolute;height:30px;width:30px;background-color:white;border:1px solid #84C1FF;margin: auto;top: 0;
            left: 0;
            right: 0;
            bottom: 0;">
                </div>
              </div>
              <div class="triangle" style="margin:auto;margin-top:5px"></div>
              <div
                style="height:40px;width:100%;background-color:#D2E9FF;margin-top: 5px;display: flex;flex-direction: row;justify-content: center;">
                <div class="circle"
                  style="background-color:white;border:1px solid #84C1FF;margin-left:6px;margin-right: 6px;margin-top: 7px">
                </div>
                <div style="margin-left:2px;margin-top: 12px;font-size: 15px;">x100</div>
              </div>
              <div class="triangle" style="margin:auto;margin-top:5px"></div>
              <div
                style="height:40px;width:100%;background-color:#D2E9FF;margin-top: 5px;;display: flex;flex-direction: row;justify-content: center;">
                <div class="circle"
                  style="background-color:white;border:1px solid #84C1FF;margin-left:6px;margin-right: 6px;margin-top: 7px">
                </div>
                <div style="margin-left:2px;margin-top: 12px;font-size: 15px;">xStep</div>
              </div>-->


            </el-col>
            <el-col :span="8">
              <div :class="{ 'col2_setting': Data_col[2].isClick }" @click="Data_col2_process">
                <div id="Data_col2">
                  <div
                    style="height:274px;width:100%;background-color:#D2E9FF;margin-top: 5px;position: relative;display: flex;flex-direction: column;justify-content: center;">

                    <div
                      style="height:40px;width:108px;margin:0 auto 0 auto;background-color:white;border:1px solid #84C1FF;display:flex;flex-direction:column;justify-content: center;">
                      <div v-for="i in 4" style="display:flex;flex-direction:row;justify-content: center;">
                        <div v-for="i in 9"
                          style="border-radius: 15px;height:7px;width:7px;background-color:white;border:1px solid #84C1FF;">
                        </div>
                      </div>
                    </div>
                    <div
                      style="height:40px;width:108px;margin:0 auto 0 auto;background-color:white;border:1px solid #84C1FF;display:flex;flex-direction:column;justify-content: center;">
                      <div v-for="i in 3" style="display:flex;flex-direction:row;justify-content: center;">
                        <div v-for="i in 9"
                          style="border-radius: 15px;height:7px;width:7px;background-color:white;border:1px solid #84C1FF;">
                        </div>
                      </div>
                    </div>
                    <div
                      style="height:40px;width:108px;margin:0 auto 0 auto;background-color:white;border:1px solid #84C1FF;display:flex;flex-direction:column;justify-content: center;">
                      <div v-for="i in 2" style="display:flex;flex-direction:row;justify-content: center;">
                        <div v-for="i in 9"
                          style="border-radius: 15px;height:7px;width:7px;background-color:white;border:1px solid #84C1FF;">
                        </div>
                      </div>
                    </div>
                    <div
                      style="height:40px;width:108px;margin:0 auto 0 auto;background-color:white;border:1px solid #84C1FF;display:flex;flex-direction:column;justify-content: center;">
                      <div v-for="i in 4" style="display:flex;flex-direction:row;justify-content: center;">
                        <div v-for="i in 9"
                          style="border-radius: 15px;height:7px;width:7px;background-color:white;border:1px solid #84C1FF;">
                        </div>
                      </div>
                    </div>
                    <div
                      style="height:40px;width:108px;margin:0 auto 0 auto;background-color:white;border:1px solid #84C1FF;display:flex;flex-direction:column;justify-content: center;">
                      <div v-for="i in 1" style="display:flex;flex-direction:row;justify-content: center;">
                        <div v-for="i in 9"
                          style="border-radius: 15px;height:7px;width:7px;background-color:white;border:1px solid #84C1FF;">
                        </div>
                      </div>
                    </div>
                    <div
                      style="height:40px;width:108px;margin:0 auto 0 auto;background-color:white;border:1px solid #84C1FF;display:flex;flex-direction:column;justify-content: center;">
                      <div v-for="i in 4" style="display:flex;flex-direction:row;justify-content: center;">
                        <div v-for="i in 9"
                          style="border-radius: 15px;height:7px;width:7px;background-color:white;border:1px solid #84C1FF;">
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
                <!-- <div v-show="isDescriptions_Col[2]">
                  <div class="triangle" style="margin:auto;margin-top:5px"></div>
                  <div
                    style="height:90px;width:100%;background-color:#D2E9FF;margin-top: 5px;position: relative;display: flex;flex-direction: column;justify-content: center;">
                    <div v-for="i in Data_nums[2]" style="display:flex;flex-direction:row;justify-content: center;">
                      <div v-for="i in 9"
                        style="height:10px;width:10px;background-color:white;border:1px solid #84C1FF;">
                      </div>
                    </div>
                  </div>
                </div> -->
              </div>
              <!-- <div style="height:40px;width:100%;background-color:#F0F0F0;margin-top: 5px;position: relative;">
                <div style="position: absolute;height:30px;width:30px;background-color:white;border:1px solid #84C1FF;margin: auto;top: 0;
            left: 0;
            right: 0;
            bottom: 0;">
                </div>
              </div>
              <div class="triangle" style="margin:auto;margin-top:5px"></div>
              <div
                style="height:40px;width:100%;background-color:#D2E9FF;margin-top: 5px;;display: flex;flex-direction: row;justify-content: center;">
                <div v-for="i in 2"
                  style="height:20px;width:20px;background-color:white;border:1px solid #84C1FF;margin-left:6px;margin-right: 6px;margin-top: 7px">
                </div>
              </div>
              <div class="triangle" style="margin:auto;margin-top:5px"></div>
              <div
                style="height:40px;width:100%;background-color:#D2E9FF;margin-top: 5px;;display: flex;flex-direction: row;justify-content: center;">
                <div
                  style="height:30px;width:30px;background-color:white;border:1px solid #84C1FF;margin-left:6px;margin-right: 6px;margin-top: 4px">
                </div>
                <div style="margin-left:2px;margin-top: 12px;font-size: 15px;">xStep</div>
              </div>-->
              <!-- ↓→ -->
            </el-col>
          </el-row>
          <div id="combination"></div>
          <!-- <div
            style="height:173px;width:100%;background-color:#D2E9FF;margin-top: 5px;position: relative;display: flex;flex-direction: row;justify-content: center;">
            <div style="display:flex;flex-direction:column;justify-content: center">
              <div style='margin-left:0px;margin-top: 6px;font-size:13px;color:#409EFF' bold>BCAB</div>
              <div style='margin-left:0px;margin-top: 6px;font-size:13px;color:#409EFF' bold>ABCB</div>
              <div style='margin-left:0px;margin-top: 6px;font-size:13px;color:#409EFF' bold>BABC</div>
              <div style='margin-left:0px;margin-top: 6px;font-size:13px;color:#409EFF' bold>BBCA</div>
              <div style='margin-left:0px;margin-top: 6px;font-size:13px;color:#409EFF' bold>BABC</div>
              <div style='margin-left:0px;margin-top: 6px;font-size:13px;color:#409EFF' bold>BCBA</div>
            </div>
            <div style="display:flex;flex-direction:column;justify-content: center">
              <div style='position: absolute;top:2px;right:180px;font-size: 10px;' bold>→神经元</div>
              <div v-for="i in 6" style="display:flex;flex-direction:row;justify-content: center;">
                <div v-for="i in 9"
                  style="height:20px;width:20px;background-color:white;border:1px solid #84C1FF;display: flex;flex-direction: row;justify-content: center;color:#409EFF">
                  {{
  i- 1
                  }}
                </div>
              </div>
            </div>
            <div style="display:flex;flex-direction:column;justify-content: center">
              <div style='margin-left:0px;margin-top: 6px;font-size:13px;' bold>↓实值序列</div>
            </div>
          </div> -->
          <div v-show="Stacking_show"
            style="height:173px;width:100%;background-color:#D2E9FF;margin-top: 5px;position: relative;display: flex;flex-direction: column;justify-content: center;">
            <div :class="{ 'col_setting': Stack_col[0].isClick }">
              <div v-show="Data_col[0].isClick" v-for="i in Data_nums[0]"
                style="display:flex;flex-direction:row;justify-content: center;">
                <div v-for="i in 22" style="height:10px;width:10px;background-color:white;border:1px solid #84C1FF;"
                  @click="Stack_col0_process">
                </div>
              </div>
            </div>
            <div :class="{ 'col1_setting': Stack_col[1].isClick }">
              <div v-show="Data_col[1].isClick" v-for="i in Data_nums[1]"
                style="display:flex;flex-direction:row;justify-content: center;">
                <div v-for="i in 22" style="height:10px;width:10px;background-color:white;border:1px solid #67C23A;"
                  @click="Stack_col1_process">
                </div>
              </div>
            </div>
            <div :class="{ 'col2_setting': Stack_col[2].isClick }">
              <div v-show="Data_col[2].isClick" v-for="i in Data_nums[2]"
                style="display:flex;flex-direction:row;justify-content: center;">
                <div v-for="i in 22" style="height:10px;width:10px;background-color:white;border:1px solid #E6A23C;"
                  @click="Stack_col2_process">
                </div>
              </div>
            </div>
          </div>

        </div>
      </el-col>

      <el-col :span="Comp_size">
        <div style="height:27vh;" class="Boxborder">
          Data Process
          <div style="height:3px;background-color:#0072E3;margin-top: 3px;"></div>
          <div style="display:flex;flex-direction:row;">
            <!-- <el-card class="box-card" style="margin-top:5px;margin-left: 6px;">
              <div slot="header" class="clearfix" style="display:flex;flex-direction:row;justify-content: center;">
                <span>Filter</span>
              </div>
              <el-slider v-model="dataRange" range :max="10" :disabled=false>
              </el-slider>
            </el-card> -->
            <el-card class="box-card" style="margin-top:5px;margin-left: 6px;">
              <div slot="header" class="clearfix" style="display:flex;flex-direction:row;justify-content: center;">
                <span>Step</span>
              </div>
              <el-input-number v-model="DataStep" :min="1" :max="50" :disabled=isStepShow
                style="width:100px;height:100px;margin-left: 5px;"></el-input-number>
            </el-card>
            <el-card class="box-card" style="margin-top:5px;margin-left: 128px;">
              <div slot="header" class="clearfix" style="display:flex;flex-direction:row;justify-content: center;">
                <span>Average</span>
              </div>
              <el-switch v-model="Datavalue" active-text="否" inactive-text="是" active-color="#ff4949"
                inactive-color="#13ce66" style="margin-top:10px;margin-left:13px" :disabled=isAverageShow>
              </el-switch>
            </el-card>
            <el-card class="box-card" style="margin-top:5px;margin-left: 128px;">
              <div slot="header" class="clearfix" style="display:flex;flex-direction:row;justify-content: center;">
                <span>Normalization</span>
              </div>
              <el-switch v-model="DataNormalization" active-text="否" inactive-text="是" active-color="#ff4949"
                inactive-color="#13ce66" style="margin-top:10px;margin-left:13px" :disabled=isNormalizationShow>
              </el-switch>
            </el-card>

            <el-card class="box-card" style="margin-top:5px;margin-left: 128px;">
              <div slot="header" class="clearfix" style="display:flex;flex-direction:row;justify-content: center;">
                <span>符号化</span>
              </div>
              <!-- <el-button type="text" @click="DatadialogVisible = true" style="margin-left:32px">点击打开</el-button>
              <el-dialog title="function" :visible.sync="DatadialogVisible" width="30%">
                <span slot="footer" class="dialog-footer">
                  <el-button @click="DatadialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="DatadialogVisible = false">确 定</el-button>
                </span>
              </el-dialog> -->
              <el-switch v-model="DataSymbol" active-text="否" inactive-text="是" active-color="#ff4949"
                inactive-color="#13ce66" style="margin-top:10px;margin-left:13px" :disabled=isDataSymbolShow>
              </el-switch>
            </el-card>
          </div>
          <el-steps :active="active" finish-status="success" style="width:85%;margin:auto">
            <el-step></el-step>
            <el-step></el-step>
            <el-step></el-step>
            <el-step></el-step>
          </el-steps>
          <el-button size="mini" style="margin-top: 4px;margin-left: 425px;" @click="next">上一步</el-button>
          <el-button size="mini" style="margin-top: 4px;" @click="next">下一步</el-button>
        </div>
        <div style="height:71vh;" class="Boxborder">
          <div style="background-color: #9f9ca5;">View Template</div>
          <div style="height:3px;background-color:#0072E3;margin-top: 3px;"></div>
          <el-card class="boxx">
            <el-scrollbar style="height:71vh" ref="card">
              <!-- <MainBipartedGraph /> -->
              <div id="Drag" style="height:74vh;" @drop="drog" @dragover="dragOver">
                <div v-for="(item, index) in layoutData" :style="{ left: item.x, top: item.y }"
                  style="position:absolute" @click="handleclick(index)">
                  <vue-draggable-resizable :w="400" :h="180" :parent="false" :min-width="400" :min-height="180"
                    @resizing="Resizing">
                    <el-button @click="deleteItem(item.i)" icon="el-icon-delete" class="deleteButton" size="medium"
                      type="text"></el-button>
                    <component :is="item.Component" :height="180 + 'px'" :datasource="item.datasource"
                      :class="{ 'borderSetting': item.isClick }"></component>

                  </vue-draggable-resizable>
                </div>
              </div>
            </el-scrollbar>
          </el-card>
        </div>

      </el-col>
      <el-col :span="Setting_size">
        <div style="height:50vh;" class="Boxborder">
          View Construction
          <div style="height:3px;background-color:#0072E3;margin-top: 3px;"></div>
          <!-- <el-card style="background-color:black;">
            <el-scrollbar style="height:43vh" ref="card">
              <el-card :key="item.i" v-for="(item, index) in ResourceData" shadow="hover"
                style="background-color:#3C3C3C;margin-bottom: 5px;">
                <img :src=item.src class="image" draggable @dragstart="dragStart($event, index)" @dragend="dragEnd" />
              </el-card>
            </el-scrollbar>
          </el-card> -->
          <img style="width: 50px;height:50px;margin-left:10px;margin-top:5px" :src=ResourceData[0].src class="image"
            draggable @dragstart="dragStart($event, 0)" @dragend="dragEnd" />
          <img style="width: 50px;height:50px;margin-left:13px;margin-top:5px" :src=ResourceData[2].src class="image"
            draggable @dragstart="dragStart($event, 2)" @dragend="dragEnd" />
          <img style="width: 50px;height:50px;margin-left:13px;margin-top:7px" :src=ResourceData[3].src class="image"
            draggable @dragstart="dragStart($event, 3)" @dragend="dragEnd" />
          <img style="width: 50px;height:50px;margin-left:13px;margin-top:7px" :src=ResourceData[4].src class="image"
            draggable @dragstart="dragStart($event, 4)" @dragend="dragEnd" />
        </div>
        <div style="height:48vh;" class="Boxborder">
          Construction Process
          <div style="height:3px;background-color:#0072E3;margin-top: 3px;"></div>
        </div>
        <!-- <el-card style="background-color:#BEBEBE;">
            <el-scrollbar style="height:100vh" ref="card">
              <el-tree ref="selectTree" :data="data" show-checkbox node-key="id" :check-strictly="true"
                :default-checked-keys="[]" :props="defaultProps" highlight-current :check-on-click-node="true"
                @check="nodeCheck">
                <template slot-scope="{ node }">
                  <span :title="node.label">
                    <span>{{ node.label }}</span>
                    <span v-if="node.checked" style="margin-left: 10px;" class="el-icon-check"></span>
                  </span>
                </template>
              </el-tree>
              <div style="display: flex;flex-direction: row;justify-content:center">
                <el-button type="primary" @click="dataChange">配置数据</el-button>
              </div>
            </el-scrollbar>
          </el-card> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
//组件资源数据
import resourcesData from '../../../public/layout/resourceChart.json';
import VueGridLayout from 'vue-grid-layout';
import axios from 'axios';
const GridLayout = VueGridLayout.GridLayout;
const GridItem = VueGridLayout.GridItem;
import Time from '../chart/Time';
import Evaluate from '../chart/Evaluate';
// import LineChart from '../chart/LineChart'
import ComponentStructure from '../chart/ComponentStructure';
import Activity from '../chart/Activity';
import Cluster from '../chart/Cluster';
import ActValueCover from '../chart/ActValueCover';
import ModelStructure from '../chart/ModelStructure';
import MainSequence from '../chart/MainSequence';
import MainBipartedGraph from '../chart/MainBipartedGraph';
import MainModelStruct from '../chart/MainModelStruct';

import Bar from '../newchart/bar.vue';
import Bar_comp from '../chart/Bar_comp.vue';
import Pie from '../newchart/pie.vue';
import Pie_comp from '../chart/Pie_comp.vue';
import LineChart from '../newchart/linechart.vue';
import LineChart_comp from '../chart/LineChart_comp.vue';
import Graph from '../newchart/graph.vue';
import Graph_comp from '../chart/Graph_comp.vue';
import Radar from '../newchart/radar.vue';
import Radar_comp from '../chart/Radar_comp.vue';
import Symbol_comp from '../newchart/Symbol.vue';

import Vue from 'vue';
import SketchRule from 'vue-sketch-ruler';
import Draggable from 'vuedraggable'
import { red } from 'color-name';
export default {
  data () {
    return {
      isSymbol_show: null,
      test: ["height:10px;width:10px;background-color:red;border:1px solid #84C1FF;", "2"],
      colors: ["red", "black", "green", "white"],
      Data_nums: [0, 0, 0],
      Stacking_show: false,
      arr: [0, 1, 2, 3],
      Stack_col: [
        {
          isClick: false,
          data: null
        },
        {
          isClick: false,
          data: null
        },
        {
          isClick: false,
          data: null
        },
      ],
      Data_col: [{
        isClick: false,
        data: null
      },
      {
        isClick: false,
        data: null
      },
      {
        isClick: false,
        data: null
      },
      ],
      isDescriptions_Col: [0, 0, 0],
      input: '',
      isDataSymbolShow: true,
      isNormalizationShow: true,
      isAverageShow: true,
      isStepShow: false,
      DataSymbol: true,
      DataNormalization: false,
      Datavalue: false,
      process_data: {
        label: null,
        data: null
      },
      DatadialogVisible: false,
      DataStep: 1,
      dataRange: [4, 5],
      active: 0,
      isDescriptionshow_0: true,
      isDescriptionshow_1: true,
      isDescriptionshow_2: true,
      isDescriptionshow_3: true,
      // isDescriptionshow: [true, true, true, true],
      isRouterAlive: [true],
      dataIndex: [],
      changeIndex: 0,
      data: [
        {
          id: "father1",
          label: '原始输入数据',
          selectable: 'false',
          children: [
            //////时序数据
            {
              id: "father2",
              label: '时序数据',
              selectable: 'false',
              children: [
                {
                  id: 1,
                  label: '原始时序参数分布数据'
                },
                {
                  id: 2,
                  label: '时序训练数据'
                },
              ]
            },
            /////时序数据
            {
              id: "father3",
              label: '离散数据',
              selectable: 'false',
              children: [
                {
                  id: "father4",
                  label: '符号化数据',
                  selectable: 'false',
                  children: [
                    {
                      id: 3,
                      label: '符号化聚类数据'
                    }
                  ]
                }
              ]
            },
          ]
        },
        {
          id: "father5",
          label: '神经元激活数据',
          selectable: 'false',
          children: [
            {
              id: "father6",
              label: '门控信息',
              selectable: 'false',
              children: [
                {
                  id: 4,
                  label: '输入门信息'
                },
                {
                  id: 5,
                  label: '输出门信息'
                },
                {
                  id: 6,
                  label: '遗忘门信息'
                },
                {
                  id: 7,
                  label: '神经元状态信息'
                },
              ]
            },
            {
              id: "father7",
              label: '神经元激活值',
              selectable: 'false',
              children: [
                {
                  id: "father8",
                  label: '时序数据',
                  selectable: 'false',
                  children: [
                    {
                      id: 8,
                      label: '激活值特征分布数据'
                    },
                    {
                      id: 9,
                      label: '激活值平滑轨迹'
                    },
                  ]
                },
                {
                  id: "father9",
                  label: '离散数据',
                  selectable: 'false',
                  children: [
                    {
                      id: 10,
                      label: '激活值覆盖率'
                    },
                    {
                      id: 11,
                      label: '参数敏感性数据'
                    },
                    {
                      id: 12,
                      label: '激活值离散分布'
                    },
                    {
                      id: "father10",
                      label: '符号化激活值',
                      selectable: 'false',
                      children: [
                        {
                          id: 13,
                          label: '神经元聚类簇'
                        },
                        {
                          id: 14,
                          label: '符号单元激活细节值'
                        }
                      ]
                    },
                  ]
                }
              ]
            },
          ]
        },
        {
          id: "father11",
          label: '实际被控参数数据',
          selectable: 'false',
          children: [
            {
              id: 15,
              label: '时序数据'
            },
          ]
        },
        {
          id: "father12",
          label: '预测输出参数数据',
          selectable: 'false',
          children: [
            {
              id: "father13",
              label: '时序数据',
              selectable: 'false',
              children: [
                {
                  id: 16,
                  label: "Loss值"
                }
              ]
            },
            {
              id: "father14",
              label: '离散数据',
              selectable: 'false',
              children: [
                {
                  id: 17,
                  label: "多指标评估数据"
                }
              ]
            },
          ]
        },
        {
          id: "father15",
          label: '模型超参数及统计数据',
          selectable: 'false',
          children: [
            {
              id: "father16",
              label: '模型超参数数据',
              selectable: 'false',
              children: [
                {
                  id: "father17",
                  label: "静态参数数据",
                  selectable: 'false',
                  children: [
                    {
                      id: 18,
                      label: "模型构建数据"
                    },
                    {
                      id: 19,
                      label: "模型结构数据"
                    }
                  ]
                },
                {
                  id: "father18",
                  label: "动态态参数数据",
                  selectable: 'false',
                  children: [
                    {
                      id: 20,
                      label: "初始权重"
                    },
                    {
                      id: 21,
                      label: "初始激活值"
                    },
                    {
                      id: 22,
                      label: "初始偏置"
                    }
                  ]
                }
              ]
            },
            {
              id: "father19",
              label: '模型统计数据',
              selectable: 'false',
              children: [
                {
                  id: 23,
                  label: "模型分批次训练时间统计数据"
                },
                {
                  id: 24,
                  label: "模型收敛速度评估数据"
                },
              ]
            },
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
        id: 'value',
        disabled: 'selectable'
      },
      Index: 0,
      dragIndex: 0,
      Chart_size: 6,
      Comp_size: 14,
      Setting_size: 4,
      isCollapse: false,
      layoutData: [],
      ResourceData: [
        {
          i: 0,
          src: require('../image/linechart.jpg'),
          Compoent: "LineChart_comp"
        },
        {
          i: 1,
          src: require('../image/graph.jpg'),
          Compoent: "Graph_comp"
        },
        {
          i: 2,
          src: require('../image/radar.jpg'),
          Compoent: "Radar_comp"
        },
        {
          i: 3,
          src: require('../image/bar.jpg'),
          Compoent: "Bar_comp"
        },
        {
          i: 4,
          src: require('../image/pie.jpg'),
          Compoent: "Pie_comp"
        }
      ],
      colNum: 12, //行数
      // 布局二维数组地图
      layoutMap: [],
      // 布局列数
      layoutColNum: 12,
      rowHeight: 80, //行高
      maxRows: 12,
      height: 600,
      isDraggable: true,
      isResizable: true,
      isMirrored: false,
      verticalCompact: true,
      margin: [10, 10],
      useCssTransforms: true,
      numPanelConfigVisible: false,
      lineChartConfigVisible: false,
      currentCompId: '', //记录当前激活配置的组件id
      currentCompName: '', //记录当前激活配置的组件name
      currentCompType: '', //记录当前激活配置组件类型
      //   传感参数
    };
  },
  mounted () {
    var h = document.documentElement.clientHeight || document.body.clientHeight;
    // console.log(h);
    this.rowHeight = (h * 0.74 - 80) / 6;
    // 加载完成后显示提示
  },
  computed: {
    uploadStyle () {
      return {
        '--border-color': this.colors,
      }
    }
  },
  props: {
    collapse: Boolean,
    collapse_Setting: Boolean
  },
  watch: {
    collapse (newval) {
      this.Chart_size = newval ? 4 : 0;
      this.Comp_size = 24 - this.Chart_size - this.Setting_size;
    },
    collapse_Setting (newval) {
      this.Setting_size = newval ? 6 : 0;
      this.Comp_size = 24 - this.Chart_size - this.Setting_size;
    }
  },
  created () { },
  components: {
    GridLayout,
    GridItem,
    Time,
    Evaluate,
    // LineChart,
    ComponentStructure,
    Activity,
    Cluster,
    ActValueCover,
    ModelStructure,
    MainSequence,
    MainBipartedGraph,
    MainModelStruct,
    SketchRule,

    Bar,
    Bar_comp,
    Pie,
    Pie_comp,
    LineChart,
    LineChart_comp,
    Graph,
    Graph_comp,
    Radar,
    Radar_comp,
    Symbol_comp,
    Draggable,
  },
  methods: {
    combination () {
      $("#Data_col0").innerHTML = "";
      var string = '';
      var string1 = '';
      for (let i = 0; i < 9; i++) {
        string += "<div style='height:20px;width:20px;background-color:white;border:1px solid #84C1FF;display: flex;flex-direction: row;justify-content: center;color:#409EFF'>" + i + "</div>"
      }
      for (let i = 0; i < 9; i++) {
        string1 += "<div style='height:20px;width:20px;background-color:white;border:1px solid #84C1FF;'></div>"
      }
      string = "<div style='display:flex;flex-direction:row;justify-content: center;'>" + string + "</div>"
      string1 = "<div style='display:flex;flex-direction:row;justify-content: center;'>" + string1 + "</div>"
      var string2 = string
      for (let j = 0; j < 5; j++) {
        string2 += string1
      }
      var combination_string = "<div " +
        "style='height:173px;width:100%;background-color:#D2E9FF;margin-top: 5px;position: relative;display: flex;flex-direction: row;justify-content: center;'>" +
        "<div style='display:flex;flex-direction:column;justify-content: center'>" +
        "<div style='margin-left:0px;margin-top: 6px;font-size:13px;color:#409EFF' bold>BCAB</div>" +
        "<div style='margin-left:0px;margin-top: 6px;font-size:13px;color:#409EFF' bold>ABCB</div>" +
        "<div style='margin-left:0px;margin-top: 6px;font-size:13px;color:#409EFF' bold>BABC</div>" +
        "<div style='margin-left:0px;margin-top: 6px;font-size:13px;color:#409EFF' bold>BBCA</div>" +
        "<div style='margin-left:0px;margin-top: 6px;font-size:13px;color:#409EFF' bold>BABC</div>" +
        "<div style='margin-left:0px;margin-top: 6px;font-size:13px;color:#409EFF' bold>BCBA</div>" +
        "</div>" +
        "<div style='display:flex;flex-direction:column;justify-content: center'>" +
        "<div style='position: absolute;top:2px;right:180px;font-size: 10px;' bold>→神经元</div>" +
        string2 + "</div>" +
        "<div style='display:flex;flex-direction:column;justify-content: center'>" +
        "<div style='margin-left:0px;margin-top: 6px;font-size:13px;' bold>↓实值序列</div>" +
        "</div></div>"

      $("#combination").append(combination_string);
    },
    Draw_component () {
      for (let i = 0; i < 3; i++) {
        if (this.Stack_col[i].isClick == true) {
          console.log(this.Data_col[i].data)
          this.layoutData[this.changeIndex].datasource = this.Data_col[i].data
          break;
        }
      }
    },
    Stacking_DataDescription () {
      // console.log(this.Data_col[0].data, this.Data_col[1].data, this.Data_col[2].data)
      this.Stacking_show = true;
    },
    Stack_col0_process () {
      this.Stack_col[0].isClick = true;
      this.Stack_col[1].isClick = false;
      this.Stack_col[2].isClick = false;
    },
    Stack_col1_process () {
      this.Stack_col[0].isClick = false;
      this.Stack_col[1].isClick = true;
      this.Stack_col[2].isClick = false;
    },
    Stack_col2_process () {
      this.Stack_col[0].isClick = false;
      this.Stack_col[1].isClick = false;
      this.Stack_col[2].isClick = true;
    },
    Data_col0_process () {
      this.Data_col[0].isClick = !this.Data_col[0].isClick
      if (this.Data_col[0].isClick == false && this.Data_col[1].isClick == false && this.Data_col[2].isClick == false) {
        this.Stack_col[0].isClick = false;
        this.Stack_col[1].isClick = false;
        this.Stack_col[2].isClick = false;
      }
    },
    Data_col1_process () {
      this.Data_col[1].isClick = !this.Data_col[1].isClick
      if (this.Data_col[0].isClick == false && this.Data_col[1].isClick == false && this.Data_col[2].isClick == false) {
        this.Stack_col[0].isClick = false;
        this.Stack_col[1].isClick = false;
        this.Stack_col[2].isClick = false;
      }
    },
    Data_col2_process () {
      this.Data_col[2].isClick = !this.Data_col[2].isClick
      if (this.Data_col[0].isClick == false && this.Data_col[1].isClick == false && this.Data_col[2].isClick == false) {
        this.Stack_col[0].isClick = false;
        this.Stack_col[1].isClick = false;
        this.Stack_col[2].isClick = false;
      }
    },
    add_DataDescription () {
      var len = this.process_data.data.length;
      if (len > 6) {
        len = 6
      }
      var string = '';
      for (let i = 0; i < 9; i++) {
        string += "<div style='height:10px;width:10px;background-color:white;border:1px solid #84C1FF;'></div>"
      }
      string = "<div style='display:flex;flex-direction:row;justify-content: center;'>" + string + "</div>"
      var string2 = ''
      for (let j = 0; j < len; j++) {
        string2 += string
      }
      var Time_input = "<div style='height:40px;width:100%;background-color:#F0F0F0;margin-top: 5px;position: relative;'><div style='position: absolute;height:30px;width:30px;background-color:white;border:1px solid #84C1FF;margin: auto;top: 0;left: 0; right: 0;bottom: 0;'></div></div>" +
        "<div style=' border-left: 10px solid transparent;border-right: 10px solid transparent;border-top: 10px solid #00FFFF;width: 0;height: 0;margin:auto;margin-top:5px'></div>" +
        "<div" + " " +
        "style='height:40px;width:100%;background-color:#D2E9FF;margin-top: 5px;;display: flex;flex-direction: row;justify-content: center;'>" +
        "<div " +
        "style='height:20px;width:20px;background-color:white;border:1px solid #84C1FF;margin-left:6px;margin-right: 6px;margin-top: 10px'>" +
        "</div>" +
        "<div style='margin-left:2px;margin-top: 12px;font-size: 15px;'>x" + this.process_data.data.length + "</div>" +
        "</div>" +
        "<div style=' border-left: 10px solid transparent;border-right: 10px solid transparent;border-top: 10px solid #00FFFF;width: 0;height: 0;margin:auto;margin-top:5px'></div>" +
        "<div" + " " +
        "style='height:40px;width:100%;background-color:#D2E9FF;margin-top: 5px;;display: flex;flex-direction: row;justify-content: center;'>" +
        "<div" + " " +
        "style='height:30px;width:30px;background-color:white;border:1px solid #84C1FF;margin-left:6px;margin-right: 6px;margin-top: 4px'>" +
        "</div>" +
        "<div style='margin-left:2px;margin-top: 12px;font-size: 15px;'>xStep</div>" +
        "</div>" +
        "<div style=' border-left: 10px solid transparent;border-right: 10px solid transparent;border-top: 10px solid #00FFFF;width: 0;height: 0;margin:auto;margin-top:5px'></div>" +
        "<div" + " " +
        "style='height:90px;width:100%;background-color:#D2E9FF;margin-top: 5px;position: relative;display: flex;flex-direction: column;justify-content: center;'>"

      Time_input = Time_input + string2 + "</div>"
      var Time_hidden = "<div style='height:40px;width:100%;background-color:#F0F0F0;margin-top: 5px;position: relative;'><div style='position: absolute;height:30px;width:30px;background-color:white;border:1px solid #84C1FF;margin: auto;top: 0;left: 0; right: 0;bottom: 0;'></div></div>" +
        "<div style=' border-left: 10px solid transparent;border-right: 10px solid transparent;border-top: 10px solid #00FFFF;width: 0;height: 0;margin:auto;margin-top:5px'></div>" +
        "<div" + " " +
        "style='height:40px;width:100%;background-color:#D2E9FF;margin-top: 5px;;display: flex;flex-direction: row;justify-content: center;'>" +
        "<div " +
        "style='border-radius: 15px;height:25px;width:25px;background-color:white;border:1px solid #84C1FF;margin-left:6px;margin-right: 6px;margin-top: 7px'>" +
        "</div>" +
        "<div style='margin-left:2px;margin-top: 12px;font-size: 15px;'>x" + this.process_data.data.length + "</div>" +
        "</div>" +
        "<div style=' border-left: 10px solid transparent;border-right: 10px solid transparent;border-top: 10px solid #00FFFF;width: 0;height: 0;margin:auto;margin-top:5px'></div>" +
        "<div" + " " +
        "style='height:40px;width:100%;background-color:#D2E9FF;margin-top: 5px;;display: flex;flex-direction: row;justify-content: center;'>" +
        "<div" + " " +
        "style='width: 25px;height: 25px;background-color:white;border-radius: 15px;border:1px solid #84C1FF;margin-left:6px;margin-right: 6px;margin-top: 7px'>" +
        "</div>" +
        "<div style='margin-left:2px;margin-top: 12px;font-size: 15px;'>xStep</div>" +
        "</div>" +
        "<div style=' border-left: 10px solid transparent;border-right: 10px solid transparent;border-top: 10px solid #00FFFF;width: 0;height: 0;margin:auto;margin-top:5px'></div>" +
        "<div" + " " +
        "style='height:90px;width:100%;background-color:#D2E9FF;margin-top: 5px;position: relative;display: flex;flex-direction: column;justify-content: center;'>"
      Time_hidden = Time_hidden + string2 + "</div>"

      var Time_output = "<div style='height:40px;width:100%;background-color:#F0F0F0;margin-top: 5px;position: relative;'><div style='position: absolute;height:30px;width:30px;background-color:white;border:1px solid #84C1FF;margin: auto;top: 0;left: 0; right: 0;bottom: 0;'></div></div>" +
        "<div style=' border-left: 10px solid transparent;border-right: 10px solid transparent;border-top: 10px solid #00FFFF;width: 0;height: 0;margin:auto;margin-top:5px'></div>" +
        "<div" + " " +
        "style='height:40px;width:100%;background-color:#D2E9FF;margin-top: 5px;;display: flex;flex-direction: row;justify-content: center;'>" +
        "<div " +
        "style='height:20px;width:20px;background-color:white;border:1px solid #84C1FF;margin-left:6px;margin-right: 6px;margin-top: 10px'>" +
        "</div>" +
        "<div style='margin-left:2px;margin-top: 12px;font-size: 15px;'>x" + this.process_data.data.length + "</div>" +
        "</div>" +
        "<div style=' border-left: 10px solid transparent;border-right: 10px solid transparent;border-top: 10px solid #00FFFF;width: 0;height: 0;margin:auto;margin-top:5px'></div>" +
        "<div" + " " +
        "style='height:40px;width:100%;background-color:#D2E9FF;margin-top: 5px;;display: flex;flex-direction: row;justify-content: center;'>" +
        "<div" + " " +
        "style='height:30px;width:30px;background-color:white;border:1px solid #84C1FF;margin-left:6px;margin-right: 6px;margin-top: 4px'>" +
        "</div>" +
        "<div style='margin-left:2px;margin-top: 12px;font-size: 15px;'>xStep</div>" +
        "</div>" +
        "<div style=' border-left: 10px solid transparent;border-right: 10px solid transparent;border-top: 10px solid #00FFFF;width: 0;height: 0;margin:auto;margin-top:5px'></div>" +
        "<div" + " " +
        "style='height:90px;width:100%;background-color:#D2E9FF;margin-top: 5px;position: relative;display: flex;flex-direction: column;justify-content: center;'>"
      Time_output = Time_output + string2 + "</div>"

      // "<div"+
      //   "style='height:90px;width:100%;background-color:#D2E9FF;margin-top: 5px;position: relative;display: flex;flex-direction: column;justify-content: center;>"
      //   <div v-for="i in 4" style="display:flex;flex-direction:row;justify-content: center;">
      //     <div v-for="i in DataStep">
      //     </div>
      //     <div v-for="i in 9 - DataStep"
      //       style="height:10px;width:10px;background-color:white;border:1px solid #84C1FF;">
      //     </div>
      //   </div>
      // </div>
      var Symbol_string = '';
      for (let i = 0; i < this.DataStep; i++) {
        Symbol_string += "<div style='height:10px;width:10px;background-color:red;border:1px solid #84C1FF;'></div>"
      }
      for (let i = 0; i < 9 - this.DataStep; i++) {
        Symbol_string += "<div style='height:10px;width:10px;background-color:white;border:1px solid #84C1FF;'></div>"
      }
      Symbol_string = "<div style='display:flex;flex-direction:row;justify-content: center;'>" + Symbol_string + "</div>"
      var Symbol_string2 = ''
      for (let j = 0; j < len; j++) {
        Symbol_string2 += Symbol_string
      }
      var Symbol_input = "<div style='height:40px;width:100%;background-color:#F0F0F0;margin-top: 5px;position: relative;'><div style='position: absolute;height:30px;width:30px;background-color:white;border:1px solid #84C1FF;margin: auto;top: 0;left: 0; right: 0;bottom: 0;'></div></div>" +
        "<div style=' border-left: 10px solid transparent;border-right: 10px solid transparent;border-top: 10px solid #00FFFF;width: 0;height: 0;margin:auto;margin-top:5px'></div>" +
        "<div" + " " +
        "style='height:40px;width:100%;background-color:#D2E9FF;margin-top: 5px;;display: flex;flex-direction: row;justify-content: center;'>" +
        "<div " +
        "style='height:20px;width:20px;background-color:white;border:1px solid #84C1FF;margin-left:6px;margin-right: 6px;margin-top: 10px'>" +
        "</div>" +
        "<div style='margin-left:2px;margin-top: 12px;font-size: 15px;'>x" + this.process_data.data.length + "</div>" +
        "</div>" +
        "<div style=' border-left: 10px solid transparent;border-right: 10px solid transparent;border-top: 10px solid #00FFFF;width: 0;height: 0;margin:auto;margin-top:5px'></div>" +
        "<div" + " " +
        "style='height:40px;width:100%;background-color:#D2E9FF;margin-top: 5px;;display: flex;flex-direction: row;justify-content: center;'>" +
        "<div" + " " +
        "style='height:30px;width:30px;background-color:white;border:1px solid #84C1FF;margin-left:6px;margin-right: 6px;margin-top: 4px'>" +
        "</div>" +
        "<div style='margin-left:2px;margin-top: 12px;font-size: 15px;'>xStep</div>" +
        "</div>" +
        "<div style=' border-left: 10px solid transparent;border-right: 10px solid transparent;border-top: 10px solid #00FFFF;width: 0;height: 0;margin:auto;margin-top:5px'></div>" +
        "<div" + " " +
        "style='height:90px;width:100%;background-color:#D2E9FF;margin-top: 5px;position: relative;display: flex;flex-direction: column;justify-content: center;'>"
      Symbol_input = Symbol_input + Symbol_string2 + "</div>"
      var Symbol_string3 = '';
      for (let i = 0; i < 1; i++) {
        Symbol_string3 += "<div style='height:10px;width:10px;background-color:red;border:1px solid #84C1FF;'></div>"
      }
      for (let i = 0; i < 8; i++) {
        Symbol_string3 += "<div style='height:10px;width:10px;background-color:white;border:1px solid #84C1FF;'></div>"
      }
      Symbol_string3 = "<div style='display:flex;flex-direction:row;justify-content: center;'>" + Symbol_string3 + "</div>"
      var Symbol_string4 = ''
      for (let j = 0; j < len; j++) {
        Symbol_string4 += Symbol_string3
      }
      Symbol_input += "<div style=' border-left: 10px solid transparent;border-right: 10px solid transparent;border-top: 10px solid #00FFFF;width: 0;height: 0;margin:auto;margin-top:5px'></div>" +
        "<div" + " " +
        "style='height:90px;width:100%;background-color:#D2E9FF;margin-top: 5px;position: relative;display: flex;flex-direction: row;justify-content: center;'>" +
        "<div style='display: flex;flex-direction: column;justify-content: center;'>" +
        "<div style='margin-left:0px;margin-top: 0px;font-size: 8px;color:red' bold>B</div>" +
        "<div style='margin-left:0px;margin-top: 0px;font-size: 8px;color:red' bold>C</div>" +
        "<div style='margin-left:0px;margin-top: 0px;font-size: 8px;color:red' bold>D</div>" +
        "<div style='margin-left:0px;margin-top: 0px;font-size: 8px;color:red' bold>A</div>" +
        "</div>" +
        "<div style='display: flex;flex-direction: column;justify-content: center;'>" + Symbol_string4 + "</div></div>" +
        "<div style=' border-left: 10px solid transparent;border-right: 10px solid transparent;border-top: 10px solid #00FFFF;width: 0;height: 0;margin:auto;margin-top:5px'></div>" +
        "<div" + " " +
        "style='height:50px;width:100%;background-color:#D2E9FF;margin-top: 5px;position: relative;display: flex;flex-direction: column;justify-content: center;'>" +
        "<div style='display: flex;flex-direction: row;justify-content: center;'><div style='height:10px;width:10px;background-color:white;border:1px solid #84C1FF;margin-left:6px;margin-right: 6px;margin-top: 16px'></div>" +
        "<div style='height:10px;width:10px;background-color:white;border:1px solid #84C1FF;margin-left:6px;margin-right: 6px;margin-top: 16px'></div>" +
        "<div style='height:10px;width:10px;background-color:white;border:1px solid #84C1FF;margin-left:6px;margin-right: 6px;margin-top: 16px'></div>" +
        "<div style='height:10px;width:10px;background-color:white;border:1px solid #84C1FF;margin-left:6px;margin-right: 6px;margin-top: 16px'></div>" +
        "<div style='height:10px;width:10px;background-color:white;border:1px solid #84C1FF;margin-left:6px;margin-right: 6px;margin-top: 16px'></div></div>" +
        "<div style='width: 2px;height: 10px;;background: black;margin-left:14px'></div>" +
        "<div style='margin-left:0px;margin-top: 0px;font-size: 8px;color:red' bold>ADCB</div></div>"
      var Symbol_hidden = "<div style='height:40px;width:100%;background-color:#F0F0F0;margin-top: 5px;position: relative;'><div style='position: absolute;height:30px;width:30px;background-color:white;border:1px solid #84C1FF;margin: auto;top: 0;left: 0; right: 0;bottom: 0;'></div></div>" +
        "<div style=' border-left: 10px solid transparent;border-right: 10px solid transparent;border-top: 10px solid #00FFFF;width: 0;height: 0;margin:auto;margin-top:5px'></div>" +
        "<div" + " " +
        "style='height:40px;width:100%;background-color:#D2E9FF;margin-top: 5px;;display: flex;flex-direction: row;justify-content: center;'>" +
        "<div " +
        "style='width: 25px;height: 25px;background-color: #0080FF;border-radius: 15px;height:20px;width:20px;background-color:white;border:1px solid #84C1FF;margin-left:6px;margin-right: 6px;margin-top: 10px'>" +
        "</div>" +
        "<div style='margin-left:2px;margin-top: 12px;font-size: 15px;'>x" + this.process_data.data.length + "</div>" +
        "</div>" +
        "<div style=' border-left: 10px solid transparent;border-right: 10px solid transparent;border-top: 10px solid #00FFFF;width: 0;height: 0;margin:auto;margin-top:5px'></div>" +
        "<div" + " " +
        "style='height:40px;width:100%;background-color:#D2E9FF;margin-top: 5px;;display: flex;flex-direction: row;justify-content: center;'>" +
        "<div" + " " +
        "style='width: 25px;height: 25px;background-color:white;border-radius: 15px;;border:1px solid #84C1FF;margin-left:6px;margin-right: 6px;margin-top: 4px'>" +
        "</div>" +
        "<div style='margin-left:2px;margin-top: 12px;font-size: 15px;'>xStep</div>" +
        "</div>" +
        "<div style=' border-left: 10px solid transparent;border-right: 10px solid transparent;border-top: 10px solid #00FFFF;width: 0;height: 0;margin:auto;margin-top:5px'></div>" +
        "<div" + " " +
        "style='height:90px;width:100%;background-color:#D2E9FF;margin-top: 5px;position: relative;display: flex;flex-direction: column;justify-content: center;'>";
      Symbol_hidden = Symbol_hidden + Symbol_string2 + "</div>"
      Symbol_hidden += "<div style=' border-left: 10px solid transparent;border-right: 10px solid transparent;border-top: 10px solid #00FFFF;width: 0;height: 0;margin:auto;margin-top:5px'></div>" +
        "<div" + " " +
        "style='height:50px;width:100%;background-color:#D2E9FF;margin-top: 5px;position: relative;display: flex;flex-direction: row;justify-content: center;'>" +
        "<div style='height:10px;width:10px;background-color:white;border:1px solid #84C1FF;margin-left:6px;margin-right: 6px;margin-top: 16px'></div>" +
        "<div style='height:10px;width:10px;background-color:white;border:1px solid #84C1FF;margin-left:6px;margin-right: 6px;margin-top: 16px'></div>" +
        "<div style='height:10px;width:10px;background-color:white;border:1px solid #84C1FF;margin-left:6px;margin-right: 6px;margin-top: 16px'></div>" +
        "<div style='height:10px;width:10px;background-color:white;border:1px solid #84C1FF;margin-left:6px;margin-right: 6px;margin-top: 16px'></div>" +
        "<div style='height:10px;width:10px;background-color:white;border:1px solid #84C1FF;margin-left:6px;margin-right: 6px;margin-top: 16px'></div></div>"
      var choose = null;
      var input = ''
      if (this.DataSymbol == false) {
        input = Symbol_input
      } else {
        input = Time_input
      }
      switch (this.process_data.label) {
        case "原始时序参数分布数据": choose = input; break;
        case "激活值特征分布数据": choose = Symbol_hidden; break;
        case "Loss值": choose = Time_output; break;
      }
      var len = this.process_data.data.length;
      if (len > 6) {
        len = 6
      }
      for (let i = 0; i < this.isDescriptions_Col.length; i++) {
        if (this.isDescriptions_Col[i] == 0) {
          this.isDescriptions_Col[i] = 1
          let id = "#Data_col" + i
          $(id).append(choose);

          switch (i) {
            case 0: this.Data_col[0].data = this.process_data.data; this.Data_nums[0] = len; break;
            case 1: this.Data_col[1].data = this.process_data.data; this.Data_nums[1] = len; break;
            case 2: this.Data_col[2].data = this.process_data.data; this.Data_nums[2] = len; break;
          }
          break;

        }
      }
    },
    Process_ave () {
      // console.log(this.process_data)
      var datax = []
      for (let i = 0; i < this.process_data.data[0].length / this.DataStep; i++) {
        datax[i] = i;
      }
      for (var i = 0; i < this.process_data.data.length; i++) {
        var Averagedata = [0];
        var j = 1;
        var k = 0;
        var res = 0;
        res = this.process_data.data[i].length % this.DataStep;
        for (var m = 0; m < this.process_data.data[i].length; m++) {
          Averagedata[k] += this.process_data.data[i][m];
          //console.log("现在的j值",j,"现值",Averagedata[k])
          if (j == this.DataStep) {
            Averagedata[k] = Averagedata[k] / this.DataStep;
            k++;
            if (m != this.process_data.data[i].length - 1) {
              Averagedata[k] = 0;
            }
            j = 0;
          }
          j++;
          //console.log("i的值:",i,"j的值:",j,"k的值:",k,"平均值:",Averagedata[0],Averagedata[1],Averagedata[2],Averagedata[3],Averagedata[4])
        }
        if (res) {
          Averagedata[k] /= res;
        }
        this.process_data.data[i] = Averagedata
      }
      // console.log("处理完", this.process_data)
    },
    Process_nor () {
      var max = []
      var min = []
      for (let i = 0; i < this.process_data.data.length; i++) {
        max[i] = Math.max.apply(null, this.process_data.data[i])
        min[i] = Math.min.apply(null, this.process_data.data[i])
      }
      console.log("LOss值", this.process_data.data)
      var MAX = Math.max.apply(null, max)
      var MIN = Math.min.apply(null, min)
      console.log(MAX, MIN)
      var dif = MAX - MIN
      for (let i = 0; i < this.process_data.data.length; i++) {
        for (let j = 0; j < this.process_data.data[i].length; j++) {
          this.process_data.data[i][j] = (this.process_data.data[i][j] - MIN) / dif
        }
      }
    },
    next () {
      if (this.active++ > 3) this.active = 0;
      if (this.active > 0) {
        this.isStepShow = true
      }
      if (this.active == 1) {
        this.isAverageShow = false
      }
      if (this.active == 2) {
        this.isAverageShow = true
        this.isNormalizationShow = false
        if (this.Datavalue == false) {
          this.Process_ave();
        }
      }
      if (this.active == 3) {
        this.isNormalizationShow = true
        this.isDataSymbolShow = false
        if (this.DataNormalization == false) {
          this.Process_nor();
        }
      }
      if (this.active == 4) {
        this.isDataSymbolShow = true
        this.dataIndex[this.changeIndex] = this.$refs.selectTree.getCheckedKeys()[0]
        // this.layoutData[this.changeIndex].datasource = this.process_data.data
        this.add_DataDescription()
      }
    },
    isTrangle_0 () {
      this.isDescriptionshow_0 = !this.isDescriptionshow_0
      this.isTrangle_1()
    },
    isTrangle_1 () {
      this.isDescriptionshow_1 = !this.isDescriptionshow_1
      this.isTrangle_2()
    },
    isTrangle_2 () {
      this.isDescriptionshow_2 = !this.isDescriptionshow_2
      this.isTrangle_3()
    },
    isTrangle_3 () {
      this.isDescriptionshow_3 = !this.isDescriptionshow_3
    },
    dataChange () {
      // this.dataIndex[this.changeIndex] = this.$refs.selectTree.getCheckedKeys()[0]
      // this.layoutData[this.changeIndex].datasource = this.$refs.selectTree.getCheckedKeys()[0]
      // console.log("11", this.$store.state.Alldata[2].data)
      console.log(this.$refs.selectTree.getCheckedKeys()[0])
      var num = this.$refs.selectTree.getCheckedKeys()[0]
      this.process_data.data = this.$store.state.Alldata[num].data
      this.process_data.label = this.$store.state.Alldata[num].label
      this.active = 0
      this.isStepShow = false
      // for(let i=0;i<)
    },
    handleclick (index) {
      this.changeIndex = index;
      // for (let i = 0; i < this.layoutData.length; i++) {
      //   this.layoutData[i].isClick = false
      // }
      if (this.layoutData.length != 0) {
        this.layoutData[index].isClick = !this.layoutData[index].isClick
      }
    },
    nodeCheck (node, b) {
      console.log(this.$refs.selectTree.getCheckedKeys())
    },

    dragStart (e, index) {
      this.dragIndex = index
    },
    dragEnd (e) {

    },
    dragOver (e) {
      e.preventDefault()
      e.stopPropagation()
    },
    drog (e) {
      e.preventDefault();
      e.stopPropagation();
      this.dragEnd();
      var x = e.pageX - 341.4;
      var y = e.pageY - 250;
      // var child="<Radar style='height:200px;width:300px'></Radar>"
      // var child = "<div style='background-color:pink;height:200px;width:200px;position:absolute;left:" + x + 'px;top:' + y + "px'></component>";
      // $('#Drag').append(child);
      // console.log(x,y);
      this.layoutData.push({
        i: this.Index,
        Component: this.ResourceData[this.dragIndex].Compoent,
        x: x + 'px',
        y: y + 'px',
        datasource: [],
        isClick: false,
      })
      this.Index++
    },
    Resizing () {
      console.log('1');
    },
    addBox (e) {
      var box = document.querySelector('#Drag');
      let event = e.target;
      var x = e.pageX - 241.4;
      var y = e.pageY - 50;
      console.log(e.pageX, e.pageY);
      var child = "<component :is='Radar' :height=200px'style='position:absolute;left:" + x + 'px;top:' + y + "px'></component>";
      $('#Drag').append(child);
    },
    init () {
      //   this.layoutData = layoutdata.mainData
      // this.ResourceData = resourcesData;
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    // 弹出配置面板
    configPanel: function (compId, compName, compType) {
      this.currentCompId = compId;
      this.currentCompName = compName;
      this.currentCompType = compType;
      switch (compType) {
        case 'numPanel':
          this.numPanelConfigVisible = true;
          break;
        case 'lineChart':
          this.lineChartConfigVisible = true;
          break;
        default:
          break;
      }
    },
    // 保存配置数据
    saveConfigData: function () {
      switch (this.currentCompType) {
        case 'numPanel':
          for (let i = 0; i < this.layoutData.length; i++) {
            if (this.layoutData[i].i == this.currentCompId) {
              this.layoutData[i].iconName = this.numPanelConfigData.iconName;
              this.layoutData[i].textContent = this.numPanelConfigData.textContent;
              this.layoutData[i].dataName = this.numPanelConfigData.dataName;
              //   清空数据
              this.numPanelConfigData.iconName = '';
              this.numPanelConfigData.textContent = '';
              this.numPanelConfigData.dataName = '';
            }
          }
          //   清空激活数据
          this.currentCompId = '';
          this.currentCompName = '';
          this.currentCompType = '';
          this.numPanelConfigVisible = false;
          break;
        case 'lineChart':
          for (let i = 0; i < this.layoutData.length; i++) {
            if (this.layoutData[i].i == this.currentCompId) {
              this.layoutData[i].titleText = this.lineChartConfigData.titleText;
              this.layoutData[i].xArray = this.lineChartConfigData.xArray;
              this.layoutData[i].seriesData = this.lineChartConfigData.seriesData;
              //   清空数据
              this.lineChartConfigData.titleText = '';
              this.lineChartConfigData.xArray = '';
              this.lineChartConfigData.seriesData = '';
            }
          }
          //   清空激活数据
          this.currentCompId = '';
          this.currentCompName = '';
          this.currentCompType = '';
          this.lineChartConfigVisible = false;
          break;
        default:
          break;
      }
    },
    // 添加常规组件
    addItem: function (comp, w, h) {
      // 宽高
      var itemW = w;
      var itemH = h;
      var addItem = {
        x: 0,
        y: this.layoutMap.length,
        w: itemW,
        h: itemH,
        i: this.layoutData[this.layoutData.length - 1] ? parseInt(this.layoutData[this.layoutData.length - 1].i) + 1 : 0,
        Component: comp + '_comp',
        IsResource: true
      };
      if (this.layoutMap.length) {
        // console.log(this.layoutMap.length);
        for (let r = 0, rLen = this.layoutMap.length; r < rLen; r++) {
          for (let c = 0; c <= this.layoutColNum - itemW; c++) {
            let res = this.regionalTest(c, r, itemW, rLen > r + itemH ? itemH : rLen - r);

            if (res.result) {
              // 更新添加数据内容
              let compId = 0;
              if (this.layoutData.length < 1) {
                compId = 0;
              } else {
                compId = parseInt(this.layoutData[this.layoutData.length - 1].i) + 1;
              }
              addItem = {
                x: res.x,
                y: res.y,
                w: itemW,
                h: itemH,
                // "i": parseInt(this.layoutData[this.layoutData.length - 1].i) + 1,
                i: compId,
                Component: comp + '_comp',
                IsResource: true
              };

              c = this.layoutColNum + 1;
              r = rLen + 1;
            } else {
              c = res.offsetX;
            }
          }
        }
      }
      // 更新二维数组地图
      for (let itemR = 0; itemR < itemH; itemR++) {
        for (let itemC = 0; itemC < itemW; itemC++) {
          // 如果没有该行，初始化
          if (!this.layoutMap[addItem.y + itemR]) {
            this.layoutMap[addItem.y + itemR] = new Array(this.layoutColNum);
            for (let i = 0; i < this.layoutColNum; i++) {
              this.layoutMap[addItem.y + itemR][i] = 0;
            }
          }
          // 标记点
          this.layoutMap[addItem.y + itemR][addItem.x + itemC] = 1;
        }
      }
      // console.log(this.layoutMap);
      // 添加数据
      this.layoutData.push(addItem);
    },
    // 区域检测 x,y 二维数据地图起始坐标点  w,h 检测区域宽高
    regionalTest: function (x, y, w, h) {
      // 定义返回 x,y 偏移 及 是否有空位置
      let offsetX = 0,
        offsetY = 0,
        res = true;
      // 按区域循环检测 二维数组地图
      for (let r = 0; r < w; r++) {
        for (let c = 0; c <= h; c++) {
          let point = this.layoutMap[y + r] ? this.layoutMap[y + r][x + c] : 0;
          // 如该点被占据 记录偏移值
          if (point === 1) {
            res = false;
            offsetX = offsetX > x + c ? offsetX : x + c;
            offsetY = offsetY > y + r ? offsetY : y + r;
          }
        }
      }

      return {
        result: res,
        offsetX: offsetX,
        x: x,
        y: y
      };
    },
    //组件删除事件
    deleteItem (compId) {
      for (let j = 0; j < this.layoutData.length; j++) {
        if (compId == this.layoutData[j].i) {
          this.layoutData.splice(j, 1);
        }
      }

      //   this.layoutData.push(addComp)
    },
    //保存布局
    saveLayout () {
      // 将json转换成字符串
      let that = this;
      axios({
        method: 'post',
        //url: 'http://39.106.26.202:8089/savedata',
        url: '/api/savedata',

        data: this.layoutData
      })
        .then(function (response) {
          if (response.status == '200') {
            that.$message('布局保存成功,请转至‘布局预览’页面查看');
            //   console.log(response.status);
          }
        })
        .catch(function (error) {
          that.$message('布局保存失败，请稍后重试');
          console.log(error);
        });

      //   axios.get("/api/layoutdata").then((data) => {
      //     console.log(data.data.data.mainData)
      //   })
    },
    log (arg1 = 'log', ...logs) {
      if (logs.length === 0) {
        console.log(arg1);
      } else {
        console.group(arg1);
        logs.forEach(e => {
          console.log(e);
        });
        console.groupEnd();
      }
    },
    // 监听组件的移动缩放
    layoutUpdatedHandler (newLayout) {
      console.group('layoutUpdatedHandler');
      newLayout.forEach(e => {
        console.log(`{'x': ${e.x}, 'y': ${e.y}, 'w': ${e.w}, 'h': ${e.h}, 'i': '${e.i}'},`);
      });
      console.groupEnd();
    },
    resizeHandler (i, newH, newW) {
      this.log('resizeHandler', `i: ${i}, newH: ${newH}, newW: ${newW}`);
    },
    moveHandler (i, newX, newY) {
      this.log('moveHandler', `i: ${i}, newX: ${newX}, newY: ${newY}`);
    },
    resizedHandler (i, newH, newW, newHPx, newWPx) {
      this.log('resizedHandler', `i: ${i}, newH: ${newH}, newW: ${newW}, newHPx: ${newHPx}, newWPx: ${newWPx}`);
    },
    movedHandler (i, newX, newY) {
      this.log('movedHandler', `i: ${i}, newX: ${newX}, newY: ${newY}`);
    }
  },
  created () {
    this.init();
  }
};
</script>

<style scoped>
.el-card ::v-deep .el-card__header {
  padding: 2px 10px;

}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 10px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  width: 150px;
  height: 95px;
  border: 1px solid #2894FF
}

.rectangle {
  width: 15px;
  height: 15px;
  background-color: #0080FF;
}

.circle {
  width: 25px;
  height: 25px;
  background-color: #0080FF;
  border-radius: 15px;
}

.retriangle {
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #00FFFF;
  width: 0;
  height: 0;
}

.triangle {
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid #00FFFF;
  width: 0;
  height: 0;
}

.Boxborder {
  border: 1px solid #d0d0d0;
}

.col_setting {
  border: 2px #23b7cb solid
}

.col1_setting {
  border: 2px #67C23A solid
}

.col2_setting {
  border: 2px #E6A23C solid
}

.borderSetting {
  background: transparent;
  color: #23b7cb;
  font-size: 15px;
  padding: 5px 15px;
  /* 按钮设置边框 */
  border: 1px transparent solid;
  /* 给按钮边框设置渐变色 */
  border-image: linear-gradient(to right, #000718, #23b7cb) 1 10;
  /* 给按钮添加阴影效果 */
}

.image {
  width: 100%;
  display: block;
}

.container {
  background: none;
  border: none;
  padding: 0px;
}

.el-row>>>.el-col {
  padding: 0;
}

.page_card {
  height: 100%;
}

.el-card>>>.el-card__header {
  background: #ffffff;
}

.el-card>>>.el-card__body {
  padding: 5px;
  /* background-image: url('../../assets/img/panel.png');
    background-repeat: no-repeat;
    background-size: 100% 100%; */
}

.ResourceWrapper {
  border: 1.5px solid #000000;
  border-right: none;
}

.deleteButton {
  float: right;
  padding: 0;
  position: absolute;
  z-index: 2;
  top: 6px;
  right: 6px;
}

.configButton {
  float: right;
  padding: 0;
  position: absolute;
  z-index: 2;
  top: 6px;
  right: 25px;
}

.contentCenter {
  display: flex;
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
}

.boxx {
  /* 拖拽界面背景颜色 */
  background-color: white;
  ;

}

.list {
  list-style: none;

}

.list-item {
  cursor: move;
  width: 300px;
  background: #EA6E59;
  border-radius: 4px;
  color: #FFF;
  margin-bottom: 6px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
</style>
