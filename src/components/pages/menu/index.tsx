import * as React from "react";
import styled from 'styled-components'
import { observer } from "mobx-react";
import { action, observable, computed } from "mobx";
import Router from 'next/router';
import { Card, Button, Typography, BackTop } from 'antd';
import {
  PlusOutlined,
} from '@ant-design/icons';

import ProductCard from "components/pages/menu/product-card";
import NewProductModal from './new-product-modal'
import { Menu } from "models/menu";
import { PartialProduct } from "models/product";



interface IMenuContent {
  menu: Menu
}


const { Text } = Typography;

@observer
class MenuContent extends React.Component<IMenuContent> {

  @observable activeTabKey = this.props.menu.categories![0].name
  @observable newProductVisible = false

  constructor(props: IMenuContent) {
    super(props)
    this.changeModalVisible = this.changeModalVisible.bind(this)
  }

  @action
  onTabChange = (key: string) => {
    // console.log(key)
    this.activeTabKey = key
  };

  addCategory() {
    Router.push('/category/new')
  }

  @action.bound
  addProduct() {
    this.newProductVisible = true
  }

  @action.bound
  changeModalVisible() {
    this.newProductVisible = !this.newProductVisible
  }


  @computed
  get tabList () {
    const tabList: any = []
    this.props.menu.categories?.map(category => {
      tabList.push({
        key: category.name,
        tab: category.name
      })
    })
    return tabList
  }

  @computed
  get selectedCategory() {
    return this.props.menu.categories!.find(c => c.name === this.activeTabKey)
  }
  

  render() {
    return (
      <Container>
          <Card
            style={{ width: '100%' }}
            title={this.props.menu.name}
            extra={
              <Button 
                icon={<PlusOutlined />} 
                type="primary" 
                // style={{ marginTop: 20 }}
                onClick={this.addCategory}
              >
                Kategori Ekle
              </Button>
            }
            tabList={this.tabList}
            activeTabKey={this.activeTabKey}
            onTabChange={key => {
              this.onTabChange(key)
            }}
          >
            <CardContainer>
              <CardHeader>
                <Text strong>{this.selectedCategory?.description}</Text>
                <Button 
                  icon={<PlusOutlined />} 
                  type="dashed" 
                  onClick={this.addProduct}
                >
                  Ürün Ekle
                </Button>
              </CardHeader>
              
              {!!this.selectedCategory && 
                this.selectedCategory.products!.map((product, index) => (
                  <ProductCard key={index} product={product} category={this.selectedCategory!} />
                ))
              }
            </CardContainer>
          </Card>
          <NewProductModal 
            onClose={this.changeModalVisible} 
            visible={this.newProductVisible} 
            category={this.selectedCategory!} 
          />
          <BackTop />
      </Container>
    )
  }
}

const Container = styled.div`
  height: 100%;
  width: 100%;
`

const CardContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

`

const CardHeader = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
  margin-top: 12.5px;
`





export default MenuContent