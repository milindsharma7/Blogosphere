import { Link } from 'react-router-dom'

function Posts({title,summary,cover,name,updatedAt,_id}) {
  const date = new Date(updatedAt);
  date.setHours(date.getHours() + 5)
  date.setMinutes(date.getMinutes() + 30)
  return (
      <div className="post">
        <div className="image">
          <img src = {cover}/>
        </div>
        <div className="texts">
          <div className="heading">
            <Link to={`/post/${_id}`}>{title}</Link>
          </div>
          <div className="info">
            <div className="author">@{name}</div>
            <div className='time'>Updated: {date.toUTCString().substring(0,22)}</div>
          </div>
          <div className="para">{summary}</div>
        </div>
      </div>
  )
}

export default Posts