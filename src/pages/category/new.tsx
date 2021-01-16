import * as React from "react";
import { observer } from "mobx-react";
import { observable } from "mobx";
import Router from 'next/router';
import { GetServerSideProps } from 'next'
import cookies from "next-cookies";
import styled from 'styled-components'

import { PartialCategory } from 'models/category'
import { PartialMenu } from "models/menu";

import CategorySection from 'components/pages/category/new/section-category'
import AddProductSection from 'components/pages/category/new/section-add-product'
import SectionCategoryList from 'components/pages/category/new/section-category-list'

import { PageHeader, Form, Row, Col, BackTop } from 'antd';

import UserService from "services/user";
import { Menu } from "models/menu";
import { User } from "models/user";
import { Branch } from "models/branch";


interface IAddCategoryProps {
  user: User
  branch: Branch
  menu: Menu
}

@observer
class AddCategory extends React.Component<IAddCategoryProps> {
  @observable category: PartialCategory = new PartialCategory

  goBack() {
    Router.push('/menu')
  }

  // constructor(props: IAddCategoryProps) {
  //   super(props)
  //   console.log(this.props.menu);
  // }

  render() {
    return (
      <Container>
        <StyledPageHeader
          onBack={this.goBack}
          title="Menu"
          subTitle=" / Kategori Ekle"
        />
        <FormContainer>
          <BackTop />
          <Form layout="vertical">
            <Row gutter={16} >
              <Col span={24}>
                <CategorySection category={this.category} />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <AddProductSection category={this.category} />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <SectionCategoryList 
                  category={this.category} 
                  selectedMenu={this.props.menu} 
                />
              </Col>
            </Row>
          </Form>
        </FormContainer>
      </Container>
    )
  }
}

const Container = styled.div`
  width: 100%;
  min-height: 100%;
  /* background: red; */
  background-color: #F7FAFD;
`

const StyledPageHeader = styled(PageHeader)`
  border: 1px solid rgb(235, 237, 240);
  width: 100%;
  /* background: white; */
`

const FormContainer = styled.div`
  width: 1100px;
  height: 100%;
  margin: 0 auto;
  margin-top: 20px;
`


export const getServerSideProps: GetServerSideProps = async (context) => {
  // ...

  const { userId, selectedBranchIndex } = cookies(context)
  const user: User = await UserService.fetchUser(userId!)
  const branch = user.branches![parseInt(selectedBranchIndex!)]
  const menu = branch.menu!
  console.log(menu)
  // console.log(branch);
  // console.log(menu);


  // console.log("USEEEER" + user);

  return {
    props: {
      user,
      branch,
      menu
    }
  }
}

export default AddCategory