import { useEffect, useRef, useState } from "react";

function App() {
  const form = useRef();
  const [output, setOutput] = useState({});
  const [data, setData] = useState({
    price: 0,
    quantity: 0,
    weight: 0,
    delivery: 0
  })


  useEffect(() => {
    const priceBDT = (((data.price * data.quantity) + data.delivery) * 18);
    const totalWeight = (data.weight * data.quantity);
    const shippingCost = (totalWeight * 800);
    const totalPrice = (priceBDT + shippingCost);
    const qntyPrice = (totalPrice / data.quantity);

    const result = {
      priceBDT: priceBDT,
      totalWeight: totalWeight,
      shippingCost: shippingCost,
      totalPrice: totalPrice,
      qntyPrice: qntyPrice
    }

    setOutput(result);

  }, [data])

  const handleSubmit = (e) => {
    e.preventDefault();
    const field = form.current;
    const price = parseFloat(field.price.value);
    const quantity = parseFloat(field.quantity.value);
    const weight = parseFloat(field.weight.value);
    const delivery = parseFloat(field.delivery.value);

    setData({ price: price, quantity: quantity, weight: weight, delivery: delivery });
  };

  const handleReset = () => {
    setData({
      price: 0,
      quantity: 0,
      weight: 0,
      delivery: 0
    });
    setOutput({});
  };

  return (
    <main>
      <h1>Cost Calculate</h1>
      <section>
        <h2>Fill the form:</h2>
        <form ref={form} onSubmit={handleSubmit} method="post">
          <div>
            <label htmlFor="price">Buying Price: </label>
            <input name="price" id="price" type="text" placeholder="RMB" required />
          </div>
          <div>
            <label htmlFor="quantity">Quantity: </label>
            <input name="quantity" id="quantity" type="text" placeholder="999" required />
          </div>
          <div>
            <label htmlFor="weight">Product Weight: </label>
            <input name="weight" id="weight" type="text" placeholder="KG" required />
          </div>
          <div>
            <label htmlFor="delivery">Delivery fee: </label>
            <input name="delivery" id="delivery" type="text" placeholder="999" required />
          </div>
          <div className="flex justify-between space-y-0">
            <button onClick={handleReset} type="reset">Reset</button>
            <button type="submit">Calculate</button>
          </div>
        </form>
      </section>
      {
        output.priceBDT &&
        <section>
          <h2>Calculated Result:</h2>
          <ul>
            <li>Total Weight: <span>{output.totalWeight}</span>kg</li>
            <li>Shipping Cost: <span>{output.shippingCost}</span>tk</li>
            <li>Sub Total: <span>{output.priceBDT}</span>tk</li>
            <li>Total: <span>{output.totalPrice}</span>tk</li>
            <li className="border-t pt-1">Quantity: <span>{output.qntyPrice}</span>tk</li>
          </ul>
        </section>
      }
    </main>
  );
}

export default App;
