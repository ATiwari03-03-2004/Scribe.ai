import { useEffect, useRef, useState } from "react";

export default function MediaBlock(props) {
  const [mediaData, setMediaData] = useState({ src: "", type: "" });

  useEffect(() => {
    const entityKey = props.block.getEntityAt(0);
    if (entityKey) {
      const entity = props.contentState.getEntity(entityKey);
      const { src } = entity.getData();
      const type = entity.getType();
      setMediaData({ src, type });
    }
  }, [props.block, props.contentState]);

  let [alignment, setAlignment] = useState("center");
  let [dim, setDim] = useState({ height: "auto", width: "auto" });
  let [isClose, setIsClose] = useState(true);

  let mediaRef = useRef(null);

  useEffect(() => {
    if (mediaRef?.current?.offsetWidth && mediaRef?.current?.offsetHeight) {
      setDim(() => ({
        height: mediaRef?.current?.offsetHeight,
        width: mediaRef?.current?.offsetWidth,
      }));
    }
  }, []);

  let handleMedia = (e, str) => {
    if ("height" === str) {
      setDim((prev) => ({ height: e.target.value, width: prev.width }));
    } else if ("width" === str) {
      setDim((prev) => ({ height: prev.height, width: e.target.value }));
    } else if ("left" === str) {
      setAlignment("left");
    } else if ("center" === str) {
      setAlignment("center");
    } else {
      setAlignment("right");
    }
  };

  let handleDropDown = () => {
    setIsClose((prev) => !prev);
  };

  return (
    <>
      {mediaData.type === "IMAGE" ? (
        <>
          <div
            className="media-block"
            style={{
              textAlign: alignment,
              position: "relative",
              paddingLeft: "1.8rem",
            }}
          >
            <span
              className="material-symbols-outlined hover"
              title="Image Options"
              style={
                isClose
                  ? {
                      position: "absolute",
                      left: "0",
                      cursor: "pointer",
                      fontSize: "1.5rem",
                      backgroundColor: "#80808025",
                      zIndex: "100",
                    }
                  : {
                      position: "absolute",
                      left: "0",
                      cursor: "pointer",
                      fontSize: "1.5rem",
                      backgroundColor: "#80808060",
                      zIndex: "100",
                    }
              }
              onClick={handleDropDown}
            >
              more_vert
            </span>
            <img
              src={mediaData.src}
              ref={mediaRef}
              width={dim.width}
              height={dim.height}
            />
            {isClose ? null : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "9rem",
                  border: "1px solid black",
                  position: "absolute",
                  left: "0",
                  top: "1.5rem",
                }}
              >
                <button
                  style={{ cursor: "pointer" }}
                  onClick={(e) => handleMedia(e, "left")}
                >
                  Left Align
                </button>
                <button
                  style={{ cursor: "pointer" }}
                  onClick={(e) => handleMedia(e, "center")}
                >
                  Center Align
                </button>
                <button
                  style={{ cursor: "pointer" }}
                  onClick={(e) => handleMedia(e, "right")}
                >
                  Right Align
                </button>
                <button
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "baseline",
                  }}
                >
                  Height<b>:</b>&nbsp;
                  <input
                    onChange={(e) => handleMedia(e, "height")}
                    type="number"
                    value={dim.height}
                    style={{ width: "4rem" }}
                  />
                  px
                </button>
                <button
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "baseline",
                  }}
                >
                  Width<b>:</b>&nbsp;
                  <input
                    onChange={(e) => handleMedia(e, "width")}
                    type="number"
                    value={dim.width}
                    style={{ width: "4rem" }}
                  />
                  px
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <div
          style={{
            textAlign: alignment,
            width: "100%",
            position: "relative",
            paddingLeft: "1.8rem",
          }}
        >
          <span
            className="material-symbols-outlined hover"
            title="Video Options"
            style={
              isClose
                ? {
                    position: "absolute",
                    left: "0",
                    cursor: "pointer",
                    fontSize: "1.5rem",
                    backgroundColor: "#80808025",
                    zIndex: "100",
                  }
                : {
                    position: "absolute",
                    left: "0",
                    cursor: "pointer",
                    fontSize: "1.5rem",
                    backgroundColor: "#80808060",
                    zIndex: "100",
                  }
            }
            onClick={handleDropDown}
          >
            more_vert
          </span>
          <iframe
            src={mediaData.src}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ border: "none" }}
            ref={mediaRef}
            width={dim.width}
            height={dim.height}
          />
          {isClose ? null : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "10rem",
                border: "1px solid black",
                position: "absolute",
                left: "0",
                top: "1.5rem",
              }}
            >
              <button
                style={{ cursor: "pointer" }}
                onClick={(e) => handleMedia(e, "left")}
              >
                Left Align
              </button>
              <button
                style={{ cursor: "pointer" }}
                onClick={(e) => handleMedia(e, "center")}
              >
                Center Align
              </button>
              <button
                style={{ cursor: "pointer" }}
                onClick={(e) => handleMedia(e, "right")}
              >
                Right Align
              </button>
              <button
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "baseline",
                }}
              >
                Height<b>:</b>&nbsp;
                <input
                  onChange={(e) => handleMedia(e, "height")}
                  type="number"
                  value={dim.height}
                  style={{ width: "4rem" }}
                />
                px
              </button>
              <button
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "baseline",
                }}
              >
                Width<b>:</b>&nbsp;
                <input
                  onChange={(e) => handleMedia(e, "width")}
                  type="number"
                  value={dim.width}
                  style={{ width: "4rem" }}
                />
                px
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
