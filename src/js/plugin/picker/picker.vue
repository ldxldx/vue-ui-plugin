<template>
    <div class="__my-pickerUiKit">
        <div class="__my-picker-input"
                 :class="{
                    'focus':focus || value,
                    'disabled':disabled
                 }"
                 @click="handleClick">
                <label class="__my-input-label">
                    <span v-if="required" class="required">*</span>
                    <span>{{label}}</span>
                    <i class="__my-icon iconfont">&#xe735;</i>
                </label>
                <span class="__my-picker-view">{{value}}</span>
                <span class="__my-line"
                      :class="[lineAnimate]"></span>
            </div>
        <transition name="__my-pop_com">
            <div class="__my-picker-content" v-if="focus" :style="{zIndex:zIndex}">
                <div class="__my-picker-top">
                    <div class="__my-picker-date_year">{{year}}</div>
                    <div class="__my-picker-date_monthDay">{{currentMonth}}-{{currentDate}} {{viewWeek}}</div>
                </div>
                <div class="__my-picker-container">
                    <div class="__my-picker-date_yearMonth">
                        <i class="iconfont" @click="lessMonth">&#xe720;</i>
                        <div>
                            <span class="__my-picker-date_yearMonth_year" @click="changeYear">{{year}}</span>
                            &nbsp;&nbsp;&nbsp;
                            <span class="__my-picker-date_yearMonth_month" @click="changeMonth">{{viewMonth}}</span></div>
                        <i class="iconfont" @click="addMonth">&#xe6f8;</i>
                    </div>
                    <div class="__my-picker-date_week">
                        <span>日</span>
                        <span>一</span>
                        <span>二</span>
                        <span>三</span>
                        <span>四</span>
                        <span>五</span>
                        <span>六</span>
                    </div>
                    <transition :name="`__my-picker-date-${direction}-animate`">
                        <div class="__my-picker-date_date" v-if="switchMonth">
                            <div class="row" v-for="(_row,_rowIndex) in row">
                                <div class="col" :class="{'active':currentYear && _col.year && Number(currentDate) === _col.date && Number(currentMonth) === Number(_col.month)}"
                                     v-for="(_col,_colIndex) in _row" @click="selected(_col)">{{_col.date}}
                                </div>
                            </div>
                        </div>
                    </transition>
                    <div class="__my-picker-date_button">
                        <my-button @click="cancel">取消</my-button>
                        <my-button @click="confirm">确定</my-button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
  import maskLayer from '../maskLayer/maskLayer';
  import Button from '../button/button.vue';
  export default {
    name: 'my-picker',

    mixins: [maskLayer],

    data(){
      return {
        focus: false,
        lineAnimate: null,
        currentTime: null,
        time:null,
        switchMonth:true,
        direction:null,//next or prev
        row: new Array([], [], [], [], [], [])
      }
    },
    computed: {
      //当前年
      currentYear(){
        return new Date(this.currentTime).getFullYear();
      },
      //当前月
      currentMonth(){
        let _month = new Date(this.currentTime).getMonth() + 1;
        if (_month < 10) {
          return `0${_month}`;
        }
        return _month;
      },
      //当前日
      currentDate(){
        let _date = new Date(this.currentTime).getDate();
        if (_date < 10) {
          return `0${_date}`
        }
        return _date;
      },
      //当前星期
      currentWeek(){
        return new Date(this.currentTime).getDay();
      },
      //搜索年
      year(){
        return new Date(this.time).getFullYear();
      },
      //搜索月
      month(){
        let _month = new Date(this.time).getMonth() + 1;
        if (_month < 10) {
          return '0' + _month;
        }
        return _month;
      },
      //显示月
      viewMonth(){
        let _month;
        switch (this.month) {
          case '01':
            _month = '一';
            break;
          case '02':
            _month = '二';
            break;
          case '03':
            _month = '三';
            break;
          case '04':
            _month = '四';
            break;
          case '05':
            _month = '五';
            break;
          case '06':
            _month = '六';
            break;
          case '07':
            _month = '七';
            break;
          case '08':
            _month = '八';
            break;
          case '09':
            _month = '九';
            break;
          case 10:
            _month = '十';
            break;
          case 11:
            _month = '十一';
            break;
          case 12:
            _month = '十二';
            break;
        }
        return `${_month}月`
      },
      //显示星期
      viewWeek(){
        let _week = '星期';
        switch (this.currentWeek) {
          case 0:
            _week += '日';
            break;
          case 1:
            _week += '一';
            break;
          case 2:
            _week += '二';
            break;
          case 3:
            _week += '三';
            break;
          case 4:
            _week += '四';
            break;
          case 5:
            _week += '五';
            break;
          case 6:
            _week += '六';
            break;
        }
        return _week;
      },
    },
    mounted(){

    },
    props: {
      value: {
        required:true,
        type:[String,Date,Number]
      },
      label:[String,Number],
      disabled: Boolean,
//      disabledCondition:[]
      required: Boolean,
    },
    watch: {
      focus(val){
        !val && (this.lineAnimate = 'lineOut');
      }
    },
    methods: {
      handleClick(){
        if (this.disabled) return;
        //获取设定/当前时间
        this.currentTime = this.time = (this.value || new Date());
        //根据time 初始化
        this.dateLayout();
        this.lineAnimate = 'lineIn';
        //弹出时间框
        this.focus = true;
      },
      changeYear(){

      },
      changeMonth(){

      },
      /**
       * 选择日期
       * @param _col
       */
      selected(_col){
        this.currentTime = `${_col.year}/${_col.month}/${_col.date}`;
      },
      /**
       * 下一月
       */
      addMonth(){
        this.direction = 'next';
        this.switchMonth = false;
        this.$nextTick(()=>{
          let _year = this.year,_month = Number(this.month);
          if(_month === 12){
            _year++;
            _month = 1;
          } else {
            _month++;
          }
          this.time = `${_year}/${_month}/01`;
          this.dateLayout();
          this.switchMonth = true;
        })
      },
      /**
       * 上一月
       */
      lessMonth(){
        this.direction = 'prev';
        this.switchMonth = false;
        this.$nextTick(()=>{
          let _year = this.year,_month = Number(this.month);
          if(_month === 1){
            _year--;
            _month = 12;
          } else {
            _month--;
          }
          this.time = `${_year}/${_month}/01`;
          this.dateLayout();
          this.switchMonth = true;
        })
      },
      /**
       * 重排日期
       */
      dateLayout(){
        let _rowIndex = 0,_row = new Array([], [], [], [], [], []);
        for (let i = 0; i < new Date(`${this.year}-${this.month}-1`).getDay(); i++) {
          _row[_rowIndex].push('')
        }
        let _allDate = this.allDate(this.time);
        for (let i = 1; i < _allDate; i++) {
          if (_row[_rowIndex].length === 7) _rowIndex++;
          _row[_rowIndex].push({
            year: this.year,
            month: this.month,
            date: i
          })
        }
        this.row = _row;
      },
      cancel(){
        this.focus = false;
      },
      confirm(){
        this.$emit('input', this.currentTime.replace(/\//g,'-'));
        this.focus = false;
      },
      /**
       * 获得总天数
       * @returns {number}
       */
      allDate(){
        let date = new Date(this.currentDate);
        let Month = date.getMonth();
        date.setMonth(Month + 1);
        date.setDate(0);
        return date.getDate();
      }
    },
    components:{
      'my-button':Button,
    }
  }
</script>
<style lang="scss" scoped>
    @import "../sass/com";
    @import "../sass/variable";
    @import "../sass/function";

    .__my-pickerUiKit {
        .__my-picker-input {
            height: rem(104);
            margin: rem(38) 0 rem(10);
            position: relative;
            display: flex;
            align-items: center;
            .__my-input-label {
                color: rgba(0, 0, 0, .38);
                cursor: text;
                font-size: rem(32);
                line-height: 1;
                position: absolute;
                transition: color, transform .3s cubic-bezier(.4, 0, .2, 1);
                left: rem(10);
                top: rem(36);
                .required {
                    color: red;
                }
                .placeholder {
                    font-size: rem(28);
                    transition: opacity 1s linear;
                    opacity: 1;
                }
            }
            .__my-picker-view {
                font-size: rem(32);
            }
            .__my-icon {
                font-size: rem(32);
            }
            .__my-line {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: rem(3);
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: rgba(0, 0, 0, .12);
                &::before {
                    display: block;
                    content: '';
                    height: 100%;
                    background: $defaultColor;
                }
                &.lineIn {
                    &::before {
                        animation: __my-line_in .35s forwards;
                    }
                }
                &.lineOut {
                    &::before {
                        animation: __my-line_out .35s forwards;
                    }
                }
                @keyframes __my-line_in {
                    0% {
                        width: 0;
                    }
                    100% {
                        width: 100%;
                    }
                }
                @keyframes __my-line_out {
                    0% {
                        width: 100%;
                    }
                    100% {
                        width: 0;
                    }
                }
            }
            &.focus {
                .__my-input-label {
                    color: #3f51b5;
                    transform: scale(.78714, .78714) translate(rem(-30), rem(-64));
                }
                .placeholder {
                    opacity: 0;
                    transition: opacity .1s linear;
                }
            }
            &.disabled {
                background: #eef1f6;
                color: #bbb;
                .__my-input-label {
                    span {
                        color: #bbb;
                    }
                }
            }
        }
        .__my-picker-content {
            position: fixed;
            top: calc(50% - 10.93rem / 2);
            left: calc(50% - 8.27rem / 2);
            width: rem(620);
            height: rem(826);
            border-radius: rem(8);
            overflow: hidden;
            box-shadow: 0 19px 60px rgba(0, 0, 0, .298039), 0 15px 20px rgba(0, 0, 0, .219608);
            background-color: $defaultColor;
            .__my-picker-top {
                width: 100%;
                height: rem(208);
                padding: rem(30) rem(40);
                box-sizing: border-box;
                border-radius: rem(8) rem(8) 0 0;
                color: #fff;
                overflow: hidden;
                .__my-picker-date_year {
                    font-size: rem(36);
                    font-weight: 700;
                    opacity: .7;
                    cursor: pointer;
                    transition: all .45s cubic-bezier(.23, 1, .32, 1);
                }
                .__my-picker-date_monthDay {
                    font-size: rem(72);
                    user-select: none;
                    font-weight: 600;
                    transition: all .45s cubic-bezier(.23, 1, .32, 1);
                }
            }
            .__my-picker-container {
                width: 100%;
                height: calc(100% - 2.77rem);
                padding: 0 rem(20);
                box-sizing: border-box;
                background-color: #fff;
                .__my-picker-date_yearMonth {
                    height: rem(96);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: rem(36);
                    opacity: .8;
                    font-weight: 600;
                    i {
                        width: rem(96);
                        height: rem(96);
                        line-height: rem(96);
                        text-align: center;
                    }
                    &>div{
                        display: flex;
                    }
                    .__my-picker-date_yearMonth_year {

                    }
                    .__my-picker-date_yearMonth_month {

                    }
                }
                .__my-picker-date_week {
                    width: 100%;
                    height: rem(40);
                    font-size: rem(28);
                    span {
                        display: table-cell;
                        width: 1%;
                        font-weight: 700;
                        text-align: center;
                        opacity: .5;
                    }
                }
                .__my-picker-date_date {
                    font-size: rem(24);
                    font-weight: 600;
                    .row {
                        display: flex;
                    }
                    .col {
                        width: 14.3%;
                        height: rem(80);
                        line-height: rem(80);
                        text-align: center;
                        color: rgba(0, 0, 0, .87);
                        opacity: .9;
                        position: relative;
                        z-index: 1;
                        transition: all .45s cubic-bezier(.23, 1, .32, 1);
                        &::before {
                            content: '';
                            position: absolute;
                            top: 0;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            z-index: -1;
                            border-radius: 50%;
                            background-color: $defaultColor + 10;
                            transform: scale(0);
                            opacity: 0;
                            transition: all .45s cubic-bezier(.23, 1, .32, 1);
                        }
                        &.active {
                            color: #fff;
                            opacity: 1;
                            &::before {
                                opacity: .8;
                                transform: scale(1);
                            }
                        }
                    }
                }
                .__my-picker-date_button {
                    display: flex;
                    justify-content: flex-end;
                    &>button{
                        margin: rem(10);
                    }
                }
            }
        }
    }



    .__my-picker-date-prev-animate-enter {
        opacity: .3;
        transform: translateX(-100%);
    }
    .__my-picker-date-prev-animate-enter-active {
        transition: all .2s linear;
    }
    .__my-picker-date-prev-animate-leave-active {
        opacity: .3;
        transform: translateY(100%);
        transition: all .2s linear;
    }

    .__my-picker-date-next-animate-enter {
        opacity: 0;
        transform: translateX(100%);
    }
    .__my-picker-date-next-animate-enter-active {
        transition: all .2s linear;
    }
    .__my-picker-date-next-animate-leave-active {
        transform: translateY(-100%);
        opacity: 0;
        transition: all .2s linear;
    }
</style>