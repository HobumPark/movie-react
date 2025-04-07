
import '../../css/MoviePreview/MoviePreviewList.css'
import MoviePreview from './MoviePreview.js'
import moment from 'moment'

function MoviePreviewList(props){
     // moviePreviewList가 null 또는 undefined일 경우 빈 배열을 반환하도록 처리
     const moviePreviewList = props.moviePreviewList || [];

    const moviePreviewMap = moviePreviewList.map(
        (data)=>(<MoviePreview no={data.no} title={data.title}
                  writer={data.writer} write_date={moment(data.write_date).format('YYYY-MM-DD')}
                  attach={data.attach} hits={data.hits}/>)
    )
    return(
        <div id='movie-preview-list'>
            <div id='movie-preview-header'>
                <span>번호</span>
                <span>제목</span>
                <span>글쓴이</span>
                <span>글쓴날짜</span>
                <span>첨부</span>
                <span>조회수</span>
            </div>
            {moviePreviewMap}
        </div>
    )
}

export default MoviePreviewList;