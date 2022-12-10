import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import ImageResize from "quill-image-resize-module-react";

ReactQuill.Quill.register("modules/imageResize", ImageResize);

const Font = ReactQuill.Quill.import("formats/font"); // <<<< ReactQuill exports it
Font.whitelist = ["roboto"]; // allow ONLY these fonts and the default
ReactQuill.Quill.register(Font, true);

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.title || "");
  const [title, setTitle] = useState(state?.desc || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const navigate = useNavigate();

  const ref = useRef();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    console.log("value", value);

    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
          })
        : await axios.post(`/posts/`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  // Disable spellcheck as component is mounted
  React.useEffect(() => {
    ref.current?.editor.root.setAttribute("spellcheck", "false");
  }, []);

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    [{ align: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent

    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    ["link", "image"],
  ];

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Tiêu đề bài viết"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            ref={ref}
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
            modules={{
              toolbar: toolbarOptions,
              imageResize: {
                parchment: ReactQuill.Quill.import("parchment"),
                modules: ["Resize", "DisplaySize"],
              },
            }}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Đăng tải</h1>
          {/* <span>
            <b>Status: </b> Draft
          </span> */}
          {/* <span>
            <b>Visibility: </b> Public
          </span> */}
          {!file ? (
            <>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept="image/*"
                name=""
                onChange={handleChange}
              />

              <label className="file" htmlFor="file">
                Đăng tải ảnh thumbnail
              </label>
            </>
          ) : (
            <img src={file} style={{ width: 200, marginBottom: 20 }} />
          )}

          <div className="buttons">
            {/* <button>Save as a draft</button> */}
            <button onClick={handleClick}>Đăng bài</button>
          </div>
        </div>
        <div className="item">
          <h1>Đề mục</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "art"}
              name="cat"
              value="art"
              id="art"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Thông tin du học</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "science"}
              name="cat"
              value="science"
              id="science"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="science">Tin tức</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "technology"}
              name="cat"
              value="technology"
              id="technology"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="technology">Văn hoá các nước</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
