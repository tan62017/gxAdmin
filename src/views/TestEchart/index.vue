<template>
  <div id="main"></div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import * as echarts from "echarts";
import "echarts-gl";
// import "jQuery";
// import * as $ from "jQuery";

onMounted(() => {
  var chartDom = document.getElementById("main");
  var myChart = echarts.init(chartDom);
  var option;

  var data = [];
  // Parametric curve
  for (var t = 0; t < 25; t += 0.001) {
    var x = (1 + 0.25 * Math.cos(75 * t)) * Math.cos(t);
    var y = (1 + 0.25 * Math.cos(75 * t)) * Math.sin(t);
    var z = t + 2.0 * Math.sin(75 * t);
    data.push([x, y, z]);
  }
  console.log(data.length);
  option = {
    tooltip: {},
    backgroundColor: "#000",
    visualMap: {
      show: false,
      dimension: 2,
      min: 0,
      max: 30,
      inRange: {
        color: [
          "#313695",
          "#4575b4",
          "#74add1",
          "#abd9e9",
          "#e0f3f8",
          "#ffffbf",
          "#fee090",
          "#fdae61",
          "#f46d43",
          "#d73027",
          "#a50026",
        ],
      },
    },
    xAxis3D: {
      // show: false,
      // type: "value",
    },
    yAxis3D: {
      // show: false,
      // type: "value",
    },
    zAxis3D: {
      // show: false,
      // type: "value",
    },
    grid3D: {
      viewControl: {
        projection: "orthographic",
      },
    },
    series: [
      {
        type: "line3D",
        data: data,
        lineStyle: {
          width: 4,
        },
      },
    ],
  };

  option && myChart.setOption(option);
});
</script>

<style lang="scss" scoped>
#main {
  width: 100vw;
  height: 100vh;
}
</style>
