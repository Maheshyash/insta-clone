import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Divider } from "react-native-elements/dist/divider/Divider";
import { Feather } from "@expo/vector-icons";
export default function Post({ post }) {
  return (
    <View style={styles.postContainer}>
      <Divider width={1} orientation={"horizontal"} />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={styles.postFooterContainer}>
        <PostFooter />
        <Likes post={post} />
        <Caption post={post} />
        <CommentCaption post={post} />
        <Comments post={post} />
      </View>
    </View>
  );
}
const PostHeader = ({ post }) => {
  return (
    <View style={styles.postHeaderContainer}>
      <View style={styles.userDetails}>
        <Image
          source={{ uri: post.profile_picture }}
          style={styles.postImage}
        />
        <Text style={styles.userText}>{post.user}</Text>
      </View>
      <TouchableOpacity>
        <Feather name="more-horizontal" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};
const PostImage = ({ post }) => {
  return (
    <View style={styles.postFullImageContainer}>
      <Image source={{ uri: post.imageUrl }} style={styles.postFullImage} />
    </View>
  );
};
const postFooterIcons = [
  {
    name: "Like",
    imageUrl:
      "https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png",
    likedImageUrl:
      "https://img.icons8.com/fluency-systems-regular/60/fa314a/like--v1.png",
  },
  {
    name: "Comment",
    imageUrl:
      "https://img.icons8.com/fluency-systems-regular/60/ffffff/speech-bubble--v1.png",
  },
  {
    name: "Share",
    imageUrl:
      "https://img.icons8.com/fluency-systems-regular/48/ffffff/share.png",
    likedImageUrl: "",
  },
  {
    name: "Save",
    imageUrl: "https://img.icons8.com/ios/60/ffffff/bookmark-ribbon--v1.png",
  },
];
const PostFooter = () => (
  <View style={styles.footerIconContainer}>
    <View style={styles.footerIconContainer}>
      <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[0].imageUrl} />
      <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[1].imageUrl} />
      <Icon
        imgStyle={[styles.footerIcon, { marginRight: 0 }]}
        imgUrl={postFooterIcons[2].imageUrl}
      />
    </View>
    <View>
      <Icon
        imgStyle={[styles.footerIcon, { marginRight: 0 }]}
        imgUrl={postFooterIcons[3].imageUrl}
      />
    </View>
  </View>
);
const Icon = ({ imgStyle, imgUrl }) => (
  <TouchableOpacity>
    <Image style={imgStyle} source={{ uri: imgUrl }} />
  </TouchableOpacity>
);
const Likes = ({ post }) => (
  <View style={styles.likesContainer}>
    <Text style={styles.likesText}>
      {post.likes.toLocaleString("en")} likes
    </Text>
  </View>
);
const Caption = ({ post }) => (
  <View style={styles.captionContainer}>
    <Text style={styles.captionTextContainer}>
      <Text style={{ fontWeight: "600" }}>{post.user}</Text>
      <Text> {post.caption}</Text>
    </Text>
  </View>
);
const CommentCaption = ({ post }) => (
    <View style={styles.captionContainer}>
  {!!post.comments.length && <Text style={{ color: "grey" }} numberOfLines={1}>
    View {post.comments.length > 1 ? " all" : ""} {post.comments.length}
    {post.comments.length > 1 ? " comments" : " comment"}
  </Text>}
  </View>
);
const Comments = ({post})=>(
    <>
    {
        post.comments.map((comment, index)=>(
            <View key={index} style={styles.commentContainer}>
                <Text style={styles.commentText}>
                    <Text style={styles.commentTextUser}>{comment.user}</Text>{' '}
                    {comment.comment}

                </Text>
            </View>
        ))
    }
    </>
)

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 30,
  },
  userDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  postImage: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginRight: 6,
    borderWidth: 1.6,
    borderColor: "#ff8501",
  },
  userText: {
    color: "white",
    fontWeight: "900",
  },
  postHeaderContainer: {
    margin: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  postFullImageContainer: {
    width: "100%",
    height: 450,
  },
  postFullImage: {
    height: "100%",
    resizeMode: "cover",
  },
  footerIcon: {
    width: 33,
    height: 33,
    marginRight: 20,
  },
  postFooterContainer: {
    marginHorizontal: 2,
    marginTop: 10,
  },
  footerIconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  likesContainer: {
    flexDirection: "row",
    marginTop: 4,
  },
  likesText: {
    color: "white",
    fontWeight: "600",
  },
  captionContainer: {
    marginTop: 5,
  },
  captionTextContainer: {
    color: "white",
  },
  commentText:{
      color:'white',
  },
  commentTextUser:{
      fontWeight:'600'
  },
  commentContainer:{
      flexDirection:'row',
      marginTop:5,
  }
});
