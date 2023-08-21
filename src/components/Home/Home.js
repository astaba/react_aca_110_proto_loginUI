import React from 'react';

import Card from '../UI/Card/Card';
import classes from './Home.module.css';
import Button from '../UI/Button/Button';
import { useAuthContextValues } from '../../context/auth-context';

const Home = (props) => {
  const { handleLogout } = useAuthContextValues()
  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <Button onClick={handleLogout}>Logout</Button>
    </Card>
  );
};

export default Home;
