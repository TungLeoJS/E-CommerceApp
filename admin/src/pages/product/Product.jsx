import { Link, useHistory, useLocation } from 'react-router-dom';
import './product.css';
import Chart from '../../components/chart/Chart';
import { productData } from '../../dummyData';
import { Publish } from '@material-ui/icons';
import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userRequest } from '../../redux/requestMethod';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import app from '../../firebase';
import { updateProduct } from '../../redux/apiCalls';

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split('/')[2];
  const product = useSelector((state) =>
    state.product.products.find((x) => x._id === productId)
  );
  const [productStats, setProductStats] = useState([]);
  const [updatedInput, setUpdatedInput] = useState({});
  const [cat, setCat] = useState([]);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const MONTHS = useMemo(
    () => [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    []
  );

  useEffect(() => {
    const getProductStats = async () => {
      try {
        const res = await userRequest.get(`/orders/income?pid=${productId}`);
        const list = res?.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setProductStats((prev) => [
            ...prev,
            {
              name: MONTHS[item._id - 1],
              Sales: item.total,
            },
          ])
        );
      } catch (error) {}
    };
    getProductStats();
  }, [MONTHS]);

  const handleChange = (e) => {
    setUpdatedInput({
      ...updatedInput,
      [e.target.name]: e.target.value,
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
    const deleteRef = ref(storage, product?.img);

    // const product = {...updatedInput, categories: cat};
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
          const updatedProduct = { ...updatedInput, img: downloadURL, categories: cat };
          updateProduct(dispatch, updatedProduct, product._id).then((res) => {
            if (res?.status === 200) {
              // Delete file
              deleteObject(deleteRef)
              .then(() => {
                // File deleted successfully
                console.log('file deleted');
                setTimeout(() => {
                  history.push('/products')
                }, 2000);
              })
              .catch((error) => {
                console.log(error);
              });
            }
            history.push('/products');
          }
          )
        });
      }
    );
  };

  return (
    <div className='product'>
      <div className='productTitleContainer'>
        <h1 className='productTitle'>Product</h1>
        <Link to='/newproduct'>
          <button className='productAddButton'>Create</button>
        </Link>
      </div>
      <div className='productTop'>
        <div className='productTopLeft'>
          <Chart
            data={productStats}
            dataKey='Sales'
            title='Sales Performance'
          />
        </div>
        <div className='productTopRight'>
          <div className='productInfoTop'>
            <img src={product?.img} alt='' className='productInfoImg' />
            <span className='productName'>{product?.title}</span>
          </div>
          <div className='productInfoBottom'>
            <div className='productInfoItem'>
              <span className='productInfoKey'>id:</span>
              <span className='productInfoValue'>{product?._id}</span>
            </div>
            <div className='productInfoItem'>
              <span className='productInfoKey'>Price:</span>
              <span className='productInfoValue'>{product?.price}</span>
            </div>
            <div className='productInfoItem'>
              <span className='productInfoKey'>Description:</span>
              <span className='productInfoValue'>{product?.desc}</span>
            </div>
            <div className='productInfoItem'>
              <span className='productInfoKey'>In stock:</span>
              <span className='productInfoValue'>
                {product?.inStock?.toString()}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='productBottom'>
        <form className='productForm'>
          <div className='productFormLeft'>
            <label>Product Name</label>
            <input
              type='text'
              placeholder={product?.title}
              name='title'
              onChange={(e) => handleChange(e)}
            />
            <label>Description</label>
            <input
              type='text'
              placeholder={product?.desc}
              name='desc'
              onChange={(e) => handleChange(e)}
            />
            <label>Price</label>
            <input
              type='text'
              placeholder={product?.price}
              name='price'
              onChange={(e) => handleChange(e)}
            />
            <label>Categories</label>
            <input
              type='text'
              placeholder={product?.categories}
              name='categories'
              onChange={(e) => handleCat(e)}
            />
            <label>In Stock</label>
            <select
              name='inStock'
              id='idStock'
              defaultValue={product?.inStock}
              onChange={(e) => handleChange(e)}
            >
              <option value='true'>Yes</option>
              <option value='false'>No</option>
            </select>
          </div>
          <div className='productFormRight'>
            <div className='productUpload'>
              <img
                src={file ? window.URL.createObjectURL(file) : product?.img}
                alt=''
                className='productUploadImg'
              />
              <label htmlFor='file'>
                <Publish />
              </label>
              <input
                type='file'
                id='file'
                style={{ display: 'none' }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <button className='productButton' onClick={(e) => handleClick(e)}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
