import React, { useEffect, useState, useCallback, useRef } from 'react';
import './index.scss';
import InputRange from 'react-input-range';
import "react-input-range/lib/css/index.css";
import LeftSideBar from '../LeftSideBar';

const MainBox = () => {

  const [state, setstate] = useState({
    amount: 500,
    months: 6,
    interestRate: 0,
    monthlyPayment: 0,
    numPayments: 0
  });

  const url = `https://ftl-frontend-test.herokuapp.com/interest?amount=${state.amount}&numMonths=${state.months}`;

  useEffect(() => {
    localStorage.removeItem('history');
  }, [])


  useEffect(() => {
    const abortController = new AbortController();
    fetch(url, { signal: abortController.signal })
      .then(response => response.json())
      .then(responseJson => {
        const obj = {
          interestRate: +responseJson.interestRate,
          monthlyPayment: +responseJson.monthlyPayment.amount,
          numPayments: +responseJson.numPayments
        }
        setstate({ ...state, ...obj });
        addToLocalStorageArray('history', { ...state, ...obj });
      }).catch(err => {

      })
    return () => {
      abortController.abort();
    };
  }, [url]);

  var addToLocalStorageArray = (name, value) => {
    let existing = localStorage.getItem(name);
    existing = existing ? JSON.parse(existing) : [];
    existing.push(value);
    localStorage.setItem(name, JSON.stringify(existing));
  }

  return (
    <React.Fragment>
      <LeftSideBar shouldUpdade={state.monthlyPayment} />
      <main className="main">
        <div className="input-form">
          <form>
            <div className="form-group">
              <InputRange
                maxValue={5000}
                minValue={500}
                value={state.amount}
                onChange={amount => setstate({ ...state, amount })}
                formatLabel={(val)=> `$${val}`}
              />
              <label>Loan Amount</label>
            </div>
            <div className="form-group">
              <InputRange
                maxValue={24}
                minValue={6}
                value={state.months}
                onChange={months => setstate({ ...state, months: months })}
              />
              <label>Loan Duration (in months)</label>
            </div>
          </form>
          <div className="current-status">
            <h4>Interest Details</h4>
            <div className="row">
              <div className="col-2"> Interest Rate  </div>
              <div className="col-2"> {`$ ${state.interestRate}`} </div>
            </div>
            <div className="row">
              <div className="col-2"> Monthly Payment  </div>
              <div className="col-2"> {`$ ${state.monthlyPayment}`} </div>
            </div>
            <div className="row">
              <div className="col-2"> Number of Payments  </div>
              <div className="col-2"> {state.numPayments} </div>
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  )
}

export default MainBox;
