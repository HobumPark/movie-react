
import '../../css/MovieRunning/Current.css'
import CurrentTheaterList from './CurrentTheaterList';
import CurrentMovieInfo from './CurrentMovieInfo';
import { useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import moment from 'moment';

function Current(){
    const location = useLocation();
    const navigate = useNavigate();

    const [region,setRegion]=useState('서울')//1
    const [district,setDistrict]=useState('노원')//1
    const [date,setDate]=useState(moment().format('YYYY-MM-DD'))//기본 오늘날짜

    useEffect(()=>{
        //alert('Current새로고침!')
        
        // 쿼리 문자열이 없다면, 자동으로 쿼리 문자열을 추가한 URL로 리디렉션
        const today = moment().format('YYYY-MM-DD')
        if (!location.search) {
            //alert('첫진입!')
            navigate(`/movie/running/current.naver?region=서울&district=노원&date=${today}`);
        }else{
            //alert('메뉴 선택!')

            const queryObj = queryString.parse(window.location.search)
            console.log(queryObj)
            setRegion(queryObj.region)
            setDistrict(queryObj.district)
            
            if (queryObj.date) {
                console.log("Date 항목이 있습니다:", queryObj.date);
                setDate(queryObj.date); // date 값을 상태로 설정

                navigate(`/movie/running/current.naver?region=${queryObj.region}&district=${queryObj.district}&date=${queryObj.date}`);

            } else {
                console.log("Date 항목이 없습니다.");
                setDate(date)

                navigate(`/movie/running/current.naver?region=${queryObj.region}&district=${queryObj.district}&date=${date}`);
            }
        }
        
    },[])

    return(
        <div id='current'>
            <h1>현재 상영 영화</h1>
            <CurrentTheaterList/>
        </div>
    )
}

export default Current;