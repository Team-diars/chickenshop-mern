import React, { useEffect, useState } from 'react'
import {Form, Button } from 'react-bootstrap'
import {getProducts} from '../../actions/product'
import { connect } from 'react-redux';
import TableCart from './TableCart'
import MainTable from './MainTable';

const OrderScreen = ({getProducts, product:{products,loading}}) => {
  const [cart, setCart] = useState([]);
  const [num_table, setNumTable] = useState("");
  const [formDataDishes, setFormDataDishes] = useState({
    dish_name:'',
    dish_quantity:0,
    dish_id:null
  });
  const [formDataDrinks, setFormDataDrinks] = useState({
    drink_name:'',
    drink_quantity:0,
    drink_id:null
  })
  const [formDataSalads, setFormDataSalads] = useState({
    salad_name:'',
    salad_quantity:0,
    salad_id:null
  })
  const {dish_name,dish_quantity} = formDataDishes;
  const {drink_name,drink_quantity} = formDataDrinks;
  const {salad_name,salad_quantity} = formDataSalads;

  const onChange = (e) => {
    const { value, type } = e.target;
    setNumTable(
      type === "number" ? parseInt(value) : value
    );
  }

  const onChangeDishes = (e) => {
    const { name, value, type } = e.target;
    setFormDataDishes({
      ...formDataDishes,
      [name]: type === "number" ? parseInt(value) : value
    });
  }
  
  const onChangeDrinks = (e) => {
    const { name, value, type } = e.target;
    setFormDataDrinks({
      ...formDataDrinks,
      [name]: type === "number" ? parseInt(value) : value
    });
  }

  const onChangeSalads = (e) => {
    const { name, value, type } = e.target;
    setFormDataSalads({
      ...formDataSalads,
      [name]: type === "number" ? parseInt(value) : value
    });
  }

  const addDish = () => {
    const item = cart.find(item => item.dish_name === dish_name);
    const product = products.find(item => (item.name === dish_name && item.status))
    if(item) {
      setFormDataDishes({
        dish_id: product._id,
        dish_name:'',
        dish_quantity:0
      })
      return item.dish_quantity += dish_quantity;
    }
    setCart([...cart, {
      dish_id: product._id,
      dish_name,
      dish_quantity: dish_quantity
    }])
    setFormDataDishes({
      dish_id: null,
      dish_name:'',
      dish_quantity:0
    })
  }

  const addDrink = () => {
    const item = cart.find(item => item.drink_name === drink_name);
    const product = products.find(item => (item.name === drink_name && item.status))
    console.log(product._id);
    if(item) {
      setFormDataDishes({
        drink_id: product._id,
        drink_name:'',
        drink_quantity:0
      })
      return item.drink_quantity += drink_quantity;
    }
    setCart([...cart, {
      drink_id: product._id,
      drink_name: drink_name,
      drink_quantity: drink_quantity
    }])
    setFormDataDrinks({
      drink_id: null,
      drink_name:'',
      drink_quantity:0,
    })
  }

  const addSalad = () => {
    const item = cart.find(item => item.salad_name === salad_name);
    const product = products.find(item => (item.name === salad_name && item.status))
    if(item) {
      setFormDataSalads({
        salad_id: product._id,
        salad_name:'',
        salad_quantity:0
      })
      return item.salad_quantity += salad_quantity;
    }
    setCart([...cart, {
      salad_id: product._id,
      salad_name,
      salad_quantity
    }])
    setFormDataSalads({
      salad_id: null,
      salad_name:'',
      salad_quantity:0
    })
  }

  useEffect(()=>{
    getProducts();
  },[getProducts])
  return (
    <>
      <div className="m-0 col-lg-12">
        <h1>Orders</h1>
      </div>
      <div className="m-0 p-0 row col-lg-12">
        <div className="col-md-6 form-wrapper">
          <div className="p-0 col-12 col-md-5">
            <label>Table number</label>
            <Form.Control type="number"
                        name="num_table" 
                        value={num_table} 
                        onChange={ e => onChange(e)}
                        />
          </div>
          <div className="mb-2">
            <label>Dishes</label>
            <div className="row m-0 p-0 col-12 col-sm-12">
              <div className="p-0 input-wrapper col-10 col-sm-10">
                <Form.Control as="select"
                              name="dish_name"
                              value={dish_name}
                              onChange={ e => onChangeDishes(e)}
                              custom
                              >
                  <option value="">-- Select a dish --</option>
                  {
                    products.map((product) => (
                      (product.category === 'dishes') && <option key={product._id} value={product.name}>{product.name}</option>
                    ))
                  }
                </Form.Control>
                <Form.Control name="dish_quantity" 
                              value={dish_quantity} 
                              type="number"
                              onChange={ e => onChangeDishes(e)}
                              />
              </div>
              <div className="p-0 col-sm-2 col-2 d-flex justify-content-center">
                <Button className='btn-success add-button' onClick={addDish}>
                  <i className='fas fa-plus'></i>
                </Button>
              </div>
            </div>
          </div>
          <div className="mb-2">
            <label>Drinks</label>
            <div className="row m-0 p-0 col-12 col-sm-12">
              <div className="p-0 input-wrapper col-10 col-sm-10">
                <Form.Control as="select"
                              name="drink_name"
                              value={drink_name}
                              onChange={ e => onChangeDrinks(e) }
                              custom
                              >
                  <option value="">-- Select a drink --</option>
                  {
                    products.map((product) => (
                      (product.category === 'drinks') && <option key={product._id} value={product.name}>{product.name}</option>
                    ))
                  }
                </Form.Control>
                <Form.Control type="number"
                              name="drink_quantity"
                              value={drink_quantity}
                              onChange={ e => onChangeDrinks(e) }
                              />
              </div>
              <div className="p-0 col-sm-2 col-2 d-flex justify-content-center">
                <Button className='btn-success add-button' onClick={addDrink}>
                  <i className='fas fa-plus'></i>
                </Button>
              </div>
            </div>
          </div>
          <div className="mb-2">
            <label>Salads</label>
            <div className="row m-0 p-0 col-12 col-sm-12">
              <div className="p-0 input-wrapper col-10 col-sm-10">
                <Form.Control as="select"
                              name="salad_name"
                              custom 
                              value={salad_name}
                              onChange={ e => onChangeSalads(e)}
                              >
                  <option value="">-- Select a salad --</option>
                  {
                    products.map((product) => (
                      (product.category === 'salads') && <option key={product._id} value={product.name}>{product.name}</option>
                    ))
                  }
                </Form.Control>
                <Form.Control type="number" 
                              name="salad_quantity" 
                              value={salad_quantity}
                              onChange={ e => onChangeSalads(e)}/>
              </div>
              <div className="p-0 col-sm-2 col-2 d-flex justify-content-center">
                <Button className='btn-success add-button' onClick={addSalad}>
                  <i className='fas fa-plus'></i>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6" >
          <TableCart cart={cart} num_table={num_table}/>
        </div>
      </div>
      <div className="mt-2 col-md-12">
        <MainTable/>
      </div>
    </>
  )
}

const mapStateToProps = state => ({
  product: state.product,
})

export default connect(mapStateToProps, {getProducts})(OrderScreen);
