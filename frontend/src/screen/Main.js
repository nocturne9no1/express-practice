import React, { useState, useEffect } from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';

const Main = () => {
  const [articleList, setArticleList] = useState([]);
  console.log(articleList)
  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://127.0.0.1:3001/articles'
    })
      .then((res) => {
        setArticleList([...res.data]);
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <div className="board-wrap">
      <h2>Board</h2>
      <Link to="/new-article">NEW</Link>
      <table className="board-table">
        <colgroup>
          <col style={{width: '10%'}}/>
          <col style={{width: '60%'}}/>
          <col style={{width: '20%'}}/>
          <col style={{width: '10%'}}/>
        </colgroup>
        <thead>
          <tr>
            <th>No.</th>
            <th>Title.</th>
            <th>W.</th>
            <th>Cnt.</th>
          </tr>
        </thead>
        <tbody>
          {articleList.map((article) => <ArticleItem article={article} key={article.idx}/>)}
        </tbody>
      </table>
    </div>
  )
}

const ArticleItem = ({article}) => {
  return (
    <tr className="board-list-item">
      <td className="idx">{article.idx}</td>
      <td className="title">{article.title}</td>
      <td className="writer">{article.writer}</td>
      <td className="cnt">{article.view_cnt}</td>
    </tr>
  )
}

export default Main;