import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';

import Order from '../components/order/Order';

const ReactPdf = () => {
  const componentRef = useRef();

  return (
    <div>
      <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
      />
      <Order ref={componentRef}  />
    </div>
  );
};


export default ReactPdf