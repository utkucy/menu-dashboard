import React from 'react'
import { observer } from "mobx-react";
import { observable, action } from 'mobx';
import styled from 'styled-components'
import { Row, Col, Divider, Typography, Button } from 'antd';

import { PartialCategory } from 'models/category'
import { PartialMenu, Menu } from 'models/menu'
import ProductCard from 'components/product-card'

import CategoryService from 'services/category'


interface ISectionCategoryListProps {
  category: PartialCategory
  selectedMenu: Menu
}

const { Title, Text } = Typography;

@observer
class SectionCategoryList extends React.Component<ISectionCategoryListProps> {

  @action.bound
  async saveCategory () {
    // console.log("Menuu" + this.props.selectedMenu)
    // console.log("Categoryy" + this.props.category);
    await CategoryService.newCategory(this.props.selectedMenu?.id!, this.props.category)
    this.props.category.toUndefined = undefined
  }


  render() {
    return (
      <>
      {!!this.props.category.name && 
      <CategoryList>
        <Row gutter={16}>
          <Col span={12}>
            <Title level={2}>{this.props.category.name}</Title>
          </Col>
          <Col span={12} style={{ display: 'flex', justifyContent: 'flex-end' }} >
            <Button 
              onClick={this.saveCategory} 
              disabled={this.props.category.products?.length === 0 || this.props.category.products === undefined} 
              type="primary" 
              shape="round" 
              size={"large"}
            >
              Kategori Oluştur
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
      </CategoryList>
      }
      </>
    )
  }
}

const CategoryList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  margin: auto;
  margin-top: 48px;
  margin-bottom: 48px;
  box-shadow: 0px 12px 24px rgba(132, 153, 193, 0.08);
`





export default SectionCategoryList