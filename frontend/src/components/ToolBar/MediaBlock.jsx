export default function MediaBlock(props) {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const { src } = entity.getData();
  const type = entity.getType();
  return (
    <>
      {type === "IMAGE" ? (
        <div
          className="media-block"
          style={{ textAlign: "center", width: "100%" }}
        >
          <img src={src} />
        </div>
      ) : (
        <div style={{ textAlign: "center", width: "100%" }}>
          <iframe
            width="520px"
            height="292px"
            src={src}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ border: "none" }}
          />
        </div>
      )}
    </>
  );
}
