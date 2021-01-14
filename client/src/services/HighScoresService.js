export default {
  getHighscores: () => {
    return fetch("user/highscores").then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else return { message: { msgBody: " Unauthorized" }, msgError: true };
    });
  },
  putHighscore: (highscore) => {
    return fetch("/user/update_highscore",{
      method: "put",
      body: JSON.stringify(highscore),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status !== 401) {
        return response.json().then(data => data);
      } else return { message: { msgBody: " Unauthorized" }, msgError: true };
    });
  },
};
