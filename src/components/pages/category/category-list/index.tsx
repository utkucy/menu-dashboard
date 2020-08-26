import React, { ReactNode } from 'react'
import { observer } from "mobx-react";
import { observable, action, computed } from 'mobx';
import styled from 'styled-components'
import { Carousel, Card } from 'antd';

import { PartialCategory } from 'models/category'
import CategoryContainer from './category-container'



interface ICategoryListProps {
  categories: PartialCategory[]
}

@observer
class CategoryList extends React.Component<ICategoryListProps> {


  


  render() {
    return (
      <Container>
        
      </Container>
    )
  }
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: red;
`



export default CategoryList