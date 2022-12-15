import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
import ImageResize from "quill-image-resize-module-react";
import EditIcon from "../img/edit.png";
import DeleteIcon from "../img/delete.png";
import Errormessage from "../components/Errormessage";
import usePost from "../hooks/usePost";
import ReactDropdown from "react-dropdown";
import "../style/style.css";
import "react-dropdown/style.css";
import LoadingScreen from "../components/LoadingScreen";

ReactQuill.Quill.register("modules/imageResize", ImageResize);

const Font = ReactQuill.Quill.import("formats/font");
Font.whitelist = ["roboto"];

ReactQuill.Quill.register(Font, true);

const initialize = {
  title: "",
  content: "",
};

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.title || "");
  const [title, setTitle] = useState(state?.desc || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "thong-tin-du-hoc");

  const [isEdit, setIsEdit] = React.useState(false);
  const initialValues = initialize;
  const [formValues, setFormValues] = useState(initialValues);
  const { handleCreatePost, post, isLoading } = usePost();
  const [dropdownOption, setDropdown] = useState("Du học Hàn Quốc");
  const DropdownOptions = [
    "Du học Hàn Quốc",
    "Du học Đài Loan",
    "Du hoc Trung Quốc",
    "Du hoc Úc",
    "Du hoc Đức",
  ];
  const defalutValueDropdown = DropdownOptions[0];

  const navigate = useNavigate();

  const ref = useRef();

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", value);
  formData.append("category", cat);
  formData.append("type", dropdownOption);

  const editorContainerRef = React.useRef();

  const handleChange = (e) => {
    console.log(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    formData.append("file", file);

    try {
      handleCreatePost(formData);
      // navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleDeleteImage = () => {
    setFile((pre) => pre === "");
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
    <>
      {isLoading ? <LoadingScreen /> : null}
      <div className="add">
        <div className="content">
          <input
            type="text"
            placeholder="Tiêu đề bài viết"
            // value={value}
            onChange={(e) => setTitle(e.target.value)}
            // required={isEdit}
            // disabled={!isEdit}N
          />
          {initialValues === "" ? <Errormessage /> : null}
          <div className="editorContainer">
            <ReactQuill
              ref={editorContainerRef}
              className="editor"
              name="editor"
              theme="snow"
              value={value}
              onChange={setValue}
              // onChange={(e) => setTitle(e.target.formValues.content)}
              modules={{
                toolbar: toolbarOptions,
                imageResize: {
                  parchment: ReactQuill.Quill.import("parchment"),
                  modules: ["Resize", "DisplaySize"],
                },
              }}
              // required={isEdit}
              // disabled={!isEdit}
            />
          </div>
          {initialValues === "" ? <Errormessage /> : null}
        </div>
        <div className="menu">
          <div className="item">
            <div style={{ display: "flex" }}>
              {" "}
              <h1>Đăng tải</h1>
              {file ? (
                <div onClick={() => handleDeleteImage()}>
                  {" "}
                  <img
                    style={{ width: 22, marginLeft: "160px" }}
                    src={DeleteIcon}
                    alt="delete"
                  />
                </div>
              ) : null}
            </div>

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
                  value=""
                  onChange={handleChange}
                />

                <label className="file" htmlFor="file">
                  Đăng tải ảnh thumbnail
                </label>
              </>
            ) : (
              <img src={file} style={{ width: 200, marginBottom: 20 }} />
            )}
            <div style={{ display: "flex" }}>
              <div className="buttons">
                {/* <button>Save as a draft</button> */}
                <button onClick={handleClick}>Đăng bài</button>
              </div>

              {/* <div style={{ marginLeft: "5px" }} onClick={() => handleEdit()}>
              <img src={EditIcon} alt="edit" style={{ width: 22 }} />
            </div> */}
            </div>
          </div>
          <div className="item">
            <h1>Đề mục</h1>
            <div className="cat">
              <div className="dropdown">
                <div>
                  <input
                    type="radio"
                    checked={cat === "thong-tin-du-hoc"}
                    name="cat"
                    value="thong-tin-du-hoc"
                    id="art"
                    onChange={(e) => setCat(e.target.value)}
                  />
                  <label htmlFor="art">Thông tin du học</label>
                </div>

                <ReactDropdown
                  className="dropdownOptions"
                  options={DropdownOptions}
                  value={dropdownOption}
                  onChange={setDropdown}
                />
              </div>
            </div>
            <div className="cat">
              <input
                type="radio"
                checked={cat === "tin-tuc"}
                name="cat"
                value="tin-tuc"
                id="science"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="science">Tin tức</label>
            </div>
            <div className="cat">
              <input
                type="radio"
                checked={cat === "van-hoa-cac-nuoc"}
                name="cat"
                value="van-hoa-cac-nuoc"
                id="technology"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="technology">Văn hoá các nước</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Write;
