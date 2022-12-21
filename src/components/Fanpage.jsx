import React from "react";

export default function Fanpage() {
  return (
    <div className="container col-md-4 FB-Fanpage" style={{ marginTop: 40 }}>
      <h5
        className="align-items-center"
        style={{
          borderBottom: "1px solid #2f9931",
          marginBottom: 15,
        }}
      >
        Facebook fanpage
      </h5>

      <div className="row ">
        <iframe
          src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FDuHocMKGROUP&tabs=timeline&width=420&height=300&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId=810266060395549"
          width="420"
          height="300"
          style={{ border: "none", overflow: "hidden" }}
          scrolling="no"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        ></iframe>
      </div>
    </div>
  );
}


