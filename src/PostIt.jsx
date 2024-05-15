import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import "./index.css";

const PostIt = () => {
  const colorArray = ["#ffff99", "#ff32b2", "#a9edf1", "#74ed4b"];

  const [showTextAreas, setShowTextAreas] = useState(false);

  const [postIts, setPostIts] = useState([
    {
      title: "sources i used",
      content:
        "i used angela yu's complete 2024 web development bootcamp and codebro's react dev course",
      color: "#ffff99",
    },
    {
      title: "possible additions",
      content:
        "are you learning react also? i would love to get your help in improving this project a possible improvement might be a custom color picker!",
      color: "#ff32b2",
    },
  ]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  function randomColor() {
    let random = Math.floor(Math.random() * colorArray.length);
    return colorArray[random];
  }

  const handleButtonClick = () => {
    setShowTextAreas(true);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setShowTextAreas(false);
      setEditingIndex(null);
      setTitle("");
      setContent("");
    }
  };

  const handleAddPostIts = (title, content) => {
    const newPostIt = {
      title,
      content,
      color: randomColor(),
    };

    setPostIts((prevPostIts) => [...prevPostIts, newPostIt]);
    setShowTextAreas(false);
  };

  const handleAddClick = () => {
    handleAddPostIts(title, content);
    setTitle("");
    setContent("");
  };

  const handleDelete = (index) => {
    setPostIts(postIts.filter((_, i) => i !== index));
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setTitle(postIts[index].title);
    setContent(postIts[index].content);
  };

  const handleSaveEdit = () => {
    const updatedPostIts = [...postIts];
    updatedPostIts[editingIndex] = {
      ...updatedPostIts[editingIndex],
      title,
      content,
    };
    setPostIts(updatedPostIts);
    setEditingIndex(null);
    setTitle("");
    setContent("");
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <div className="container">
        {postIts.map((postIt, index) => (
          <div
            key={index}
            className="post-it"
            style={{ backgroundColor: postIt.color }}
          >
            {editingIndex === index ? (
              <div>
                <textarea
                  className="edit-textarea edit-title"
                  placeholder="Title"
                  rows="2"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></textarea>
                <textarea
                  className="edit-textarea edit-content"
                  placeholder="Content"
                  rows="4"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <button className="save-button" onClick={handleSaveEdit}>
                  Save
                </button>
                <p className="information-text">
                  press esc to quit click to edit
                </p>
              </div>
            ) : (
              <div>
                <h1 className="post-it-title">{postIt.title}</h1>
                <p className="post-it-content">{postIt.content}</p>
                <button
                  className="edit-button"
                  onClick={() => handleEditClick(index)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(index)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            )}
          </div>
        ))}
        <div className="add-post-it">
          {!showTextAreas && (
            <button onClick={handleButtonClick} className="new-button">
              +
            </button>
          )}
          {showTextAreas && (
            <div>
              <textarea
                className="add-textarea"
                placeholder="title"
                rows="1"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></textarea>
              <textarea
                className="add-textarea"
                placeholder="content"
                rows="10"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
              <br />
              <button className="add-button" onClick={handleAddClick}>
                Add
              </button>
              <p className="information-text">press Esc to quit</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PostIt;
