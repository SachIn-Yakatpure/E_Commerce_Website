import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar1 from '../components/Navbar1';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.userLogin?.userInfo);

  //   const userLogin = useSelector((state) => state.user);
  //   const { userInfo } = userLogin;

  useEffect(() => {
    // if (!userInfo) {
    //   navigate('/Beauty');
    //   return;
    // }

    const fetchOrders = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data } = await axios.get('/api/myorders', config);
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userInfo, navigate]);

  return (

    <>
      <Navbar1 />

      <div className="container" style={{ padding: '1rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>🧾 My Orders</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {orders.map((order) => {
              const deliveryOffset = Math.floor(Math.random() * 3) + 3;
              const deliveryDate = new Date(order.createdAt);
              deliveryDate.setDate(deliveryDate.getDate() + deliveryOffset);

              // Fallback totalPrice if not present
              const grandTotal = order.totalPrice || order.products.reduce((acc, item) => {
                const price = item.productId?.price || 0;
                const qty = item.quantity || 0;
                return acc + price * qty;
              }, 0);

              return (
                <div
                  key={order._id}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    border: '1px solid #ccc',
                    borderRadius: '10px',
                    padding: '1rem',
                    marginBottom: '1rem',
                    background: '#fff',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  }}
                >
                  {/* LEFT - List of products */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {order.products.map((item, index) => (
                      <div key={index} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <img
                          src={item.productId?.image || 'https://via.placeholder.com/70'}
                          alt={item.productId?.title || 'Product'}
                          style={{
                            width: '70px',
                            height: '70px',
                            borderRadius: '10px',
                            objectFit: 'cover',
                          }}
                        />
                        <div>
                          <h4 style={{ margin: '0 0 4px 0' }}>{item.productId?.title || 'Product Title'}</h4>
                          <p style={{ margin: 0, fontSize: '14px' }}>Qty: {item.quantity}</p>
                          <p style={{ margin: 0, fontSize: '14px' }}>Price: ₹{item.productId?.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* RIGHT - Order details */}
                  <div style={{ textAlign: 'right', minWidth: '160px' }}>
                    <p style={{ margin: 0 }}><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                    <p style={{ margin: 0 }}><strong>Grand Total:</strong> ₹{grandTotal}</p>
                    <p style={{ margin: 0 }}>
                      <strong>Payment:</strong>{' '}
                      <span style={{ color: order.paymentStatus === 'Paid' ? 'green' : 'red' }}>
                        {order.paymentStatus === 'Paid' ? 'Paid' : 'Pending'}
                      </span>

                    </p>
                    <p style={{ margin: 0 }}><strong>Status:</strong> {order.status || 'Processing'}</p>
                    <p style={{ margin: 0 }}><strong>Delivery by:</strong> {deliveryDate.toLocaleDateString()}</p>
                  </div>
                </div>
              );
            })}

          </div>
        )}
      </div>

    </>

  );

};

export default MyOrders;
