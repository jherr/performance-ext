import { getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals";

const infoDiv = document.createElement("div");
infoDiv.style.position = "absolute";
infoDiv.style.left = 0;
infoDiv.style.top = 0;
infoDiv.style.backgroundColor = "black";
infoDiv.style.color = "white";
infoDiv.style.padding = "1rem";
infoDiv.style.display = "grid";
infoDiv.style.gridTemplateColumns = "repeat(2, 1fr)";
infoDiv.style.gridColumnGap = "1rem";
infoDiv.style.zIndex = 100000;
document.body.appendChild(infoDiv);

const metrics = {};

const sendData = ({ name, value }) => {
  metrics[name] = value;

  infoDiv.innerHTML = Object.keys(metrics)
    .map((k) => `<div>${k}</div><div>${Math.round(metrics[k])}</div>`)
    .join("");

  chrome.runtime.sendMessage({
    type: "performance:metrics",
    name,
    value,
  });
};

getCLS(sendData); // Cumulative layout shift
getFID(sendData); // First input delay
getFCP(sendData); // First contentful paint
getLCP(sendData); // Largest contentful paint
getTTFB(sendData); // Time to first byte
