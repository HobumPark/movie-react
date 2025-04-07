
import '../../css/download/Download.css'
import {QRCodeSVG} from 'qrcode.react';


function Download(){
    return(
        <div id='download'>
            <h1>다운로드</h1>
            <QRCodeSVG value={'http://www.cine21.com/'}/>
        </div>
    )
}

export default Download;