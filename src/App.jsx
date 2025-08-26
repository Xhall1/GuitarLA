import { useState } from 'react';
import { Guitar } from './components/Guitar';
import { Header } from './components/Header';
import { db } from './data/db';
import { Footer } from './components/Footer';

function App() {

  const [data, setData] = useState(db);
  const [cart, setCart] = useState([]);

  function addToCart(item) {

    const itemExist = cart.findIndex((guitar) => guitar.id === item.id)
    if(itemExist >= 0) {
      const updatedCart = [...cart]
      updatedCart[itemExist].quantity++
      setCart(updatedCart)
    } else {
      item.quantity = 1
      setCart([...cart, item])
    }
  }

  function removeFromCart(id) {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id));
    console.log('removing item', id);
  }
  
  return (
    <>
      <Header 
        cart={cart}
        removeFromCart={removeFromCart}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Our collection</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              setCart={setCart}
              addToCart={addToCart}
            />
          )
          )}

        </div>
      </main>
      <Footer />
    </>
  )
}

export default App
