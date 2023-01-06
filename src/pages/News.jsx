import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { vi } from "date-fns/locale";
import "react-tabs/style/react-tabs.css";
import useNews from "../hooks/useNews";
import LoadingScreen from "../components/LoadingScreen";
import "../style/style.css";
import Edit from "../img/edit.png";
import DeleteIcon from "../img/delete.png";
import { confirmAlert } from "react-confirm-alert";
import usePost from "../hooks/usePost";

const News = () => {
  const { news, handleGetNews, isLoading, handleDeleteNews, totalPage } =
    useNews();

  const [currentPage, setCurrentPage] = useState(1);

  const cat = "tin-tuc";
  useEffect(() => {
    handleGetNews(currentPage, cat);
  }, [currentPage]);
  // console.log(totalPage)

  const handleAlertDeleteNews = (id) => {
    confirmAlert({
      title: "Bạn có chắc muốn xóa bài?",
      buttons: [
        {
          label: "Đồng ý",
          onClick: () => handleDeleteNews(id),
        },
        {
          label: "Không",
        },
      ],
    });
  };

  return (
    <main id="main" data-aos="fade-up">
      {isLoading ? <LoadingScreen /> : null}
      <section className="breadcrumbs">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <h2 style={{ fontWeight: "bold" }}>Tin Tức</h2>
          </div>
        </div>
      </section>

      <section className="inner-page">
        <div className="container">
          <p style={{ marginBottom: 30, marginTop: 30 }}>
            Tổng hợp các thông tin du học Hàn Quốc mới nhất, cập nhật liên tục.
            Giúp các bạn học sinh, sinh viên đến gần hơn với ước mơ du học của
            mình.
          </p>

          {news.map((item) => {
            return (
              <div
                key={item?._id}
                className="row list-news"
                style={{
                  borderBottom: "1px solid #e6e6e6",
                  marginTop: 20,
                  paddingBottom: 5,
                  marginBottom: 10,
                }}
              >
                <div className="col-md-4 img-news">
                  <img
                    src={item?.thumbnail_url}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      paddingLeft: 12,
                      paddingRight: 12,
                    }}
                  />
                </div>
                <div className="col-md-8 description">
                  <Link
                    to={`/${item.metaUrl}`}
                    className="news-title"
                    style={{
                      marginBottom: 5,
                      marginTop: 10,
                      fontSize: 20,
                      color: "black",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    <p>{item?.title}</p>
                  </Link>

                  <p
                    style={{
                      fontSize: 12,
                      marginBottom: 10,
                      marginTop: 5,
                    }}
                  >
                    🗓️{" "}
                    {formatDistanceToNow(new Date(item.createdAt), {
                      addSuffix: true,
                      locale: vi,
                    })}{" "}
                    -{" "}
                    <span style={{ color: "#2f9931", fontWeight: "bold" }}>
                      MK Group
                    </span>
                  </p>
                  <p
                    className="des-news"
                    style={{ fontSize: "14px" }}
                    dangerouslySetInnerHTML={{ __html: item?.description }}
                  ></p>
                </div>
                <div className="EditNews" style={{ display: "flex" }}>
                  <Link to={`/write/${item?._id}`}>
                    <img
                      src={Edit}
                      alt="edit"
                      style={{ height: 25, marginRight: 5 }}
                    />
                  </Link>

                  <div onClick={() => handleAlertDeleteNews(item?._id)}>
                    <img src={DeleteIcon} alt="delete" style={{ height: 25 }} />
                  </div>
                </div>
              </div>
            );
          })}

          {/* Load more button */}
          {currentPage < totalPage ? (
            <div className="row ">
              <div className="col-md-12 d-flex align-items-center justify-content-center">
                <button
                  className="btn btn-primary"
                  style={{
                    marginTop: 30,
                    marginBottom: 30,
                    fontSize: 18,
                    paddingLeft: 30,
                    paddingRight: 30,
                  }}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Xem Thêm
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
};

export default News;
