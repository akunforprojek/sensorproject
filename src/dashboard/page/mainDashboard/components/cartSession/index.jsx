import {useState,useEffect} from 'react';
import LineChartApi from '../../../../components/LineChartApi';
import LineChartGetar from '../../../../components/LineChartGetar';


const ActualDataSession = () =>{
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="container-fluid pt-5">
            <p className='pt-5' style={{ fontSize:window.innerWidth < 768 ? '3.2vw' : '1.82vw', fontWeight: 'bold',color:'#4D4D4D' }}>Statistik</p>
            <div className="row g-1">
                <div className="col-12 col-md-6">
                    <div className="card mb-5" style={{boxShadow: '0px 0px 5px 5px rgba(0, 0, 0, 0.1)', marginRight : window.innerWidth < 768 ? 'auto' : '2vw'}}>
                        <LineChartApi/>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="card mb-5" style={{boxShadow: '0px 0px 5px 5px rgba(0, 0, 0, 0.1)', marginLeft : window.innerWidth < 768 ? 'auto' : '2vw'}}>
                        <LineChartGetar />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActualDataSession;