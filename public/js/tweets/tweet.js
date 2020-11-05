window.addEventListener("DOMContentLoaded", () => {
  bindTweet();
});

function bindTweet() {
  const elements = document.querySelectorAll(".fa-minus-circle");
  const tweetContainer = document.querySelector("#tweet-list-container");

  elements.forEach((element) => {
    element.addEventListener("click", (event) => {
      const tweetId = event.target.getAttribute("tweetid");
      console.log(tweetId);
      // axios récupéré par le CDN
      axios
        .delete(`/tweets/${tweetId}`)
        .then(function (response) {
          tweetContainer.innerHTML = response.data;
        })
        .catch(function (err) {
          console.log(err);
        });
    });
  });
}
