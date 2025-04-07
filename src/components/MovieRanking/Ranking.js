import '../../css/MovieRanking/Ranking.css'
import {useEffect, useState} from 'react';
import axios from 'axios';
import RankingFilter from './RankingFilter';
import $ from 'jquery';
import moment from 'moment';

function Ranking() {
    const [movieRankList, setMovieRankList] = useState([]); // movieRankList를 빈 배열로 초기화
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        getMovieRankList();
    }, []);

    const handleMouseOver = (e) => {
        setIsHovering(true);
        var idx = $(this).index();
        console.log($(this).html);
        console.log('over!');
    };

    const handleMouseOut = (e) => {
        setIsHovering(false);
        console.log('out!');
    };

    const getMovieRankList = async () => {
        axios.get('/api/v2/movie_weekly_rank.json')
            .then(response => {
                console.log(response);
                console.log(response.data.movie_res);
                setMovieRankList(response.data.movie_res);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const domesticRelease = () => {
        alert('국내개봉!');
        axios.get('/api/v2/movie_dometisc.json')
            .then(response => {
                console.log(response);
                console.log(response.data.movie_res);
                setMovieRankList(response.data.movie_res);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const foreignRelease = () => {
        alert('해외개봉!');
        axios.get('/api/v2/movie_foreign.json')
            .then(response => {
                console.log(response);
                console.log(response.data.movie_res);
                setMovieRankList(response.data.movie_res);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const weeklyRanking = () => {
        alert('주간랭킹!');
        axios.get('/api/v2/movie_weekly_rank.json')
            .then(response => {
                console.log(response);
                console.log(response.data.movie_res);
                setMovieRankList(response.data.movie_res);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const monthlyRanking = () => {
        alert('월간랭킹!');
        axios.get('/api/v2/movie_monthly_rank.json')
            .then(response => {
                console.log(response);
                console.log(response.data.movie_res);
                setMovieRankList(response.data.movie_res);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const yearlyRanking = () => {
        alert('년간랭킹!');
        axios.get('/api/v2/movie_yearly_rank.json')
            .then(response => {
                console.log(response);
                console.log(response.data.movie_res);
                setMovieRankList(response.data.movie_res);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const searchMovie = () => {
        alert('조회!');
        axios.get('/api/v2/movie_search_rank.json')
            .then(response => {
                console.log(response);
                console.log(response.data.movie_res);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const movieView = (movie_id) => {
        window.location.href = `/movie/view/main?id=${movie_id}&menu=1`;
    };

    const rankListMap = (movieRankList && movieRankList.length > 0 ? movieRankList.map(
        (data) => (
            <div id='movie-rank' className={`movie-rank-element`} key={data.index}
                onClick={() => movieView(data.movie_id)}>
                <div id='movie-rank-basic'>
                    <span id='rank-no'>{data.rank_no}</span>
                    <img src={`/images/cover/movie${data.movie_id}.jpg`} alt="Movie Cover"/>
                    <h1>{data.title}</h1>
                    <h2><span>관객수</span><b>{data.audience_count}</b></h2>
                </div>
                <div id={`movie-rank-hidden`}>
                    히든
                </div>
                <div id='movie-detail-info'>
                    <div>
                        <ul id='movie-detail-list'>
                            <li>
                                <span>관객수</span>
                                <span>{data.audience_count}</span>
                            </li>
                            <li>
                                <span>누적관객수</span>
                                <span>{data.audience_count}</span>
                            </li>
                            <li>
                                <span>배급사</span>
                                <span>{data.provider}</span>
                            </li>
                            <li>
                                <span>개봉일</span>
                                <span>{moment(data.opening_date).format('YYYY.MM.DD')}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    ) : (
        <p>데이터가 없습니다.</p> // 데이터가 없을 경우 보여줄 메시지
    ));

    return (
        <div id='ranking'>
            <RankingFilter
                domesticRelease={domesticRelease}
                foreignRelease={foreignRelease}
                weeklyRanking={weeklyRanking}
                monthlyRanking={monthlyRanking}
                yearlyRanking={yearlyRanking}
                searchMovie={searchMovie}
            />
            <div id='ad-contents'>
                <a href="#">
                    <img src='/images/ad/subscription.jpg' alt="Advertisement"/>
                </a>
            </div>
            {rankListMap}
        </div>
    );
}

export default Ranking;
