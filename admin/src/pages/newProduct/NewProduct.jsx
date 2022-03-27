import './newProduct.css';
import { useState } from 'react';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import app from '../../firebase';
import { addProduct } from '../../redux/apiCalls';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function NewProduct() {
  const [input, setInput] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCat = (e) => {
    setCat(e.target.value.split(', '));
  };

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = { ...input, img: downloadURL, categories: cat };
          addProduct(dispatch, product).then(() => {
            history.push('/products')
          })
        });
      }
    );
  };

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
          <input
            type='text'
            placeholder='Title'
            onChange={(e) => handleChange(e)}
            name='title'
          />
        </div>
        <div className='addProductItem'>
          <label>Description</label>
          <input
            type='text'
            placeholder='Description'
            onChange={(e) => handleChange(e)}
            name='desc'
          />
        </div>
        <div className='addProductItem'>
          <label>Price</label>
          <input
            type='text'
            placeholder='Price'
            onChange={handleChange}
            name='price'
          />
        </div>
        <div className='addProductItem'>
          <label>Categories</label>
          <input
            type='text'
            placeholder='jeans, skirt'
            onChange={(e) => handleCat(e)}
          />
        </div>
        <div className='addProductItem'>
          <label>Stock</label>
          <select onChange={handleChange} name='inStock'>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
        <button className='addProductButton' onClick={(e) => handleClick(e)}>
          Create
        </button>
      </form>
    </div>
  );
}
