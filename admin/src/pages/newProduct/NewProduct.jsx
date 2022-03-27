import './newProduct.css';
import { useState } from 'react';

export default function NewProduct() {
  const [input, setInput] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);

  const handleChange = (e) => {
    setInput((prev) => {
      return {...prev, [e.target.name]: e.target.value}
    })
  };

  const handleCat = (e) => {};

  return (
    <div className='newProduct'>
      <h1 className='addProductTitle'>New Product</h1>
      <form className='addProductForm'>
        <div className='addProductItem'>
          <label>Image</label>
          <input
            type='file'
            id='file'
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className='addProductItem'>
          <label>Title</label>
          <input type='text' placeholder='Title' onChange={(e) => handleChange(e)} name="title"/>
        </div>
        <div className='addProductItem'>
          <label>Description</label>
          <input type='text' placeholder='Description' onChange={(e) => handleChange(e)} name="desc"/>
        </div>
        <div className='addProductItem'>
          <label>Price</label>
          <input type='text' placeholder='Price' onChange={handleChange} name="price"/>
        </div>
        <div className='addProductItem'>
          <label>Categories</label>
          <input type='text' placeholder='jeans, skirt'/>
        </div>
        <div className='addProductItem'>
          <label>Stock</label>
          <select onChange={handleChange} name="inStock">
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
        <button className='addProductButton'>Create</button>
      </form>
    </div>
  );
}
