import { useEffect, useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import "../style/style.css";
import Upload from "../img/uploadicon.png";
import Delete from "../img/deletebtn.png";
import useUploader from "../hooks/useUploader";
import ReactDropdown from "react-dropdown";
import "react-dropdown/style.css";
import CloseBtn from "../img/closebtn.png";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import usePost from "../hooks/usePost";
import { UilPlus } from "@iconscout/react-unicons";
import PlusIcon from "../img/plus.svg";
import cancelIcon from "../img/cancelIcon.svg";
// import { ReactComponent as PlusIcon } from "../img/plus.svg";

const tabs = [
  {
    index: 0,
    title: "Du học Hàn Quốc",
    type: "du-hoc-han-quoc",  
  },
  {
    index: 1,
    title: "Du học Đài Loan",
    type: "du-hoc-dai-loan",
  },
  {
    index: 2,
    title: "Du học Trung Quốc",
    type: "du-hoc-trung-quoc",
  },
  {
    index: 3,
    title: "Du học Đức",
    type: "du-hoc-duc",
  },
  {
    index: 4,
    title: "Du học Úc",
    type: "du-hoc-uc",
  },
];

const Students = () => {
  const {
    isLoading,
    file,
    handleUploadImg,
    handleGetImage,
    handleDeleteImage,
    handleLoadIMG,
  } = useUploader();
  const [cat, setCat] = useState("du-hoc-han-quoc");
  const [preview, setPreview] = useState([]);
  const [selectFile, setFile] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const {handleChangeSetType,type} = usePost();

  const DropdownOptions = [
    { value: "du-hoc-han-quoc", label: "Du học Hàn Quốc" },
    { value: "du-hoc-dai-loan", label: "Du học Đài Loan" },
    { value: "du-hoc-trung-quoc", label: "Du hoc Trung Quốc" },
    { value: "du-hoc-uc", label: "Du hoc Úc" },
    { value: "du-hoc-duc", label: "Du hoc Đức" },
  ];
  const fileList = Array.from(selectFile);

  const deletePre = (e) => {
    setPreview(preview.filter((val) => val.name !== e));
    for (let i = 0; i < fileList.length; i++) {
      if (fileList[i].name === e) {
        fileList.splice(i, 1);
        // console.log(fileList[i].name)
      }
    }
    setFile(fileList);
  };

  const handleChange = (e) => {
    if (e.target.files.length !== 0) {
      const objectFile = [];
      const createAt = new Date();
      for (let i = 0; i < e.target.files.length; i++) {
        const preImg = {
          url: URL.createObjectURL(e.target.files[i]),
          category: cat,
          name: e.target.files[i].name,
          createAt: createAt.getDate(),
          size: e.target.files[i].size,
          _id: Math.random() * 123,
        };
        objectFile.push(preImg);
      }
      setPreview([...objectFile]);
    }

    setFile(e.target.files);
  };
  
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("category", cat);
    for (let i = 0; i < selectFile.length; i++) {
      formData.append("files", selectFile[i]);
    }
    handleUploadImg(formData, preview);
    setPreview([]);
  };

  const handleCancelSubmit = () => {
    setPreview([]);
  }

  useEffect(() => {
    handleGetImage(type);
  }, [type]);

  console.log(file);
  return (
    <main id="main" data-aos="fade-up">
      {isLoading ? <LoadingScreen /> : null}
      <section className="breadcrumbs">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <h2 style={{ fontWeight: "bold" }}>Góc Du Học Sinh</h2>
          </div>
        </div>
      </section>

      <section className="inner-page-std">
        {/* <h1
          style={{
            marginTop: 30,
            marginBottom: 10,
          }}
        >
          Đăng tải ảnh
        </h1> */}

        <Tabs
          selectedIndex={selectedIndex}
          onSelect={(tabIndex) => setSelectedIndex(tabIndex)}
        >
          <div
            className="col-lg-8"
            style={{ marginTop: "10px", marginBottom: "16px" }}
          >
            <TabList>
              {tabs.map((tab) => (
                <Tab
                  key={tab.index}
                  style={{
                    color: selectedIndex === tab.index ? "#2f9931" : "black",
                    borderTop:
                      selectedIndex === tab.index
                        ? "2px solid #2f9931"
                        : "none",
                    borderLeft:
                      selectedIndex === tab.index
                        ? "2px solid #2f9931"
                        : "none",
                    borderRight:
                      selectedIndex === tab.index
                        ? "2px solid #2f9931"
                        : "none",
                    fontWeight: selectedIndex === tab.index ? "600" : "normal",
                    fontFamily: "Roboto",
                  }}
                >
                  {tab.title}
                </Tab>
              ))}
            </TabList>
          </div>
          {/* <div className="btn-submit" style={{float:"right"}} onClick={handleSubmit}>
            <p style={{ color: "white" }}>Đăng ảnh</p>
          </div> */}
          {/* <hr style={{ color: "#909690" }} /> */}

          <input
            type="file"
            name="file"
            id="file"
            multiple
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleChange}
          />
          {/* {preview.length === 0 ? ( */}
          <div className="dropImages">
            <div>
              <label htmlFor="file" className="iconUpload">
                <img src={Upload} alt="upload-icon" />
                <p style={{ fontWeight: "600", fontSize: 20 }}>
                  Nhấn vào để đăng ảnh
                </p>
              </label>
            </div>
          </div>
          {/* ) : ( */}
          <div className="wrap-box">
            <div className="preview-box">
              {preview.map((img, index) => (
                <div
                  key={index}
                  style={{ position: "relative", marginRight: 15 }}
                >
                  <img
                    src={img?.url}
                    alt=""
                    className="preView-img"
                    onClick={() => {
                      console.log(selectFile);
                    }}
                  />
                  <a
                    onClick={() => {
                      deletePre(img.name);
                    }}
                  >
                    <img src={CloseBtn} alt="" className="close-btn" />
                  </a>
                </div>
              ))}
            </div>
          </div>
          {/* )} */}

          {preview.length !== 0 ? (
            <div className="submit">
              <div className="dropdown" >
                <ReactDropdown
                  className="dropdownOptions"
                  options={DropdownOptions}
                  value={cat}
                  onChange={(e) => setCat(e.value)}
                />
              </div>
              <div className="btn-cancelSubmit" onClick={handleCancelSubmit}>
                <img src={cancelIcon} alt="cancel" style={{width:"20px",marginRight:"5px"}}/>
                <p style={{ color: "red" }}>Hủy đăng ảnh</p>
              </div>
              <div className="btn-submit" onClick={handleSubmit}>
                <img src={PlusIcon} style={{width:"20px" ,marginRight:"5px"}}/>
                <p style={{ color: "white" }}>Đăng ảnh</p>
              </div>
            </div>
          ) : null}

          <div className="attached-files">
            <div className="wrap-file">
              <h4>Tệp đính kèm</h4>
              <p style={{ fontSize: 12, paddingTop: 5, color: "#909690" }}>
                Các tệp tin và ảnh đã được đính kèm vào dự án
              </p>
            </div>
            <div>
              <ul className="header-box">
                <li className="header-list">
                  <h5>Tên tệp</h5>
                </li>
                <li className="header-list">
                  <h5>Xem trước</h5>
                </li>

                <li className="header-list">
                  <h5>Ngày đăng</h5>
                </li>
                <li className="header-list"></li>
              </ul>
            </div>
            <div className="imgList-std">
              {tabs &&
                tabs.map((tab, index) => {
                  if (index === selectedIndex) {
                    handleChangeSetType(tab.type);

                    return (
                      <TabPanel key={index}>
                        {file.map((items) => (
                          <div key={items._id}>
                            <ul className="items-std">
                              <li className="list-items">
                                <p>Test-img.png</p>
                              </li>
                              <li className="list-items">
                                <img
                                  src={items?.url}
                                  alt=""
                                  className="img-std"
                                  width={87}
                                  height={60}
                                />
                              </li>

                              <li className="list-items">05/01/2023</li>
                              <li className="list-items">
                                <a
                                  style={{
                                    display: "flex",
                                    alightItems: "center",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    handleDeleteImage(items._id);
                                  }}
                                >
                                  <img src={Delete} alt="" />
                                  <p style={{ color: "red" }}>Xóa ảnh</p>
                                </a>
                              </li>
                            </ul>
                          </div>
                        ))}
                      </TabPanel>
                    );
                  }
                  return <TabPanel>{tab}</TabPanel>;
                })}
            </div>
          </div>
        </Tabs>
      </section>
    </main>
  );
};

export default Students;
