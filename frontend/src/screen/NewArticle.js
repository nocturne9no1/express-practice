import { useState } from "react";
import axios from "axios";

const NewArticle = () => {
  const [title, setTitle] = useState('');
  const [writer, setWriter] = useState('');
  const [content, setContent] = useState('');

  const _handleTitleChange = (e) => {
    setTitle(e.target.value);
  }
  const _handleWriterChange = (e) => {
    setWriter(e.target.value);
  }
  const _handleContentChange = (e) => {
    setContent(e.target.value);
  }
  const _handleDoneBtn = () => {
    axios({
      method: 'post',
      url: 'http://localhost:3001/article',
      data: {
        title: title,
        writer: writer,
        content: content,
      }
    })
      .then(() => {
        console.log('yes');
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div className="new-article-wrap">
      <input type="text" value={title} onChange={(e) => _handleTitleChange(e)}/>
      <input type="text" value={writer} onChange={(e) => _handleWriterChange(e)}/>
      <textarea value={content} onChange={(e) => _handleContentChange(e)}></textarea>
      <button onClick={() => _handleDoneBtn()}>Done</button>
    </div>
  )
}

export default NewArticle;