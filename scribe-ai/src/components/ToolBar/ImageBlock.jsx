export default function ImageBlock(props) {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const { src } = entity.getData();
  const type = entity.getType();
  return (
    <div className="media-block" style={{textAlign: "center", width: '100%'}}>
      { type === "IMAGE" ? <img src={src} /> : <video></video> }
    </div>
  );
}
