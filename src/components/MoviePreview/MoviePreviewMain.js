
import '../../css/MoviePreview/MoviePreviewMain.css'
import MoviePreviewList from './MoviePreviewList';
import Pagination from './Pagination';
import {useEffect,useState} from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';  // useAuth 훅 가져오기

function MoviePreviewMain(){
    const { isLoggedIn, setIsLoggedIn } = useAuth();  // 전역 상태와 업데이트 함수 가져오기
    
    const [moviePreviewList,setMoviePreviewList]=useState([])
    const [total,setTotal]=useState(0)
    const [boardPerPage,setBoardPerPage]=useState(10)
    const [currentPage,setCurrentPage]=useState(1)

    //
    useEffect(()=>{
        getMoviePreviewBoardList(1)
        getMoviePreviewBoardCount()
    },[])

    const getMoviePreviewBoardList=async(page)=>{
        axios.get(`/api/v4/movie_preview_list.json?page=${page}`)
        .then(response => {
        console.log(response);
        console.log(response.data.movie_preview_res);
        setMoviePreviewList(response.data.movie_preview_res)
        })
        .catch(error => {
        console.error(error);
        })
    }

    const getMoviePreviewBoardCount=async()=>{
        axios.get('/api/v4/movie_preview_count.json')
        .then(response => {
        console.log(response);
        console.log(response.data.movie_preview_res);
        console.log(response.data.movie_preview_res[0].cnt);
        setTotal(response.data.movie_preview_res[0].cnt)
        })
        .catch(error => {
        console.error(error);
        })
    }

    const pageMove=(page)=>{
        getMoviePreviewBoardList(page)
        setCurrentPage(page)
    }

    const moveWritePage=()=>{
        window.location.href='/movie/preview/write'
    }


    return(
        <div id='movie-preview-main'>
            <MoviePreviewList moviePreviewList={moviePreviewList}/>
            <Pagination total={total} boardPerPage={boardPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageMove={pageMove}/>
            {isLoggedIn? <button onClick={moveWritePage}>글쓰기</button>:''}
        </div>
    )
}

export default MoviePreviewMain;