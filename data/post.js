import USER from "./user";
export const POSTS = [
  {
    imageUrl: "https://i.ibb.co/182bP1y/4k.png",
    user: USER[0].user,
    likes: 7870,
    caption: "Train Ride to Hogwarts. Train Ride to Hogwarts. Train Ride to Hogwarts. Train Ride to Hogwarts. Train Ride to Hogwarts. Train Ride to Hogwarts.",
    profile_picture: USER[0].image,
    comments: [
      {
        user: "malavi",
        comment: "wow amazing",
      },
      {
        user: "Teju",
        comment: "nice pic",
      },
    ],
  },
  {
    imageUrl: "https://i.ibb.co/182bP1y/4k.png",
    user: USER[1].user,
    likes: 7870,
    caption: "Train Ride to Hogwarts.",
    profile_picture: USER[1].image,
    comments: [
      {
        user: "malavi",
        comment: "wow amazing",
      },
      {
        user: "Teju",
        comment: "nice pic",
      },
    ],
  },
];
