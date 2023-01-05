import { useEffect, useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import "../style/style.css"
import Upload from "../img/uploadicon.png"
import Delete from "../img/deletebtn.png"
import Editbtn from "../img/editbtn.png"
import useUploader from "../hooks/useUploader";
import { FileUploader } from "react-drag-drop-files";

const items = [
  {
    _id: 1,
    img: "https://duhocaddie.com/wp-content/uploads/2019/11/66323330_2377842775571114_8500744317583753216_n.jpg",
  },
  {
    _id: 2,
    img: "https://havico.edu.vn/wp-content/uploads/2021/08/Du-hoc-han-quoc-1.png",
  },
  {
    _id: 3,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ1b2pqaljJTfEo3t0bj9RMGAErAOPXHs9xg&usqp=CAU",
  },
  {
    _id: 4,
    img: "https://duhocvietglobal.com/wp-content/uploads/2019/03/quydinh_visaHQ.jpg",
  },
  {
    _id: 6,
    img: "https://vcdn1-vnexpress.vnecdn.net/2019/12/14/shutterstock-583601698-1576341-1633-5877-1576341968.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=3rCx3Y_inqV2AEm_DAR5Qw",
  },
  {
    _id: 7,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUTyfva_bD7HBix_a8ce2EsaeoblMz3vh6gA&usqp=CAU",
  },
  {
    _id: 8,
    img: "https://duhoc.thanhgiang.com.vn/sites/default/files/kho-khan-khi-du-hoc-han-quoc.jpg",
  },
  {
    _id: 9,
    img: "https://korea.net.vn/wp-content/uploads/2018/02/du-h%E1%BB%8Dc-sinh-hàn-quốc-e1589186665505.jpg",
  },
];

const Students = () => {

  const { isLoading, file, handleUploadImg, handleGetImage } = useUploader()
  const fileTypes = ["JPEG", "PNG", "GIF"];
  const [selectFile, setFile] = useState(null)
  const handleChange = (file) => {
    setFile(file)
    console.log(selectFile)
    const formData = new FormData();
    formData.append("files", selectFile)
    formData.append("category", "du-hoc-han-quoc")
    handleUploadImg(formData)
  }

  useEffect(() => {
    handleGetImage("du-hoc-han-quoc")
  }, [])
  console.log(file)
  return (
    <main id="main" data-aos="fade-up">
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
        <FileUploader 
          multiple={true}
          handleChange={()=>handleChange()}
          name="file"
          types={fileTypes}
        >
          <div className="dropImages">
            <div className="iconUpload">
              <img src={Upload} alt="upload-icon" />
              <p
                style={{ fontWeight: '600', fontSize: 20 }}
              >Nhấn vào để đăng ảnh</p>
            </div>
          </div>
        </FileUploader>



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
            {items.map((items) => (
              <div key={items._id}

              >
                <ul className="items-std">
                  <li className="list-items"><p>Test-img.png</p></li>
                  <li className="list-items"><img src={items.img} alt="" className="img-std" width={87} height={60} /></li>
                  <li className="list-items"><p>200KBs</p></li>
                  <li className="list-items">05/01/2023</li>
                  <li className="list-items">
                    <div style={{ display: 'flex', alightItems: 'center' }}>
                      <img src={Delete} alt="" />
                      <p style={{ color: 'red' }}>Xóa ảnh</p>
                    </div>
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
