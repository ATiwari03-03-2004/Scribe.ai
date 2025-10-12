import { AtomicBlockUtils } from "draft-js";

export default function Video(props) {
  let handleVideoURLEmbed = (URL) => {
    const contentState = props.editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "VIDEO",
      "IMMUTABLE",
      { src: URL }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(
      props.editorState,
      entityKey,
      " "
    );
    props.onChange(newEditorState);
  };

  let handleVideoURL = () => {
    const URL = prompt("Enter video URL to be embedded:");
    if (URL.length === 0) return;
    if (URL.includes("youtube.com") || URL.includes("youtu.be")) {
      const videoId = URL.match(
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/
      )?.[1];
      videoId
        ? handleVideoURLEmbed(`https://www.youtube.com/embed/${videoId}`)
        : null;
    } else if (URL.includes("vimeo.com")) {
      const videoId = URL.match(/vimeo\.com\/(\d+)/)?.[1];
      videoId
        ? handleVideoURLEmbed(`https://player.vimeo.com/video/${videoId}`)
        : null;
    } else if (URL.includes("dailymotion.com") || URL.includes("dai.ly")) {
      const videoId = URL.match(
        /(?:dailymotion\.com\/video\/|dai\.ly\/)([^_?/]+)/
      )?.[1];
      videoId
        ? handleVideoURLEmbed(
            `https://www.dailymotion.com/embed/video/${videoId}`
          )
        : null;
    } else {
        alert("Unsupported URL!!\nThe URL embedding is only supported for YouTube, Dailymotion, and Vimeo.")
    }
  };

  return (
    <>
      <button
        onMouseDown={(e) => e.preventDefault()}
        title="Embed Video"
        onClick={handleVideoURL}
        style={{ cursor: "pointer" }}
      >
        <span className="material-symbols-outlined">video_library</span>
      </button>
    </>
  );
}
