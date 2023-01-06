import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ImageResize from "quill-image-resize-module-react";
import EditIcon from "../img/edit.png";
import DeleteIcon from "../img/delete.png";
import Errormessage from "../components/Errormessage";
import usePost from "../hooks/usePost";
import ReactDropdown from "react-dropdown";
import "../style/style.css";
import "react-dropdown/style.css";
import LoadingScreen from "../components/LoadingScreen";
import useAlert from "../hooks/useAlert";
import { Hidden } from "@mui/material";

ReactQuill.Quill.register("modules/imageResize", ImageResize);

const Font = ReactQuill.Quill.import("formats/font");
Font.whitelist = ["roboto"];

ReactQuill.Quill.register(Font, true);

const Write = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);
  const [cat, setCat] = useState("thong-tin-du-hoc");
  const [valid, setValid] = useState(false);
  // const initialValues = initialize;
  // const [formValues, setFormValues] = useState(initialValues);
  const { handleCreatePost, post, isLoading, handleEditPost } = usePost();
  const { enqueueSnackbar } = useAlert();
  const DropdownOptions = [
    { value: "du-hoc-han-quoc", label: "Du học Hàn Quốc" },
    { value: "du-hoc-dai-loan", label: "Du học Đài Loan" },
    { value: "du-hoc-trung-quoc", label: "Du hoc Trung Quốc" },
    { value: "du-hoc-uc", label: "Du hoc Úc" },
    { value: "du-hoc-duc", label: "Du hoc Đức" },
  ];
  const defalutValueDropdown = "du-hoc-han-quoc";
  const [dropdownOption, setDropdown] = useState(defalutValueDropdown);
  const ref = useRef();
  const { id } = useParams();

  const currentPost = post.find((item) => item._id === id);


  const handleChange = (e) => {
    if (currentPost) {
      setFile(currentPost.thumbnail_url);
    }

    setFile(URL.createObjectURL(e.target.files[0]));
    setUploadFile(e.target.files[0]);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", value);
    formData.append("category", cat);
    formData.append("type", dropdownOption);
    formData.append("file", uploadFile);
    try {
      if (!file || !title || !value) {
        setValid(true);
        // handleSubmit()
        enqueueSnackbar("Bạn phải nhập tất cả dữ liệu", { variant: "error" });
        return;
      } else {
        if (currentPost) {
          handleEditPost(currentPost._id, formData);
          // handleSubmit();
        } else {
          handleCreatePost(formData);
          // handleSubmit();
        }
      }

      // navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteImage = () => {
    setFile((pre) => pre === "");
  };
  console.log(currentPost);
  // Disable spellcheck as component is mounted
  React.useEffect(() => {
    ref.current?.editor.root.setAttribute("spellcheck", "false");

    if (currentPost) {
      setFile(currentPost?.thumbnail_url);
      setTitle(currentPost?.title);
      setValue(currentPost?.description);
      setCat(currentPost.category);
      if (currentPost.category === "thong-tin-du-hoc") {
        setDropdown(currentPost?.type);
      }
    }
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
      <form>
        <div className="add">
          <div className="content">
            <input
              type="text"
              placeholder="Tiêu đề bài viết"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {!title && valid ? <Errormessage /> : null}
            <div className="editorContainer">
              <ReactQuill
                className="editor"
                name="editor"
                theme="snow"
                value={value}
                onChange={setValue}
                overflow={Hidden}
                modules={{
                  toolbar: toolbarOptions,
                  imageResize: {
                    parchment: ReactQuill.Quill.import("parchment"),
                    modules: ["Resize", "DisplaySize"],
                  },
                }}
              />
            </div>
            {!value && valid ? <Errormessage /> : null}
          </div>
          <div className="menu">
            <div className="item WrapThumbnail">
              <div style={{ display: "flex" }}>
                {" "}
                <h1>Đăng tải</h1>
                {file || currentPost?.thumbnail_url ? (
                  <div onClick={() => handleDeleteImage()}>
                    <img
                      style={{ width: 22, marginLeft: "160px" }}
                      src={DeleteIcon}
                      alt="delete"
                    />
                  </div>
                ) : null}
              </div>

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
                    required
                  />

                  <label className="file" htmlFor="file">
                    Đăng tải ảnh thumbnail
                  </label>
                  {/* {value === "" ? <Errormessage /> : null} */}
                </>
              ) : (
                <img src={file} style={{ width: 200, marginBottom: 20 }} />
              )}
              <div style={{ display: "flex" }}>
                <div className="buttons">
                  <button onClick={handleClick}>Đăng bài</button>
                </div>
              </div>
            </div>
            {!file && valid ? <Errormessage /> : null}
            <div className="item">
              <h1>Đề mục</h1>
              <div className="WrapCat">
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
                      onChange={(e) => setDropdown(e.value)}
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
                    onChange={(e) => {
                      setCat(e.target.value);
                      setDropdown("");
                    }}
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
                    onChange={(e) => {
                      setCat(e.target.value);
                      setDropdown("");
                    }}
                  />
                  <label htmlFor="technology">Văn hoá các nước</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Write;
