import React, { useEffect, useState } from 'react';
import Routing from './routing/Routing';
import './App.css';
import { useDispatch } from 'react-redux';
import { monitorAuthState } from './store/slices/authSlice';
import Spinner from './components/spinner/Spinner';

export default function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(monitorAuthState()).then(() => setLoading(false));
  }, [dispatch]);

  if (loading) return <Spinner />;

  return <Routing />;
}
