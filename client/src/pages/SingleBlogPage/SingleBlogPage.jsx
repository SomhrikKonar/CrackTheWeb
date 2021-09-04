import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import axios from "../../axios.js";
import "./SingleBlogPage.css";
function SingleBlogPage() {
  const [content, setContent] = useState();
  const [styles, setStyles] = useState();
  const [code, setCode] = useState();
  useEffect(() => {
    const fullPath = window.location.pathname;
    const path = fullPath.substr(
      fullPath.lastIndexOf("/") + 1,
      fullPath.length
    );
    axios
      .get(`/getBlog/${path}`)
      .then((res) => {
        handleStyles(res.data[0].editor, res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleStyles(data, rawData) {
    let styleObj = {};
    let styleArr = [];
    data.map((content, index) => {
      content.styles.map((style) => {
        let styleArr = style.style.split("-");
        let key = styleArr[0];
        styleObj = {
          ...styleObj,
          [key === "CODE"
            ? "background"
            : key === "BOLD"
            ? "fontWeight"
            : key === "fontsize"
            ? "fontSize"
            : key]:
            key === "BOLD"
              ? "bold"
              : key === "CODE"
              ? "#bbbbbb"
              : key === "fontSize" || key === "fontsize"
              ? `${styleArr[1]}px`
              : styleArr[1],
          [key === "CODE" && "padding"]: "15px 15px",
          [key === "CODE" && "minHeight"]: "60px",
          [key === "CODE" && "fontSize"]: "20px",
          [key === "CODE" && "fontWeight"]: "500",
        };
      });

      styleArr.push(styleObj);
    });
    setStyles(styleArr);
    setContent(rawData);
  }
  return (
    <div className="blogPageContainer">
      <div
        style={{
          background: "grey",
          position: "fixed",
          left: 0,
          right: 0,
          top: 0,
        }}
      >
        <Navbar />
      </div>

      <div className="blogContainer">
        <div className="blogHeader">{content?.title}</div>
        <div className="blogBody flexContainer">
          {content?.editor.map((text, index) =>
            text.imageName ? (
              <img
                height="100%"
                width="100%"
                className="text imageContainer"
                src={text.imageLink}
                alt={text.imageName}
              />
            ) : (
              <div className="text" style={text.text && styles[index]}>
                {text.text}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleBlogPage;
