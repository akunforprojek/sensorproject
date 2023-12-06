import { useState, useEffect } from 'react';
import './index.css';
import AnimationNumberDisplay from '../../../../../shared/animation/animasiAngka'

const ActualDataSession = () => {
  const [data, setData] = useState({});
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  function getData() {
    try {
      setData({
        suhu: 30,
        kelembapan: 40,
        gas: 600,
        api: 90,
        gempa: {
          x: 0.1,
          y: 0.1,
          z: 0.1,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  return (
    <div className="container-fluid ">
      <div className="row g-4">
        <div className="col-12 col-md-4" style={{ color: '#4D4D4D' }}>
          <p style={{ fontSize: '1.82vw', fontWeight: 'bold' }}>Sensor Api</p>
          <div className="card  " style={{boxShadow: '0px 0px 5px 5px rgba(0, 0, 0, 0.1)'}}>
            <div
              className="d-flex justify-content-between align-items-center my-auto pt-3 px-5"
              style={{ height: 'max-content' }}
            >
              <p style={{ fontSize: '1.56vw', color: '#4D4D4D' }}>Suhu</p>
              <AnimationNumberDisplay targetNumber={data['suhu']} style={{ fontSize: '4.16vw', color: '#4D4D4D' }}></AnimationNumberDisplay>
            </div>
          </div>
          <div className="card  " style={{ margin: '2.5vw 0 0 0',boxShadow: '0px 0px 5px 5px rgba(0, 0, 0, 0.1)' }}>
            <div
              className="d-flex justify-content-between align-items-center my-auto pt-3 px-5"
              style={{ height: 'max-content' }}
            >
              <p style={{ fontSize: '1.56vw', color: '#4D4D4D' }}>Gas</p>
              <AnimationNumberDisplay targetNumber={data['gas']} style={{ fontSize: '4.16vw', color: '#4D4D4D' }}></AnimationNumberDisplay>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          {windowWidth >  768 && (
            <p style={{ opacity: 0, cursor: 'default', fontSize: '1.82vw' }}>space</p>
          )}
          <div className="card  " style={{boxShadow: '0px 0px 5px 5px rgba(0, 0, 0, 0.1)'}}>
            <div
              className="d-flex justify-content-between align-items-center my-auto pt-3 px-5"
              style={{ height: 'max-content' }}
            >
              <p style={{ fontSize: '1.56vw', color: '#4D4D4D' }}>Kelembapan</p>
              <AnimationNumberDisplay targetNumber={data['kelembapan']} style={{ fontSize: '4.16vw', color: '#4D4D4D' }}></AnimationNumberDisplay>
            </div>
          </div>
          <div className="card  " style={{ margin: '2.5vw 0 0 0',boxShadow: '0px 0px 5px 5px rgba(0, 0, 0, 0.1)' }}>
            <div
              className="d-flex justify-content-between align-items-center my-auto pt-3 px-5"
              style={{ height: 'max-content' }}
            >
              <p style={{ fontSize: '1.56vw', color: '#4D4D4D' }}>api</p>
              <AnimationNumberDisplay targetNumber={data['api']} style={{ fontSize: '4.16vw', color: '#4D4D4D' }}></AnimationNumberDisplay>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <p style={{ fontSize: '1.82vw',textAlign : window.innerWidth <  768 ? 'left' : 'right', fontWeight: 'bold', color: '#4D4D4D' }}>
            Sensor Gempa
          </p>
          <div className="card my-1" style={{boxShadow: '0px 0px 5px 5px rgba(0, 0, 0, 0.1)'}}>
            <div className="px-5 py-5" style={{ minHeight: '20.05vw' }}>
              <p style={{ fontSize: '1.56vw', color: '#4D4D4D' }}>Gempa</p>
              <div className="pt-5 data d-flex justify-content-between align-items-center" style={{ fontSize: '2.5vw', width:'27vw' }}>
                <p className='me-2' style={{ color: '#4D4D4D', borderRight: '3px solid #4D4D4D', minWidth: '30%' }}>
                  X: {data['gempa'] ? data['gempa']['x'] : -1}
                </p>
                <p style={{ color: '#4D4D4D', borderRight: '3px solid #4D4D4D', width: 'max-content', minWidth: '30%' }}>
                  Y: {data['gempa'] ? data['gempa']['y'] : -1}
                </p>
                <p style={{ color: '#4D4D4D', padding: '0 1vw'}}>
                  Z: {data['gempa'] ? data['gempa']['z'] : -1}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActualDataSession;
