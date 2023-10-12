import { useEffect, useRef, useState } from "react";

function App() {
  const form = useRef();
  const [inputData, setInputData] = useState({
    buyPrice: 0,
    salePrice: 0,
    productWeight: 0
  })
  const [outputData, setOutputData] = useState({
    salePrice: 0,
    buyPrice: 0,
    profit: 0
  })


  useEffect(() => {
    const BPinBDT = inputData.buyPrice * 16.50;
    const courierPrice = (650 * inputData.productWeight) + (120 * inputData.productWeight);
    const extraCost = (BPinBDT + courierPrice) * 5 / 100;

    const totalCost = BPinBDT + courierPrice + extraCost;
    const totalProfit = inputData.salePrice - totalCost;

    setOutputData({ salePrice: inputData.salePrice, buyPrice: totalCost.toFixed(2), profit: totalProfit.toFixed(2) });
  }, [inputData])

  const handleSubmit = (e) => {
    e.preventDefault();
    const field = form.current;
    const buyingPrice = parseFloat(field.buy.value);
    const sellingPrice = parseFloat(field.sale.value);
    const productWeight = parseFloat(field.weight.value);

    setInputData({ buyPrice: buyingPrice, salePrice: sellingPrice, productWeight: productWeight });
  };

  const handleReset = () => {
    setOutputData({ salePrice: 0, buyPrice: 0, profit: 0 })
  };

  return (
    <main>
      <h1>Cost Calculate</h1>
      <section>
        <h2>Fill the form:</h2>
        <form ref={form} onSubmit={handleSubmit} method="post">
          <div>
            <label htmlFor="buyPrice">Buying Price: </label>
            <input name="buy" id="buyPrice" type="text" placeholder="RMB" required />
          </div>
          <div>
            <label htmlFor="salePrice">Sales Price: </label>
            <input name="sale" id="salePrice" type="text" placeholder="BDT" required />
          </div>
          <div>
            <label htmlFor="productWeight">Product Weight: </label>
            <input name="weight" id="productWeight" type="text" placeholder="KG" required />
          </div>
          <div className="flex justify-between space-y-0">
            <button onClick={handleReset} type="reset">Reset</button>
            <button type="submit">Calculate</button>
          </div>
        </form>
      </section>
      {
        outputData.buyPrice > 0 &&
        <section>
          <h2>Calculated Result:</h2>
          <ul>
            <li>
              Sales Price: <span>{outputData.salePrice}</span>tk
            </li>
            <li>
              Buying Price: <span>{outputData.buyPrice}</span>tk
            </li>
            <li>
              Profit: <span>{outputData.profit}</span>tk
            </li>
          </ul>
        </section>
      }
    </main>
  );
}

export default App;
