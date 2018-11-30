document.getElementById("goToBottom").addEventListener("click", () => {
    document.getElementById("bottomText").scrollIntoView({behavior: "smooth", block: "start"});
});