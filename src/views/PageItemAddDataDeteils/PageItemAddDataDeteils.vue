<template>
  <div class="page-data-deteils">
    <el-button @click="goback"> 返回 </el-button>
    <h1 class="h2-name">{{ route.query.name }}</h1>
    <main>
      <div class="time">
        <span>数据时间：</span>
        <el-date-picker
          v-model="form.time"
          :default-time="form.time"
          format="YYYY年MM月DD日"
          value-format="YYYY-MM-DD"
          :teleported="false"
          type="date"
          placeholder="Pick a day"
          :disabled="disabled"
        />
      </div>
      <div class="data-form">
        <DeteilsItem v-model="form.data" :disabled="disabled"></DeteilsItem>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import DeteilsItem from "./components/DeteilsItem.vue";

const route = useRoute();
const router = useRouter();
const disabled = computed(() => {
  if (Number(route.query.type) === 1) {
    return false;
  } else return true;
});

const form = reactive({
  time: "2025-05-31",
  data: [
    {
      targetName: "各项存款（人行口径）",
      typeList: [
        {
          label: "时点",
          nowBalance: "4394",
          nowBalanceFlag: 1,
          nowRanking: null,
          nowRankingFlag: null,
          nowSystemRanking: null,
          nowSystemRankingFlag: null,
          yearBalance: 89,
          yearBalanceFlag: 1,
          yearRanking: null,
          yearRankingFlag: null,
          yearSystemRanking: null,
          yearSystemRankingFlag: null,
          growthRate: 2.08,
          growthRateFlag: 1,
          growthRateRanking: 2,
          growthRateRankingFlag: null,
          growthRateSystemRanking: null,
          growthRateSystemRankingFlag: null,
        },
        {
          label: "日均",
          nowBalance: null,
          nowBalanceFlag: null,
          nowRanking: null,
          nowRankingFlag: null,
          nowSystemRanking: null,
          nowSystemRankingFlag: null,
          yearBalance: null,
          yearBalanceFlag: null,
          yearRanking: null,
          yearRankingFlag: null,
          yearSystemRanking: null,
          yearSystemRankingFlag: null,
          growthRate: null,
          growthRateFlag: null,
          growthRateRanking: null,
          growthRateRankingFlag: null,
          growthRateSystemRanking: null,
          growthRateSystemRankingFlag: null,
        },
      ],
    },
    {
      targetName: "全量资金",
      typeList: [
        {
          label: "时点",
          nowBalance: 4919,
          nowBalanceFlag: 1,
          nowRanking: null,
          nowRankingFlag: null,
          nowSystemRanking: 26,
          nowSystemRankingFlag: null,
          yearBalance: 110,
          yearBalanceFlag: 1,
          yearRanking: null,
          yearRankingFlag: null,
          yearSystemRanking: 20,
          yearSystemRankingFlag: 1,
          growthRate: 2.28,
          growthRateFlag: 1,
          growthRateRanking: null,
          growthRateRankingFlag: null,
          growthRateSystemRanking: 22,
          growthRateSystemRankingFlag: 1,
        },
        {
          label: "日均",
          nowBalance: 4852,
          nowBalanceFlag: 1,
          nowRanking: null,
          nowRankingFlag: null,
          nowSystemRanking: 26,
          nowSystemRankingFlag: null,
          yearBalance: 260,
          yearBalanceFlag: 1,
          yearRanking: null,
          yearRankingFlag: null,
          yearSystemRanking: 14,
          yearSystemRankingFlag: null,
          growthRate: 5.67,
          growthRateFlag: 1,
          growthRateRanking: null,
          growthRateRankingFlag: null,
          growthRateSystemRanking: 14,
          growthRateSystemRankingFlag: null,
        },
      ],
      children: [
        {
          targetName: "一般性存款",
          typeList: [
            {
              label: "时点",
              nowBalance: 4376,
              nowBalanceFlag: 1,
              nowRanking: 2,
              nowRankingFlag: null,
              nowSystemRanking: 26,
              nowSystemRankingFlag: null,
              yearBalance: 100,
              yearBalanceFlag: 1,
              yearRanking: 2,
              yearRankingFlag: null,
              yearSystemRanking: 23,
              yearSystemRankingFlag: 1,
              growthRate: 2.33,
              growthRateFlag: 1,
              growthRateRanking: 1,
              growthRateRankingFlag: 1,
              growthRateSystemRanking: 25,
              growthRateSystemRankingFlag: 1,
            },
            {
              label: "日均",
              nowBalance: 4325,
              nowBalanceFlag: 1,
              nowRanking: 2,
              nowRankingFlag: null,
              nowSystemRanking: 26,
              nowSystemRankingFlag: null,
              yearBalance: 215,
              yearBalanceFlag: 1,
              yearRanking: 2,
              yearRankingFlag: null,
              yearSystemRanking: 19,
              yearSystemRankingFlag: null,
              growthRate: 5.23,
              growthRateFlag: 1,
              growthRateRanking: 1,
              growthRateRankingFlag: null,
              growthRateSystemRanking: 19,
              growthRateSystemRankingFlag: null,
            },
          ],
          children: [
            {
              targetName: "公司存款",
              typeList: [
                {
                  label: "时点",
                  nowBalance: 4376,
                  nowBalanceFlag: 1,
                  nowRanking: 2,
                  nowRankingFlag: null,
                  nowSystemRanking: 26,
                  nowSystemRankingFlag: null,
                  yearBalance: 100,
                  yearBalanceFlag: 1,
                  yearRanking: 2,
                  yearRankingFlag: null,
                  yearSystemRanking: 23,
                  yearSystemRankingFlag: 1,
                  growthRate: 2.33,
                  growthRateFlag: 1,
                  growthRateRanking: 1,
                  growthRateRankingFlag: 1,
                  growthRateSystemRanking: 25,
                  growthRateSystemRankingFlag: 1,
                },
                {
                  label: "日均",
                  nowBalance: 4325,
                  nowBalanceFlag: 1,
                  nowRanking: 2,
                  nowRankingFlag: null,
                  nowSystemRanking: 26,
                  nowSystemRankingFlag: null,
                  yearBalance: 215,
                  yearBalanceFlag: 1,
                  yearRanking: 2,
                  yearRankingFlag: null,
                  yearSystemRanking: 19,
                  yearSystemRankingFlag: null,
                  growthRate: 5.23,
                  growthRateFlag: 1,
                  growthRateRanking: 1,
                  growthRateRankingFlag: null,
                  growthRateSystemRanking: 19,
                  growthRateSystemRankingFlag: null,
                },
              ],
              children: [],
            },
          ],
        },
        {
          targetName: "投资理财",
          typeList: [
            {
              label: "时点",
              nowBalance: 513,
              nowBalanceFlag: -1,
              nowRanking: null,
              nowRankingFlag: null,
              nowSystemRanking: 27,
              nowSystemRankingFlag: null,
              yearBalance: 22,
              yearBalanceFlag: -1,
              yearRanking: null,
              yearRankingFlag: null,
              yearSystemRanking: 29,
              yearSystemRankingFlag: null,
              growthRate: 4.38,
              growthRateFlag: -1,
              growthRateRanking: null,
              growthRateRankingFlag: null,
              growthRateSystemRanking: 17,
              growthRateSystemRankingFlag: 1,
            },
            {
              label: "日均",
              nowBalance: 490,
              nowBalanceFlag: 1,
              nowRanking: null,
              nowRankingFlag: null,
              nowSystemRanking: 27,
              nowSystemRankingFlag: null,
              yearBalance: 33,
              yearBalanceFlag: 1,
              yearRanking: null,
              yearRankingFlag: null,
              yearSystemRanking: 25,
              yearSystemRankingFlag: null,
              growthRate: 7.34,
              growthRateFlag: 1,
              growthRateRanking: null,
              growthRateRankingFlag: null,
              growthRateSystemRanking: 19,
              growthRateSystemRankingFlag: null,
            },
          ],
        },
      ],
    },
  ],
});
const goback = () => {
  router.go(-1);
};
</script>

<style lang="scss" scoped>
.page-data-deteils {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .el-button {
    position: absolute;
    top: 40px;
    left: 40px;
    font-size: 20px;
  }
  //   background-color: aqua;
  .h2-name {
    width: 100%;
    text-align: center;
  }
  main {
    flex: 1;
    padding-bottom: 40px;
    // background-color: #fff;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .time {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      font-size: 24px;
      :deep(.el-date-editor.el-input) {
        height: 40px !important;
      }
      :deep(.el-input__inner) {
        font-size: 20px;
        // padding: 20px;
      }
      span {
        margin-right: 20px;
      }
    }
    .data-form {
      flex: 1;
      padding: 20px;
      overflow: hidden;
      //   background-color: aquamarine;
      border: 1px solid #fff;
      border-radius: 8px;
    }
  }
}
</style>
