import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Announcement } from '../components/Announcement';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import { Newsletter } from '../components/Newsletter';
import { Products } from '../components/Products';
import { mobile } from '../responsive';

const Container = styled.div``;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({
    fontSize: '16px',
  })}
`;

const Title = styled.h1`
  ${mobile({
    textAlign: 'center',
  })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({
    margin: '10px 0px',
  })}
`;

const Option = styled.option``;

export const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split('/')[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  }

  return (
    <Container>
      <Navbar></Navbar>
      <Announcement></Announcement>
      <Title>Dress</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" onChange={handleFilters}>
            <Option disabled>
              Color
            </Option>
            <Option>white</Option>
            <Option>black</Option>
            <Option>red</Option>
            <Option>yellow</Option>
            <Option>green</Option>
            <Option>blue</Option>
            <Option>brown</Option>
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option disabled>
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={e => setSort(e.target.value)}>
            <Option value="newest">
              Newest
            </Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort}></Products>
      <Newsletter></Newsletter>
      <Footer></Footer>
    </Container>
  );
};
