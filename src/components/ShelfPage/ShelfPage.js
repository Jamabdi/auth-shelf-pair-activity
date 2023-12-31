import { useState, useEffect } from 'react';
import axios from 'axios';
import './ShelfPage.css';

function ShelfPage() {
  const [shelfList, setShelfList] = useState([]);

  useEffect(() => {
    fetchShelf();
  }, []);

  const fetchShelf = () => {
    axios.get('/api/shelf').then((response) => {
      setShelfList(response.data);
    }).catch((error) => {
      console.log(error);
      alert('Something went wrong.');
    });
  }

  const myForm = () => {
    const [description, setDescription] = useState('');
  const [imageURL, setimageURL] = useState('');
  }
 


  return (
    <div className="container">
      <h2>Shelf</h2>
      <h4>My Form</h4>
      <form>
        <label>
          Description:
          <input type="text" placeholder="Enter a description"/>
        </label>
        
        <label>
          Image URL:
          <input type="text" placeholder="Enter the image URL"/>
        </label>
        <button type="submit">Submit</button>
      </form>

      <p>All of the available items can be seen here.</p>
      {
        shelfList.length === 0 && (
          <div>No items on the shelf</div>
        )
      }
      {
        shelfList.map(item => {
          return <div className="responsive" key={item.id}>
                    <div className="gallery">
                        <img src={item.image_url} alt={item.description} />
                        <br />
                        <div className="desc">{item.description}</div>
                        <div style={{textAlign: 'center', padding: '5px'}}>
                          <button style={{cursor: 'pointer'}}>Delete</button>
                        </div>
                    </div>
                 </div>
        })
      }
      <div className="clearfix"></div>
    </div>
  
  );
}

export default ShelfPage;
