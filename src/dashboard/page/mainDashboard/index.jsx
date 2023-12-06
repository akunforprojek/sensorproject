/* eslint-disable */
import { Fragment } from 'react';
import NavBar from '../../components/navBar';
import ActualDataSession from './components/actualDataSession';
import CartSession from './components/cartSession/index';

const index = () => {
  // Get current date and time
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return (
    <Fragment>
      <NavBar />
      <div className="container-fluid p-0">
        <div className="row g-2">
          <div className="col-0 col-md-4"></div>
          <div className="col-12 col-md-4 text-center" style={{ color: '#4D4D4D' }}>
            <p style={{ margin: 'auto', fontSize: '3.65vw' }}>Realtime</p>
            <p style={{ margin: 'auto', fontSize: '3.65vw' }}>Statistics <i>Records</i></p>
            <p
              style={{ color: 'white', backgroundColor: '#4D4D4D', borderRadius: '2vw', width: '75%',fontSize:'1.56vw' }}
              className='mx-auto mb-4'
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
        {/* <section id='produk'>
                    <Produk />
                </section>
                <section id="hubungiKami">
                    <Footer />
                </section> */}
      </div>
    </Fragment>
  );
}

export default index;
