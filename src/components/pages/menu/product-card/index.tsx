import React from 'react'
import { observer } from "mobx-react";
import { observable, action, computed } from 'mobx';
import styled from 'styled-components'
import { Row, Col, Typography, Button, Modal, Form, Input, Avatar } from 'antd';

import { Product, PartialProduct } from 'models/product';
import { PartialCategory, Category } from 'models/category';
import ProductService from 'services/product';

import NewProductModal from '../new-product-modal'

interface IProductCardProps{
  product: Product
  category: Category
} 

const { Title, Text } = Typography;

@observer
class ProductCard extends React.Component<IProductCardProps> {
  
  @observable selectedProduct: PartialProduct = new PartialProduct(this.props.product)
  @observable visible = false
  

  constructor(props: IProductCardProps) {
    super(props)
    this.changeModalVisible = this.changeModalVisible.bind(this)
  }

  @action.bound
  productClick(event: React.MouseEvent<HTMLElement>) {
    this.selectedProduct = new PartialProduct(this.props.product)
    console.log(this.selectedProduct);
    this.visible = true
  }

  @action.bound
  changeModalVisible() {
    this.visible = !this.visible
  }

  render() {
    return (
      <>
        <Container onClick={this.productClick} >
        
          
          <Row gutter={16}>
            <Col style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }} span={2}>
              <Avatar size={60} src={this.props.product.imageURL} />
            </Col>
            <Col span={22}>
              <Row align="middle" justify={"space-between"} gutter={16}>
                <Col span={12}>
                  <Title level={4}>{this.props.product.name}</Title>
                </Col>
                <Col style={{display: 'flex', justifyContent: 'flex-end'}} span={12}>
                  <Text style={{ textAlign: 'center' }}>₺ {this.props.product.price}</Text>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col style={{ justifyContent: 'center' }} span={24}>
                  <Text>{this.props.product.description}</Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        {!!this.visible && 
          <NewProductModal 
            category={this.props.category}
            product={this.selectedProduct} 
            onClose={this.changeModalVisible} 
            visible={this.visible} 
          />
        }
      </>
    )
  }
}


const Container = styled.div`
  width: 100%;
  background: #F7FAFD;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-right: 20px;
  padding-left: 20px;
  border-radius: 4px;
  margin-bottom: 12.5px;
  margin-top: 12.5px;

  &:hover {
    /* background: #D6D6D6; */
    cursor: pointer;
  }
`

export default ProductCard