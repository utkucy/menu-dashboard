import React from 'react'
import { observer } from "mobx-react";
import { observable, action } from 'mobx';
import styled from 'styled-components'
import { Row, Col, Typography, Button, Modal, Form, Input, Avatar } from 'antd';

import { PartialProduct, Product } from 'models/product';
import { PartialCategory } from 'models/category';

interface IProductCardProps{
  product: PartialProduct 
  category: PartialCategory
} 

const { Title, Text } = Typography;

@observer
class ProductCard extends React.Component<IProductCardProps> {

  @observable newProduct: PartialProduct = new PartialProduct(this.props.product)
  @observable visible = false


  @action.bound
  productClick(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault()
    this.visible = true
    console.log(this.props.product)
  }

  @action.bound
  closeModal() {
    this.visible = false
  }

  @action.bound
  onNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.newProduct.name = event.target.value
  }

  @action.bound
  onDescriptionChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.newProduct.description = event.target.value
  }
  @action.bound
  onPriceChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.newProduct.price = event.target.value
  }

  @action.bound
  onImageURLChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.newProduct.imageURL = event.target.value
  }

  @action.bound
  onUpdateClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    // console.log(this.props.product)
    this.props.product.updateProduct = this.newProduct
    console.log(this.props.product);
    this.closeModal()
  }

  @action.bound
  onDeleteClick() {
    this.props.category?.filterList(this.props.product)
    this.closeModal()
  }
  

  render() {
    return (
      <>
        <Container onClick={this.productClick} >
          <Row gutter={16}>
            <Col span={2}>
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
        <Modal
          visible={this.visible}
          title="Ürün Bilgileri"
          // onOk={this.onUpdateClick}
          onCancel={this.closeModal}
          // okText="Güncelle"
          // cancelText="Sil"
          // cancelButtonProps={{ danger:true }}
          footer={[
            <Button danger key="back" onClick={this.onDeleteClick}>
              Sil
            </Button>,
            <Button key="submit" type="primary" onClick={this.onUpdateClick}>
              Güncelle
            </Button>,
          ]}
        >
          <Form layout="vertical">
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Ürün İsmi" required={true} >
                  <Input 
                    value={this.newProduct.name} 
                    onChange={this.onNameChange} 
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Ürün Açıklması" required={true} >
                  <Input 
                    value={this.newProduct.description}
                    onChange={this.onDescriptionChange} 
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Ürün Fiyatı" required={true} >
                  <Input 
                    value={this.newProduct.price} 
                    onChange={this.onPriceChange} 
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Fotoğraf Linki" >
                  <Input 
                    value={this.newProduct.imageURL} 
                    onChange={this.onImageURLChange} 
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
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
// Dünyanın en yetenekli şefinden, en lezzetli hamburgerlerin tadına bakmanızı öneririz
// Cheddar peyniri, karamelize soğan, turşu, BBQ sos, domates ve marul







export default ProductCard