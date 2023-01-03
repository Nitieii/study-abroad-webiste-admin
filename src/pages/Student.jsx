import { useEffect, useState } from "react";
import WSPGallery from "../components/Gallery";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Fanpage from "../components/Fanpage";
import LoadingScreen from "../components/LoadingScreen";

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

const tabs = [
  {
    index: 0,
    title: "Du học Hàn Quốc",
  },
  {
    index: 1,
    title: "Du học Đài Loan",
  },
  {
    index: 2,
    title: "Du học Trung Quốc",
  },
  {
    index: 3,
    title: "Du học Đức",
  },
  {
    index: 4,
    title: "Du học Úc",
  },
];

const Students = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages(items);
    setLoading(false);
  }, []);

  return (
    <main id="main" data-aos="fade-up">
      {loading? <LoadingScreen/> : null}
      <section className="breadcrumbs">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <h2 style={{ fontWeight: "bold" }}>Góc Du Học Sinh</h2>

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

          <div className="row">
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
                      return (
                        <TabPanel key={index}>
                          <WSPGallery galleryImages={images} />
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
            </div>

            <Fanpage />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Students;
