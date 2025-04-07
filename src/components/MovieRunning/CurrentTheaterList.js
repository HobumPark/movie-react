import '../../css/MovieRunning/CurrentTheaterList.css';
import {useState,useEffect} from 'react';
import Slider from 'react-slick';
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';

function CurrentTheaterList(){
    const location = useLocation();
    const navigate = useNavigate();

    const [menu,setMenu]=useState(1)
    const [date, setDate] = useState(new Date())
    const [month,setMonth] = useState(0)
    const [day,setDay] = useState(0)

    useEffect(()=>{
        getScreeningInformation()
    },[])

    const getScreeningInformation=async()=>{
        //alert('getScreeningInformation')
        console.log('getScreeningInformation')
        const queryObj = queryString.parse(window.location.search)
        console.log(queryObj)
        const region = queryObj.region
        const district = queryObj.district
        let date=''
        if(queryObj.date){
            date = queryObj.date
        }else{
            date = moment().format('YYYY-MM-DD')
        }
        
        //alert(region)
        //alert(district)
        //alert(date)
        console.log(region)
        console.log(district)
        console.log(date)


        await axios.get(`/api/v1/get/screening_info?region=${region}&district=${district}&date=${date}`)
        .then(response=>{
            console.log(response)
        })
        .catch(error=>{
            console.log(error)
        })
    }

    const selectDate=(date)=>{
        alert(date+' 날짜 선택!')

        const queryObj = queryString.parse(window.location.search)
        console.log(queryObj)

        navigate(`/movie/running/current.naver?region=${queryObj.region}&district=${queryObj.district}&date=${date}`);
        window.location.reload()
    }

    const getDateArray = (numDays) => {
        const dates = [];
        const today = new Date();
    
        for (let i = 0; i < numDays; i++) {
            const nextDate = new Date(today);
            nextDate.setDate(today.getDate() + i);
            dates.push(nextDate);
        }
    
        return dates;
    };

    const dates = getDateArray(10); // 오늘 날짜 기준으로 10개

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 10,
        slidesToScroll: 1,
    };

    return(
        <div id='current-theater-list-wrap'>
            <div id='location-list-wrap'>
                <ul id='location-list'>
                    <li>
                        <a href="#">
                            서울
                        </a>
                        <ul className='district-list'>
                            <li>
                                <a href="/movie/running/current.naver?region=서울&district=노원">
                                    노원
                                </a>
                            </li>
                            <li>
                                <a href="/movie/running/current.naver?region=서울&district=도곡">
                                    도곡
                                </a>
                            </li>
                            <li>
                                <a href="/movie/running/current.naver?region=서울&district=독산">
                                    독산
                                </a>
                            </li>
                            <li>
                                <a href="/movie/running/current.naver?region=서울&district=수락산">
                                    수락산
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">
                            경기/인천
                        </a>
                        <ul className='district-list'>
                            <li>
                                <a href="#">
                                    노원
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    도곡
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    독산
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    수락산
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">
                            충천/대전
                        </a>
                        <ul className='district-list'>
                            <li>
                                <a href="#">
                                    당진
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    대전
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    서산
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    아산
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">
                            전라/광주
                        </a>
                        <ul className='district-list'>
                            <li>
                                <a href="#">
                                    광주(백화점)
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    광주광산
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    광주첨단
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    군산나운
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">
                            경북/대구
                        </a>
                        <ul className='district-list'>
                            <li>
                                <a href="#">
                                    경주
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    대구광장
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    동성로
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    상인
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
                <div id='theater-info'>

                </div>
            </div>
            <div id='movie-date-pay-tab'>
                <div id='tab-btn'>
                    <button onClick={()=>setMenu(1)} className={`${menu==1? 'active':''}`}>상영시간표</button>
                    <button onClick={()=>setMenu(2)} className={`${menu==2? 'active':''}`}>요금안내</button>
                </div>
                <div id='tab-contents'>
                    {
                        menu===1?
                        <div id='movie-show-info'>
                            <h1>2024년</h1>
                            <Slider {...settings}>
                                {dates.map((date, index) => (
                                    <div key={index} className="date-item" onClick={()=>selectDate(`${moment(date).format('YYYY-MM-DD')}`)}>
                                        {`${date.getMonth() + 1}월 ${date.getDate()}일`}
                                    </div>
                                ))}
                            </Slider>
                        </div>:''
                    }
                    {
                        menu===2?
                        <div id='movie-pay-info'>
                            요금안내
                        </div>:''
                    }
                </div>
            </div>
            
        </div>
    )
}

export default CurrentTheaterList;