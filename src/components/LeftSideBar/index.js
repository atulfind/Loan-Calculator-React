import React, {useEffect, useState} from 'react';
import './index.scss';

const LeftSideBar = ({shouldUpdade}) => {
  const [state, setstate] = useState([])

  useEffect(() => {
    let history = localStorage.getItem('history');
    if(history){
      setstate(JSON.parse(history));
    }
  }, [shouldUpdade]);


  return (
    <section className="left-bar">
      <div className="header-fixed">
        <h4>History</h4>
      </div>
      <ul className="history">
       {
         state.reverse().map((history, index)=> {
           return(
            <li className="row" key={index}>
              <div className="input-values col-2">
                <div className="">
                  <div className="title">Loan Amount</div>
                  <div className="sub-title">{history.amount}</div>
                </div>
                <div className="">
                  <div className="title">Number of Months</div>
                  <div className="sub-title">{history.months}</div>
                </div>
              </div>
              <ul className="interest-details col-2">
                <li className="col-3">
                  <div className="title">Rate</div>
                  <div className="sub-title">{history.interestRate}</div>
                </li>
                <li className="col-3">
                  <div className="title">Monthly Payment</div>
                  <div className="sub-title">{history.monthlyPayment}</div>
                </li>
                <li className="col-3">
                  <div className="title">NOS Payment</div>
                  <div className="sub-title">{history.numPayments}</div>
                </li>
              </ul>
            </li>
           )
         })
        }
      </ul>
    </section>
  )
}

export default LeftSideBar;
