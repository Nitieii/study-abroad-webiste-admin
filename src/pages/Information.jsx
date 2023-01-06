import { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { vi } from "date-fns/locale";
import "react-tabs/style/react-tabs.css";
import Fanpage from "../components/Fanpage";
import "../style/style.css";
import usePost from "../hooks/usePost";
import Edit from "../img/edit.png";
import DeleteIcon from "../img/delete.png";
import { lineClampStyle } from "../components/styles";
import ClampLines from "react-clamp-lines";
import LoadingScreen from "../components/LoadingScreen";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

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

const Information = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const {
    post,
    handleCreatePost,
    handleGetPost,
    handleDeletePost,
    isLoading,
    type,
    handleChangeSetType,
    totalPage,
  } = usePost();
  const cat = "thong-tin-du-hoc";
  // const type = 'du-hoc-han-quoc'
  // const informationPost = post.filter(item => item.category === "thong-tin-du-hoc" && item.type === type)
  // console.log(informationPost)
  const inforpost = post.filter((item) => item._id);
  // const getPost = () => {
  //   handleGetPost(currentPage,cat,type)
  // }
  console.log(inforpost);
  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      handleGetPost(currentPage, cat, type);
    }
    return () => {
      isCancelled =true
    }
    // getPost()
  }, [currentPage, type]);

  const handleAlertDeletePost = (id) => {
    confirmAlert({
      title: "Bạn có chắc muốn xóa bài?",
      buttons: [
        {
          label: "Đồng ý",
          onClick: () => handleDeletePost(id),
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
          <div className="header-infor">
            <h2 style={{ fontWeight: "bold" }}>Thông Tin Du Học</h2>
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

          <div className="row body-infor">
            <div className="col-lg-8">
              <Tabs
                selectedIndex={selectedIndex}
                onSelect={(tabIndex) => setSelectedIndex(tabIndex)}
              >
                <TabList>
                  {tabs.map((tab) => (
                    <Tab
                      key={tab.index}
                      style={{
                        color:
                          selectedIndex === tab.index ? "#2f9931" : "black",
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
                        fontWeight:
                          selectedIndex === tab.index ? "600" : "normal",
                        fontFamily: "Roboto",
                      }}
                    >
                      {tab.title}
                    </Tab>
                  ))}
                </TabList>

                {tabs &&
                  tabs.map((tab, index) => {
                    if (index === selectedIndex) {
                      handleChangeSetType(tab.type);

                      return (
                        <TabPanel key={index}>
                          {post.map((item) => {
                            return (
                              <div
                                key={item?._id}
                                className="row"
                                style={{
                                  borderBottom: "1px solid #e6e6e6",
                                  marginTop: 20,
                                  marginBottom: 10,
                                  paddingBottom: 1,
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <div className="col-md-4 img-list">
                                  <img
                                    className="img-infor"
                                    src={item?.thumbnail_url}
                                    alt=""
                                  />
                                </div>

                                <div
                                  className="col-md-8 description-infor"
                                  style={{ width: "63%" }}
                                >
                                  <div className="wrapper">
                                    <Link
                                      className="news-title"
                                      style={{
                                        marginBottom: 5,
                                        marginTop: 10,
                                        fontSize: 20,
                                        color: "black",
                                        fontWeight: 600,
                                        textDecoration: "none",
                                      }}
                                      to={`/write/${item?._id}`}
                                    >
                                      {item?.title}
                                    </Link>

                                    <p
                                      style={{
                                        fontSize: 12,
                                        marginBottom: 10,
                                        marginTop: 5,
                                      }}
                                    >
                                      🗓️{" "}
                                      {formatDistanceToNow(
                                        new Date(item.createdAt),
                                        {
                                          addSuffix: true,
                                          locale: vi,
                                        }
                                      )}{" "}
                                      -{" "}
                                      <span
                                        style={{
                                          color: "#2f9931",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        MK Group
                                      </span>
                                    </p>
                                    <div
                                      className="line-clamp"
                                      dangerouslySetInnerHTML={{
                                        __html: item?.description,
                                      }}
                                    ></div>
                                  </div>
                                </div>
                                <div style={{ display: "flex" }}>
                                  <Link to={`/write/${item?._id}`}>
                                    <img
                                      src={Edit}
                                      alt="edit"
                                      style={{ height: 25, marginRight: 5 }}
                                    />
                                  </Link>
                                  <div
                                    onClick={() =>
                                      handleAlertDeletePost(item?._id)
                                    }
                                  >
                                    <img
                                      src={DeleteIcon}
                                      alt="delete"
                                      style={{ height: 25 }}
                                    />
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </TabPanel>
                      );
                    }

                    return <TabPanel>{tab}</TabPanel>;
                  })}
                <TabPanel></TabPanel>
                <TabPanel>
                  <h2>Any content 2</h2>
                </TabPanel>
                <TabPanel>
                  <h2>Any content 3</h2>
                </TabPanel>
                <TabPanel>
                  <h2>Any content 3</h2>
                </TabPanel>
                <TabPanel>
                  <h2>Any content 3</h2>
                </TabPanel>
              </Tabs>

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

            {/* <Fanpage /> */}
          </div>
        </div>
      </section>
    </main>
  );
};

export default memo(Information);
