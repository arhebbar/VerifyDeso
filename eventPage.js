chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  if (request.todo === "CHECK") {
    console.log("check");
    const userName = new URL(request.url).pathname.slice(3);
    const resps = await Promise.all([
      fetch(`http://20.204.85.198:5500/api/check/${userName}`, {
        method: "POST",
      }),
      fetch(`http://20.204.85.198:5500/api/creatiers/${userName}`, {
        method: "POST",
      }),
    ]);
    const responses = await Promise.all([resps[0].json(), resps[1].json()]);
    if (
      (responses[0].data && responses[0].data.color !== null) ||
      responses[1].userOnCreatiers
    ) {
      const msg = {
        todo: "ADD-TICK",
        user: userName,
      };
      if (responses[0].data && responses[0].data.color !== null) {
        msg.color = responses[0].data.color;
        msg.stats = responses[0].data.stats;
      }
      if (responses[1].userOnCreatiers) {
        msg.text = responses[1].text;
      }
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, msg);
      });
    }
  }
  return true;
});
