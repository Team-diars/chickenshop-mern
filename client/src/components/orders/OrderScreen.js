import React, { useState } from 'react'
import {Form, Col, Row, Table, Button } from 'react-bootstrap'
import TableCart from './TableCart'

const OrderScreen = () => {
  const [cart, setCart] = useState([]);
  const [formDataDishes, setFormDataDishes] = useState({
    dish_name:'',
    dish_quantity:0
  })
  const {dish_name,dish_quantity} = formDataDishes;
  const dishes = [
    {
      'idx':0,
      'dish_name':'Arroz con pollo',
      'dish_price':12.5
    },
    {
      'idx':1,
      'dish_name':'Pollo a la brasa 1/4',
      'dish_price':23
    }
  ];
  const onChangeDishes = (e) => {
    const { name, value, type } = e.target;
    setFormDataDishes({
      ...formDataDishes,
      [name]: type === "number" ? parseInt(value) : value
    });
  }
  
  const addDish = () => {
    // if (cart.length > 0){
    //   const index = cart.indexOf(item => item.dish_name = dish_name);
    //   console.log(index);
      
    // }
    
    const item = cart.find(item => item.dish_name === dish_name);
    if(item) {
      setFormDataDishes({
        dish_name:'',
        dish_quantity:0
      })
      return item.dish_quantity += dish_quantity;
    }
    setCart([...cart, {
      dish_name,
      dish_quantity: dish_quantity
    }])
    setFormDataDishes({
      dish_name:'',
      dish_quantity:0
    })
  }
  return (
    <>
      <div className="m-0 col-lg-12">
        <h1>Orders</h1>
      </div>
      <div className="m-0 p-0 row col-lg-12">
        <div className="col-md-6 form-wrapper">
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
                    dishes.map((dish) => (
                      <option key={dish.idx} value={dish.dish_name}>{dish.dish_name}</option>
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
            <label>Extras</label>
            <div className="row m-0 p-0 col-12 col-sm-12">
              <div className="p-0 input-wrapper col-10 col-sm-10">
                <Form.Control as="select"
                              name="category"
                              custom 
                              >
                  <option value="">-- Select an extra --</option>
                </Form.Control>
                <Form.Control name="name" type="number"/>
              </div>
              <div className="p-0 col-sm-2 col-2 d-flex justify-content-center">
                <Button className='btn-success add-button'>
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
                              name="category"
                              custom 
                              >
                  <option value="">-- Select a salad --</option>
                </Form.Control>
                <Form.Control name="name" type="number"/>
              </div>
              <div className="p-0 col-sm-2 col-2 d-flex justify-content-center">
                <Button className='btn-success add-button'>
                  <i className='fas fa-plus'></i>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6" >
          <TableCart cart={cart}/>
        </div>
      </div>
    </>
  )
}

export default OrderScreen
