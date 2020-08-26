import React, { ReactNode } from 'react'
import { observer } from "mobx-react";
import { observable, action, computed } from 'mobx';
import styled from 'styled-components'
import { Row, Col, Divider, Typography, Button } from 'antd';

import { PartialCategory } from 'models/category'
import ProductCard from 'components/product-card'


interface ICategoryContainerProps {
  category: PartialCategory
}

const { Title, Text } = Typography;

class CategoryContainer extends React.Component<ICategoryContainerProps> {


  render() {
    return (
      <Container>
        <Row gutter={16}>
          <Col span={12}>
            <Title level={2}>{this.props.category.name}</Title>
          </Col>
          <Col span={12} style={{ display: 'flex', justifyContent: 'flex-end' }} >
            <Button 
              // onClick={this.saveCategory} 
              disabled={this.props.category.products?.length === 0 || this.props.category.products === undefined} 
              type="primary" 
              shape="round" 
              size={"large"}
            >
              Menüye Ekle
            </Button>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Text>{this.props.category.description}</Text>
          </Col>
        </Row>
        <Divider />
        {!!this.props.category.products && 
          this.props.category.products.map((product, index) => (
            <ProductCard key={index} product={product} category={this.props.category}/>
          ))
        }
      </Container>
    )
  }
}


const Container = styled.div`
  width: 100%;
  height: 100%;
  /* background: red; */
  border: 1px solid #d9d9d9;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: flex-start;
  padding: 25px;

`


export default CategoryContainer