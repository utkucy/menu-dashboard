import React from 'react'
import { observer } from "mobx-react";
import { observable, action } from "mobx";
import styled from 'styled-components'
import { Form, Input, Row, Col, Divider, Typography, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PartialProduct } from 'models/product';
import { Category } from 'models/category';


interface IAddProductProps {
  category: Category
}

const { Title } = Typography;

@observer
class AddProductSection extends React.Component<IAddProductProps> {
  @observable product: PartialProduct = new PartialProduct({})

  @action.bound
  productNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.product.name = event.target.value
    // console.log(this.product.name);
  }

  @action.bound
  productDescriptionChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.product.description = event.target.value
    //console.log(this.props.product.description);
  }

  @action.bound
  productPriceChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.product.price = event.target.value
    //console.log(this.props.product.price);
  }

  @action.bound
  productImageURLChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.product.imageURL = event.target.value
    console.log(this.product.imageURL);
  }

  @action.bound
  addProductClick() {
    const prod = new PartialProduct({
      name: this.product.name,
      description: this.product.description,
      price: this.product.price,
      imageURL: this.product.imageURL
    })
    console.log(prod);

    if (!this.props.category.products) {
      this.props.category.products = [
        new PartialProduct(this.product)
      ]
    } else {
      this.props.category.products?.push(new PartialProduct(this.product))
    }
    
    console.log(this.props.category.products);
    

    this.product.name = undefined
    this.product.description = undefined
    this.product.price = undefined
    this.product.imageURL = undefined
  }

  render() {
    return (
      <Container>
        <SectionTitle>Ürün Bilgileri</SectionTitle>
        <Row justify="start" gutter={16}>
          <Col span={24}>
            <Form.Item required={true} style={{ color: "red" }} label={<label style={{ color: "#283747" }}>Ürün İsmi</label>}>
                <Input 
                placeholder="Sahanda Yumurta"
                value={this.product.name}
                onChange={this.productNameChange}
                />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="start" gutter={16}>
          <Col span={24}>
            <Form.Item required={true} style={{ color: "red" }} label={<label style={{ color: "#283747" }}>İçindekiler</label>}>
                <Input 
                // placeholder="Sahanda Yumurta"
                value={this.product.description}
                onChange={this.productDescriptionChange}
                />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="start" gutter={16}>
          <Col span={24}>
            <Form.Item required={true} style={{ color: "red" }} label={<label style={{ color: "#283747" }}>Fiyat</label>}>
                <Input 
                // placeholder="Sahanda Yumurta"
                value={this.product.price}
                onChange={this.productPriceChange}
                />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="start" gutter={16}>
          <Col span={24}>
            <Form.Item style={{ color: "red" }} label={<label style={{ color: "#283747" }}>Fotoğraf Linki</label>}>
                <Input 
                // placeholder="Sahanda Yumurta"
                value={this.product.imageURL}
                onChange={this.productImageURLChange}
                />
            </Form.Item>
          </Col>
        </Row>
        <Row style={{ marginTop: 10 }} gutter={16}>
          <Col span={24}>
            <Button 
            disabled={!this.product.name || !this.product.description || !this.product.price}
            onClick={this.addProductClick} 
            type="primary" 
            block 
            icon={<PlusOutlined />}
            >
              Ekle
            </Button>
          </Col>
        </Row>
      </Container>
    )
  }
}

const Container = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  margin: auto;
  margin-top: 24px;
  margin-bottom: 24px;
  box-shadow: 0px 12px 24px rgba(132, 153, 193, 0.08);
`

const SectionTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 24px;
`;




export default AddProductSection