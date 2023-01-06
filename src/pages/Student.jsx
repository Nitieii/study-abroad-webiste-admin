import { useEffect, useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import "../style/style.css"
import Upload from "../img/uploadicon.png"
import Delete from "../img/deletebtn.png"
import Editbtn from "../img/editbtn.png"
import useUploader from "../hooks/useUploader";
import ReactDropdown from "react-dropdown";
import "react-dropdown/style.css";

const Students = () => {

  const { isLoading, file, handleUploadImg, handleGetImage, handleDeleteImage } = useUploader()
  const fileTypes = ["JPEG", "PNG", "GIF"];
  const [selectFile, setFile] = useState(null)
  const [cat, setCat] = useState("du-hoc-han-quoc")
  const DropdownOptions = [
    { value: "du-hoc-han-quoc", label: "Du học Hàn Quốc" },
    { value: "du-hoc-dai-loan", label: "Du học Đài Loan" },
    { value: "du-hoc-trung-quoc", label: "Du hoc Trung Quốc" },
    { value: "du-hoc-uc", label: "Du hoc Úc" },
    { value: "du-hoc-duc", label: "Du hoc Đức" },
  ];

  const handleChange = (file) => {
    setFile(file.target.files[0])
    // console.log(selectFile)
  }

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("files", selectFile)
    formData.append("category", cat)
    handleUploadImg(formData)
  }
  useEffect(() => {
    handleGetImage("du-hoc-han-quoc")
  }, [])
  console.log(file)

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

        <h1
          style={{
            marginTop: 30,
            marginBottom: 10
          }}
        >Đăng tải ảnh</h1>
        <hr style={{ color: "#909690" }} />

        <input type="file" name="file" id="file" multiple accept="image/*" style={{ display: 'none' }} onChange={handleChange} />
        <div className="dropImages">
          <div >
            <label htmlFor="file" className="iconUpload">
              <img src={Upload} alt="upload-icon" />
              <p
                style={{ fontWeight: '600', fontSize: 20 }}
              >Nhấn vào để đăng ảnh</p>
            </label>

          </div>
        </div>
        <div className="submit">
          <div className="dropdown">
            <ReactDropdown
              className="dropdownOptions"
              options={DropdownOptions}
              value={cat}
              onChange={(e) => setCat(e.value)}
            />
          </div>
          <div className="btn-submit" onClick={handleSubmit}>
            <p style={{ color: 'white' }}>Đăng ảnh</p>
          </div>
        </div>


        <div className="attached-files">
          <div className="wrap-file">
            <h4>Tệp đính kèm</h4>
            <p style={{ fontSize: 12, paddingTop: 5, color: "#909690" }}>Các tệp tin và ảnh đã được đính kèm vào dự án</p>
          </div>
          <div>
            <ul className="header-box">
              <li className="header-list"><h5>Tên tệp</h5></li>
              <li className="header-list"><h5>Xem trước</h5></li>
              <li className="header-list"><h5>Dung Lượng</h5></li>
              <li className="header-list"><h5>Ngày đăng</h5></li>
              <li className="header-list"></li>
            </ul>
          </div>
          <div className="imgList-std">
            {file.map((items) => (
              <div key={items._id}

              >
                <ul className="items-std">
                  <li className="list-items"><p>Test-img.png</p></li>
                  <li className="list-items"><img src={items?.url} alt="" className="img-std" width={87} height={60} /></li>
                  <li className="list-items"><p>200KBs</p></li>
                  <li className="list-items">05/01/2023</li>
                  <li className="list-items">
                    <a 
                    style={{ display: 'flex', alightItems: 'center' }} 
                    onClick={() => {
                      handleDeleteImage(items._id)
                    }}>
                      <img src={Delete} alt="" />
                      <p style={{ color: 'red' }}>Xóa ảnh</p>
                    </a>
                  </li>
                  <li className="list-items">
                    <div style={{ display: 'flex', alightItems: 'center' }}>
                      <img src={Editbtn} alt="" />
                      <p style={{ color: '#2f9931', marginLeft: 5 }}>Chỉnh sửa</p>
                    </div>
                  </li>
                </ul>
              </div>
            ))}
          </div>

        </div>
      </section>
    </main >
  );
};

export default Students;
