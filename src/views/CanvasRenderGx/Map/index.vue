<template>
  <div class="canvas-box">
    <canvas id="myCanvas"></canvas>
    <canvas id="myCanvas1"></canvas>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
// import { areaAll  } from './gxArea';
import areaAll from "./gxCityPoints.json";
import gxArae from "./gxPoints.json";
import mapIcon from "./images/mapIcon.png";
import { pxToRem } from "@/utils";

const emits = defineEmits(["change"]);

let praDom = null;
let marker = null;

function renderName(data, context, canvas) {
  const textDom = document.createElement("div");
  textDom.style.width = "80px";
  textDom.style.height = "30px";
  textDom.style.cursor = "pointer";
  textDom.style.textAlign = "center";
  textDom.style.lineHeight = "30px";
  textDom.style.color = "#fff";
  textDom.style.zIndex = "9999";
  textDom.style.position = "absolute";
  textDom.style.left = pxToRem(data.position?.left - 10);
  textDom.style.top = pxToRem(data.position?.top);
  textDom.innerText = data.name;
  praDom?.appendChild(textDom);
  textDom.addEventListener("click", (e) => {
    emits("change", data.name);
    renderMarker(data.position);
    renderActiveProvince(context, canvas, data);
  });
}

onMounted(() => {
  provinceRender();

  praDom?.addEventListener("click", (e) => {});
});

function renderMarker(position = { top: 0, left: 0 }) {
  if (!marker) {
    marker = document.createElement("img");
  }
  marker.remove();
  // praDom.removeChild(marker);
  marker.src = mapIcon;
  marker.style.width = "70px";
  marker.style.height = "50px";
  // marker.style.cursor = 'pointer';
  // marker.style.textAlign = 'center';
  marker.style.lineHeight = "30px";
  marker.style.zIndex = "888";
  // marker.style.color = '#fff';
  marker.style.position = "absolute";
  marker.style.left = pxToRem(position?.left - 6);
  marker.style.top = pxToRem(position?.top - 30);
  // marker.innerText = i.name;
  praDom?.appendChild(marker);
}

function renderActiveProvince(context, canvas, point) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawPolygonShow(point, canvas, context, {
    strokeStyle: "rgba(0, 23, 54,0.8)",
    fillStyle: "#d0a621",
    lineWidth: 0.2,
  });
}

function provinceRender() {
  praDom = document.querySelector(".canvas-box");
  const canvas = document.querySelector("#myCanvas");
  const canvas1 = document.querySelector("#myCanvas1");
  const context = canvas?.getContext("2d");
  const contextHid = canvas1?.getContext("2d");
  const dpr = 10;
  //@ts-ignore
  const { width, height } = canvas;
  //@ts-ignore
  canvas.width = Math.round(width * dpr);
  //@ts-ignore
  canvas.height = Math.round(height * dpr);
  //@ts-ignore
  context.scale(dpr, dpr);
  //@ts-ignore
  canvas1.width = Math.round(width * dpr);
  //@ts-ignore
  canvas1.height = Math.round(height * dpr);
  //@ts-ignore
  contextHid.scale(dpr, dpr);

  drawPolygon(gxArae[0], canvas, context);

  areaAll.forEach((i) => {
    drawPolygonShow(i, canvas, context);
    if (i.name.includes("南宁")) {
      renderMarker(i.position);
      renderActiveProvince(contextHid, canvas1, i);
    }
    renderName(i, contextHid, canvas1);
  });
}

function drawPolygonShow(
  data,
  canvas,
  context,
  obj = {
    strokeStyle: "rgba(5, 38, 80, 0.8)",
    fillStyle: "#203b66 ",
    lineWidth: 0.2,
  }
) {
  context.beginPath();
  // [data].forEach((item, ind) => {
  // item.centerPoint = [item.centerPoint[0] / 3, item.centerPoint[1] / 4];
  // if (['南宁市', '桂林市', '柳州市'].includes(item.name)) {
  data.araePoint.forEach((i) => {
    i.forEach((b, index) => {
      if (index === 0) {
        context.moveTo(b[0], b[1]);
      } else {
        context.lineTo(b[0], b[1]);
      }
    });
  });
  // }
  // var radial = cxt.createRadialGradient(x0, y0, r0, x1, y1, r1);
  // radial.addColorStop(0, "rgb(114, 131, 152)");
  // radial.addColorStop(1, "rgb(0, 67, 120)");
  // cxt.fillStyle = radial;
  context.strokeStyle = obj.strokeStyle;
  context.fillStyle = obj.fillStyle;
  // context.fillStyle = data.fillColor;
  context.lineWidth = obj.lineWidth;
  // 如果需要填充多边形，调用 fill() 方法
  context.fill();
  context.stroke(); // 绘制边界
  context.closePath(); // 如果多边形是闭合的，调用 closePath() 可以自动闭合最后一条线
  // });
}

function drawPolygon(
  data,
  canvas,
  context,
  obj = {
    strokeStyle: "rgba(197, 195, 195, 0.15)",
    fillStyle: "",
    lineWidth: 4,
  }
) {
  context.beginPath();

  data.araePoint.forEach((i) => {
    i.forEach((b, index) => {
      if (index === 0) {
        context.moveTo(b[0], b[1]);
      } else {
        context.lineTo(b[0], b[1]);
      }
    });
  });

  context.strokeStyle = obj.strokeStyle;
  // context.fillStyle = obj.fillStyle;
  context.fillStyle = data.fillColor;
  context.lineWidth = obj.lineWidth;
  // 如果需要填充多边形，调用 fill() 方法
  context.fill();
  context.stroke(); // 绘制边界
  context.closePath(); // 如果多边形是闭合的，调用 closePath() 可以自动闭合最后一条线
  // });
}
</script>

<style lang="scss" scoped>
.canvas-box {
  // position: relative;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 980px;
  height: 800px;
}
#myCanvas,
#myCanvas1 {
  width: 100%;
  height: 100%;
  z-index: 777;
}
#myCanvas1 {
  position: absolute;
  top: 0;
  left: 0;
}
.text-dom {
  position: absolute;
  text-align: center;
}
</style>
