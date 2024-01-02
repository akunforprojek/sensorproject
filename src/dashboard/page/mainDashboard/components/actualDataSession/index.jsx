import { useState, useEffect, useCallback } from 'react';
import './index.css';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import db from '../../../../constant/firebase';

const ActualDataSession = () => {
  const [data, setData] = useState({});
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const getData = async () => {
    try {
      const date = new Date();
      const currentMonth = date.getMonth() + 1;
      const currentDate = date.getDate();
      const dailyRef = collection(db, `statuses/${currentMonth}/${currentDate}`);
      const unsubscribe = onSnapshot(dailyRef, (snapshot) => {
        const items = [];
        snapshot.forEach((doc) => {
          items.push(doc.data());
        });
        const filteredData = items[items.length - 1];
        setData(filteredData);
      });
      return () => unsubscribe();
    } catch (error) {
      console.error('Error fetching data from Firestore:', error);
    }
  };
  
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
          <p style={{ fontSize: window.innerWidth < 768 ? '3.6vw' : '1.82vw', fontWeight: 'bold' }}>Sensor Api</p>
          <div className="card  " style={{ boxShadow: '0px 0px 5px 5px rgba(0, 0, 0, 0.1)' }}>
            <div
              className="d-flex justify-content-between align-items-center my-auto pt-3 px-5"
              style={{ height: 'max-content' }}
            >
              <p style={{ fontSize: window.innerWidth < 768 ? '3.1vw' : '1.56vw', color: '#4D4D4D' }}>Suhu</p>
              <p style={{ fontSize: window.innerWidth < 768 ? '8vw' : '4.16vw', color: '#4D4D4D' }}>{data['temperature']}</p>
            </div>
          </div>
          <div className="card  " style={{ margin: '2.5vw 0 0 0', boxShadow: '0px 0px 5px 5px rgba(0, 0, 0, 0.1)' }}>
            <div
              className="d-flex justify-content-between align-items-center my-auto pt-3 px-5"
              style={{ height: 'max-content' }}
            >
              <p style={{ fontSize: window.innerWidth < 768 ? '3.6vw' : '1.56vw', color: '#4D4D4D' }}>Gas</p>
              <p style={{ fontSize: window.innerWidth < 768 ? '8vw' : '4.16vw', color: '#4D4D4D' }}>{data['gas']}</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          {windowWidth > 768 && (
            <p style={{ opacity: 0, cursor: 'default', fontSize: window.innerWidth < 768 ? '3.6vw' : '1.82vw' }}>space</p>
          )}
          <div className="card  " style={{ boxShadow: '0px 0px 5px 5px rgba(0, 0, 0, 0.1)' }}>
            <div
              className="d-flex justify-content-between align-items-center my-auto pt-3 px-5"
              style={{ height: 'max-content' }}
            >
              <p style={{ fontSize: window.innerWidth < 768 ? '3.6vw' : '1.56vw', color: '#4D4D4D' }}>Kelembapan</p>
              <p style={{ fontSize: window.innerWidth < 768 ? '8vw' : '4.16vw', color: '#4D4D4D' }}>{data['humidity']}</p>
            </div>
          </div>
          <div className="card  " style={{ margin: '2.5vw 0 0 0', boxShadow: '0px 0px 5px 5px rgba(0, 0, 0, 0.1)' }}>
            <div
              className="d-flex justify-content-between align-items-center my-auto pt-3 px-5"
              style={{ height: 'max-content' }}
            >
              <p style={{ fontSize: window.innerWidth < 768 ? '3.6vw' : '1.56vw', color: '#4D4D4D' }}>Api</p>
              <p style={{ fontSize: window.innerWidth < 768 ? '8vw' : '4.16vw', color: '#4D4D4D' }}>{data['flame1']}</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <p style={{ fontSize: window.innerWidth < 768 ? '3.6vw' : '1.82vw', textAlign: window.innerWidth < 768 ? 'left' : 'right', fontWeight: 'bold', color: '#4D4D4D' }}>
            Sensor Gempa
          </p>
          <div className="card my-1" style={{ boxShadow: '0px 0px 5px 5px rgba(0, 0, 0, 0.1)' }}>
            <div className="px-5 py-5" style={{ minHeight: '20.05vw' }}>
              <p style={{ fontSize: window.innerWidth < 768 ? '3.6vw' : '1.56vw', color: '#4D4D4D' }}>Gempa</p>
              <div className="pt-5 data d-flex justify-content-between align-items-center" style={{ fontSize: window.innerWidth < 768 ? '5vw' : '2.5vw', width: window.innerWidth < 768 ? '70vw' : '27vw' }}>
                <p className='me-2' style={{ color: '#4D4D4D', borderRight: '3px solid #4D4D4D', minWidth: '30%' }}>
                  X: {data['magnitude'] ? data['magnitude'] : -1}
                </p>
                <p style={{ color: '#4D4D4D', borderRight: '3px solid #4D4D4D', width: 'max-content', minWidth: '30%' }}>
                  Y: {data['magnitude'] ? data['magnitude'] : -1}
                </p>
                <p style={{ color: '#4D4D4D', padding: '0 1vw' }}>
                  Z: {data['magnitude'] ? data['magnitude'] : -1}
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
