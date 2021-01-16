import * as React from "react";
import styled from 'styled-components'
import { observer } from "mobx-react";
import { action, observable, computed } from "mobx";
import { Drawer, Form, Button, Col, Row, Input, Divider, Typography, message } from 'antd';
import { blue, magenta, grey } from '@ant-design/colors';
 
import { PlusOutlined } from '@ant-design/icons';
import { PartialProduct, Product } from "models/product";
import ProductService from "services/product";
import { Category } from "models/category";


interface INewProductModal {
  category: Category
  product?: PartialProduct
  onClose: any
  visible: boolean
}

const { Title } = Typography;

@observer
class NewProductModal extends React.Component<INewProductModal> {

  @observable product: PartialProduct 
  @observable visible = true

  constructor(props: INewProductModal) {
    super(props)
    // this.product.name = this.props.product?.name
    // this.product.description = this.props.product?.description
    // this.product.price = this.props.product?.price
    // this.product = new PartialProduct(props.product)
    this.product =  new PartialProduct(this.props.product)
    console.log("this product");
    console.log(this.product);
    console.log("props product");
    console.log(this.props.product);
  }

  @action.bound
  productNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.product.name = event.target.value
  }

  @action.bound
  productDescriptionChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.product.description = event.target.value
  }

  @action.bound
  productPriceChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.product.price = event.target.value
  }

  @action.bound
  productImageURLChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.product.imageURL = event.target.value
  }


  // IF THERE IS NO PRODUCT, CALL THIS METHOD ONSUBMIT
  @action.bound
  async addProductClick() {
    const prod = new PartialProduct({
      name: this.product.name,
      description: this.product.description,
      price: this.product.price,
      imageURL: this.product.imageURL
    })

    if (prod.name === undefined)
      return message.warning('Ürün ismi girilmemiş')
    else if(prod.description === undefined)
      return message.warning('Ürün açıklaması girilmemiş')
    else if(prod.price === undefined)
      return message.warning('Ürün fiyatı girilmemiş')
    
    console.log(this.product)
    await ProductService.newProduct(prod, this.props.category)
    this.props.onClose()
    location.reload()
  }

  @action.bound
  async onUpdateClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    if (this.product.name === undefined)
      return message.warning('Ürün ismi girilmemiş')
    else if(this.product.description === undefined)
      return message.warning('Ürün açıklaması girilmemiş')
    else if(this.product.price === undefined)
      return message.warning('Ürün fiyatı girilmemiş')

    await ProductService.updateProduct(this.product)
    this.props.onClose()
    location.reload()
  }

  @action.bound
  async onDeleteClick() {
    await ProductService.deleteProduct(this.props.product!)
    this.props.onClose()
    location.reload()
  }


  render() {
    return (
      <Drawer
        title={this.props.product ? "Ürün Bilgileri": "Yeni Ürün Ekle"}
        width={720}
        onClose={this.props.onClose}
        visible={this.props.visible}
        bodyStyle={{ paddingBottom: 80 }}
        destroyOnClose={true}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            {!!this.props.product && 
              <Button danger onClick={this.onDeleteClick} style={{ marginRight: 8 }}>
                Sil
              </Button>
            } 
            
            <Button type="primary" onClick={this.props.product ? this.onUpdateClick : this.addProductClick} >
              {this.props.product ? "Güncelle" : "Ekle"}
            </Button>
          </div>
        }
      >
        <Row style={{ marginBottom: 15, marginTop: 15 }} gutter={16}>
          <Col span={24}>
            <Title style={{ color: blue[5] }} level={4}>{this.props.category.name}</Title>
          </Col>
        </Row>
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Ürün İsmi"
                required={true}
                rules={[{ required: true, message: 'Lütfen ürün ismi giriniz' }]}
              >
                <Input value={this.product.name} onChange={this.productNameChange} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="İçindekiler / Açıklama"
                required={true}
                rules={[{ required: true, message: 'Lütfen ürün için bir açıklama giriniz' }]}
              >
                <Input value={this.product.description} onChange={this.productDescriptionChange} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Fiyat"
                required={true}
                rules={[
                  {
                    required: true,
                    message: 'Lütfen ürün fiyatı giriniz',
                  },
                ]}
              >
                <Input suffix="₺" value={this.product.price} onChange={this.productPriceChange} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Fotoğraf Linki"
              >
                <Input value={this.product.imageURL} onChange={this.productImageURLChange} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    )
  }
}





export default NewProductModal