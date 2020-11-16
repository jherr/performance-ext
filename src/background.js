console.log("background.js");

const data = {};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "performance:metrics") {
    const tab = sender.tab.url.toString();
    if (data[tab] === undefined) {
      data[tab] = {};
    }
    const name = request.name;
    if (data[tab][name] === undefined) {
      data[tab][name] = {
        values: [],
        average: 0,
      };
    }
    data[tab][name].values.push(request.value);
    data[tab][name].average =
      data[tab][name].values.reduce((a, v) => a + v, 0) /
      data[tab][name].values.length;
    sendResponse({});
  }
  if (request.type === "performance:metrics:request") {
    sendResponse(data);
  }
});
