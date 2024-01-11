import { Fragment, useState, useEffect } from 'react';
import NavBar from '../../components/navBar';
import ActualDataSession from './components/actualDataSession';
import CartSession from './components/cartSession/index';

const Index = () => {
  const [formattedDate, setFormattedDate] = useState(
    new Date().toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })
  );

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    const intervalId = setInterval(() => {
      setFormattedDate(
        new Date().toLocaleString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        })
      );
    }, 1000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Fragment>
      <NavBar />
      <div className="container-fluid p-0">
        <div className="row g-2">
          <div className="col-0 col-md-4"></div>
          <div className="col-12 col-md-4 text-center" style={{ color: '#4D4D4D' }}>
            <p style={{ margin: 'auto', fontSize: windowWidth < 768 ? '7.2vw' : '3.65vw' }}>Realtime</p>
            <p style={{ margin: 'auto', fontSize: windowWidth < 768 ? '7.2vw' : '3.65vw' }}>Statistics <i>Records</i></p>
            <p
              style={{
                color: 'white',
                backgroundColor: '#4D4D4D',
                borderRadius: '2vw',
                width: '75%',
                fontSize: windowWidth < 768 ? '3.6vw' : '1.56vw',
              }}
              className="mx-auto mb-4"
            >
              {formattedDate}
            </p>
          </div>
          <div className="col-0 col-md-4"></div>
        </div>
      </div>
      <div className="home-wrapper">
        <section id='actualData'>
          <ActualDataSession />
        </section>
        <section id='cartSession'>
          <CartSession />
        </section>
      </div>
    </Fragment>
  );
};

export default Index;
