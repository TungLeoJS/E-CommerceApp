import React from 'react';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import Badge from '@material-ui/core/Badge';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { mobile } from '../responsive';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/apiCalls';

const Container = styled.div`
  height: 60px;
  ${mobile({
    height: '50px',
  })}
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  justify-content: space-between;
  display: flex;
  ${mobile({
    padding: '10px 0px',
  })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({
    flex: 2,
    marginRight: '10px',
  })}
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Language = styled.div`
  font-size: 14px;
  cursor: pointer;
  ${mobile({
    display: 'none',
  })}
`;
const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  align-items: center;
  display: flex;
  margin-left: 25px;
  padding: 5px;
  ${mobile({
    marginLeft: '10px',
  })}
`;

const Input = styled.input`
  border: none;
  ${mobile({
    width: '50px',
  })}
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({
    fontSize: '24px',
  })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({
    fontSize: '12px',
    marginLeft: '5px',
  })}
`;

export const Navbar = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch();

  const handleLogout = () => {
    logout(dispatch)
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder='Search'></Input>
            <SearchIcon style={{ color: 'gray', fontSize: '16px' }} />
          </SearchContainer>
        </Left>
        <Center>
          <Link style={{ textDecoration: 'none', color: 'black' }} to='/'>
            <Logo>LAMA.</Logo>
          </Link>
        </Center>
        <Right>
          {(user && user.currentUser !== null) ? <MenuItem onClick={handleLogout}>LOGOUT</MenuItem> : <><Link style={{ textDecoration: 'none', color: 'black' }} to='/register'><MenuItem>REGISTER</MenuItem></Link>
          <Link style={{ textDecoration: 'none', color: 'black' }} to='/login'><MenuItem>SIGN IN</MenuItem></Link></>} 
          <Link style={{ textDecoration: 'none', color: 'black' }} to='/cart'>
            <MenuItem>
              <Badge badgeContent={cart.quantity} color='primary'>
                <ShoppingCartOutlinedIcon />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};
