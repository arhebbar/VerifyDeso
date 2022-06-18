let lastUrl = null;
let clicked = false;

new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    sendCheckMessage(url);
  }
}).observe(document, { subtree: true, childList: true });

const sendCheckMessage = (url) => {
  try {
    chrome.runtime.sendMessage({
      todo: "CHECK",
      url,
    });
  } catch (error) {
    console.log(error);
  }
};

const mouseOver = (id) => {
  if (document.getElementById(id))
    document.getElementById(id).style.visibility = "visible";
  // document.getElementById("description2").style.visibility = "visible";
};

const mouseOut = (id) => {
  if (document.getElementById(id))
    document.getElementById(id).style.visibility = "hidden";
  // document.getElementById("description2").style.visibility = "hidden";
};

const displayMetrics = () => {
  if (!clicked) {
    document.getElementById("description").style.visibility = "hidden";
    document.getElementById("description2").style.visibility = "visible";
    clicked = true;
  } else {
    document.getElementById("description2").style.visibility = "hidden";
    document.getElementById("description").style.visibility = "visible";
    clicked = false;
  }
};

const openCreatiersPage = (userName) => {
  window.open(`https://creatiers.co/u/${userName}`);
};
const handleCreatiers = (user, node, creatiersText) => {
  console.log(creatiersText);
  const imageCreatiers = document.createElement("img");
  imageCreatiers.id = "opbolte2";
  imageCreatiers.src =
    "https://cdn.discordapp.com/attachments/929730392238485544/940887230594035742/creatiers-favicon.ico";
  imageCreatiers.addEventListener("mouseover", () => {
    mouseOver("description3");
  });
  imageCreatiers.addEventListener("mouseout", () => {
    mouseOut("description3");
  });

  imageCreatiers.addEventListener("click", () => {
    openCreatiersPage(user);
  });

  let textynew = creatiersText;
  const newDiv3 = document.createElement("div");
  newDiv3.id = "description3";
  newDiv3.innerHTML = textynew;
  newDiv3.className = "border pad";

  node.append(imageCreatiers);
  node.append(newDiv3);
};

const handleVerificationTick = (color, user, node, stats) => {
  const imageElement = document.createElement("img");
  imageElement.id = "opbolte";

  if (color === "ORANGE") {
    imageElement.src =
      "https://www.iconsdb.com/icons/preview/orange/approval-xxl.png";
  } else if (color === "BLUE") {
    imageElement.src =
      "https://www.iconsdb.com/icons/preview/caribbean-blue/approval-xxl.png";
  } else if (color === "GREEN") {
    imageElement.src =
      "https://www.iconsdb.com/icons/preview/guacamole-green/approval-xxl.png";
  }
  imageElement.addEventListener("mouseover", () => {
    mouseOver("description");
  });
  imageElement.addEventListener("mouseout", () => {
    mouseOut("description");
    mouseOut("description2");
  });
  imageElement.addEventListener("click", displayMetrics);

  let joinedicon = "";
  let investoricon = "";
  let followericon = "";
  let diamondcoin = "";
  let posticon = "";
  if (stats.joinedTime > 180) {
    joinedicon = "💚";
  } else {
    joinedicon = "⭕";
  }

  if (stats.investors > 100) {
    investoricon = "💚";
  } else {
    investoricon = "⭕";
  }

  if (stats.followers > 100) {
    followericon = "💚";
  } else {
    followericon = "⭕";
  }

  if (stats.diamonds > 100) {
    diamondcoin = "💚";
  } else {
    diamondcoin = "⭕";
  }

  if (stats.postsCount > 100) {
    posticon = "💚";
  } else {
    posticon = "⭕";
  }

  let a = "";
  let b = "";
  let c = "";
  let d = "";
  let e = "";

  if (stats.engagementRate.toFixed(2) > 10) {
    a = "💚";
  } else if (stats.engagementRate.toFixed(2) > 5) {
    a = "🧡";
  } else {
    a = "⭕";
  }

  if (stats.followerRate.toFixed(2) > 5) {
    b = "💚";
  } else if (stats.followerRate.toFixed(2) > 2) {
    b = "🧡";
  } else {
    b = "⭕";
  }

  if (stats.followersByCoinPrice.toFixed(2) > 1000 && stats.followers >= 100) {
    c = "💚";
  } else if (
    stats.followersByCoinPrice.toFixed(2) > 500 &&
    stats.followers >= 50
  ) {
    c = "🧡";
  } else {
    c = "⭕";
  }

  if (stats.diamondsPerPost.toFixed(2) > 25) {
    d = "💚";
  } else if (stats.diamondsPerPost.toFixed(2) > 5) {
    d = "🧡";
  } else {
    d = "⭕";
  }

  if (stats.postsPerDay.toFixed(2) > 25) {
    e = "💚";
  } else if (stats.postsPerDay.toFixed(2) > 5) {
    e = "🧡";
  } else {
    e = "⭕";
  }

  let texty = "";
  texty += `${joinedicon} Joined ${stats.joinedTime} days ago <br /> ${investoricon} Has ${stats.investors} investors <br /> ${followericon} Has ${stats.followers} followers <br /> ${diamondcoin} Has earned ${stats.diamonds} diamonds <br />${posticon} Has posted ${stats.postsCount} posts <br /> <br /> 👆 Click the icon for other metrics`;

  let textyright = "";

  textyright = ` ${a} Engagement Rate: ${stats.engagementRate.toFixed()} <br /> ${b} Follower Ratio: ${stats.followerRate.toFixed()} <br /> ${c} Follower/ CC Price: ${stats.followersByCoinPrice.toFixed()} <br /> ${d} Diamonds/ Post: ${stats.diamondsPerPost.toFixed()} <br /> ${e} Posts/ Day: ${stats.postsPerDay.toFixed()}`;

  const newDiv = document.createElement("div");
  newDiv.id = "description";
  newDiv.innerHTML = texty;
  newDiv.className = "border pad";

  const newDiv2 = document.createElement("newDiv2");
  newDiv2.id = "description2";
  newDiv2.innerHTML = textyright;
  newDiv2.className = "border pad";

  window.onclick = (e) => {
    if (clicked && e.target != imageElement) {
      document.getElementById("description2").style.visibility = "hidden";
      clicked = false;
    }
  };
  node.append(newDiv);
  node.append(imageElement);
  node.append(newDiv2);
};
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.todo === "ADD-TICK") {
    console.log(request);
    console.log("Adding");
    const color = request.color;
    const user = request.user.toLowerCase();
    const stats = request.stats;
    const creatiersText = request.text;
    console.log(stats);

    new MutationObserver(function (mutations, me) {
      const nl = document.querySelectorAll(
        ".fs-24px.font-weight-bold.d-flex.align-items-center"
      );
      for (let i = 0; i < nl.length; i++) {
        if (nl[i].innerHTML.toLowerCase().includes(user)) {
          console.log("Started");
          if (color) {
            handleVerificationTick(color, user, nl[i], stats);
          }
          if (creatiersText) {
            handleCreatiers(user, nl[i], creatiersText);
          }
          me.disconnect();
          return;
        }
      }
    }).observe(document, {
      childList: true,
      subtree: true,
    });
  }
  return true;
});
