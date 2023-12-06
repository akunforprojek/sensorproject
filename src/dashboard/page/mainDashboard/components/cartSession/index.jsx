import {useState,useEffect} from 'react';
import LineChartApi from '../../../../components/LineChartApi';
import LineChartGetar from '../../../../components/LineChartGetar';


const ActualDataSession = () =>{
    const [data, setData] = useState({})
    function getData(){
        try{
            // setData({
            //     suhu : 30,
            //     kelembapan : 40,
            //     gas : 600,
            //     api : 90,
            //     gempa : {
            //         x : 0.1,
            //         y : 0.1,
            //         z : 0.1
            //     }
            // })
        }catch(e){
            console.log(e);
        }
    }

    useEffect(() =>{
        getData();
    },[]);

    console.log(data['suhu']);
    return (
        <div className="container-fluid pt-5">
            <p className='pt-5' style={{ fontSize: '1.82vw', fontWeight: 'bold',color:'#4D4D4D' }}>Statistik</p>
            <div className="row g-1">
                <div className="col-12 col-md-6">
                    <div className="card me-3 mb-5" style={{boxShadow: '0px 0px 5px 5px rgba(0, 0, 0, 0.1)'}}>
                        <LineChartApi/>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="card ms-3 mb-5" style={{boxShadow: '0px 0px 5px 5px rgba(0, 0, 0, 0.1)'}}>
                        <LineChartGetar />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActualDataSession;