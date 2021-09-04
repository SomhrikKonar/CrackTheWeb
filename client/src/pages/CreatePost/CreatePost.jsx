import { EditorState, convertToRaw } from "draft-js";
import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import Storage from "../../firebase";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "../../axios.js";
import "./createPost.css";
import successImg from "./images/Component 1.svg";
import failureImg from "./images/Component 2.svg";

function CreatePost() {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [editor, setEditor] = useState(() => EditorState.createEmpty());
  const [files, setFiles] = useState([]);
  const [keyword, setKeyword] = useState("html");
  const [success, setSuccess] = useState("");
  const [showSuccess, setShowSuccess] = useState("");
  let imagesUrl = [];

  //image callback
  function imageCallback(file) {
    setFiles((prevState) => [
      ...prevState,
      { file: file, localLink: URL.createObjectURL(file) },
    ]);
    return new Promise((resolve, reject) => {
      resolve({ data: { link: URL.createObjectURL(file) } });
    });
  }

  //handling image upload in firebase
  async function handleDataUpload() {
    console.log(title);

    //checking the final images from the editor

    const finalImages = convertToRaw(editor?.getCurrentContent()).entityMap;
    console.log("finalImages", finalImages);

    // for (let img in finalImages) {
    //   let blob;
    //   blob = (await fetch(finalImages[img].data.src));
    // }

    // let finalFiles = [];
    // files.map((file) => {
    //   console.log(file.localLink);
    //   for (const img in finalImages) {
    //     console.log(finalImages[img].data.src);
    //     if (file.localLink === finalImages[img].data.src) {
    //       finalFiles.push(file);
    //     }
    //   }
    // });

    // console.log(finalFiles);

    //uploading images in firebase
    if (title) {
      if (files.length > 0) {
        console.log("files", files);
        const storageRef = Storage.ref(`${title}`);

        files.map((file, index) => {
          const imgRef = storageRef.child(`/${file.file.name}`);
          imgRef.put(file.file).then(() => {
            imgRef
              .getDownloadURL()
              .then((res) => {
                imagesUrl.push(res);
                if (index === files.length - 1) {
                  handleUploadInDb();
                }
              })
              .catch((err) => console.log(err));
          });
        });
      } else {
        console.log("entering");
        handleUploadInDb();
      }
    }
  }

  //push details in a variable
  function handleUploadInDb() {
    let imgIndex = 0;
    let editData = [];
    const allDetails = convertToRaw(editor?.getCurrentContent()).blocks;
    const nonBlankDetails = allDetails.filter((detail) => detail.text !== "");

    nonBlankDetails.map((detail, index) => {
      let text = detail.text;
      let styles = detail.inlineStyleRanges;
      let key = detail.key;
      let type = detail.type;
      console.log("index", index);
      console.log("nonBlankDetails.length-1", nonBlankDetails.length - 1);
      if (type !== "atomic" && text.length > 0) {
        editData.push({
          text: text,
          styles: styles,
          key: key,
          type: type,
        });
        if (index === nonBlankDetails.length - 1) {
          handleAxiosUpload(editData);
        }
      } else if (type === "atomic" && files[imgIndex]) {
        editData.push({
          imageName: files[imgIndex].file.name,
          imageLink: imagesUrl[imgIndex],
          key: key,
        });
        imgIndex = imgIndex + 1;
        if (index === nonBlankDetails.length - 1) {
          handleAxiosUpload(editData);
        }
      }
    });

    //using axios to make the final push
    function handleAxiosUpload(editorialData) {
      console.log("entered axios");
      axios
        .post("/addBlog", {
          title: title,
          description: description,
          keyword: keyword,
          editor: editorialData,
          createdBy: "ninja",
        })
        .then((res) => {
          setTitle("");
          setEditor("");
          setDescription("");
          imagesUrl.length = 0;
          editData.length = 0;
          setFiles([]);
          console.log("res.data", res.data);
          if (!res.data.driver) {
            setSuccess("true");
            setShowSuccess("true");
            setTimeout(() => {
              setSuccess("");
            }, 3000);
            setTimeout(() => {
              setShowSuccess("");
            }, 2000);
          } else {
            setSuccess("false");
            setShowSuccess("false");
            setTimeout(() => {
              setShowSuccess("");
            }, 2000);
            setTimeout(() => {
              setSuccess("");
            }, 3000);
          }
        })
        .catch((err) => {
          setSuccess("false");
          setShowSuccess("false");
          setTimeout(() => {
            setShowSuccess("");
          }, 2000);
          setTimeout(() => {
            setSuccess("");
          }, 3000);
          console.log(err);
        });
    }
  }

  return (
    <div className="create__post__container">
      {success === "true" ? (
        <>
          <div className="success__background" />
          <div
            className={`success__displayer flex__container show__success__displayer
            `}
            style={{ animation: `${showSuccess ? "fadeIn" : "fadeOut"} 1s` }}
          >
            <img src={successImg} alt="Success" />
            <div className="success__msg">USER ADDED SUCCESSFULLY.</div>
          </div>
        </>
      ) : (
        success === "false" && (
          <>
            <div className="success__background" />
            <div
              className={`success__displayer flex__container
                 show__success__displayer
              `}
              style={{ animation: `${showSuccess ? "fadeIn" : "fadeOut"} 1s` }}
            >
              <img
                src={failureImg}
                alt="failed"
                style={{ height: "135px", width: "135px" }}
              />
              <div className="success__msg">Blog Couldn't be uploaded</div>
            </div>
          </>
        )
      )}
      <div className="post__title">
        <div className="label">Title</div>
        <textarea
          className="title__textarea"
          value={title}
          onChange={(e) =>
            e.target.value.length < 150
              ? setTitle(e.target.value)
              : alert("Title cannot have more than 150 characters")
          }
        />
      </div>
      <div className="post__description">
        <div className="label">Description</div>
        <textarea
          className="description__textarea"
          value={description}
          onChange={(e) =>
            e.target.value.length < 600
              ? setDescription(e.target.value)
              : alert("Description cannot have more than 600 characters")
          }
        />
      </div>
      <div className="keywords__container">
        <div className="keyword__header label">
          What is your blog based on ?
        </div>
        <div className="checkboxes__container">
          <div className="checkbox__container">
            <input
              type="checkbox"
              className="checkboxField"
              value="html"
              checked={keyword === "html" ? true : false}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <label>HTML</label>
          </div>
          <div className="checkbox__container">
            <input
              type="checkbox"
              className="checkboxField"
              value="css"
              checked={keyword === "css" ? true : false}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <label>CSS</label>
          </div>
          <div className="checkbox__container">
            <input
              type="checkbox"
              className="checkboxField"
              value="js"
              checked={keyword === "js" ? true : false}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <label>JS</label>
          </div>
          <div className="checkbox__container">
            <input
              type="checkbox"
              className="checkboxField"
              value="react"
              checked={keyword === "react" ? true : false}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <label>React</label>
          </div>
          <div className="checkbox__container">
            <input
              type="checkbox"
              className="checkboxField"
              value="vue"
              checked={keyword === "vue" ? true : false}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <label>Vue</label>
          </div>
        </div>
      </div>
      <div className="post__body">
        <div className="label">Editor</div>
        <div className="body__textarea">
          <Editor
            editorState={editor}
            onEditorStateChange={setEditor}
            onChange={(e) => console.log(e)}
            toolbar={{
              image: {
                urlEnabled: true,
                uploadEnabled: true,
                uploadCallback: imageCallback,
              },
            }}
          />
        </div>
      </div>
      <button className="submit__button" onClick={handleDataUpload}>
        submit
      </button>
    </div>
  );
}

export default CreatePost;
