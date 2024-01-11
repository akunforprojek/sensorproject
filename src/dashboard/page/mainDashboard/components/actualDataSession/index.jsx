
import { useState, useEffect } from 'react';
import './index.css';
import { getDatabase, ref, onValue } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import firebaseConfig from '../../../../constant/firebase';
import firebaseConfig2 from '../../../../constant/firebase2';

const firebaseApp = initializeApp(firebaseConfig, 'app1');
const db = getDatabase(firebaseApp);

const firebaseApp2 = initializeApp(firebaseConfig2, 'app2');
const db2 = getDatabase(firebaseApp2);

const ActualDataSession = () => {
  const [data, setData] = useState({});
  const [currentDate, setCurrentDate] = useState();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  var dataMagnitude = []
  var dataApi = []

  const getData = () => {
    try {
      const date = new Date();
      const currentMonth = date.getMonth() + 1;
      const currentDate = date.getDate();
      const currentYear = date.getFullYear();
      // const dailyRef = ref(db);
      const dailyRef = ref(db, 'device1');

      if (date != currentDate){
        dataMagnitude = []
        dataApi = []
        setCurrentDate(date);
      }
  
      const unsubscribe = onValue(dailyRef, (snapshot) => {
        const data = snapshot.val();
        dataMagnitude.push(data['Magnitude']);
        dataApi.push(data['Api2']);
        const totalMagnitude = dataMagnitude.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        const totalApi = dataApi.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        const avgMagnitude = totalMagnitude / dataMagnitude.length
        const avgApi2 = totalApi / dataApi.length

        const firestore2 = getFirestore(firebaseApp2);
        const dataToSave = {
          avgMagnitude,
          avgApi2,
        };
        const documentName = `${currentYear}-${currentMonth}-${currentDate}`;
        setDoc(doc(firestore2, 'dailyAverages',`${currentMonth}`,`${currentDate}`,`${currentYear}`), dataToSave);
        setData(data);
      });
  
      return () => unsubscribe();
    } catch (error) {
      console.error('Error fetching data from Realtime Database:', error);
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
          <p style={{ fontSize: window.innerWidth < 768 ? '3.6vw' : '1.82vw', fontWeight: 'bold' }}>Sensor Gempa</p>
          <div className="card  " style={{ boxShadow: '0px 0px 5px 5px rgba(0, 0, 0, 0.1)' }}>
            <div
              className="d-flex justify-content-between align-items-center my-auto pt-3 px-5"
              style={{ height: 'max-content' }}
            >
              <p style={{ fontSize: window.innerWidth < 768 ? '3.1vw' : '1.56vw', color: '#4D4D4D' }}>Suhu</p>
              <p style={{ fontSize: window.innerWidth < 768 ? '8vw' : '4.16vw', color: '#4D4D4D' }}>
                {data['Temperature'] ? data['Temperature'].toFixed(2) : 'N/A'}
              </p>            
            </div>
          </div>
          <div className="card  " style={{ margin: '2.5vw 0 0 0', boxShadow: '0px 0px 5px 5px rgba(0, 0, 0, 0.1)' }}>
            <div
              className="d-flex justify-content-between align-items-center my-auto pt-3 px-5"
              style={{ height: 'max-content' }}
            >
              <p style={{ fontSize: window.innerWidth < 768 ? '3.6vw' : '1.56vw', color: '#4D4D4D' }}>Gas</p>
              <p style={{ fontSize: window.innerWidth < 768 ? '8vw' : '4.16vw', color: '#4D4D4D' }}>
                {data['Gas'] ? data['Gas'].toFixed(2) : 'N/A'}
              </p>
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
              <p style={{ fontSize: window.innerWidth < 768 ? '8vw' : '4.16vw', color: '#4D4D4D' }}>
                {data['Humidity'] ? data['Humidity'].toFixed(2) : 'N/A'}
              </p>
            </div>
          </div>
          <div className="card  " style={{ margin: '2.5vw 0 0 0', boxShadow: '0px 0px 5px 5px rgba(0, 0, 0, 0.1)' }}>
            <div
              className="d-flex justify-content-between align-items-center my-auto pt-3 px-5"
              style={{ height: 'max-content' }}
            >
              <p style={{ fontSize: window.innerWidth < 768 ? '3.6vw' : '1.56vw', color: '#4D4D4D' }}>Gempa</p>
              <p style={{ fontSize: window.innerWidth < 768 ? '8vw' : '4.16vw', color: '#4D4D4D' }}>
                {data['Magnitude'] ? data['Magnitude'].toFixed(2) : 'N/A'}
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <p style={{ fontSize: window.innerWidth < 768 ? '3.6vw' : '1.82vw', textAlign: window.innerWidth < 768 ? 'left' : 'right', fontWeight: 'bold', color: '#4D4D4D' }}>
            Sensor Api
          </p>
          <div className="card my-1" style={{ boxShadow: '0px 0px 5px 5px rgba(0, 0, 0, 0.1)' }}>
            <div className="px-5 py-5 ps-4" style={{ minHeight: '20.05vw' }}>
              <p style={{ fontSize: window.innerWidth < 768 ? '3.6vw' : '1.56vw', color: '#4D4D4D' }}>Api</p>
              <div className="pt-5 data d-flex justify-content-between align-items-center" style={{ fontSize: window.innerWidth < 768 ? '7vw' : '2vw', width: window.innerWidth < 768 ? '70vw' : '27vw' }}>
                <p className='me-2' style={{ color: '#4D4D4D', borderRight: '3px solid #4D4D4D', minWidth: '30%' }}>
                  X: {data['Api2'] ? data['Api2'].toFixed(2) : 'N/A'}
                </p>
                <p style={{ color: '#4D4D4D', borderRight: '3px solid #4D4D4D', width: 'max-content', minWidth: '30%' }}>
                  Y: {data['Api3'] ? data['Api3'].toFixed(2) : 'N/A'}
                </p>
                <p style={{ color: '#4D4D4D', padding: '0 1vw' }}>
                  Z: {data['Api4'] ? data['Api4'].toFixed(2) : 'N/A'}
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
